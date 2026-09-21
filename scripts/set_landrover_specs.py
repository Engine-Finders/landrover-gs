import json,glob,os
D=os.path.join(os.path.dirname(__file__),'..','src','data','model')
S={
'Defender TD5':'2.5L I5 Diesel (Td5)','Defender Td4':'2.0L I4 Diesel (M47D20)','Defender 300Tdi':'2.5L I4 Diesel (300Tdi)','Defender 200Tdi':'2.5L I4 Diesel (200Tdi)',
'Defender D200':'2.0L I4 Diesel MHEV (AJ200D)','Defender D250':'3.0L I6 Diesel MHEV (AJ300D)','Defender D300':'3.0L I6 Diesel MHEV (AJ300D)','Defender D350':'3.0L I6 Diesel MHEV (AJ300D)',
'Defender P400':'3.0L I6 Petrol MHEV (AJ300P)','Defender P525 (V8)':'4.4L V8 Petrol (BMW S68)',
'Discovery Tdi':'2.5L I4 Diesel (200Tdi / 300Tdi)','Discovery Td5':'2.5L I5 Diesel (Td5)','Discovery V8 (3.9/4.0)':'3.9L / 4.0L V8 Petrol (AJ41)','Discovery TDV6':'2.7L / 3.0L V6 Diesel (TDV6)',
'Discovery TDV8':'4.4L V8 Diesel (TDV8)','Discovery SDV6':'3.0L V6 Diesel (SDV6)','Discovery SDV8':'4.4L V8 Diesel (SDV8)','Discovery HSE':'V6 / V8 (varies by spec)','Discovery Si6':'3.0L V6 Petrol (AJ-V6)','Discovery D250':'3.0L I6 Diesel MHEV (AJ300D)',
'Discovery Sport eD4':'2.2L I4 Diesel (Ford Duratorq)','Discovery Sport TD4':'2.0L I4 Diesel (Ingenium AJ200D)','Discovery Sport Si4':'2.0L I4 Petrol (Ford EcoBoost)','Discovery Sport P200':'2.0L I4 Petrol (Ingenium AJ200P)',
'Discovery Sport P250':'2.0L I4 Petrol (Ingenium AJ200P)','Discovery Sport P300':'2.0L I4 Petrol (Ingenium AJ200P)','Discovery Sport P300e':'1.5L I3 Petrol PHEV (Ingenium)','Discovery Sport D150':'2.0L I4 Diesel (AJ150D)',
'Discovery Sport D165':'2.0L I4 Diesel (AJ200D)','Discovery Sport D180':'2.0L I4 Diesel (AJ200D)',
'Freelander 1.8i':'1.8L I4 Petrol (Rover K-Series)','Freelander 2.0 Di / Td4 (L314)':'2.0L I4 Diesel (L-Series / M47D20)','Freelander 2.5 V6':'2.5L V6 Petrol (KV6)','Freelander TD4 (L359)':'2.2L I4 Diesel (Ford Duratorq)',
'Freelander eD4':'2.2L I4 Diesel (Ford Duratorq)','Freelander Si4':'2.0L I4 Turbo Petrol (Ford EcoBoost)','Freelander SD4':'2.2L I4 Diesel (Ford Duratorq)',
'Range Rover Evoque eD4':'2.2L I4 Diesel (Ford Duratorq)','Range Rover Evoque TD4':'2.2L I4 Diesel (Ford Duratorq)','Range Rover Evoque Si4':'2.0L I4 Turbo Petrol (Ford EcoBoost)','Range Rover Evoque P200':'2.0L I4 Petrol (Ingenium AJ200P)',
'Range Rover Evoque P250':'2.0L I4 Petrol (Ingenium AJ200P)','Range Rover Evoque P300':'2.0L I4 Petrol (Ingenium AJ200P)','Range Rover Evoque P300e':'1.5L I3 Petrol PHEV (Ingenium)','Range Rover Evoque D150':'2.0L I4 Diesel (AJ150D)',
'Range Rover Evoque D165':'2.0L I4 Diesel (AJ200D)','Range Rover Evoque D180':'2.0L I4 Diesel (AJ200D)',
'Range Rover Sport TDV6':'3.0L V6 Diesel (TDV6)','Range Rover Sport TDV8':'4.4L V8 Diesel (TDV8)','Range Rover Sport SDV6':'3.0L V6 Diesel (SDV6)','Range Rover Sport SDV8':'4.4L V8 Diesel (SDV8)',
'Range Rover Sport HSE':'V6 / V8 (varies by spec)','Range Rover Sport Autobiography Dynamic':'5.0L V8 Petrol Supercharged (AJ-V8)','Range Rover Sport SVR':'5.0L V8 Petrol Supercharged (AJ-V8)',
'Range Rover Sport P400':'3.0L I6 Petrol MHEV (AJ300P)','Range Rover Sport P460e':'3.0L I6 Petrol PHEV (AJ300P)','Range Rover Sport P525':'4.4L V8 Petrol (BMW N63)',
'Range Rover Velar D180':'2.0L I4 Diesel (AJ200D)','Range Rover Velar D200':'2.0L I4 Diesel (AJ200D)','Range Rover Velar D240':'2.0L I4 Diesel (AJ200D)','Range Rover Velar D250':'3.0L I6 Diesel MHEV (AJ300D)',
'Range Rover Velar D300':'3.0L I6 Diesel MHEV (AJ300D)','Range Rover Velar P250':'2.0L I4 Petrol (AJ200P)','Range Rover Velar P300':'2.0L I4 Petrol (AJ200P)','Range Rover Velar P340':'3.0L V6 Petrol Supercharged (AJ126)',
'Range Rover Velar P400':'3.0L I6 Petrol MHEV (AJ300P)','Range Rover Velar P400e':'2.0L I4 Petrol PHEV (AJ200P)'}
for f in glob.glob(D+'/landrover*Sec10.json'):
    d=json.load(open(f,encoding='utf8'))
    for c in d['cards']:
        c['spec']=S.get(c['model'],c['spec'])
    json.dump(d,open(f,'w',encoding='utf8'),ensure_ascii=False,indent=2)
