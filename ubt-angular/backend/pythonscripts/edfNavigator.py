#!/usr/bin/env python
from __future__ import division, print_function, absolute_import
import os
import numpy as np
import pyedflib
import sys
import json
from pathlib import Path

if __name__ == '__main__':
    fileName = 'sujeto_base'
    data = {}
    data['patientInfo']={}
    data['annotations']={}
    data['debug']={}


    path = './'
    my_file = Path(sys.argv[1])
    if my_file.is_file():
    # file exists
        f = pyedflib.EdfReader(sys.argv[1])
    else:
        print ("Either the file is missing or not readable")
    currentIndex = int(sys.argv[2])
    visWindow = int(sys.argv[3])
    
    data['patientInfo']['fileDuration']= f.file_duration
   
    data['channels']=[]
   # print (range(int(f.signals_in_file)))
    for channel in range(int(f.signals_in_file)):
        
        channelObj={}
        channelObj['id']=channel

        channelObj['label']='{0!s}'.format(f.getLabel(channel))
        
        channelObj['samples']=int(f.getNSamples()[channel])
        
        channelObj['physicalMaximum']=int(f.getPhysicalMaximum(channel))
        
        channelObj['physicalMinimum']=int(f.getPhysicalMinimum(channel))
        
        channelObj['digitalMaximum']=int(f.getDigitalMaximum(channel))
        
        channelObj['digitalMinimum']=int(f.getDigitalMinimum(channel))
        
        channelObj['physicalDimension']='{0!s}'.format(f.getPhysicalDimension(channel))
        
        channelObj['prefilter']='{0!s}'.format(f.getPrefilter(channel))
        
        channelObj['transducer']='{0!s}'.format(f.getTransducer(channel))
        
        channelObj['samplefrequency']=int(f.getSampleFrequency(channel))
        
        channelObj['data']=[]

        nSamples = channelObj['samplefrequency']*visWindow
        
        if (currentIndex+nSamples > channelObj['samples'] ):
            nSamples=channelObj['samples']-currentIndex
       # print( nSamples )
        buf = f.readSignal(channel,currentIndex,nSamples)
        for i in np.arange(nSamples):
            d={}
            d['value']=float(buf[i])
            channelObj['data'].append(d)

        data['channels'].append(channelObj)

    f._close()
    del f
    
    #print (data)

    # use print with pythonshell
    print(json.dumps(data))
    #use stdout with spawn
    # sys.stdout.flush()