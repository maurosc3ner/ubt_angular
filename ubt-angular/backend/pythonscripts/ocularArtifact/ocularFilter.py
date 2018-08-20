# How to 
# python ocularFilter.py -i "../../server_data/sujeto_base.edf" -e "t.edf"
# 
import numpy as np 
import pyedflib
from sklearn.decomposition import FastICA
import argparse
from jade import jadeR
import matplotlib.pyplot as plt
import sys
import json
import pandas as pd

class ocular_artifact_filter():
    l=0
    def __init__(self,l=0.9):
        self.l = l

    def argparse(self):
        parser = argparse.ArgumentParser()
        parser.add_argument('-i','--archivo',help='Ingrese el nombre del archivo .edf a utilizar',type = str)
        parser.add_argument('-l','--lam',help='Parámetro lambda del filtro adaptativo.Por defecto lambda=0.9',type = float)
        parser.add_argument('-e','--edf',help='Nombre y dirección del archivo .edf de salida',type = str)
        parsedargs = parser.parse_args()
        arc = parsedargs.archivo
        if parsedargs.lam != None:    
            if parsedargs.lam > 0:
                self.l = parsedargs.lam
        output = parsedargs.edf
        return arc,output

    def read_edf(self,nameEdf) :
        edf = pyedflib.EdfReader(nameEdf)
        channels_labels = edf.getSignalLabels()
        headers = edf.getSignalHeaders() 
        nch  = edf.signals_in_file
        nsig = edf.getNSamples()[0]
        fs = edf.getSampleFrequency(0)
        dataEEG = np.zeros((nch,nsig))
        for x in range(nch):
            dataEEG[x,:] = edf.readSignal(x)
        edf._close()
        del edf
        return  dataEEG,fs,headers,channels_labels

    def filt(self,dataEEG,channels_labels):
        index_ref = []
        for i in range(len(channels_labels)):
            channels_labels[i].upper()
            if ('FP1' in channels_labels[i]) or ('FP2' in channels_labels[i]) or ('F7' in channels_labels[i]) or ('F8' in channels_labels[i]):
                index_ref.append(i)
        signal_size = dataEEG.shape
        nchannels = signal_size[0]
        nsamples = signal_size[1]
        index_data = np.arange(nchannels)
        index_data = np.delete(index_data,index_ref)
        transpose_dataEEG = np.transpose(dataEEG)
        dataRef = np.take(transpose_dataEEG,index_ref,axis=1) 
        dataEEG = np.take(transpose_dataEEG,index_data,axis=1)
        dataRef = np.transpose(dataRef) 
        dataEEG = np.transpose(dataEEG)
        
        W = jadeR(dataEEG)
        W = np.array(W)
        Y = np.dot(W,dataEEG)

        V = jadeR(dataRef)
        V = np.array(V)
        #T = np.dot(V,dataRef)
        
        Xpp = self.filterAdaptative(Y,dataEEG, dataRef, W, V, index_ref,index_data,nsamples)

        for i in range(0,np.size(index_ref)):
            Xpp = np.insert( Xpp, index_ref[i], transpose_dataEEG[:,index_ref[i]], axis=0)
        return Xpp

    def filterAdaptative(self,Y, dataEEG, dataRef, W, V, index_ref,index_data,nsamples):
        
        channelsRef = np.size(index_ref)
        channelsData = np.size(index_data)
        P = np.zeros((channelsRef,channelsRef,nsamples)) 
        h = np.zeros((channelsRef,channelsData,nsamples))
        tp = np.zeros([channelsRef, nsamples])
        sp = np.zeros([channelsData, nsamples])
        pii = np.zeros([nsamples, channelsRef])
        k = np.zeros([channelsRef, nsamples])
        alp = np.zeros([channelsData, nsamples])
        j = np.zeros(channelsData)
        for m in range(0,channelsData):
            P[:,:,0] = np.dot(10000,np.identity(channelsRef))
            h[:,m,0] = np.zeros((1,channelsRef)) 
            for n in range(nsamples):    
                tp[:,n] = np.dot( V, dataRef[:,n])
                pii[n,:] = np.dot( np.transpose(tp[:,n]), P[:,:,n-1])
                k[:,n] = np.transpose( pii[n,:]) / (self.l+np.dot(pii[n,:],tp[:,n]))
                sp[m,n] = np.dot( np.transpose(W[:,m]), dataEEG[:,n])
                alp[m,n] = sp[m,n] - np.dot(np.transpose(h[:,m,n-1]),tp[:,n])
                h[:,m,n] = h[:,m,n-1] + np.dot(alp[m,n],k[:,n])
                P[:,:,n] = (P[:,:,n-1] - np.dot(k[:,n],pii[n,:])) / self.l
            j[m] = np.sum(alp[m,:]**2)
        spp = Y
        mi = min(j)
        ind_min = np.nonzero(j == mi)       
        spp[ind_min] = np.zeros(int(nsamples))      
        Xp = np.linalg.lstsq(W,spp,rcond=-1)
        Xpp = Xp[0]
        return Xpp

    def write_edf(self,in_signal,headers,nameEdf):
        edf = pyedflib.EdfWriter(nameEdf,len(in_signal),file_type=pyedflib.FILETYPE_EDFPLUS)
        edf_info = []
        edf_signal = []
        for i in range (len(in_signal)):
            channel_info={'label':headers[i]['label'],'dimension':headers[i]['dimension'],'sample_rate':headers[i]['sample_rate'],'physical_max':headers[i]['physical_max'] , 'physical_min': headers[i]['physical_min'], 'digital_max': headers[i]['digital_max'], 'digital_min': headers[i]['digital_min'], 'transducer':headers[i]['transducer'] , 'prefilter':headers[i]['prefilter']+',Ocular Artifact Filter'}
            edf_info.append(channel_info)
            edf_signal.append(in_signal[i])
        edf.setSignalHeaders(edf_info)
        edf.writeSamples(edf_signal)
        edf.close()
        del edf

def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

if __name__ == '__main__':
    
    adap1 = ocular_artifact_filter()
    # arc,output = adap1.argparse()
    stdin=read_in()
    nch=len(stdin)
    nSamples = len(stdin[0]['data'])
    fs=stdin[0]['samplefrequency']

    # dataEEG ,fs,headers,channels_labels =  adap1.read_edf(arc)
    labels=[]
    in_signal = np.zeros((nch,nSamples))
    currentCh=0
    for item in stdin:
        labels.append(item['label'])
        for subitem in item['data']:
            subitem.pop('time', None)
        df = pd.DataFrame(item['data'])
        in_signal[currentCh,:]=np.array(df.values).transpose()
        
        currentCh = currentCh +1
    # call filter
    filtered_signal = adap1.filt(in_signal,labels)
    # convert to message json
    response={}
    response['channels']=[]
    currentCh=0
    for channel in stdin:
        channelObj={}
        channelObj['id']=channel['id']
        channelObj['label']=channel['label']
        channelObj['samples']=channel['samples']
        channelObj['physicalMaximum']=channel['physicalMaximum']
        channelObj['physicalMinimum']=channel['physicalMinimum']
        channelObj['digitalMaximum']=channel['digitalMaximum']
        channelObj['digitalMinimum']=channel['digitalMinimum']
        channelObj['samplefrequency']= channel['samplefrequency']
        channelObj['data']=[]
        currentD=0
        for subitem in channel['data']:
            d={}
            # d['value']=float(subitem['value'])
            d['value']=float(filtered_signal[currentCh,currentD])
            channelObj['data'].append(d)
            currentD=currentD+1
        response['channels'].append(channelObj)
        currentCh=currentCh+1
        # print(channelObj['id'])
    print (json.dumps(response))

    # n = 2500 # 10 segundos.
    # t = np.linspace(0,(n-1)/fs,n)
    # ti = 1000 # Segundo inical.
    # tf = 1010 # Segundo final.
    # ni = ti*fs # Muestra inicial.
    # nf = tf*fs # Muestra final.

    # # Generación de gráficas CANAL 10.

    # fig,subplt=plt.subplots(2,1,figsize=(8,5))
    # subplt[0].plot(t,roiSignal[9][:])
    # subplt[0].title.set_text('Señal original')
    # subplt[0].grid()

    # subplt[1].plot(t,Xpp[9][:])
    # subplt[1].title.set_text('Señal filtrada')
    # subplt[1].grid()
    # print('Ok')
    # plt.show()
    # Xpp = adap1.filt(dataEEG,channels_labels)
    # adap1.write_edf(Xpp,headers,output)