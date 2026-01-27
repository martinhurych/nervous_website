// Equipment catalogue data
// Images will be loaded from ./images/ folder
const EQUIPMENT_DATA = [
    // PA Speakers
    { id: 'PA-01', name: 'Meyer Sound UPA-1P', amount: 4, description: 'Wide Coverage Loudspeaker / 60 Hz - 18 kHz / Max Peak SPL 133 dB', price: 50, category: 'PA Speakers', detailedDescription: 'Compact two-way loudspeaker with 12-inch driver and 100° x 40° coverage. Ideal for small to mid-sized venues as main front-of-house speaker or fill speaker in larger systems. Perfect for theatrical sound reinforcement, houses of worship, concert halls, clubs, portable and installed AV systems, and cinema surround applications. Delivers uniform coverage with predictable performance and precise imaging for professional sound reinforcement.' },
    { id: 'PA-02', name: 'Meyer Sound USW-1P', amount: 2, description: 'Subwoofer / 35 Hz - 180 Hz / Max Peak SPL 135 dB', price: 50, category: 'PA Speakers', detailedDescription: 'Self-powered subwoofer with two 15-inch drivers delivering flat low-frequency response. Perfect for concert halls, clubs, houses of worship, and theatrical sound reinforcement. Ideal for surround sound presentations, stage monitoring drum fill, and portable and installed audio-visual systems. Works seamlessly with UPA-1P, UPA-2P and UPJ-1P loudspeakers and other Meyer Sound self-powered systems. Built-in crossover allows simple daisychain distribution for easy setup.' },
    { id: 'PA-03', name: 'Meyer Sound 700-HP', amount: 2, description: 'UltraHigh-Power Subwoofer / 28 – 150 Hz / Max Peak SPL 139 dB', price: 80, category: 'PA Speakers', detailedDescription: 'Ultrahigh-power subwoofer with two 18-inch drivers delivering 2250 watts peak power. Designed for stadiums, arenas, and large concert halls requiring maximum low-frequency headroom and minimal distortion. Perfect for medium-to-large theatres, clubs, theme parks, and cinema applications demanding extreme bass output with ultimate clarity. Stackable and flyable configuration allows flexible deployment for touring productions and fixed installations. Complements Meyer Sound loudspeaker systems and line arrays in demanding sound reinforcement applications.' },
    { id: 'PA-04', name: 'Meyer Sound UPM-2P', amount: 4, description: 'Compact Narrow Loudspeaker / 80 Hz – 20 kHz / Max Peak SPL 123 dB', price: 40, category: 'PA Speakers', detailedDescription: 'Ultra-compact self-powered loudspeaker with narrow 45-degree beamwidth for precise coverage control. Perfect for front-fill, under balcony, and delay applications in larger systems. Ideal for theatrical sound reinforcement, theatre effects, and portable and installed audio-visual systems. Compact design makes it perfect for situations requiring small, inconspicuous speakers with high sound pressure levels and low distortion. Narrow pattern prevents unwanted reflections and microphone bleed, making it excellent for compact voice reinforcement systems where coverage must be restricted to defined areas.' },
    { id: 'PA-05', name: 'QSC CP8', amount: 4, description: '2-Way Full-Range Active Speaker / 8" & 1.4" / 1000 W peak / 124 dB', price: 20, category: 'PA Speakers', detailedDescription: 'Compact 8-inch two-way active speaker delivering 1000W peak power. Perfect for small to medium venues, corporate events, presentations, and mobile DJ applications. Ideal for portable sound reinforcement where quick setup and reliability are essential. Lightweight design makes it excellent for touring musicians, event production companies, and rental applications. Works great as main PA for smaller venues, monitor wedge, or side-fill speaker. Versatile mounting options allow use as floor monitor or pole-mounted speaker for various configurations.' },
    { id: 'PA-06', name: 'QSC K8.2', amount: 1, description: 'Full Range Active Loudspeaker / 8" & 1.4" / 2000 W peak / 128 dB', price: 20, category: 'PA Speakers', detailedDescription: 'Powerful 8-inch active loudspeaker delivering 2000W peak power with enhanced output and clarity. Perfect for small to medium venues, live performances, and corporate presentations requiring higher SPL than standard compact speakers. Ideal for mobile entertainers, houses of worship, and installed sound applications. Advanced DSP processing provides optimized sound quality for speech and music reproduction. Versatile design works as main PA, stage monitor, or delay speaker. Rugged construction and integrated rigging points make it reliable for touring and fixed installation applications.' },
    { id: 'PA-07', name: 'Yamaha Stagepas 300', amount: 1, description: 'Portable Powered PA System / Stage Monitors / 2x150 W', price: 20, category: 'PA Speakers', detailedDescription: 'Compact all-in-one stereo PA system with integrated powered mixer and two 8-inch passive speakers. Perfect for solo performers, small bands, karaoke, corporate presentations, and small venue performances. Built-in reverb and 4 mic/line channels plus 2 stereo channels make it ideal for multi-input applications. Unique storage design allows mixer to stow inside speaker cabinet for ultimate portability. Monitor outputs enable connection to powered stage monitors. Ideal for mobile entertainers, schools, churches, and anyone needing a complete, portable sound solution with quick setup and minimal transport requirements.' },
    
    // Studio Speakers
    { id: 'SP-01', name: 'Genelec 7350 APM', amount: 1, description: 'Subwoofer / 8" / Peak 104 dB SPL / Power: 150 W / 22 - 120 Hz', price: 40, category: 'Studio Speakers' },
    { id: 'SP-02', name: 'Genelec 8330 APM Pack', amount: 1, description: '2-Way Active Studio Monitors / 45 Hz - 23 kHz / Peak 110 dB', price: 60, category: 'Studio Speakers' },
    { id: 'SP-03', name: 'Fostex 6301B', amount: 10, description: 'Small active speaker / 84 dB / 10W', price: 5, category: 'Studio Speakers', detailedDescription: 'Compact 10cm full-range active speaker designed for multichannel audio systems. Ten speakers available for creating surround sound setups when paired with Genelec 7350 APM subwoofer. Perfect for electronic music performances, multichannel compositions, immersive audio installations, and experimental sound art. Ideal for any setup requiring multiple small speakers with precise placement. Magnetically shielded housing allows safe placement near sensitive equipment. Balanced XLR and unbalanced jack inputs provide flexible connectivity for complex multichannel configurations.' },
    
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
    
    // Cables
    { 
        id: 'CA-01', 
        name: 'XLR + XLR', 
        amount: 15,
        price: 0.30,
        description: 'Microphone Cable / 3-pin', 
        category: 'Cables',
        variants: [
            { length: '3m', amount: 15, price: 0.30 },
            { length: '6m', amount: 21, price: 0.40 },
            { length: '10m', amount: 19, price: 0.50 },
            { length: '20m', amount: 5, price: 0.80 }
        ]
    },
    { id: 'CA-05', name: 'XLR (male) + 6.3mm stereo jack', amount: 13, description: 'XLR (male) + 6.3mm stereo jack', price: 0.50, category: 'Cables' },
    { id: 'CA-06', name: 'XLR (female) + 6.3mm stereo jack', amount: 16, description: 'XLR (female) + 6.3mm stereo jack', price: 0.40, category: 'Cables' },
    { id: 'CA-07', name: 'XLR (male) + 6.3mm stereo jack', amount: 11, description: 'XLR (male) + 6.3mm stereo jack', price: 0.20, category: 'Cables' },
    { id: 'CA-08', name: 'XLR (female) + 6.3mm stereo jack', amount: 9, description: 'XLR (female) + 6.3mm stereo jack', price: 0.20, category: 'Cables' },
    { 
        id: 'CA-09', 
        name: '6.3 mm jack + 6.3 mm jack', 
        amount: 3,
        price: 0.20,
        description: 'Both sides: 6.3 mm mono jack', 
        category: 'Cables',
        variants: [
            { length: '3m', amount: 3, price: 0.20 },
            { length: '6m', amount: 10, price: 0.30 }
        ]
    },
    { id: 'CA-11', name: 'Stereo jack 6.3 mm + Stereo jack socket 6.3 mm', amount: 1, description: 'Klotz AS-EX20300 / extension cable 6.3 mm jack / 6m', price: 0.40, category: 'Cables' },
    { id: 'CA-12', name: '3.5 mm Stereo jack + 2x 6.3 mm mono jacks', amount: 3, description: 'the sssnake YPK2030 / Y - Audio Cable / 3m', price: 0.20, category: 'Cables' },
    { id: 'CA-13', name: '3.5 mm Stereo jack + 2x XLR (male)', amount: 1, description: 'pro snake TPY 2030 KMM / 2x XLR male to Stereo jack / 3m', price: 0.30, category: 'Cables' },
    { id: 'CA-14', name: '8 x XLR (male) + Stereo Jack Multicore', amount: 1, description: 'the sssnake MXP 8030 / 3m', price: 1.00, category: 'Cables' },
    { id: 'CA-15', name: '3.5 mm Stereo jack + 2x RCA (male)', amount: 1, description: '3.5 mm Stereo jack + 2x RCA (male) / 3m', price: 0.20, category: 'Cables' },
    { id: 'CA-16', name: '3.5 mm Stereo jack + 2x XLR', amount: 10, description: 'pro snake BXJ 102-1, Audio Cable with Transformer', price: 0.30, category: 'Cables' },
    { id: 'CA-17', name: 'XLR F + XLR F - 0.3m', amount: 2, description: 'pro snake TPA 1003 FF / 0.3m', price: 0.20, category: 'Cables' },
    { id: 'CA-18', name: 'XLR M + XLR M - 0.3m', amount: 2, description: 'pro snake TPA 1003 MM / 0.3m', price: 0.20, category: 'Cables' },
    { id: 'CA-19', name: 'Y adapter MFF - 0.3m', amount: 1, description: 'Cordial EY 0,3 MFF elements / 0.3m', price: 0.30, category: 'Cables' },
    { id: 'CA-20', name: 'Y adapter FMM - 0.3m', amount: 1, description: 'Cordial EY 0,3 FMM elements / 0.3m', price: 0.30, category: 'Cables' },
    { id: 'CA-21', name: 'XLR Patch - 0.5m', amount: 4, description: 'XLR Patch cable / 0.5m', price: 0.20, category: 'Cables' },
    { id: 'CA-22', name: 'Multicore Cable - 15m', amount: 1, description: '8-Way Multicore Cable XLR female sockets + XLR male connectors / 15m', price: 5.00, category: 'Cables' },
    { id: 'CA-23', name: 'CAT6E - 75m', amount: 2, description: 'CAT6 Ethercon Cable on reel / 75m', price: 7.00, category: 'Cables' },
    
    // Power Distribution
    { id: 'PD-01', name: '3-Way Power Split', amount: 10, description: '3-Outlet power strip', price: 0.20, category: 'Power Distribution' },
    { id: 'PD-02', name: '4-Way Power Split', amount: 7, description: '4-Outlet power strip', price: 0.30, category: 'Power Distribution' },
    { id: 'PD-03', name: '6-Way Power Split', amount: 8, description: '6-Outlet power strip', price: 0.40, category: 'Power Distribution' },
    { id: 'PD-04', name: 'Varytec Power Twist Power Cable 5,0 m', amount: 10, description: 'Power Cable', price: 1.00, category: 'Power Distribution' },
    { 
        id: 'PD-05', 
        name: 'EU Power Cable', 
        amount: 14,
        price: 0.10,
        description: 'EU Power cable', 
        category: 'Power Distribution',
        variants: [
            { length: '1.5m', amount: 14, price: 0.10 },
            { length: '3m', amount: 4, price: 0.20 },
            { length: '5m', amount: 5, price: 0.30 }
        ]
    },
    { 
        id: 'PD-08', 
        name: 'Extension Cable', 
        amount: 12,
        price: 0.30,
        description: 'extension cable', 
        category: 'Power Distribution',
        variants: [
            { length: '5m', amount: 12, price: 0.30 },
            { length: '10m', amount: 4, price: 0.50 },
            { length: '20m', amount: 4, price: 0.70 }
        ]
    },
    { id: 'PD-11', name: 'Varytec Cable Drum IP44 25m 3x 1,5 mm²', amount: 1, description: 'Cable Reel', price: 2.00, category: 'Power Distribution' },
    
    // Accessories - PA Section
    { id: 'AC-PA-01', name: 'Meyer Sound UPA Mounting Yoke', amount: 4, description: 'Adjustable Flying Frame for UPA', price: 4.00, category: 'Accessories' },
    { id: 'AC-PA-02', name: 'Meyer Sound UPA Clamp', amount: 2, description: 'Meyer Sound UPA Clamp', price: 1.00, category: 'Accessories' },
    { id: 'AC-PA-03', name: 'Meyer Sound UPM Mounting Yoke', amount: 4, description: 'Mounting cradle-style yoke for a single UPM1/2P and UPM-1/2XP', price: 4.00, category: 'Accessories' },
    { id: 'AC-PA-04', name: 'K&M 195/8 Black', amount: 2, description: 'Speaker Stand Flange Mount', price: 0.50, category: 'Accessories' },
    { id: 'AC-PA-05', name: 'K&M 66360', amount: 2, description: 'Reducing flange', price: 0.50, category: 'Accessories' },
    { id: 'AC-PA-06', name: 'Gravity SF 36 M10 F Reduce Flange', amount: 4, description: 'Reduction Flange for 35 mm Speaker Stands', price: 0.50, category: 'Accessories' },
    { id: 'AC-PA-07', name: 'K&M 21316', amount: 1, description: 'Travel Bag for speaker and wind-up stands', price: 1.50, category: 'Accessories' },
    { id: 'AC-PA-08', name: 'Stageworx Round Sling WSL-20', amount: 8, description: 'polyester sling WSL-20 1-4.0m / usable length: 0.5-2m / payload: 2000kg', price: 0.50, category: 'Accessories' },
    { id: 'AC-PA-09', name: 'Stairville Shackle', amount: 16, description: 'Shackle / 0.75-2.0 t', price: 0.20, category: 'Accessories' },
    
    // Accessories - Studio/Speaker Section
    { id: 'AC-SP-01', name: 'Genelec GLM Set', amount: 1, description: 'Calibration System and DSP Control', price: 5.00, category: 'Accessories' },
    { id: 'AC-SP-02', name: 'Genelec Z8030-408', amount: 2, description: 'Tripod Adapter', price: 0.50, category: 'Accessories' },
    { id: 'AC-SP-03', name: 'Genelec 8000-422W Wall Mount', amount: 2, description: 'Wall Mount for Genelec 8330A', price: 0.50, category: 'Accessories' },
    { id: 'AC-SP-04', name: 'Fostex EB6301 Wall Mounting', amount: 10, description: 'Wall/Stand Mount for Fostex 6301B', price: 1.00, category: 'Accessories' },
    
    // Accessories - Mixer Section
    { id: 'AC-MX-01', name: 'Allen & Heath Carry Bag QU 16', amount: 1, description: 'Carry Bag for Allen & Heath QU 16', price: 5.00, category: 'Accessories' },
    { id: 'AC-MX-02', name: 'Flightcase Allen & Heath QU16', amount: 1, description: 'flightcase for Allen & Heath QU16', price: 6.00, category: 'Accessories' },
    { id: 'AC-MX-03', name: 'Allen & Heath SQ5 Dust Cover', amount: 1, description: 'Dust and Dirt Cover', price: 1.00, category: 'Accessories' },
    { id: 'AC-MX-04', name: 'Decksaver Allen & Heath QU16', amount: 1, description: 'Dust cover for Allen & Heath QU16', price: 3.00, category: 'Accessories' },
    { id: 'AC-MX-05', name: 'Allen & Heath LEDLamp X', amount: 1, description: 'Gooseneck Lamp', price: 2.00, category: 'Accessories' },
    { id: 'AC-MX-06', name: 'Thon Rack 3U Eco II Compact 23', amount: 1, description: '19" Economy Case', price: 3.00, category: 'Accessories' },
    
    // Accessories - Microphone Section
    { id: 'AC-MI-01', name: 'DAP ACA-MIC5 Pro', amount: 1, description: 'microphone flight case with space for 12 microphones and accessories', price: 1.00, category: 'Accessories' },
    { id: 'AC-MI-02', name: 'K&M 23550 Microphone Stereo Bar', amount: 3, description: 'Stereo Bar', price: 0.30, category: 'Accessories' },
    { id: 'AC-MI-03', name: 'Uši Windbubble', amount: 2, description: 'Wind protection', price: 0.50, category: 'Accessories' },
    { id: 'AC-MI-04', name: 'Rycote Super Shield Kit Medium', amount: 1, description: 'Wind shield pod with adjustable shock-mount handle and windjammer', price: 10.00, category: 'Accessories' },
    { id: 'AC-MI-05', name: 'Millenium 6-Micstand Bag', amount: 2, description: 'Gig Bag For Up To 6 Microphone Stand', price: 1.00, category: 'Accessories' },
    { id: 'AC-MI-06', name: 'Flyht Pro Gorilla Bag SB-S', amount: 1, description: 'Transport bag for up to six microphone stands', price: 1.00, category: 'Accessories' },
    { id: 'AC-MI-07', name: 'Digital Sound 8930B', amount: 1, description: 'Portable Sound Level Calibrator', price: 2.50, category: 'Accessories' },
    
    // Accessories - General
    { id: 'AC-01', name: 'Manfrotto MCLAMP Smartphone Holder', amount: 1, description: 'mini tripod', price: 0.50, category: 'Accessories' },
    { id: 'AC-02', name: 'Manfrotto Smartphone Clamp', amount: 1, description: 'Smartphone Clamp', price: 0.20, category: 'Accessories' },
    { id: 'AC-03', name: 'Swissonic Quadphone', amount: 1, description: '4-Channel Headphone Amplifier', price: 1.00, category: 'Accessories' },
    { id: 'AC-04', name: 'Fog Fury 3000', amount: 1, description: '1500W DMX Fog Machine', price: 8.00, category: 'Accessories' },
    { id: 'AC-05', name: 'Sennheiser HD-25', amount: 1, description: 'headphones', price: 5.00, category: 'Accessories' },
    { id: 'AC-06', name: 'Behringer CT100', amount: 1, description: 'Cable Tester', price: 1.00, category: 'Accessories' },
];
