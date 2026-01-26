// Equipment catalogue data
// Images will be loaded from ./images/ folder
const EQUIPMENT_DATA = [
    // PA Speakers
    { id: 'PA-01', name: 'Meyer Sound UPA-1P', amount: 4, description: 'Wide Coverage Loudspeaker / 60 Hz - 18 kHz / Max Peak SPL 133 dB', price: 50, category: 'PA Speakers' },
    { id: 'PA-02', name: 'Meyer Sound USW-1P', amount: 2, description: 'Subwoofer / 32 Hz - 200 Hz / Max Peak SPL 135 dB', price: 50, category: 'PA Speakers' },
    { id: 'PA-03', name: 'Meyer Sound 700-HP', amount: 2, description: 'UltraHigh-Power Subwoofer / 28 – 150 Hz / Max Peak SPL 139 dB', price: 80, category: 'PA Speakers' },
    { id: 'PA-04', name: 'Meyer Sound UPM-2P', amount: 4, description: 'Compact Narrow Loudspeaker / 80 Hz – 20 kHz / Max Peak SPL 123 dB', price: 40, category: 'PA Speakers' },
    { id: 'PA-05', name: 'QSC CP8', amount: 4, description: '2-Way Full-Range Active Speaker / 8" & 1.4" / 1000 W peak / 124 dB', price: 20, category: 'PA Speakers' },
    { id: 'PA-06', name: 'QSC K8.2', amount: 1, description: 'Full Range Active Loudspeaker / 8" & 1.4" / 2000 W peak / 128 dB', price: 20, category: 'PA Speakers' },
    { id: 'PA-07', name: 'Yamaha Stagepas 300', amount: 1, description: 'Portable Powered PA System / Stage Monitors / 2x150 W', price: 20, category: 'PA Speakers' },
    
    // Studio Speakers
    { id: 'SP-01', name: 'Genelec 7350 APM', amount: 1, description: 'Subwoofer / 8" / Peak 104 dB SPL / Power: 150 W / 22 - 120 Hz', price: 40, category: 'Studio Speakers' },
    { id: 'SP-02', name: 'Genelec 8330 APM Pack', amount: 1, description: '2-Way Active Studio Monitors / 45 Hz - 23 kHz / Peak 110 dB', price: 60, category: 'Studio Speakers' },
    { id: 'SP-03', name: 'Fostex 6301B', amount: 10, description: 'Small active speaker / 84 dB / 10W', price: 5, category: 'Studio Speakers' },
    
    // Mixers
    { id: 'MX-01', name: 'Allen Heath SQ 5', amount: 1, description: 'Digital Mixer / 48-Channel Digital Mixer', price: 70, category: 'Mixers' },
    { id: 'MX-02', name: 'Allen Heath QU 16', amount: 1, description: 'Digital Mixer / 16 Mono inputs via XLR or jack / 12 Mix outputs', price: 50, category: 'Mixers' },
    { id: 'MX-03', name: 'Allen & Heath AR2412 AudioRack', amount: 1, description: 'Digital Stagebox / 24 XLR mic / 12 XLR line outputs (L/R) / Cat 5', price: 40, category: 'Mixers' },
    { id: 'MX-04', name: 'Allen & Heath AB168', amount: 1, description: 'Digital Stagebox / 16 XLR mic / 8 XLR line outputs / Cat 5', price: 35, category: 'Mixers' },
    { id: 'MX-05', name: 'Yamaha MG12/4', amount: 1, description: '12-Input 4-Bus Mixer', price: 8, category: 'Mixers' },
    
    // Speaker Stands
    { id: 'ST-SP-01', name: 'K&M 213', amount: 2, description: 'Speaker Stand with Crank Housing', price: 6, category: 'Speaker Stands' },
    { id: 'ST-SP-02', name: 'K&M 21459 + carry bag', amount: 4, description: '2 x Speaker stands K&M 21450', price: 4, category: 'Speaker Stands' },
    { id: 'ST-SP-03', name: 'Fantek T-102D Stand / Lift', amount: 2, description: 'Wind-up lift / Max. Height: 4.88m, min. H: 2.01m, Max. Load: 100kg', price: 15, category: 'Speaker Stands' },
    
    // Microphones Dynamic
    { id: 'MI-D-01', name: 'Shure Beta 58 A', amount: 1, description: 'Dynamic Vocal Microphone', price: 6, category: 'Microphones' },
    { id: 'MI-D-02', name: 'Shure SM58 LC', amount: 4, description: 'Dynamic Vocal Microphone with Cardioid Directivity', price: 5, category: 'Microphones' },
    { id: 'MI-D-03', name: 'Shure SM57 LC', amount: 4, description: 'Dynamic Instrument Microphone', price: 5, category: 'Microphones' },
    { id: 'MI-D-04', name: 'Shure PG58', amount: 2, description: 'Dynamic Vocal Microphone', price: 2, category: 'Microphones' },
    { id: 'MI-D-05', name: 'Shure C606', amount: 1, description: 'Dynamic Vocal Microphone', price: 2, category: 'Microphones' },
    { id: 'MI-D-06', name: 'AKG D880', amount: 1, description: 'Dynamic Vocal / Instrument Microphone', price: 2, category: 'Microphones' },
    { id: 'MI-D-07', name: 'Shure Beta 52A', amount: 1, description: 'Dynamic Microphone specially optimized for bass drum', price: 7, category: 'Microphones' },
    { id: 'MI-D-08', name: 'Sennheiser E604', amount: 3, description: 'Dynamic Instrument Microphone (Cardioid)', price: 5, category: 'Microphones' },
    { id: 'MI-D-09', name: 'Sennheiser MD 421 Kompakt', amount: 1, description: 'Dynamic Versatile Microphone (Cardioid)', price: 9, category: 'Microphones' },
    { id: 'MI-D-10', name: 'Sennheiser EW-D ME2/835-S R1-6', amount: 1, description: 'Digital Wireless System', price: 25, category: 'Microphones' },
    
    // Microphones Condenser
    { id: 'MI-C-01', name: 'Beyerdynamic MC 930 Stereo-Set', amount: 1, description: '2 x condenser microphones / Cardioid / 40 - 20,000 Hz', price: 30, category: 'Microphones' },
    { id: 'MI-C-02', name: 'Soundman OKM II Classic/Studio Solo', amount: 1, description: '2 x Electret Microphones / Omnidirectional / 3.5 mm Stereo jack', price: 5, category: 'Microphones' },
    { id: 'MI-C-03', name: 'mikroUši Pro (stereo)', amount: 1, description: 'Stereo high quality omni-directional electret microphones / XLR', price: 5, category: 'Microphones' },
    { id: 'MI-C-04', name: 'Sennheiser MKH 416 P48', amount: 1, description: 'Short gun interference tube microphone / Super-cardioid/lobar', price: 20, category: 'Microphones' },
    { id: 'MI-C-05', name: 'Shure Beta 91A', amount: 1, description: 'Condenser boundary microphone', price: 8, category: 'Microphones' },
    { id: 'MI-C-06', name: 'Beyerdynamic MM 1', amount: 1, description: 'Condenser measurement microphone (omnidirectional)', price: 7, category: 'Microphones' },
    
    // Microphone Stands
    { id: 'ST-MI-01', name: 'Millenium MS 2004', amount: 10, description: 'Microphone Stand / Height adjustable from 88 - 153 cm', price: 1, category: 'Microphone Stands' },
    { id: 'ST-MI-02', name: 'K&M 210/2 Black', amount: 6, description: 'Microphone Stand with adjustable boom arm / height: 900 - 1600 mm', price: 2, category: 'Microphone Stands' },
    { id: 'ST-MI-03', name: 'K&M 25950', amount: 3, description: 'Low microphone stand for bass drums or special use', price: 2, category: 'Microphone Stands' },
    { id: 'ST-MI-04', name: 'K&M 259', amount: 3, description: 'Microphone stand for drums or special use. Height 425 - 645 mm', price: 2, category: 'Microphone Stands' },
    { id: 'ST-MI-05', name: 'K&M 21021', amount: 2, description: 'Overhead-Stand / Extra high stand / Adjustable Height: 112 - 201 cm', price: 2, category: 'Microphone Stands' },
    { id: 'ST-MI-06', name: 'K&M 210/2 Chrome', amount: 3, description: 'Microphone Stand Height 1050 - 1600 mm', price: 1, category: 'Microphone Stands' },
    { id: 'ST-MI-07', name: 'Manfrotto MS0490C Carbon Nanopole Stand', amount: 1, description: 'Lightweight stand / can be used as a boom', price: 4, category: 'Microphone Stands' },
    
    // Audio Recorders & Interfaces
    { id: 'RE-01', name: 'Sound Devices MixPre-3 II', amount: 1, description: 'Audio recorder with USB audio interface / stereo mix + 3 single inputs', price: 25, category: 'Recorders & Interfaces' },
    { id: 'RE-02', name: 'Zoom H2n', amount: 1, description: 'Portable WAV/MP3 Recorder', price: 5, category: 'Recorders & Interfaces' },
    { id: 'RE-03', name: 'Motu UltraLite MK3', amount: 1, description: 'USB audio interface / 10 inputs & 14 outputs', price: 15, category: 'Recorders & Interfaces' },
    
    // DI Boxes
    { id: 'DI-01', name: 'BSS Audio AR133', amount: 2, description: 'Active DI Box (Battery/ Phantom Powered)', price: 6, category: 'DI Boxes' },
    { id: 'DI-02', name: 'Millenium DI-33', amount: 3, description: 'Active DI Box (Battery/Phantom)', price: 2, category: 'DI Boxes' },
    { id: 'DI-03', name: 'Palmer PAN 04', amount: 1, description: 'Passive Stereo DI-Box', price: 5, category: 'DI Boxes' },
    { id: 'DI-04', name: 'Radial Engineering Pro 48', amount: 1, description: 'Active DI Box', price: 5, category: 'DI Boxes' },
    
    // Cables (showing a subset)
    { 
        id: 'CA-01', 
        name: 'XLR + XLR', 
        amount: 15,
        price: 0.30,
        description: 'Microphone Cable / 3-pin', 
        category: 'Cables',
        variants: [
            { length: '3m', amount: 15, price: 0.30 },
            { length: '6m', amount: 10, price: 0.40 },
            { length: '10m', amount: 8, price: 0.50 },
            { length: '20m', amount: 5, price: 0.80 }
        ]
    },
    { id: 'CA-05', name: 'XLR (male) + 6.3mm stereo jack', amount: 13, description: 'Balanced male jack to male XLR / 6m', price: 0.50, category: 'Cables' },
    { id: 'CA-06', name: 'XLR (female) + 6.3mm stereo jack', amount: 16, description: 'Balanced male jack to female XLR / 3m', price: 0.40, category: 'Cables' },
    { id: 'CA-07', name: 'XLR (male) + 6.3mm stereo jack / 0.9m', amount: 11, description: 'XLR male to 6.3mm stereo jack / 0.9m', price: 0.20, category: 'Cables' },
    { id: 'CA-08', name: 'XLR (female) + 6.3mm stereo jack / 0.9m', amount: 9, description: 'XLR female to 6.3mm stereo jack / 0.9m', price: 0.20, category: 'Cables' },
    { 
        id: 'CA-09', 
        name: '6.3 mm jack + 6.3 mm jack', 
        amount: 3,
        price: 0.20,
        description: 'Both sides: 6.3 mm mono jack', 
        category: 'Cables',
        variants: [
            { length: '3m', amount: 3, price: 0.20 },
            { length: '6m', amount: 5, price: 0.30 }
        ]
    },
    { id: 'CA-11', name: 'Stereo jack 6.3 mm + Stereo jack socket 6.3 mm', amount: 2, description: 'Extension cable for headphones', price: 0.30, category: 'Cables' },
    { id: 'CA-12', name: '3.5 mm Stereo jack + 2x 6.3 mm mono jacks', amount: 2, description: '3.5mm stereo to dual 6.3mm mono', price: 0.30, category: 'Cables' },
    { id: 'CA-13', name: '3.5 mm Stereo jack + 2x XLR (male)', amount: 2, description: '3.5mm stereo to 2x XLR male', price: 0.50, category: 'Cables' },
    { id: 'CA-14', name: '8 x XLR (male) + Stereo Jack Multicore', amount: 1, description: 'Multicore snake cable', price: 3.00, category: 'Cables' },
    { id: 'CA-15', name: '3.5 mm Stereo jack + 2x RCA (male)', amount: 2, description: '3.5mm stereo to 2x RCA male / 3m', price: 0.30, category: 'Cables' },
    { id: 'CA-16', name: '3.5 mm Stereo jack + 2x XLR', amount: 2, description: '3.5mm stereo to 2x XLR', price: 0.50, category: 'Cables' },
    { id: 'CA-17', name: 'XLR F + XLR F - 0.3m', amount: 6, description: 'XLR Female to Female patch cable / 0.3m', price: 0.20, category: 'Cables' },
    { id: 'CA-18', name: 'XLR M + XLR M - 0.3m', amount: 6, description: 'XLR Male to Male patch cable / 0.3m', price: 0.20, category: 'Cables' },
    { id: 'CA-19', name: 'Y adapter MFF - 0.3m', amount: 6, description: 'XLR male to 2x XLR female / Y-splitter / 0.3m', price: 0.40, category: 'Cables' },
    { id: 'CA-20', name: 'Y adapter FMM - 0.3m', amount: 8, description: 'XLR female to 2x XLR male / Y-splitter / 0.3m', price: 0.40, category: 'Cables' },
    { id: 'CA-21', name: 'XLR Patch - 0.5m', amount: 4, description: 'XLR patch cable / 0.5m', price: 0.20, category: 'Cables' },
    { id: 'CA-22', name: 'Multicore Cable - 15m', amount: 1, description: 'Stage box multicore / 15m', price: 3.00, category: 'Cables' },
    { id: 'CA-23', name: 'CAT6E - 75m', amount: 1, description: 'Network cable on reel / 75m', price: 5.00, category: 'Cables' },
    
    // Power Distribution
    { id: 'PD-01', name: 'Stairville Power Split 3-Way', amount: 10, description: 'Stairville Power Split 3-Way', price: 0.20, category: 'Power Distribution' },
    { id: 'PD-02', name: 'Stairville 4-Way Power Strip', amount: 7, description: 'Stairville 4-Way Power Strip', price: 0.30, category: 'Power Distribution' },
    { id: 'PD-03', name: 'Stairville 6-Way Power Split', amount: 8, description: 'Stairville 6-Way Power Split', price: 0.40, category: 'Power Distribution' },
    { id: 'PD-04', name: 'Varytec Power Twist Power Cable 5m', amount: 10, description: 'Varytec Power Twist Power Cable 5m', price: 1.00, category: 'Power Distribution' },
    { 
        id: 'PD-05', 
        name: 'EU Power Cable', 
        amount: 14,
        price: 0.10,
        description: 'EU Power cable', 
        category: 'Power Distribution',
        variants: [
            { length: '1.5m', amount: 14, price: 0.10 },
            { length: '3m', amount: 10, price: 0.15 },
            { length: '5m', amount: 8, price: 0.20 }
        ]
    },
    { 
        id: 'PD-08', 
        name: 'Extension Cable', 
        amount: 12,
        price: 0.30,
        description: 'Extension cable', 
        category: 'Power Distribution',
        variants: [
            { length: '5m', amount: 12, price: 0.30 },
            { length: '10m', amount: 8, price: 0.50 },
            { length: '20m', amount: 5, price: 0.80 }
        ]
    },
    { id: 'PD-11', name: 'Millenium Cable Drum', amount: 1, description: 'Millenium Cable Drum IP44 25m', price: 3.00, category: 'Power Distribution' },
    
    // Accessories - PA Section
    { id: 'AC-PA-01', name: 'Meyer Sound UPA Mounting Yoke', amount: 4, description: 'Meyer Sound UPA Mounting Yoke', price: 4, category: 'Accessories' },
    { id: 'AC-PA-02', name: 'Meyer Sound UPA Clamp', amount: 3, description: 'Meyer Sound UPA Clamp', price: 3, category: 'Accessories' },
    { id: 'AC-PA-03', name: 'Meyer Sound UPM Mounting Yoke', amount: 2, description: 'Meyer Sound UPM Mounting Yoke', price: 3, category: 'Accessories' },
    { id: 'AC-PA-04', name: 'K&M 195/8 Black', amount: 2, description: 'K&M 195/8 Black', price: 2, category: 'Accessories' },
    { id: 'AC-PA-05', name: 'K&M 66360', amount: 2, description: 'K&M 66360', price: 2, category: 'Accessories' },
    { id: 'AC-PA-06', name: 'Gravity SF 36 M10 F Reduce Flange', amount: 6, description: 'Gravity SF 36 M10 F Reduce Flange', price: 1, category: 'Accessories' },
    { id: 'AC-PA-07', name: 'K&M 21316', amount: 4, description: 'K&M 21316', price: 1, category: 'Accessories' },
    { id: 'AC-PA-08', name: 'Stageworx Round Sling WSL-20', amount: 4, description: 'Stageworx Round Sling WSL-20', price: 1, category: 'Accessories' },
    { id: 'AC-PA-09', name: 'Stairville Shackle', amount: 6, description: 'Stairville Shackle', price: 0.50, category: 'Accessories' },
    
    // Accessories - Studio/Speaker Section
    { id: 'AC-SP-01', name: 'Genelec GLM Set', amount: 1, description: 'Genelec GLM Set Calibration System and DSP Control', price: 5, category: 'Accessories' },
    { id: 'AC-SP-02', name: 'Genelec Z8030-408', amount: 2, description: 'Genelec Z8030-408', price: 2, category: 'Accessories' },
    { id: 'AC-SP-03', name: 'Genelec 8000-422W Wall Mount', amount: 4, description: 'Genelec 8000-422W Wall Mount', price: 2, category: 'Accessories' },
    { id: 'AC-SP-04', name: 'Fostex EB6301 Wall Mount', amount: 2, description: 'Fostex EB6301 Wall Mount', price: 1, category: 'Accessories' },
    
    // Accessories - Mixer Section
    { id: 'AC-MX-01', name: 'Allen & Heath QU 16 Carry Bag', amount: 1, description: 'Allen & Heath Carry Bag QU 16', price: 5, category: 'Accessories' },
    { id: 'AC-MX-02', name: 'Flight Case Allen & Heath QU16', amount: 1, description: 'Flight Case Allen & Heath QU16', price: 8, category: 'Accessories' },
    { id: 'AC-MX-03', name: 'Allen & Heath SQ5 Dust Cover', amount: 1, description: 'Allen & Heath SQ5 Dust Cover', price: 2, category: 'Accessories' },
    { id: 'AC-MX-04', name: 'Decksaver Allen & Heath QU16', amount: 1, description: 'Decksaver Allen & Heath QU16', price: 3, category: 'Accessories' },
    { id: 'AC-MX-05', name: 'Allen & Heath LEDLamp X', amount: 2, description: 'Allen & Heath LEDLamp X', price: 1, category: 'Accessories' },
    { id: 'AC-MX-06', name: 'Thon Rack 3U Eco II Compact 23', amount: 1, description: 'Thon Rack 3U Eco II Compact 23', price: 4, category: 'Accessories' },
    { id: 'AC-MX-07', name: 'Allen & Heath Rackmount for QU 16', amount: 1, description: 'Allen & Heath Rackmount for QU 16', price: 2, category: 'Accessories' },
    
    // Accessories - Microphone Section
    { id: 'AC-MI-01', name: 'DAP ACA-MIC5 Pro', amount: 2, description: 'DAP ACA-MIC5 Pro', price: 3, category: 'Accessories' },
    { id: 'AC-MI-02', name: 'K&M 23550 Microphone Stereo Bar', amount: 1, description: 'K&M 23550 Microphone Stereo Bar', price: 2, category: 'Accessories' },
    { id: 'AC-MI-03', name: 'Usi Windbubble', amount: 2, description: 'Usi Windbubble', price: 2, category: 'Accessories' },
    { id: 'AC-MI-04', name: 'Rycote Super Shield Kit Medium', amount: 1, description: 'Rycote Super Shield Kit Medium Set', price: 5, category: 'Accessories' },
    { id: 'AC-MI-05', name: 'Millenium 6-Mic-stand Bag', amount: 2, description: 'Millenium 6-Mic-stand Bag', price: 2, category: 'Accessories' },
    { id: 'AC-MI-06', name: 'Flyht Pro Gorilla Bag SB-S 6in1 S', amount: 1, description: 'Flyht Pro Gorilla Bag SB-S 6in1 S', price: 3, category: 'Accessories' },
    { id: 'AC-MI-07', name: 'Digital Sound 8930B', amount: 2, description: 'Digital Sound 8930B', price: 2, category: 'Accessories' },
    
    // Accessories - General
    { id: 'AC-01', name: 'Manfrotto MCLAMP Smartphone Holder', amount: 1, description: 'Manfrotto MCLAMP Smartphone Holder mini tripod', price: 0.50, category: 'Accessories' },
    { id: 'AC-02', name: 'Manfrotto Smartphone Clamp', amount: 1, description: 'Manfrotto Smartphone Clamp', price: 0.50, category: 'Accessories' },
    { id: 'AC-03', name: 'Swissonic Quadphone', amount: 1, description: 'Swissonic Quadphone', price: 3, category: 'Accessories' },
    { id: 'AC-04', name: 'Fog Fury 3000', amount: 1, description: 'Fog Fury 3000', price: 5, category: 'Accessories' },
    { id: 'AC-05', name: 'Sennheiser HD-25', amount: 1, description: 'Sennheiser HD-25 Professional headphones', price: 5, category: 'Accessories' },
    { id: 'AC-06', name: 'Behringer CT100', amount: 2, description: 'Behringer CT100 Cable tester for XLR and jack cables', price: 2, category: 'Accessories' },

    { id: 'AC-06', name: 'K&M 23550 Stereo Bar', amount: 2, description: 'Microphone stereo bar for XY recording', price: 3, category: 'Accessories' },
    { id: 'AC-07', name: 'DAP ACA-MIC5', amount: 1, description: 'Microphone clamp holder set (5 pcs)', price: 2, category: 'Accessories' },
    { id: 'AC-08', name: 'Rycote Super Shield Kit', amount: 1, description: 'Windshield kit for shotgun microphones', price: 8, category: 'Accessories' },
];
