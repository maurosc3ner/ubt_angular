import pyedflib
import numpy as np
from scipy import signal as sg
import argparse
import sys
import json
# import  matplotlib.pyplotmatplot  as plt
from pprint import pprint

import pandas as pd

class Notch():
    Q = 0 
    f0 = 0 
    def __init__(self,f0=60,Q=50):
        self.f0=f0
        self.Q=Q

    def argparse(self):
        parser = argparse.ArgumentParser()
        parser.add_argument('-i','--archivo',help='Ingrese el nombre del archivo .edf a utilizar',type = str)
        parser.add_argument('-fo','--fo',help='Frecuencia que se desea filtrar. Por defecto fo = 60',type = float)
        parser.add_argument('-Q','--Q',help='Factor de calidad del filtro. Por defecto Q = 50',type = int)
        parser.add_argument('-e','--edf',help='Nombre y dirección del archivo .edf de salida',type = str)
        parsedargs = parser.parse_args()
        arc = parsedargs.archivo
        output = parsedargs.edf
        if (parsedargs.fo != None):
            if (parsedargs.fo> 0):
                self.f0 = parsedargs.fo
        if (parsedargs.Q != None):
            if (parsedargs.Q>0):
                self.Q = parsedargs.Q
        return arc,output

    def read_edf(self,nameEdf):
        '''
        Descripción: Se encarga de leer el archivo .edf
        Entradas: - nameEdf: nombre del archivo .edf
        Salidas: - in_signal: Matriz de Canales X Tiempo
                 - fs: Frecuencia de muestro
                 - headers: Etiquetas del archivo .edf 
        '''   
        edf = pyedflib.EdfReader(nameEdf) 
        headers = edf.getSignalHeaders() 
        nch  = edf.signals_in_file
        nsig = edf.getNSamples()[0]
        fs = edf.getSampleFrequency(0)
        in_signal = np.zeros((nch,nsig))
        for x in range(nch):
            in_signal[x,:] = edf.readSignal(x)
        edf._close()
        del edf
        return  in_signal,fs,headers

    def filt(self,in_signal,fs):
        '''
        Descripción: Se encarga de filtrar los datos del EEG
        Entradas: - in_signal: Matriz de Canales X Tiempo
                  - fs: Frecuencia de muestro
        Salidas: - out_signal: EEG filtrado (Matriz de CanalesXTiempo)
        ''' 
        w0 = self.f0/(fs/2)  
        num,den = sg.iirnotch(w0,self.Q)
        out_signal = np.zeros((len(in_signal),len(in_signal[0])))
        for i in range(0,len(in_signal)):
            out_signal[i]=sg.filtfilt(num,den,in_signal[i])
        return out_signal,num,den

    def write_edf(self,in_signal,headers,nameEdf):
        '''
        Descripción: Se encarga de escribir los datos del nuevo EEG
        Entradas: - headers: etiquetas del .edf 
                  - in_signal: Matriz de Canales X Tiempo
                  - nameEdf : Nombre con el que se desea guardar el nuevo .edf
        ''' 
        edf = pyedflib.EdfWriter(nameEdf,len(in_signal),file_type=pyedflib.FILETYPE_EDFPLUS)
        edf_info = []
        edf_signal = []
        for i in range (len(in_signal)):
            channel_info={'label':headers[i]['label'],'dimension':headers[i]['dimension'],'sample_rate':headers[i]['sample_rate'],'physical_max':headers[i]['physical_max'] , 'physical_min': headers[i]['physical_min'], 'digital_max': headers[i]['digital_max'], 'digital_min': headers[i]['digital_min'], 'transducer':headers[i]['transducer'] , 'prefilter':headers[i]['prefilter']+',notch '+str(self.f0)+'Hz'}
            edf_info.append(channel_info)
            edf_signal.append(in_signal[i])
        edf.setSignalHeaders(edf_info)
        edf.writeSamples(edf_signal)
        edf.close()
        del edf

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

if __name__ == '__main__':
    # print ("start of notch")
    notch1 = Notch()
    inSignals=read_in()

    nch=len(inSignals)
    nSamples = len(inSignals[0]['data'])
    fs=inSignals[0]['samplefrequency']
    # print(nch,nSamples)
    in_signal = np.zeros((nch,nSamples))

    # print(len(inSignals))
    # print(len(inSignals[0]['data']))
    currentCh=0
    for item in inSignals:
        for subitem in item['data']:
            subitem.pop('time', None)
        df = pd.DataFrame(item['data'])
        in_signal[currentCh,:]=np.array(df.values).transpose()
        # print (in_signal[currentCh,:],currentCh)
        currentCh = currentCh +1


    # print(vals)
    # print("size of input",in_signal.shape)
    # fig,subplt=plt.subplots(3,1,figsize=(8,5))
    # subplt[0].plot(t,inp[9][ni:nf])
    # subplt[0].title.set_text('Señal original')
    # subplt[0].grid()
    # arc,output = notch1.argparse()
    # signal , fs ,headers= notch1.read_edf(arc)
    filtered_signal,num,den = notch1.filt(in_signal,fs)
    # print("size of output",filtered_signal.shape)

    response={}
    response['channels']=[]
    currentCh=0
    for channel in inSignals:
        
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

    #notch1.write_edf(filtered_signal,headers,output)