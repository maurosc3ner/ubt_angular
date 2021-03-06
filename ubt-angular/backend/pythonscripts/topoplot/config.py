import numpy as np

# from mattoarray import mat2array
# elecc = mat2array('coord2D.mat')
# elec = elecc[:,[2,3]]
# elec = elecc[:,[0,1]]

elec = np.array([[-0.09811352,  0.28066077],
        [-0.07492733,  0.28247571],
        [ 0.10029354,  0.27784174],
        [ 0.07721234,  0.28030725],
        [-0.12313034,  0.27790241],
        [ 0.12517952,  0.2743829 ],
        [-0.19274471,  0.2709963 ],
        [ 0.19474527,  0.26538839],
        [-0.02827394,  0.25493062],
        [ 0.02910476,  0.2542053 ],
        [-0.14045136,  0.24465288],
        [ 0.1407023,   0.24121147],
        [-0.19466302,  0.2359646 ],
        [ 0.19452816,  0.23124185],
        [-0.03909004,  0.3111175 ],
        [ 0.04331399,  0.30976037],
        [ 0.,          0.28440601],
        [-0.06557942,  0.10343982],
        [ 0.06203594,  0.10287591],
        [-0.13049644,  0.09062509],
        [ 0.12661965,  0.08960492],
        [-0.1920162,   0.06923802],
        [ 0.18757891,  0.06806021],
        [-0.06310578,  0.07441413],
        [-0.03306931,  0.07693373],
        [ 0.05917754,  0.07403599],
        [ 0.0292015 ,  0.07673612],
        [-0.12430365,  0.06075887],
        [-0.09384034,  0.06879385],
        [ 0.1201446,   0.06009953],
        [ 0.08981714,  0.06825176],
        [-0.18260744,  0.03831699],
        [-0.15449691,  0.05072395],
        [ 0.17803387,  0.03769148],
        [ 0.15013432,  0.05003433],
        [-0.05981387,  0.04399191],
        [ 0.05564531,  0.04377057],
        [-0.11754519,  0.03154184],
        [ 0.11326483,  0.03116805],
        [-0.17098261,  0.        ],
        [ 0.16643053,  0.        ],
        [-0.02950488,  0.01643536],
        [ 0.02524223,  0.01639111],
        [-0.08095284,  0.        ],
        [ 0.0767001,   0.        ],
        [-0.13319562,  0.        ],
        [ 0.12886003,  0.        ],
        [ 0.,          0.0492328 ],
        [ 0.,          0.10964122],
        [-0.03561085, -0.2468591 ],
        [ 0.17477793, -0.22010897],
        [-0.21284371, -0.20796176],
        [ 0.21165909, -0.20354066],
        [-0.24790569, -0.18922614],
        [ 0.24591905, -0.18419247],
        [-0.33792332, -0.10303313],
        [ 0.03626259, -0.24601934],
        [ 0.33316181, -0.09894859],
        [-0.36492038, -0.058288  ],
        [ 0.35942403, -0.05609238],
        [-0.38393366, -0.01145505],
        [ 0.37806522, -0.01130974],
        [-0.39664473,  0.04499116],
        [ 0.3909279 ,  0.04255091],
        [-0.39949749,  0.10589511],
        [ 0.39495483,  0.10018525],
        [-0.38899645,  0.17255587],
        [-0.06982588, -0.24701937],
        [ 0.38695675,  0.16320153],
        [-0.35807903,  0.25006956],
        [ 0.36066205,  0.23699119],
        [-0.29728315,  0.33054182],
        [ 0.30752633,  0.31500959],
        [ 0.0704021 , -0.24531581],
        [-0.10463178, -0.24348843],
        [ 0.10501457, -0.24102536],
        [-0.13979727, -0.23468091],
        [ 0.13979318, -0.23163157],
        [-0.17525136, -0.22376429],
        [-0.03304863, -0.28954005],
        [ 0.17617095, -0.26842961],
        [-0.20945318, -0.26096979],
        [ 0.21081948, -0.25545282],
        [-0.24253916, -0.2471024 ],
        [ 0.24324442, -0.24085417],
        [-0.27986894, -0.22436956],
        [ 0.27952496, -0.21757121],
        [-0.33997587, -0.18304678],
        [ 0.0358607 , -0.28864258],
        [ 0.33784421, -0.17607662],
        [-0.3743021 , -0.14021074],
        [ 0.37061921, -0.13426522],
        [-0.39943553, -0.10365429],
        [ 0.39472047, -0.0989442 ],
        [-0.42389573, -0.05652677],
        [ 0.41827563, -0.05387636],
        [-0.44154593,  0.        ],
        [ 0.43554664,  0.        ],
        [-0.4505129 ,  0.07127772],
        [-0.0672862 , -0.28924002],
        [ 0.445342  ,  0.06562052],
        [-0.43932917,  0.16186563],
        [ 0.43789692,  0.14878714],
        [-0.40197322,  0.25849366],
        [ 0.40894456,  0.23719916],
        [ 0.0700805 , -0.28749849],
        [-0.10205605, -0.2870544 ],
        [ 0.10473827, -0.2844659 ],
        [-0.1366211 , -0.28130405],
        [ 0.13901386, -0.27781975],
        [-0.17421654, -0.27299132],
        [ 0.        , -0.28661166],
        [ 0.        , -0.244757  ],
        [-0.06170717,  0.22346448],
        [ 0.06112274,  0.22211954],
        [-0.12349986,  0.21654711],
        [ 0.12256222,  0.21397324],
        [-0.18401339,  0.20594218],
        [ 0.18256662,  0.20219873],
        [-0.24551171,  0.19280594],
        [ 0.24359186,  0.18790539],
        [-0.06610014,  0.16458833],
        [ 0.063723  ,  0.16362619],
        [-0.13034129,  0.15404848],
        [ 0.12746851,  0.15222536],
        [-0.19799035,  0.13630113],
        [ 0.19442276,  0.13380224],
        [-0.03294427,  0.13727523],
        [ 0.03004175,  0.1369249 ],
        [-0.09914838,  0.12791921],
        [ 0.0959085 ,  0.12681793],
        [-0.16385868,  0.11251422],
        [ 0.16007867,  0.11088141],
        [ 0.        ,  0.16648029],
        [-0.06439676,  0.19383436],
        [-0.03201795,  0.19643164],
        [ 0.06278663,  0.19265715],
        [ 0.03055496,  0.19584968],
        [-0.12981521,  0.18571702],
        [-0.09589017,  0.19043526],
        [ 0.12777964,  0.18346096],
        [ 0.09407714,  0.18871778],
        [-0.19352376,  0.16957326],
        [-0.16164585,  0.17839143],
        [ 0.19084223,  0.16643926],
        [ 0.15931652,  0.17566935],
        [ 0.2975175 ,  0.13033793],
        [-0.22455678,  0.16252295],
        [ 0.22168176,  0.15893612],
        [-0.30139184,  0.13472731],
        [ 0.3405198 ,  0.05066763],
        [-0.26421189,  0.10959143],
        [ 0.25999264,  0.10666697],
        [-0.34595232,  0.05292995],
        [-0.22902573,  0.08594446],
        [ 0.2245159 ,  0.08412005],
        [-0.10795363,  0.32613485],
        [ 0.11361058,  0.32212247],
        [ 0.        ,  0.34362824],
        [ 0.        ,  0.22575268],
        [-0.06844208, -0.20623435],
        [ 0.06748014, -0.20507902],
        [-0.31533969, -0.04304457],
        [ 0.03331263, -0.5       ],
        [ 0.        , -0.34900926],
        [ 0.22180673, -0.34494993],
        [-0.21292917, -0.35392351],
        [ 0.        ,  0.41061147],
        [-0.06054304, -0.13458853],
        [ 0.05763144, -0.13408157],
        [-0.06454142, -0.16862484],
        [-0.03260598, -0.17176066],
        [ 0.06242175, -0.16787672],
        [ 0.03057801, -0.17140065],
        [ 0.        , -0.13303582],
        [-0.05026934, -0.01321871],
        [ 0.20158859, -0.15890009],
        [ 0.04601944, -0.0132331 ],
        [-0.09515928, -0.02564257],
        [ 0.09097198, -0.02566342],
        [-0.13856429, -0.04754655],
        [ 0.13445146, -0.04728134],
        [-0.1754566 , -0.08280024],
        [ 0.17157148, -0.08184691],
        [-0.20424275, -0.16206639],
        [-0.03532813, -0.0750551 ],
        [ 0.13381881, -0.18995502],
        [ 0.03151566, -0.07494493],
        [-0.06778394, -0.08306475],
        [-0.05095441, -0.07715985],
        [ 0.06406605, -0.08284468],
        [ 0.04716707, -0.07700989],
        [-0.08030839, -0.08820383],
        [ 0.07665538, -0.08789306],
        [-0.12007864, -0.11634055],
        [ 0.11681315, -0.11544217],
        [-0.13537027, -0.19237128],
        [-0.02535854, -0.10443314],
        [ 0.09484492, -0.16155154],
        [ 0.02193368, -0.10433073],
        [-0.0490529 , -0.10853214],
        [ 0.04568796, -0.1082923 ],
        [-0.07153681, -0.11751028],
        [ 0.06831245, -0.1170437 ],
        [-0.09713377, -0.1626878 ],
        [ 0.        , -0.07291715],
        [-0.04087412, -0.04466012],
        [ 0.15921063, -0.1358613 ],
        [-0.02079881, -0.04077259],
        [ 0.03677713, -0.04456605],
        [ 0.01668186, -0.04071298],
        [-0.06115951, -0.04775439],
        [ 0.05708959, -0.04765734],
        [-0.11790583, -0.07232254],
        [ 0.11404756, -0.07192304],
        [-0.15082285, -0.10179009],
        [-0.13448266, -0.08601652],
        [ 0.14726857, -0.10079643],
        [ 0.13074886, -0.08535595],
        [-0.16219449, -0.13751688],
        [ 0.        ,  0.        ],
        [ 0.30987104, -0.04162081],
        [-0.25545472,  0.03155011],
        [ 0.25020176,  0.03090146],
        [-0.22357264, -0.03512407],
        [ 0.21878525, -0.03443671],
        [-0.17890239, -0.03632144],
        [ 0.17454688, -0.03597478],
        [-0.2114345 ,  0.01929626],
        [ 0.20662206,  0.01891814],
        [ 0.        , -0.20591993]])
labels = ['AF3',
        'AF3h',
        'AF4',
        'AF4h',
        'AF5h',
        'AF6h',
        'AF7',
        'AF8',
        'AFF1h',
        'AFF2h',
        'AFF5h',
        'AFF6h',
        'AFF7h',
        'AFF8h',
        'AFp1',
        'AFp2',
        'AFz',
        'C1',
        'C2',
        'C3',
        'C4',
        'C5',
        'C6',
        'CCP1',
        'CCP1h',
        'CCP2',
        'CCP2h',
        'CCP3',
        'CCP3h',
        'CCP4',
        'CCP4h',
        'CCP5',
        'CCP5h',
        'CCP6',
        'CCP6h',
        'CP1',
        'CP2',
        'CP3',
        'CP4',
        'CP5',
        'CP6',
        'CPP1h',
        'CPP2h',
        'CPP3h',
        'CPP4h',
        'CPP5h',
        'CPP6h',
        'CPz',
        'Cz',
        'Ex1',
        'Ex10',
        'Ex11',
        'Ex12',
        'Ex13',
        'Ex14',
        'Ex19',
        'Ex2',
        'Ex20',
        'Ex21',
        'Ex22',
        'Ex23',
        'Ex24',
        'Ex25',
        'Ex26',
        'Ex27',
        'Ex28',
        'Ex29',
        'Ex3',
        'Ex30',
        'Ex31',
        'Ex32',
        'Ex33',
        'Ex34',
        'Ex4',
        'Ex5',
        'Ex6',
        'Ex7',
        'Ex8',
        'Ex9',
        'Exx1',
        'Exx10',
        'Exx11',
        'Exx12',
        'Exx13',
        'Exx14',
        'Exx15',
        'Exx16',
        'Exx19',
        'Exx2',
        'Exx20',
        'Exx21',
        'Exx22',
        'Exx23',
        'Exx24',
        'Exx25',
        'Exx26',
        'Exx27',
        'Exx28',
        'Exx29',
        'Exx3',
        'Exx30',
        'Exx31',
        'Exx32',
        'Exx33',
        'Exx34',
        'Exx4',
        'Exx5',
        'Exx6',
        'Exx7',
        'Exx8',
        'Exx9',
        'Exxz',
        'Exz',
        'F1',
        'F2',
        'F3',
        'F4',
        'F5',
        'F6',
        'F7',
        'F8',
        'FC1',
        'FC2',
        'FC3',
        'FC4',
        'FC5',
        'FC6',
        'FCC1h',
        'FCC2h',
        'FCC3h',
        'FCC4h',
        'FCC5h',
        'FCC6h',
        'FCz',
        'FFC1',
        'FFC1h',
        'FFC2',
        'FFC2h',
        'FFC3',
        'FFC3h',
        'FFC4',
        'FFC4h',
        'FFC5',
        'FFC5h',
        'FFC6',
        'FFC6h',
        'FFT10h',
        'FFT7h',
        'FFT8h',
        'FFT9h',
        'FT10',
        'FT7',
        'FT8',
        'FT9',
        'FTT7h',
        'FTT8h',
        'Fp1',
        'Fp2',
        'Fpz',
        'Fz',
        'I1',
        'I2',
        'LPA',
        'Nk1',
        'Nk2',
        'Nk3',
        'Nk4',
        'Nz',
        'O1',
        'O2',
        'OI1',
        'OI1h',
        'OI2',
        'OI2h',
        'Oz',
        'P1',
        'P10',
        'P2',
        'P3',
        'P4',
        'P5',
        'P6',
        'P7',
        'P8',
        'P9',
        'PO1',
        'PO10',
        'PO2',
        'PO3',
        'PO3h',
        'PO4',
        'PO4h',
        'PO5h',
        'PO6h',
        'PO7',
        'PO8',
        'PO9',
        'POO1',
        'POO10h',
        'POO2',
        'POO3',
        'POO4',
        'POO5',
        'POO6',
        'POO9h',
        'POz',
        'PPO1',
        'PPO10h',
        'PPO1h',
        'PPO2',
        'PPO2h',
        'PPO3h',
        'PPO4h',
        'PPO5',
        'PPO6',
        'PPO7',
        'PPO7h',
        'PPO8',
        'PPO8h',
        'PPO9h',
        'Pz',
        'RPA',
        'T7',
        'T8',
        'TP7',
        'TP8',
        'TPP7h',
        'TPP8h',
        'TTP7h',
        'TTP8h',
        'Iz']
