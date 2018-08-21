
from topoplot import edf_topoplot
import sys
import json
from pprint import pprint
import numpy as np
import pandas as pd
import datetime
#PARSE
#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

ob = edf_topoplot()

# signal,nch,labels = ob.read_edf(archi)
stdin=read_in()

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
    # print(len(inSignals))
    # print(len(inSignals[0]['data']))

# # calculo de la potencia de la senal
power = ob.power(in_signal)
# print (roiSignal.shape)

# prepara las etiquetas y coordenadas del modelo de referencia del archivo config
elec,labels_ref,center,radius = ob.prepare('config')
ts = int(datetime.datetime.now().timestamp())
# # calculo de las posiciones de los electrodos de la medida
pos,power,labels= ob.positions(nch,labels,elec,labels_ref,power)
fig = ob.plot_topomap('{0!s}'.format(ts),str(nSamples),power,pos)