#!/usr/bin/env python
#Plot3DBrain
# python Main_BM.py -l Data\nyL.mat -v Data\nyvert.mat -f Data\nyface.mat -c Data\nyCh.mat -d Data\nyEEG_R.txt -b Data\sujeto_base.edf
# python loretaFilter.py -l nyL.mat -v nyvert.mat -f nyface.mat -c nyCh.mat -d nyEEG_R.txt -b sujeto_base.edf
from __future__ import division, print_function, absolute_import
import os
import pyedflib
import scipy.io as sio
import numpy as np
from pyqtgraph.Qt import QtCore,QtGui
import pyqtgraph as pg
import pyqtgraph.opengl as gl
import matplotlib.pyplot as plt
#from json_encoder import json
import json
import time
import argparse
import sys
import pandas as pd
from pathlib import Path

class Main_L(object):
    """docstring for Main_L"""
    def __init__(self,):
        super(Main_L, self).__init__

    def argparse(self):
        parser = argparse.ArgumentParser()
        parser.add_argument('-l','--L',help='nombre del archivo .m correspodiente a la Lead Field',type = str)
        parser.add_argument('-v','--Ve',help='nombre del archivo .m correspodiente a los verts',type = str)
        parser.add_argument('-f','--Fa',help='nombre del archivo .m correspodiente a las faces',type = str)
        parser.add_argument('-c','--ch',help='nombre del archivo .m correspodiente a los canales',type = str)
        
        parser.add_argument('-d','--archivo',help='nombre del archivo .txt que desea utilizar',type = str)
        parser.add_argument('-b','--archivo2',help='nombre del archivo .edf correspondiente a las etiquetas')

        parsedargs = parser.parse_args()
        lead = parsedargs.L
        verts=parsedargs.Ve
        faces=parsedargs.Fa
        channels=parsedargs.ch 
        data=parsedargs.archivo
        base=parsedargs.archivo2
        
        return lead,verts,faces,channels,data,base 
        # return lead,verts,faces,channels,data 
    
    def read_edf(self,name):
        f = pyedflib.EdfReader(name)
        Hdr={}
        Hdr['library_version']=pyedflib.version.version
        Hdr["edfsignals"] =  f.signals_in_file 
        Hdr["file_duration"] =  f.file_duration
        Hdr["startdate"] = [f.getStartdatetime().day,f.getStartdatetime().month,f.getStartdatetime().year]
        Hdr["starttime"] = [f.getStartdatetime().hour,f.getStartdatetime().minute,f.getStartdatetime().second]
        Hdr["patientcode"] =  f.getPatientCode()
        Hdr["gender"] =  f.getGender()
        Hdr["birthdate"] =  f.getBirthdate()
        Hdr["patient_name"] =  f.getPatientName()
        Hdr["patient_additional"] =  f.getPatientAdditional()
        Hdr["admincode"] =  f.getAdmincode()
        Hdr["technician"] =  f.getTechnician()
        Hdr["equipment"] =  f.getEquipment()
        Hdr["recording_additional"] =  f.getRecordingAdditional()
        Hdr["datarecord_duration"] =  f.getFileDuration()
        Hdr["number_of_datarecords"] =  f.datarecords_in_file
        Hdr["number_of_annotations"] =  f.annotations_in_file
        labels = []; phi_max = []; phi_min = []; dig_max = []; dig_min = []; phi_dim = []; prefilt = []; transd = []; Smp_frq = []
        for channels in range(f.signals_in_file):
            labels.append(f.getLabel(channels)); phi_max.append(f.getPhysicalMaximum(channels)); phi_min.append(f.getPhysicalMinimum(channels)); dig_max.append(f.getDigitalMaximum(channels)); dig_min.append(f.getDigitalMinimum(channels)); phi_dim.append(f.getPhysicalDimension(channels)); prefilt.append(f.getPrefilter(channels)); transd.append(f.getTransducer(channels)); Smp_frq.append(f.getSampleFrequency(channels))
        Hdr['labels'] = labels
        Hdr['phi_max'] = phi_max
        Hdr['phi_min'] = phi_min
        Hdr['dig_max'] = dig_max
        Hdr['dig_min'] = dig_min
        Hdr['phi_dim'] = phi_dim
        Hdr['prefilt'] = prefilt
        Hdr['transd'] = transd
        Hdr['Smp_frq'] = Smp_frq
        Hdr['samples_in_file'] =  f.getNSamples()

        Hdr['annotations'] = f.readAnnotations()
        record = np.zeros((f.signals_in_file,f.getNSamples()[0]))
        for channels in range(f.signals_in_file):
            record[channels,:] = f.readSignal(channels)
        f._close()
        del f 
        return Hdr,record   

    # def TicTocGenerator(self):
    #     # Generador que retorna la diferencia de tiempo
    #     ti = 0           # tiempo inicial
    #     tf = time.time() # tiempo final
    #     while True:
    #         ti = tf
    #         tf = time.time()
    #         yield tf-ti # Retorna la diferencia de tiempo

    # def toc(self,tempBool=True):
    #     # Imprime la diferencia de tiempo final e inicial
    #     tempTimeInterval = next(TicToc)
    #     if tempBool:
    #         print( "Elapsed time: %f seconds.\n" %tempTimeInterval )

    # def tic(self):
    #     l=Main_L()
    #     # Guarda un tiempo en TicToc, marcas de inicio y final del intervalo
    #     l.toc(False)

    def load_BM_data(self,Lead_field,verts,faces,channels):
    	#Cargar Lead Field
        data_folder = Path("backend/pythonscripts/loreta-new/")
        # data_folder = Path(".") #for argparse mode
        L = sio.loadmat(data_folder/Lead_field)
    	# L = sio.loadmat(Lead_field)
        L_8ch=L['L_8ch']
    	#Cargar verts
        verts = sio.loadmat(data_folder/verts)
        verts=verts['verts']
        #Cargar faces
        faces = sio.loadmat(data_folder/faces)
        faces=faces['faces']
        faces=faces-1
    	#Cargar Channels
        channels = sio.loadmat(data_folder/channels)
        channels=channels['channels']
        channels = [str(''.join(letter)) for letter_array in channels[0] for letter in letter_array]
        return L_8ch,verts,faces,channels

    def source_reconstruction(self,Y,L,alfa,meth): 

        #Funcion que reconstruye en cualquiera de las dos tecnicas especificadas, ya sea 'LOR':Loreta , 'sLOR': sLoreta
        l=Main_L()
        [Nc,Nd]=np.shape(L)
        [Nc,Nt]=np.shape(Y)
        I=np.eye(Nc)
        V_ones=np.ones((Nc,1))
        V_ones_t=np.ones((1,Nc))
        H=I-(np.dot(V_ones,V_ones_t)/np.dot(V_ones_t,V_ones))
        L_c=np.dot(H,L)
        Y_c=np.dot(H,Y)
        B = np.linalg.pinv(np.dot(L_c,np.transpose(L_c))+alfa*H)
        T=np.dot(np.transpose(L_c),B)
        J_e=np.dot(T,Y_c)
        S_J=np.dot(T,L_c)
        if (meth=='sLOR'):
        	J=l.sLORETA(S_J,J_e,Nd,Nt)
        if (meth=='LOR'):
        	J=l.LORETA(S_J,J_e)
        return J

    def LORETA(self,S_J,J_e):
        #Tecnica de Loreta
    	J_Lor=np.dot(S_J,J_e)
    	return J_Lor

    def sLORETA(self,S_J,J_e,Nd,Nt):
        # Tecnica de sLoreta
    	S_J_diag=np.diag(S_J)
    	S_J_d_i=np.ones((1,Nd))/S_J_diag
    	S_J_d_i=np.transpose(S_J_d_i)
    	V_ones=np.ones((1,Nt))
    	S_J_i=S_J_d_i*V_ones
    	J_sLor=S_J_i*J_e**2
    	return J_sLor

    def normalize_vector(self,J_energy):
        #Normalizar componentes del vector
        J_energy = (J_energy - np.amin(J_energy))/(np.amax(J_energy)-np.amin(J_energy))
        return J_energy

    def source_energy(self,J):
        #Concentrar la energia de las posibles fuentes
    	[Nd,Nt]=np.shape(J)
    	if (Nt==1):
    		J_energy=J**2
    	else:
    		J_energy=J**2
    		J_energy=np.sum(J,1)
    	return J_energy

    def IntensitytoJet(self,Zrgb):
        l=Main_L()
        cmap=np.array([[0.041,0, 0],[0.083, 0, 0],[0.125,0,0],[0.166,0,0],[0.208,0,0],[0.250,0,0],[0.2917,0,0],[0.333,0,0],[0.3750,0,0],[0.4167,0,0],[0.4583,0,0],[0.5,0,0],[0.541,0,0],[0.583,0,0],[0.625,0,0],[0.666,0,0],[0.708,0,0],[0.750,0,0],[0.7917,0,0],[0.833,0,0],[0.875,0,0],[0.916,0,0],[0.958,0,0],[1,0,0],[1,0.041,0],[1,0.083,0],[1,0.125,0],[1,0.166,0],[1,0.208,0],[1,0.250,0],[1,0.291,0],[1,0.333,0],[1,0.375,0],[1,0.4167,0],[1,0.4583,0],[1,0.5,0],[1,0.541,0],[1,0.583,0],[1,0.625,0],[1,0.666,0],[1,0.708,0],[1,0.750,0],[1,0.7917,0],[1,0.833,0],[1,0.875,0],[1,0.916,0],[1,0.958,0],[1,1,0],[1,0.062,0],[1,1,0.125],[1,1,0.187],[1,1,0.250],[1,1,0.312],[1,1,0.375],[1,1,0.437],[1,1,0.5],[1,1,0.562],[1,1,0.625],[1,1,0.687],[1,1,0.75],[1,1,0.812],[1,1,0.875],[1,1,0.937],[1,1,1]])
        cmap=np.flipud(cmap)
        #cmap = np.array([[0.5,0.5,.5],[0,	0,	0.625],[0,	0,	0.6875],[0,	0,	0.75],[0,	0,	0.8125],[0,	0,	0.875],[0,	0,	0.9375],[0,	0,	1],[0,	0.0625,	1],[0,	0.125,	1],[0,	0.1875,	1],[0,	0.25,	1],[0,	0.3125,	1],[0,	0.375,	1],[0,	0.4375,	1],[0,	0.5,	1],[0,	0.5625,	1],[0,	0.625,	1],[0,	0.6875,	1],[0,	0.75,	1],[0,	0.8125,	1],[0,	0.875,	1],[0,	0.9375,	1],[0,	1,	1],[0.0625,	1,	0.9375],[0.125,	1,	0.875],[0.1875,	1,	0.8125],[0.25,	1,	0.75],[0.3125,	1,	0.6875],[0.375,	1,	0.625],[0.4375,	1,	0.5625],[0.5,	1,	0.5],[0.5625,	1,	0.4375],[0.625,	1,	0.375],[0.6875,	1,	0.3125],[0.75,	1,	0.25],[0.8125,	1,	0.1875],[0.875,	1,	0.125],[0.9375,	1,	0.0625],[1,	1,	0],[1,	0.9375,	0],[1,	0.875,	0],[1,	0.8125,	0],[1,	0.75,	0],[1,	0.6875,	0],[1,	0.625,	0],[1,	0.5625,	0],[1,	0.5,	0],[1,	0.4375,	0],[1,	0.375,	0],[1,	0.3125,	0],[1,	0.25,	0],[1,	0.1875,	0],[1,	0.125,	0],[1,	0.0625,	0],[1,	0,	0],[0.9375,	0,	0],[0.875,	0,	0],[0.8125,	0,	0],[0.75,	0,	0],[0.6875,	0,	0],[0.625,	0,	0],[0.5625,	0,	0],[0.5,	0,	0]])
        #  cmap = np.array([[0.5,.5,.5],[0,    0,  0.625],[0,  0,  0.6875],[0, 0,  0.75],[0,   0,  0.8125],[0, 0,  0.875],[0,  0,  0.9375],[0, 0,  1],[0,  0.0625, 1],[0,  0.125,  1],[0,  0.1875, 1],[0,  0.25,   1],[0,  0.3125, 1],[0,  0.375,  1],[0,  0.4375, 1],[0,  0.5,    1],[0,  0.5625, 1],[0,  0.625,  1],[0,  0.6875, 1],[0,  0.75,   1],[0,  0.8125, 1],[0,  0.875,  1],[0,  0.9375, 1],[0,  1,  1],[0.0625, 1,  0.9375],[0.125, 1,  0.875],[0.1875, 1,  0.8125],[0.25,  1,  0.75],[0.3125,  1,  0.6875],[0.375, 1,  0.625],[0.4375, 1,  0.5625],[0.5,   1,  0.5],[0.5625,   1,  0.4375],[0.625, 1,  0.375],[0.6875, 1,  0.3125],[0.75,  1,  0.25],[0.8125,  1,  0.1875],[0.875, 1,  0.125],[0.9375, 1,  0.0625],[1, 1,  0],[1,  0.9375, 0],[1,  0.875,  0],[1,  0.8125, 0],[1,  0.75,   0],[1,  0.6875, 0],[1,  0.625,  0],[1,  0.5625, 0],[1,  0.5,    0],[1,  0.4375, 0],[1,  0.375,  0],[1,  0.3125, 0],[1,  0.25,   0],[1,  0.1875, 0],[1,  0.125,  0],[1,  0.0625, 0],[1,  0,  0],[0.9375, 0,  0],[0.875,  0,  0],[0.8125, 0,  0],[0.75,   0,  0],[0.6875, 0,  0],[0.625,  0,  0],[0.5625, 0,  0],[0.5,    0,  0]])
        print(np.shape(cmap))
        cmap = np.dot(255.0,cmap)
        Zrgb = Zrgb-np.amin(Zrgb)
        Zrgb = Zrgb / np.max(Zrgb)
        inte = np.linspace(0,1,num=cmap.shape[0])
        Pix = Zrgb.shape[0]
        tex = np.zeros([Pix,4])
        for i in range(Pix):
                if np.isnan(Zrgb[i]):
                    tex[i,0] = 0
                    tex[i,1] = 0
                    tex[i,2] = 0
                    tex[i,3] = 0
                else:
                    ix = l.find_nearest(inte,Zrgb[i])
                    tex[i,0] = cmap[ix,0]
                    tex[i,1] = cmap[ix,1]
                    tex[i,2] = cmap[ix,2]
                    tex[i,3] = 256
        return tex

    def find_nearest(self,array,value):
        a = abs(array-value)
        idx = np.where(a == a.min())
        return idx

    def write2JSONFile (self,path, fileName, data):
        filePathNameWExt = './'+path+'/'+fileName+'.json'
        with open(filePathNameWExt, 'w') as fp:
            json.dump(data,fp)

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

l=Main_L()
path = './'

# argparse input mode
# lead,verts,faces,channels,data,base =l.argparse()
# print ("comienzo del parsing ", Path().absolute())
# print (lead,verts,faces,channels,data)
# Lead_field=lead # Ubicacion de la Lead Field
# verts=verts #Ubicacion de los verts
# faces=faces # Ubicacion de las faces
# channels=channels #Ubicacion de los cannels
# DataEEG=data # datos del EEG
# BaseEEG=base # etiquetas del EEG
# [L,verts,faces,channels]=l.load_BM_data(Lead_field,verts,faces,channels)#Loading Forward Model solution (LeadField)
# Y = np.loadtxt('nyEEG_R.txt')#cargar datos del EEG
# Hdr,record= l.read_edf(BaseEEG)# Cargar parametros del EEG
# print(Hdr["labels"])# Mostrar Etiquetas
# Y=Y.T
# # Source reconstruction
# # TicToc = l.TicTocGenerator()# Comenzar contador
# # l.tic() #Inicio del contador
# alfa=0.05
# print(np.shape(Y))#Mostrar dimensiones de los datos del EEG
# print(np.shape(L))#Mostrar dimensiones de los datos de la Lead_Field 
# J = l.source_reconstruction(Y,L,alfa,'sLOR')#Focalizar actividad ya sea con 'LOR':Loreta o 'sLOR': sLoreta
# J_energy=l.source_energy(J)# Energia de las fuentes
# J_energy=l.normalize_vector(J_energy) # normalizar los valores de energia 
# #Umbralizar los valores de la energia 
# for i in range(0,np.shape(J_energy)[0]):
# 		if J_energy[i]<0.2:
# 			J_energy[i] = 0.0

# print(np.shape(J_energy))#Mostrar dimensiones de las fuentes
# # l.toc()# Final del contador
# colors = l.IntensitytoJet(J_energy)
# colorExporter=colors[:,[0,1,2]]/255

# color={}
# color['items']=[]
# for i in range(0,np.shape(colors)[0]):
#     rgbObj={}
#     rgbObj['r']=colorExporter[i,0]
#     rgbObj['g']=colorExporter[i,1]
#     rgbObj['b']=colorExporter[i,2]
#     color['items'].append(rgbObj)

# l.write2JSONFile(path,'colors',color)

# np.savetxt('J_energy.txt', J_energy, fmt='%.2e')
# app = QtGui.QApplication([]) 
# w = gl.GLViewWidget()
# w.show()
# w.setCameraPosition(distance=500)
# m1 = gl.GLMeshItem(vertexes=verts, faces=faces.astype(int), vertexColors=colors, smooth=True, shader='shaded')
# w.addItem(m1)

# # Start Qt event loop unless running in interactive mode.
# if __name__ == '__main__':
#     import sys
#     if (sys.flags.interactive != 1) or not hasattr(QtCore, 'PYQT_VERSION'):
#         QtGui.QApplication.instance().exec_()

## pythonShell mode 
lead,verts,faces,channels,data,base=l.argparse()
stdin=read_in()
# print (stdin)
Lead_field='nyL.mat' # Ubicacion de la Lead Field
verts='nyvert.mat' #Ubicacion de los verts
faces='nyface.mat' # Ubicacion de las faces
channels='nyCh.mat' #Ubicacion de los cannels
[L,verts,faces,channels]=l.load_BM_data(Lead_field,verts,faces,channels)#Loading Forward Model solution (LeadField)
nch=len(stdin)
nSamples = len(stdin[0]['data'])
fs=stdin[0]['samplefrequency']
labels=[]
in_signal = np.zeros((nch,nSamples))
currentCh=0
for item in stdin:
	labels.append(item['label'])
	for subitem in item['data']:
		subitem.pop('time', None)
	df = pd.DataFrame(item['data'])
	in_signal[currentCh,:]=np.array(df.values).transpose()
	# print (in_signal[currentCh,:],currentCh)
	currentCh = currentCh +1
# print(nch,nSamples,labels,in_signal.shape)
Y= in_signal
alfa=0.05
# print('dataEEG',np.shape(Y))#Mostrar dimensiones de los datos del EEG
# print('Lead Field',np.shape(L))#Mostrar dimensiones de los datos de la Lead_Field 
J = l.source_reconstruction(Y,L,alfa,'sLOR')#Focalizar actividad ya sea con 'LOR':Loreta o 'sLOR': sLoreta
J_energy=l.source_energy(J)# Energia de las fuentes
J_energy=l.normalize_vector(J_energy) # normalizar los valores de energia 
#Umbralizar los valores de la energia 
for i in range(0,np.shape(J_energy)[0]):
		if J_energy[i]<0.2:
			J_energy[i] = 0.0

# print(np.shape(J_energy))#Mostrar dimensiones de las fuentes

colors = l.IntensitytoJet(J_energy)
colorExporter=colors[:,[0,1,2]]/255
color={}
color['items']=[]
for i in range(0,np.shape(colors)[0]):
    rgbObj={}
    rgbObj['r']=colorExporter[i,0]
    rgbObj['g']=colorExporter[i,1]
    rgbObj['b']=colorExporter[i,2]
    color['items'].append(rgbObj)
# print ("end")
# l.write2JSONFile(path,'colors',color)
print (json.dumps(color))





