#!/usr/bin/env python
from __future__ import division, print_function, absolute_import
import os
import numpy as np
import pyedflib
import sys
import json

if __name__ == '__main__':
    fileName = 'sujeto_base'
    data = {}
    data['patientInfo']={}
    data['annotations']={}

    path = './'
    # f = pyedflib.EdfReader('sujeto_base.edf')
    f = pyedflib.EdfReader(sys.argv[1])
    
  
    # print("file duration: %i seconds" % f.file_duration)
    data['patientInfo']['fileDuration']= f.file_duration
    
    # print("startdate: %i-%i-%i" % (f.getStartdatetime().day,f.getStartdatetime().month,f.getStartdatetime().year))
    data['patientInfo']['startDate']= '{:02d}'.format(f.getStartdatetime().day)+'-'+'{:02d}'.format(f.getStartdatetime().month) +'-'+'{:02d}'.format(f.getStartdatetime().year)
    
    # print("starttime: %i:%02i:%02i" % (f.getStartdatetime().hour,f.getStartdatetime().minute,f.getStartdatetime().second))
    data['patientInfo']['startTime']= '{:02d}'.format(f.getStartdatetime().hour)+':'+'{:02d}'.format(f.getStartdatetime().minute) +':'+'{:02d}'.format(f.getStartdatetime().second)

    # print("patientcode: %s" % f.getPatientCode())
    data['patientInfo']['patientCode']= '{0!s}'.format(f.getPatientCode())
    
    # print("gender: %s" % f.getGender())
    data['patientInfo']['gender']= '{0!s}'.format(f.getGender())
    
    # print("birthdate: %s" % f.getBirthdate())
    data['patientInfo']['birthDate']= '{0!s}'.format(f.getBirthdate())
    
    # print("patient_name: %s" % f.getPatientName())
    data['patientInfo']['patientFullName']= '{0!s}'.format(sys.argv[1])
    # data['patientInfo']['patientFullName']= '{0!s}'.format(f.getPatientName())
        
    # print("patient_additional: %s" % f.getPatientAdditional())
    
    # print("admincode: %s" % f.getAdmincode())
    data['patientInfo']['adminCode']= '{0!s}'.format(f.getAdmincode())
        
    # print("technician: %s" % f.getTechnician())
    data['patientInfo']['technician']= '{0!s}'.format(f.getTechnician())
        
    # print("equipment: %s" % f.getEquipment())
    data['patientInfo']['equipment']= '{0!s}'.format(f.getEquipment())
        
    # print("recording_additional: %s" % f.getRecordingAdditional())
    data['patientInfo']['recordingAdditional']= '{0!s}'.format(f.getRecordingAdditional())
        
    # print("datarecord duration: %f seconds" % f.getFileDuration())
    data['patientInfo']['duration']= '{:.2f}'.format(f.getFileDuration())+' seconds'
        
    # print("number of datarecords in the file: %i" % f.datarecords_in_file)
    data['patientInfo']['datarecords']= f.datarecords_in_file
    
    # print("edfsignals: %i" % f.signals_in_file)
    data['patientInfo']['edfSignals']= f.signals_in_file
        
    # print("number of annotations in the file: %i" % f.annotations_in_file)
    # print("Annotations:")
    data['annotations']['size']= '{:d}'.format(f.annotations_in_file)
    data['annotations']['items']=[]
    annotations = f.readAnnotations()
    for n in np.arange(f.annotations_in_file):
        # print("annotation: onset is %f    duration is %s    description is %s" % (annotations[0][n],annotations[1][n],annotations[2][n]))
        current = {}
        current['onset']=annotations[0][n]
        current['duration']=annotations[1][n]
        current['description']='{0!s}'.format(annotations[2][n])
        data['annotations']['items'].append(current)

    data['channels']=[]
    for channel in range(int(data['patientInfo']['edfSignals'])):
        
        channelObj={}
        channelObj['id']=channel
        # print("\nsignal parameters for the %d.channel:\n\n" % channel)
        
        # print("label: %s" % f.getLabel(channel))
        channelObj['label']='{0!s}'.format(f.getLabel(channel))
        
        # print("samples in file: %i" % f.getNSamples()[channel])
        channelObj['samples']=int(f.getNSamples()[channel])
        
        # print("physical maximum: %f" % f.getPhysicalMaximum(channel))
        channelObj['physicalMaximum']=int(f.getPhysicalMaximum(channel))
        
        # print("physical minimum: %f" % f.getPhysicalMinimum(channel))
        channelObj['physicalMinimum']=int(f.getPhysicalMinimum(channel))
        
        # print("digital maximum: %i" % f.getDigitalMaximum(channel))
        channelObj['digitalMaximum']=int(f.getDigitalMaximum(channel))
        
        # print("digital minimum: %i" % f.getDigitalMinimum(channel))
        channelObj['digitalMinimum']=int(f.getDigitalMinimum(channel))
        
        # print("physical dimension: %s" % f.getPhysicalDimension(channel))
        channelObj['physicalDimension']='{0!s}'.format(f.getPhysicalDimension(channel))
        
        # print("prefilter: %s" % f.getPrefilter(channel))
        channelObj['prefilter']='{0!s}'.format(f.getPrefilter(channel))
        
        # print("transducer: %s" % f.getTransducer(channel))
        channelObj['transducer']='{0!s}'.format(f.getTransducer(channel))
        
        # print("samplefrequency: %f" % f.getSampleFrequency(channel))
        channelObj['samplefrequency']=int(f.getSampleFrequency(channel))
        
        channelObj['data']=[]
        # para proposito de la demo arranco
        #  en el minuto 9:53:29 para ver variacion
        buf = f.readSignal(channel,232250,2500)
        n = 2500
        # print("\nread %i samples\n" % n)
        for i in np.arange(n):
            d={}
            d['value']=float(buf[i])
            channelObj['data'].append(d)
        # print(result)
        data['channels'].append(channelObj)

    f._close()
    del f
    
    print(json.dumps(data))
    # sys.stdout.flush()