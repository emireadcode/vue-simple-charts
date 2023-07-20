Vue.config.productionTip = false;

const SankeyDiagram = {
  data:function(){
    return {
      sankeyNode:[],
      category:[
        //jagaban start
        {from:'petroleum net imports',to:'primary petroleum',value:8.48719535	},
        {from:'produced and distributed petroleum',to:'petroleum stock',value:0.79166675	},
        {from:'produced and distributed petroleum',to:'residential sector',value:0.982731	},
        {from:'produced and distributed petroleum',to:'commercial sector',value:0.561601	},
        {from:'produced and distributed petroleum',to:'transportation sector',value:25.358195	},
        {from:'produced and distributed petroleum',to:'government sector',value:0.5984	},
        {from:'produced and distributed natural gas',to:'residential sector',value:4.752747	},
        {from:'produced and distributed natural gas',to:'commercial sector',value:3.3041	},
        {from:'produced and distributed natural gas',to:'transportation sector',value:0.923167	},
        {from:'produced and distributed natural gas',to:'government sector',value:0.1475	},
        {from:'produced and distributed coal',to:'residential sector',value:0.007782	},
        {from:'produced and distributed coal',to:'commercial sector',value:0.056489	},
        {from:'produced and distributed coal',to:'coal net exports',value:1.231750541	},
        {from:'produced and distributed coal',to:'coal stock change',value:0.885559254	},
        {from:'produced and distributed coal',to:'government sector',value:0.0135	},
        {from:'produced and distributed solar/pv',to:'residential sector',value:0.349747	},
        {from:'produced and distributed solar/pv',to:'commercial sector',value:0.005267	},
        {from:'produced and distributed biomass',to:'residential sector',value:0.43152	},
        {from:'produced and distributed biomass',to:'commercial sector',value:0.122194	},
        {from:'produced and distributed biomass',to:'transportation sector',value:1.347034	},
        {from:'produced and distributed geothermal',to:'residential sector',value:0.043966	},
        {from:'produced and distributed geothermal',to:'commercial sector',value:0.0197	},
        {from:'produced and distributed hydroelectric',to:'commercial sector',value:0.000381	},
        {from:'produced and distributed wind',to:'commercial sector',value:0.001154	},
        {from:'produced and distributed hydroelectric',to:'industrial sector',value:0.01172	},
        {from:'produced and distributed geothermal',to:'industrial sector',value:0.0042	},
        {from:'produced and distributed solar/pv',to:'industrial sector',value:0.01927	},
        {from:'produced and distributed wind',to:'industrial sector',value:0.00065	},
        {from:'produced and distributed coal',to:'industrial sector',value:1.20534	},
        {from:'produced and distributed biomass',to:'industrial sector',value:2.4669	},
        {from:'produced and distributed natural gas',to:'industrial sector',value:9.63847	},
        {from:'produced and distributed petroleum',to:'industrial sector',value:8.34681	},
        {from:'electricity',to:'industrial sector',value:3.33255	},
        {from:'electricity',to:'residential sector',value:4.776403	},
        {from:'electricity',to:'commercial sector',value:4.634924	},
        {from:'electricity',to:'transportation sector',value:0.026133	},
        {from:'electricity',to:'government sector',value:0.1821	},
        {from:'electricity',to:'electricity used in generation',value:0.74	},
        {from:'electricity',to:'residential electricity loss',value:8.778974183	},
        {from:'electricity',to:'commercial electricity loss',value:8.518937396	},
        {from:'electricity',to:'industrial electricity loss',value:6.011358544	},
        {from:'electricity',to:'transportation electricity loss',value:0.048032156	},
        {from:'electricity',to:'government electricity loss',value:0.334697721	},
        {from:'electricity',to:'wastewater treatment',value:0.103	},
        {from:'electricity',to:'water treatment',value:0.134	},
        {from:'electricity',to:'municipal lighting',value:0.19499	},
        {from:'primary solar/pv',to:'electricity',value:0.24621	},
        {from:'primary petroleum',to:'electricity',value:0.277476569	},
        {from:'primary coal',to:'electricity',value:14.56816544	},
        {from:'primary natural gas',to:'electricity',value:9.970587797	},
        {from:'primary biomass',to:'electricity',value:0.520226	},
        {from:'primary geothermal',to:'electricity',value:0.159458	},
        {from:'primary hydroelectric',to:'electricity',value:2.375652	},
        {from:'primary wind',to:'electricity',value:1.814013	},
        {from:'primary nuclear',to:'electricity',value:8.33768	},
        {from:'primary petroleum',to:'produced and distributed petroleum',value:35.91084446	},
        {from:'primary natural gas',to:'produced and distributed natural gas',value:18.35539243	},
        {from:'primary coal',to:'produced and distributed coal',value:3.161569484	},
        {from:'primary biomass',to:'produced and distributed biomass',value:4.19508	},
        {from:'primary solar/pv',to:'produced and distributed solar/pv',value:0.4637485	},
        {from:'primary geothermal',to:'produced and distributed geothermal',value:0.2081202	},
        {from:'primary hydroelectric',to:'produced and distributed hydroelectric',value:0.012961	},
        {from:'primary wind',to:'produced and distributed wind',value:1.18081145	},
        {from:'total petroleum field production',to:'primary petroleum',value:23.18417402	},
        {from:'renewable fuels and oxygenate plant net production',to:'primary petroleum',value:1.99817425	},
        {from:'petroleum processing gain',to:'primary petroleum',value:1.8941894	},
        {from:'petroleum adjustments',to:'primary petroleum',value:0.624588	},
        {from:'residential sector',to:'residential-electricity',value:4.388	},
        {from:'residential sector',to:'residential-natural gas',value:4.694	},
        {from:'residential sector',to:'residenital-propane/ lpg',value:0.492	},
        {from:'residential sector',to:'residential-fuel oil',value:0.584	},
        {from:'residential sector',to:'residential-kerosene',value:0.024	},
        {from:'commercial sector',to:'commercial-electricity',value:4.241	},
        {from:'commercial sector',to:'commercial-natural gas',value:2.248	},
        {from:'commercial sector',to:'commercial-fuel oil',value:0.134	},
        {from:'commercial sector',to:'commercial-district heat',value:0.341	},
        {from:'transportation sector',to:'highway',value:21.29263474	},
        {from:'transportation sector',to:'non-highway',value:4.067314697	},
        {from:'transportation sector',to:'transportation-related fuel consumption',value:2.0884	},
        {from:'natural gas net imports',to:'primary natural gas',value:0.963786871	},
        {from:'natural gas production (dry)',to:'primary natural gas',value:27.87085948	},
        {from:'supplemental gaseous fuels',to:'primary natural gas',value:0.061511664	},
        {from:'net storage withdrawals',to:'primary natural gas',value:0.555418452	},
        {from:'balancing item',to:'primary natural gas',value:0.014759335	},
        {from:'coal production',to:'primary coal',value:17.61768059	},
        {from:'waste coal supplied',to:'primary coal',value:0.186808	},
        {from:'coal losses and unaccounted',to:'primary coal',value:0.07475366	},
        {from:'total biomass energy production',to:'primary biomass',value:4.715306	},
        {from:'geothermal energy production',to:'primary geothermal',value:0.224066	},
        {from:'solar/pv energy production',to:'primary solar/pv',value:0.549922	},
        {from:'hydroelectric energy production',to:'primary hydroelectric',value:2.388612	},
        {from:'wind energy production',to:'primary wind',value:1.815716	},
        {from:'nuclear production',to:'primary nuclear',value:8.33768	},
        {from:'commercial-electricity',to:'education',value:0.458	},
        {from:'commercial-electricity',to:'food sales',value:0.208	},
        {from:'commercial-electricity',to:'food service',value:0.279	},
        {from:'commercial-electricity',to:'healthcare-inpatient',value:0.251	},
        {from:'commercial-electricity',to:'healthcare-outpatient',value:0.114	},
        {from:'commercial-electricity',to:'lodging',value:0.304	},
        {from:'commercial-electricity',to:'retail (other than mall)',value:0.281	},
        {from:'commercial-electricity',to:'enclosed and strip malls',value:0.424	},
        {from:'commercial-electricity',to:'office',value:0.865	},
        {from:'commercial-electricity',to:'public assembly',value:0.275	},
        {from:'commercial-electricity',to:'public order and safety',value:0.073	},
        {from:'commercial-electricity',to:'religious worship',value:0.081	},
        {from:'commercial-electricity',to:'service',value:0.127	},
        {from:'commercial-electricity',to:'warehouse and storage',value:0.284	},
        {from:'commercial-electricity',to:'commercial-other',value:0.191	},
        {from:'commercial-electricity',to:'vacant',value:0.026	},
        {from:'commercial-natural gas',to:'education',value:0.291	},
        {from:'commercial-natural gas',to:'food sales',value:0.053	},
        {from:'commercial-natural gas',to:'food service',value:0.227	},
        {from:'commercial-natural gas',to:'healthcare-inpatient',value:0.219	},
        {from:'commercial-natural gas',to:'healthcare-outpatient',value:0.046	},
        {from:'commercial-natural gas',to:'lodging',value:0.221	},
        {from:'commercial-natural gas',to:'retail (other than mall)',value:0.074	},
        {from:'commercial-natural gas',to:'enclosed and strip malls',value:0.217	},
        {from:'commercial-natural gas',to:'office',value:0.282	},
        {from:'commercial-natural gas',to:'public assembly',value:0.135	},
        {from:'commercial-natural gas',to:'public order and safety',value:0.041	},
        {from:'commercial-natural gas',to:'religious worship',value:0.087	},
        {from:'commercial-natural gas',to:'service',value:0.122	},
        {from:'commercial-natural gas',to:'warehouse and storage',value:0.139	},
        {from:'commercial-natural gas',to:'commercial-other',value:0.081	},
        {from:'commercial-natural gas',to:'vacant',value:0.013	},
        {from:'commercial-fuel oil',to:'education',value:0.028	},
        {from:'commercial-fuel oil',to:'healthcare-inpatient',value:0.016	},
        {from:'commercial-fuel oil',to:'healthcare-outpatient',value:0.004	},
        {from:'commercial-fuel oil',to:'lodging',value:0.008	},
        {from:'commercial-fuel oil',to:'retail (other than mall)',value:0.007	},
        {from:'commercial-fuel oil',to:'enclosed and strip malls',value:0.002	},
        {from:'commercial-fuel oil',to:'office',value:0.018	},
        {from:'commercial-fuel oil',to:'public assembly',value:0.007	},
        {from:'commercial-fuel oil',to:'public order and safety',value:0.002	},
        {from:'commercial-fuel oil',to:'religious worship',value:0.005	},
        {from:'commercial-fuel oil',to:'service',value:0.016	},
        {from:'commercial-fuel oil',to:'warehouse and storage',value:0.005	},
        {from:'commercial-fuel oil',to:'commercial-other',value:0.01	},
        {from:'commercial-district heat',to:'education',value:0.065	},
        {from:'commercial-district heat',to:'healthcare-inpatient',value:0.062	},
        {from:'commercial-district heat',to:'healthcare-outpatient',value:0.006	},
        {from:'commercial-district heat',to:'lodging',value:0.031	},
        {from:'commercial-district heat',to:'office',value:0.076	},
        {from:'commercial-district heat',to:'public assembly',value:0.064	},
        {from:'education',to:'office equipment',value:0.021	},
        {from:'education',to:'computing',value:0.078	},
        {from:'food sales',to:'office equipment',value:0.002	},
        {from:'food sales',to:'computing',value:0.002	},
        {from:'food service',to:'office equipment',value:0.007	},
        {from:'food service',to:'computing',value:0.004	},
        {from:'healthcare-inpatient',to:'office equipment',value:0.012	},
        {from:'healthcare-inpatient',to:'computing',value:0.021	},
        {from:'healthcare-outpatient',to:'office equipment',value:0.005	},
        {from:'healthcare-outpatient',to:'computing',value:0.013	},
        {from:'lodging',to:'office equipment',value:0.043	},
        {from:'lodging',to:'computing',value:0.006	},
        {from:'retail (other than mall)',to:'office equipment',value:0.007	},
        {from:'retail (other than mall)',to:'computing',value:0.011	},
        {from:'enclosed and strip malls',to:'office equipment',value:0.011	},
        {from:'enclosed and strip malls',to:'computing',value:0.012	},
        {from:'office',to:'office equipment',value:0.037	},
        {from:'office',to:'computing',value:0.167	},
        {from:'public assembly',to:'office equipment',value:0.007	},
        {from:'public assembly',to:'computing',value:0.016	},
        {from:'public order and safety',to:'office equipment',value:0.003	},
        {from:'public order and safety',to:'computing',value:0.008	},
        {from:'religious worship',to:'office equipment',value:0.003	},
        {from:'religious worship',to:'computing',value:0.003	},
        {from:'service',to:'office equipment',value:0.004	},
        {from:'service',to:'computing',value:0.008	},
        {from:'warehouse and storage',to:'office equipment',value:0.006	},
        {from:'warehouse and storage',to:'computing',value:0.016	},
        {from:'commercial-other',to:'office equipment',value:0.002	},
        {from:'commercial-other',to:'computing',value:0.04	},
        {from:'vacant',to:'computing',value:0.001	},
        {from:'residential-electricity',to:'single-family detached',value:3.229	},
        {from:'residential-electricity',to:'single-family attached',value:0.207	},
        {from:'residential-electricity',to:'apartments in 2-4 unit buildings',value:0.22	},
        {from:'residential-electricity',to:'apartments in 5 or more unit buildings',value:0.416	},
        {from:'residential-electricity',to:'mobile homes',value:0.316	},
        {from:'residential-natural gas',to:'single-family detached',value:3.502	},
        {from:'residential-natural gas',to:'single-family attached',value:0.296	},
        {from:'residential-natural gas',to:'apartments in 2-4 unit buildings',value:0.412	},
        {from:'residential-natural gas',to:'apartments in 5 or more unit buildings',value:0.393	},
        {from:'residential-natural gas',to:'mobile homes',value:0.091	},
        {from:'residenital-propane/ lpg',to:'single-family detached',value:0.415	},
        {from:'residenital-propane/ lpg',to:'single-family attached',value:0.007	},
        {from:'residenital-propane/ lpg',to:'apartments in 2-4 unit buildings',value:0.011	},
        {from:'residenital-propane/ lpg',to:'apartments in 5 or more unit buildings',value:0.01	},
        {from:'residenital-propane/ lpg',to:'mobile homes',value:0.049	},
        {from:'residential-fuel oil',to:'single-family detached',value:0.439	},
        {from:'residential-fuel oil',to:'single-family attached',value:0.035	},
        {from:'residential-fuel oil',to:'apartments in 2-4 unit buildings',value:0.043	},
        {from:'residential-fuel oil',to:'apartments in 5 or more unit buildings',value:0.064	},
        {from:'residential-fuel oil',to:'mobile homes',value:0.004	},
        {from:'residential-kerosene',to:'single-family detached',value:0.011	},
        {from:'residential-kerosene',to:'mobile homes',value:0.011	},
        {from:'single-family detached',to:'single-family',value:7.595	},
        {from:'single-family attached',to:'single-family',value:0.546	},
        {from:'apartments in 2-4 unit buildings',to:'multi-family',value:0.686	},
        {from:'apartments in 5 or more unit buildings',to:'multi-family',value:0.884	},
        {from:'single-family',to:'space heating',value:3.354	},
        {from:'single-family',to:'air conditioning',value:0.527	},
        {from:'single-family',to:'water heating',value:1.421	},
        {from:'single-family',to:'refrigerators',value:0.369	},
        {from:'single-family',to:'other-residential',value:2.471	},
        {from:'multi-family',to:'space heating',value:0.722	},
        {from:'multi-family',to:'air conditioning',value:0.07	},
        {from:'multi-family',to:'water heating',value:0.302	},
        {from:'multi-family',to:'refrigerators',value:0.086	},
        {from:'multi-family',to:'other-residential',value:0.391	},
        {from:'other-residential',to:'lighting',value:0.833791209	},
        {from:'other-residential',to:'cooking',value:0.667032967	},
        {from:'other-residential',to:'other appliances',value:0.54474359	},
        {from:'other-residential',to:'electronics',value:0.455805861	},
        {from:'other-residential',to:'washing',value:0.533626374	},
        {from:'highway',to:'buses',value:0.260820648	},
        {from:'highway',to:'commercial light trucks',value:0.545045044	},
        {from:'highway',to:'freight trucks',value:5.517611816	},
        {from:'highway',to:'light-duty vehicles',value:14.96915723	},
        {from:'non-highway',to:'air',value:1.707050171	},
        {from:'non-highway',to:'water',value:0.969173279	},
        {from:'non-highway',to:'rail',value:0.517655273	},
        {from:'non-highway',to:'pipeline fuel natural gas',value:0.873435974	},
        {from:'transportation-related fuel consumption',to:'agricultural equipment',value:0.5966	},
        {from:'transportation-related fuel consumption',to:'construction and mining equipment',value:0.9575	},
        {from:'transportation-related fuel consumption',to:'industrial equipment',value:0.3491	},
        {from:'transportation-related fuel consumption',to:'recreational equipment',value:0.1852	},
        {from:'buses',to:'intercity',value:0.031346144	},
        {from:'buses',to:'school',value:0.122350952	},
        {from:'buses',to:'transit',value:0.107123535	},
        {from:'freight trucks',to:'class 7-8 trucks',value:4.501843262	},
        {from:'freight trucks',to:'class 3-6 trucks',value:1.015768433	},
        {from:'light-duty vehicles',to:'cars',value:7.104310059	},
        {from:'light-duty vehicles',to:'light trucks',value:7.84444043	},
        {from:'light-duty vehicles',to:'motorcycles',value:0.020406815	},
        {from:'class 7-8 trucks',to:'other prepared foodstuffs, and fats and oils (cfs10)',value:0.45783746	},
        {from:'class 7-8 trucks',to:'base metal in primary or semi-finished forms and in finished basic shapes',value:0.260656725	},
        {from:'class 7-8 trucks',to:'non-metallic mineral products',value:0.244900274	},
        {from:'class 7-8 trucks',to:'mixed freight',value:0.241298799	},
        {from:'class 7-8 trucks',to:'plastics and rubber',value:0.196280366	},
        {from:'class 7-8 trucks',to:'motorized and other vehicles (includes parts)',value:0.178723178	},
        {from:'class 7-8 trucks',to:'other coal and petroleum products, not elsewhere classified',value:0.171520228	},
        {from:'class 7-8 trucks',to:'basic chemicals',value:0.165217648	},
        {from:'class 7-8 trucks',to:'waste and scrap',value:0.15711433	},
        {from:'class 7-8 trucks',to:'meat, poultry, fish, seafood, and their preparations',value:0.153512855	},
        {from:'class 7-8 trucks',to:'pulp, newsprint, paper, and paperboard',value:0.144509169	},
        {from:'class 7-8 trucks',to:'gravel and crushed stone (excludes dolomite and slate)',value:0.142258247	},
        {from:'class 7-8 trucks',to:'agricultural products (excludes animal feed, cereal grains, and forage products)',value:0.139106957	},
        {from:'class 7-8 trucks',to:'other commodities',value:1.659829611	},
        {from:'class 3-6 trucks',to:'other prepared foodstuffs, and fats and oils (cfs10)',value:0.10330365	},
        {from:'class 3-6 trucks',to:'base metal in primary or semi-finished forms and in finished basic shapes',value:0.058812992	},
        {from:'class 3-6 trucks',to:'non-metallic mineral products',value:0.055257803	},
        {from:'class 3-6 trucks',to:'mixed freight',value:0.054445188	},
        {from:'class 3-6 trucks',to:'plastics and rubber',value:0.044287504	},
        {from:'class 3-6 trucks',to:'motorized and other vehicles (includes parts)',value:0.040326007	},
        {from:'class 3-6 trucks',to:'other coal and petroleum products, not elsewhere classified',value:0.038700777	},
        {from:'class 3-6 trucks',to:'basic chemicals',value:0.037278701	},
        {from:'class 3-6 trucks',to:'waste and scrap',value:0.035450318	},
        {from:'class 3-6 trucks',to:'meat, poultry, fish, seafood, and their preparations',value:0.034637704	},
        {from:'class 3-6 trucks',to:'pulp, newsprint, paper, and paperboard',value:0.032606167	},
        {from:'class 3-6 trucks',to:'gravel and crushed stone (excludes dolomite and slate)',value:0.032098282	},
        {from:'class 3-6 trucks',to:'agricultural products (excludes animal feed, cereal grains, and forage products)',value:0.031387245	},
        {from:'class 3-6 trucks',to:'other commodities',value:0.374513821	},
        {from:'cars',to:'earn a living',value:2.462320904	},
        {from:'cars',to:'family/personal business',value:2.332651118	},
        {from:'cars',to:'school/church',value:0.312585679	},
        {from:'cars',to:'social & recreational',value:1.729858869	},
        {from:'cars',to:'auto-other',value:0.038775576	},
        {from:'cars',to:'unreported',value:0.228117914	},
        {from:'light trucks',to:'earn a living',value:2.718846656	},
        {from:'light trucks',to:'family/personal business',value:2.575667811	},
        {from:'light trucks',to:'school/church',value:0.345151003	},
        {from:'light trucks',to:'social & recreational',value:1.910076381	},
        {from:'light trucks',to:'auto-other',value:0.042815233	},
        {from:'light trucks',to:'unreported',value:0.251883345	},
        {from:'air',to:'domestic carriers',value:1.430854248	},
        {from:'air',to:'freight carriers',value:0.142838211	},
        {from:'air',to:'general aviation',value:0.133357666	},
        {from:'water',to:'water-freight',value:0.726238647	},
        {from:'water',to:'recreational boats',value:0.242934662	},
        {from:'rail',to:'freight-rail',value:0.466393524	},
        {from:'rail',to:'passenger',value:0.051261734	},
        {from:'water-freight',to:'domestic shipping',value:0.103327293	},
        {from:'water-freight',to:'international shipping',value:0.622911377	},
        {from:'earn a living',to:'0-5 miles',value:0.287466251	},
        {from:'earn a living',to:'5-19 miles',value:1.935818443	},
        {from:'earn a living',to:'20-50 miles',value:1.952840995	},
        {from:'earn a living',to:'50+ miles',value:1.014272917	},
        {from:'family/personal business',to:'0-5 miles',value:0.827017649	},
        {from:'family/personal business',to:'5-19 miles',value:2.03369494	},
        {from:'family/personal business',to:'20-50 miles',value:1.109406638	},
        {from:'family/personal business',to:'50+ miles',value:0.920311133	},
        {from:'school/church',to:'0-5 miles',value:0.075205062	},
        {from:'school/church',to:'5-19 miles',value:0.292341166	},
        {from:'school/church',to:'20-50 miles',value:0.174294246	},
        {from:'school/church',to:'50+ miles',value:0.117068009	},
        {from:'social & recreational',to:'0-5 miles',value:0.230880282	},
        {from:'social & recreational',to:'5-19 miles',value:1.108104929	},
        {from:'social & recreational',to:'20-50 miles',value:0.800868622	},
        {from:'social & recreational',to:'50+ miles',value:1.402596411	},
        {from:'auto-other',to:'0-5 miles',value:0.002727995	},
        {from:'auto-other',to:'5-19 miles',value:0.018473808	},
        {from:'auto-other',to:'20-50 miles',value:0.01943088	},
        {from:'auto-other',to:'50+ miles',value:0.041103428	},
        {from:'unreported',to:'0-5 miles',value:0.007555636	},
        {from:'unreported',to:'5-19 miles',value:0.055457245	},
        {from:'unreported',to:'20-50 miles',value:0.079099002	},
        {from:'unreported',to:'50+ miles',value:0.338744579	},
        {from:'agriculture',to:'crops',value:0.494	},
        {from:'agriculture',to:'livestock',value:0.3	},
        {from:'construction',to:'construction of buildings',value:0.219128859	},
        {from:'construction',to:'heavy and civil engineering construction',value:0.420674418	},
        {from:'construction',to:'specialty trade contractors',value:0.975196724	},
        {from:'mining',to:'extraction',value:0.3191	},
        {from:'mining',to:'materials handling',value:0.2597	},
        {from:'mining',to:'beneficiation and processing',value:0.5921	},
        {from:'mining',to:'oil and natural gas extraction',value:1.827916188	},
        {from:'extraction',to:'ventilation',value:0.1216	},
        {from:'extraction',to:'drilling',value:0.0672	},
        {from:'extraction',to:'blasting',value:0.024	},
        {from:'extraction',to:'digging',value:0.0786	},
        {from:'extraction',to:'dewatering',value:0.0277	},
        {from:'materials handling',to:'diesel equipment',value:0.2113	},
        {from:'materials handling',to:'electric equipment',value:0.0484	},
        {from:'beneficiation and processing',to:'crushing',value:0.0519	},
        {from:'beneficiation and processing',to:'grinding',value:0.4943	},
        {from:'beneficiation and processing',to:'separations',value:0.0459	},
        {from:'crops',to:'major field crops',value:0.280098	},
        {from:'crops',to:'vegetables and fruits',value:0.077064	},
        {from:'crops',to:'greenhouse and nursery',value:0.020254	},
        {from:'livestock',to:'beef and cattle ranching',value:0.077309	},
        {from:'livestock',to:'aquaculture and other',value:0.015086	},
        {from:'livestock',to:'dairy cattle and milk production',value:0.041288	},
        {from:'livestock',to:'hog and pig farming',value:0.017468	},
        {from:'livestock',to:'poultry and egg production',value:0.017468	},
        {from:'livestock',to:'cattle feedlots',value:0.019056	},
        {from:'construction of buildings',to:'new single-family housing construction (except for-sale builders)',value:0.025700021	},
        {from:'construction of buildings',to:'new multifamily housing construction (except for-sale builders)',value:0.00482619	},
        {from:'construction of buildings',to:'new housing for-sale builders',value:0.025322603	},
        {from:'construction of buildings',to:'residential remodelers',value:0.054346175	},
        {from:'construction of buildings',to:'industrial building construction',value:0.007857995	},
        {from:'construction of buildings',to:'commercial and institutional building construction',value:0.101075932	},
        {from:'heavy and civil engineering construction',to:'water and sewer line and related structures construction',value:0.064366051	},
        {from:'heavy and civil engineering construction',to:'oil and gas pipeline and related structures construction',value:0.05255128	},
        {from:'heavy and civil engineering construction',to:'power and communication line and related structures construction',value:0.054508735	},
        {from:'heavy and civil engineering construction',to:'land subdivision',value:0.002708969	},
        {from:'heavy and civil engineering construction',to:'highway, street, and bridge construction',value:0.215697941	},
        {from:'heavy and civil engineering construction',to:'other heavy and civil engineering construction',value:0.030841639	},
        {from:'specialty trade contractors',to:'poured concrete foundation and structure contractors',value:0.040781083	},
        {from:'specialty trade contractors',to:'structural steel and precast concrete contractors',value:0.011129577	},
        {from:'specialty trade contractors',to:'framing contractors',value:0.009684024	},
        {from:'specialty trade contractors',to:'masonry contractors',value:0.022089401	},
        {from:'specialty trade contractors',to:'glass and glazing contractors',value:0.009096901	},
        {from:'specialty trade contractors',to:'roofing contractors',value:0.038905398	},
        {from:'specialty trade contractors',to:'siding contractors',value:0.006938253	},
        {from:'specialty trade contractors',to:'other foundation, structure, and building exterior contractors',value:0.009125888	},
        {from:'specialty trade contractors',to:'electrical contractors and other wiring installation contractors',value:0.119010611	},
        {from:'specialty trade contractors',to:'plumbing, heating, and air-conditioning contractors',value:0.192806157	},
        {from:'specialty trade contractors',to:'other building equipment contractors',value:0.023784929	},
        {from:'specialty trade contractors',to:'drywall and insulation contractors',value:0.080250496	},
        {from:'specialty trade contractors',to:'painting and wall covering contractors',value:0.02981355	},
        {from:'specialty trade contractors',to:'flooring contractors',value:0.012089205	},
        {from:'specialty trade contractors',to:'tile and terrazzo contractors',value:0.009263377	},
        {from:'specialty trade contractors',to:'finish carpentry contractors',value:0.027080055	},
        {from:'specialty trade contractors',to:'other building finishing contractors',value:0.012152388	},
        {from:'specialty trade contractors',to:'site preparation contractors',value:0.24231359	},
        {from:'specialty trade contractors',to:'all other specialty trade contractors',value:0.078882702	},
        {from:'government sector',to:'national aeronautics and space administration',value:0.0083	},
        {from:'government sector',to:'other u.s. government agencies',value:0.039	},
        {from:'government sector',to:'department of agriculture',value:0.0063	},
        {from:'government sector',to:'department of defense',value:0.7306	},
        {from:'government sector',to:'department of energy',value:0.0294	},
        {from:'government sector',to:'department of health and human services',value:0.0095	},
        {from:'government sector',to:'department of justice',value:0.0156	},
        {from:'government sector',to:'department of transportation',value:0.0052	},
        {from:'government sector',to:'department of veterans affairs',value:0.0314	},
        {from:'government sector',to:'department of the interior',value:0.0062	},
        {from:'government sector',to:'general services administration',value:0.017	},
        {from:'government sector',to:'postal service',value:0.043	},
        {from:'department of defense',to:'dod-electricity',value:0.089656115	},
        {from:'department of defense',to:'dod-petroleum',value:0.017278481	},
        {from:'department of defense',to:'dod-natural gas',value:0.06483049	},
        {from:'department of defense',to:'dod-coal',value:0.009152822	},
        {from:'department of defense',to:'dod-renewables',value:0.004657044	},
        {from:'department of defense',to:'dod-other',value:0.00629	},
        {from:'department of defense',to:'auto gas',value:0.013519327	},
        {from:'department of defense',to:'dist-diesel',value:0.099632073	},
        {from:'department of defense',to:'aviation gas',value:0.000165595	},
        {from:'department of defense',to:'jet fuel',value:0.408064023	},
        {from:'municipal lighting',to:'traffic lighting',value:0.012002	},
        {from:'municipal lighting',to:'airport lighting',value:0.001632	},
        {from:'municipal lighting',to:'other municipal lighting',value:0.181356	},
        {from:'traffic lighting',to:'traffic signals',value:0.009724	},
        {from:'traffic lighting',to:'turn arrows',value:0.000204	},
        {from:'traffic lighting',to:'pedestrian signals',value:0.002074	},
        {from:'airport lighting',to:'approach systems',value:0.000204	},
        {from:'airport lighting',to:'touchdown lights',value:0.000408	},
        {from:'airport lighting',to:'centerline lights',value:0.000544	},
        {from:'airport lighting',to:'taxiway/runway edge lights',value:0.000476	},
        {from:'other municipal lighting',to:'billboards',value:0.00034	},
        {from:'other municipal lighting',to:'parking lots',value:0.075752	},
        {from:'other municipal lighting',to:'street lighting',value:0.105264	},
        {from:'industrial sector',to:'industrial-electricity',value:3.4	},
        {from:'industrial sector',to:'industrial-petroleum',value:1.39	},
        {from:'industrial sector',to:'industrial-natural gas',value:10.84	},
        {from:'industrial sector',to:'industrial-coal',value:1.43	},
        {from:'industrial sector',to:'industrial-other',value:7.11	},
        {from:'industrial-electricity',to:'manufacturing',value:2.6	},
        {from:'industrial-petroleum',to:'manufacturing',value:0.186	},
        {from:'industrial-natural gas',to:'manufacturing',value:8.856	},
        {from:'industrial-coal',to:'manufacturing',value:1.41	},
        {from:'industrial-other',to:'manufacturing',value:4.994	},
        {from:'manufacturing',to:'food',value:1.113	},
        {from:'food',to:'grain and oilseed milling',value:0.28	},
        {from:'grain and oilseed milling',to:'wet corn milling',value:0.138	},
        {from:'food',to:'sugar manufacturing',value:0.174	},
        {from:'food',to:'fruit and vegetable preserving and specialty food',value:0.144	},
        {from:'food',to:'dairy product',value:0.11	},
        {from:'food',to:'animal slaughtering and processing',value:0.199	},
        {from:'manufacturing',to:'beverage and tobacco products',value:0.095	},
        {from:'beverage and tobacco products',to:'beverages',value:0.086	},
        {from:'beverage and tobacco products',to:'tobacco',value:0.009	},
        {from:'manufacturing',to:'textile mills',value:0.097	},
        {from:'manufacturing',to:'textile product mills',value:0.028	},
        {from:'manufacturing',to:'apparel',value:0.005	},
        {from:'manufacturing',to:'leather and allied products',value:0.003	},
        {from:'manufacturing',to:'wood products',value:0.386	},
        {from:'wood products',to:'sawmills',value:0.123	},
        {from:'wood products',to:'veneer, plywood, and engineered woods',value:0.161	},
        {from:'veneer, plywood, and engineered woods',to:'reconstituted wood products',value:0.097	},
        {from:'wood products',to:'other wood products',value:0.094	},
        {from:'manufacturing',to:'paper',value:2.087	},
        {from:'paper',to:'pulp mills',value:0.255	},
        {from:'paper',to:'paper mills, except newsprint',value:0.751	},
        {from:'paper',to:'newsprint mills',value:0.059	},
        {from:'paper',to:'paperboard mills',value:0.915	},
        {from:'manufacturing',to:'printing and related support',value:0.09	},
        {from:'manufacturing',to:'petroleum and coal products',value:4.168	},
        {from:'petroleum and coal products',to:'petroleum refineries',value:3.372	},
        {from:'petroleum and coal products',to:'asphalt paving mixture and block',value:0.43	},
        {from:'petroleum and coal products',to:'asphalt shingle and coating materials',value:0.165	},
        {from:'petroleum and coal products',to:'other petroleum and coal products',value:0.201	},
        {from:'manufacturing',to:'chemicals',value:6.297	},
        {from:'chemicals',to:'petrochemicals',value:1.11	},
        {from:'chemicals',to:'industrial gases',value:0.185	},
        {from:'chemicals',to:'other basic inorganic chemicals',value:0.375	},
        {from:'chemicals',to:'ethyl alcohol',value:0.491	},
        {from:'chemicals',to:'cyclic crudes, intermediate and gum and wood chemicals',value:0.042	},
        {from:'chemicals',to:'other basic organic chemicals',value:1.414	},
        {from:'chemicals',to:'plastics materials and resins',value:1.775	},
        {from:'chemicals',to:'synthetic rubber',value:0.034	},
        {from:'chemicals',to:'artificial and synthetic fibers and filaments',value:0.035	},
        {from:'chemicals',to:'nitrogenous fertilizers',value:0.706	},
        {from:'chemicals',to:'phosphatic fertilizers',value:0.036	},
        {from:'chemicals',to:'pharmaceuticals and medicines',value:0.094	},
        {from:'pharmaceuticals and medicines',to:'pharmaceutical preparation',value:0.047	},
        {from:'chemicals',to:'photographic film, paper, plate, and chemicals',value:0.009	},
        {from:'manufacturing',to:'plastics and rubber products',value:0.295	},
        {from:'manufacturing',to:'nonmetallic mineral products',value:0.833	},
        {from:'nonmetallic mineral products',to:'clay building material and refractories',value:0.043	},
        {from:'nonmetallic mineral products',to:'flat glass',value:0.062	},
        {from:'nonmetallic mineral products',to:'other pressed and blown glass and glassware',value:0.032	},
        {from:'nonmetallic mineral products',to:'glass containers',value:0.058	},
        {from:'nonmetallic mineral products',to:'glass products from purchased glass',value:0.023	},
        {from:'nonmetallic mineral products',to:'cements',value:0.3	},
        {from:'nonmetallic mineral products',to:'lime',value:0.105	},
        {from:'nonmetallic mineral products',to:'gypsum',value:0.053	},
        {from:'nonmetallic mineral products',to:'mineral wool',value:0.033	},
        {from:'manufacturing',to:'primary metals',value:1.641	},
        {from:'primary metals',to:'iron and steel mills and ferroalloys',value:1.101	},
        {from:'primary metals',to:'steel products from purchased steel',value:0.058	},
        {from:'primary metals',to:'alumina and aluminum',value:0.254	},
        {from:'alumina and aluminum',to:'secondary smelting and alloying of aluminum',value:0.02	},
        {from:'alumina and aluminum',to:'aluminum sheet, plate and foils',value:0.062	},
        {from:'alumina and aluminum',to:'other aluminum rolling, drawing and extruding',value:0.021	},
        {from:'primary metals',to:'nonferrous metals, except aluminum',value:0.109	},
        {from:'nonferrous metals, except aluminum',to:'nonferrous metal (except aluminum) smelting and refining',value:0.052	},
        {from:'primary metals',to:'foundries',value:0.119	},
        {from:'foundries',to:'iron foundries',value:0.054	},
        {from:'foundries',to:'nonferrous metal die-casting foundries',value:0.024	},
        {from:'foundries',to:'aluminum foundries, except die-casting',value:0.011	},
        {from:'manufacturing',to:'fabricated metal products',value:0.349	},
        {from:'manufacturing',to:'machinery',value:0.165	},
        {from:'manufacturing',to:'computer and electronic products',value:0.162	},
        {from:'computer and electronic products',to:'semiconductors and related devices',value:0.09	},
        {from:'manufacturing',to:'electrical equip., appliances, and components',value:0.074	},
        {from:'manufacturing',to:'transportation equipment',value:0.323	},
        {from:'transportation equipment',to:'automobiles',value:0.033	},
        {from:'transportation equipment',to:'light trucks and utility vehicles',value:0.039	},
        {from:'transportation equipment',to:'aerospace product and parts',value:0.069	},
        {from:'aerospace product and parts',to:'aircraft',value:0.023	},
        {from:'manufacturing',to:'furniture and related products',value:0.037	},
        {from:'manufacturing',to:'miscellaneous',value:0.057	},
        {from:'wet corn milling',to:'energy materials in products',value:0	},
        {from:'sugar manufacturing',to:'energy materials in products',value:0	},
        {from:'animal slaughtering and processing',to:'energy materials in products',value:0	},
        {from:'beverages',to:'energy materials in products',value:0	},
        {from:'tobacco',to:'energy materials in products',value:0	},
        {from:'sawmills',to:'energy materials in products',value:0	},
        {from:'veneer, plywood, and engineered woods',to:'energy materials in products',value:0	},
        {from:'reconstituted wood products',to:'energy materials in products',value:0	},
        {from:'other wood products',to:'energy materials in products',value:0	},
        {from:'pulp mills',to:'energy materials in products',value:0	},
        {from:'paper mills, except newsprint',to:'energy materials in products',value:0	},
        {from:'newsprint mills',to:'energy materials in products',value:0	},
        {from:'paperboard mills',to:'energy materials in products',value:0	},
        {from:'petroleum refineries',to:'energy materials in products',value:0	},
        {from:'synthetic rubber',to:'energy materials in products',value:0	},
        {from:'artificial and synthetic fibers and filaments',to:'energy materials in products',value:0	},
        {from:'phosphatic fertilizers',to:'energy materials in products',value:0	},
        {from:'pharmaceutical preparation',to:'energy materials in products',value:0	},
        {from:'photographic film, paper, plate, and chemicals',to:'energy materials in products',value:0	},
        {from:'clay building material and refractories',to:'energy materials in products',value:0	},
        {from:'flat glass',to:'energy materials in products',value:0	},
        {from:'other pressed and blown glass and glassware',to:'energy materials in products',value:0	},
        {from:'glass containers',to:'energy materials in products',value:0	},
        {from:'glass products from purchased glass',to:'energy materials in products',value:0	},
        {from:'lime',to:'energy materials in products',value:0	},
        {from:'gypsum',to:'energy materials in products',value:0	},
        {from:'mineral wool',to:'energy materials in products',value:0	},
        {from:'secondary smelting and alloying of aluminum',to:'energy materials in products',value:0	},
        {from:'aluminum sheet, plate and foils',to:'energy materials in products',value:0	},
        {from:'other aluminum rolling, drawing and extruding',to:'energy materials in products',value:0.001	},
        {from:'nonferrous metal (except aluminum) smelting and refining',to:'energy materials in products',value:0.004	},
        {from:'iron foundries',to:'energy materials in products',value:0.002	},
        {from:'nonferrous metal die-casting foundries',to:'energy materials in products',value:0	},
        {from:'aluminum foundries, except die-casting',to:'energy materials in products',value:0	},
        {from:'semiconductors and related devices',to:'energy materials in products',value:0	},
        {from:'automobiles',to:'energy materials in products',value:0	},
        {from:'light trucks and utility vehicles',to:'energy materials in products',value:0	},
        {from:'aircraft',to:'energy materials in products',value:0	},
        {from:'wet corn milling',to:'boiler fuel',value:0.066	},
        {from:'wet corn milling',to:'process energy',value:0.036	},
        {from:'wet corn milling',to:'nonprocess energy',value:0.003	},
        {from:'wet corn milling',to:'end use not reported',value:0.035	},
        {from:'tobacco',to:'end use not reported',value:0	},
        {from:'reconstituted wood products',to:'boiler fuel',value:0.004	},
        {from:'reconstituted wood products',to:'process energy',value:0.032	},
        {from:'reconstituted wood products',to:'nonprocess energy',value:0.002	},
        {from:'reconstituted wood products',to:'end use not reported',value:0.058	},
        {from:'other wood products',to:'end use not reported',value:0	},
        {from:'pulp mills',to:'nonprocess energy',value:0	},
        {from:'asphalt shingle and coating materials',to:'end use not reported',value:0	},
        {from:'artificial and synthetic fibers and filaments',to:'end use not reported',value:0	},
        {from:'phosphatic fertilizers',to:'end use not reported',value:0	},
        {from:'pharmaceutical preparation',to:'boiler fuel',value:0.016	},
        {from:'pharmaceutical preparation',to:'process energy',value:0.013	},
        {from:'pharmaceutical preparation',to:'nonprocess energy',value:0.014	},
        {from:'pharmaceutical preparation',to:'end use not reported',value:0.003	},
        {from:'flat glass',to:'boiler fuel',value:0	},
        {from:'other pressed and blown glass and glassware',to:'end use not reported',value:0	},
        {from:'glass containers',to:'boiler fuel',value:0	},
        {from:'glass containers',to:'end use not reported',value:0	},
        {from:'lime',to:'boiler fuel',value:0	},
        {from:'gypsum',to:'end use not reported',value:0	},
        {from:'mineral wool',to:'boiler fuel',value:0	},
        {from:'secondary smelting and alloying of aluminum',to:'boiler fuel',value:0	},
        {from:'secondary smelting and alloying of aluminum',to:'process energy',value:0.016	},
        {from:'secondary smelting and alloying of aluminum',to:'nonprocess energy',value:0.002	},
        {from:'secondary smelting and alloying of aluminum',to:'end use not reported',value:0.001	},
        {from:'aluminum sheet, plate and foils',to:'boiler fuel',value:0.002	},
        {from:'aluminum sheet, plate and foils',to:'process energy',value:0.051	},
        {from:'aluminum sheet, plate and foils',to:'nonprocess energy',value:0.007	},
        {from:'aluminum sheet, plate and foils',to:'end use not reported',value:0.002	},
        {from:'other aluminum rolling, drawing and extruding',to:'boiler fuel',value:0.001	},
        {from:'other aluminum rolling, drawing and extruding',to:'process energy',value:0.015	},
        {from:'other aluminum rolling, drawing and extruding',to:'nonprocess energy',value:0.003	},
        {from:'other aluminum rolling, drawing and extruding',to:'end use not reported',value:0	},
        {from:'nonferrous metal (except aluminum) smelting and refining',to:'boiler fuel',value:0.006	},
        {from:'nonferrous metal (except aluminum) smelting and refining',to:'process energy',value:0.035	},
        {from:'nonferrous metal (except aluminum) smelting and refining',to:'nonprocess energy',value:0.002	},
        {from:'nonferrous metal (except aluminum) smelting and refining',to:'end use not reported',value:0.004	},
        {from:'iron foundries',to:'boiler fuel',value:0	},
        {from:'iron foundries',to:'process energy',value:0.025	},
        {from:'iron foundries',to:'nonprocess energy',value:0.01	},
        {from:'iron foundries',to:'end use not reported',value:0.015	},
        {from:'nonferrous metal die-casting foundries',to:'boiler fuel',value:0.001	},
        {from:'nonferrous metal die-casting foundries',to:'process energy',value:0.018	},
        {from:'nonferrous metal die-casting foundries',to:'nonprocess energy',value:0.005	},
        {from:'nonferrous metal die-casting foundries',to:'end use not reported',value:0	},
        {from:'aluminum foundries, except die-casting',to:'boiler fuel',value:0	},
        {from:'aluminum foundries, except die-casting',to:'process energy',value:0.009	},
        {from:'aluminum foundries, except die-casting',to:'nonprocess energy',value:0.002	},
        {from:'aluminum foundries, except die-casting',to:'end use not reported',value:0	},
        {from:'aircraft',to:'boiler fuel',value:0.004	},
        {from:'aircraft',to:'process energy',value:0.005	},
        {from:'aircraft',to:'nonprocess energy',value:0.012	},
        {from:'aircraft',to:'end use not reported',value:0	},
        {from:'boiler fuel',to:'conventional boiler use',value:0.772	},
        {from:'boiler fuel',to:'chp and/or cogeneration process',value:1.775	},
        {from:'process energy',to:'process heating',value:2.682	},
        {from:'process energy',to:'process cooling and refrigeration',value:0.158	},
        {from:'process energy',to:'machine drive',value:1.025	},
        {from:'process energy',to:'electro-chemical processes',value:0.163	},
        {from:'process energy',to:'other process use',value:0.209	},
        {from:'nonprocess energy',to:'facility hvac',value:0.307	},
        {from:'nonprocess energy',to:'facility lighting',value:0.083	},
        {from:'nonprocess energy',to:'other facility support',value:0.05	},
        {from:'nonprocess energy',to:'onsite transportation',value:0.035	},
        {from:'nonprocess energy',to:'conventional electricity generation',value:0.007	},
        {from:'nonprocess energy',to:'other nonprocess use',value:0.009	},
        {from:'industrial-electricity',to:'non-manufacturing',value:0.6887	},
        {from:'industrial-petroleum',to:'non-manufacturing',value:1.2064	},
        {from:'industrial-natural gas',to:'non-manufacturing',value:2.0979	},
        {from:'industrial-coal',to:'non-manufacturing',value:0.0174	},
        {from:'industrial-other',to:'non-manufacturing',value:1.63867	},
        {from:'non-manufacturing',to:'agriculture',value:1.167	},
        {from:'non-manufacturing',to:'mining',value:2.97517	},
        {from:'non-manufacturing',to:'construction',value:1.5069	},
        {from:'non-manufacturing',to:'data centers',value:0.2388	},
        {from:'industrial-electricity',to:'non-manufacturing',value:0.2388	},
        {from:'electricity net imports',to:'electricity net imports (passthrough1)',value:0.226589258	},
        {from:'electricity net imports (passthrough1)',to:'electricity',value:0.226589258	},
        {from:'education',to:'education (passthrough1)',value:0.299	},
        {from:'education (passthrough1)',to:'space heating',value:0.299	},
        {from:'education',to:'education (passthrough1)',value:0.091	},
        {from:'education (passthrough1)',to:'air conditioning',value:0.091	},
        {from:'education',to:'education (passthrough1)',value:0.068	},
        {from:'education (passthrough1)',to:'education (passthrough2)',value:0.068	},
        {from:'education (passthrough2)',to:'ventilation',value:0.068	},
        {from:'education',to:'education (passthrough1)',value:0.068	},
        {from:'education (passthrough1)',to:'water heating',value:0.068	},
        {from:'education',to:'education (passthrough1)',value:0.078	},
        {from:'education (passthrough1)',to:'education (passthrough2)',value:0.078	},
        {from:'education (passthrough2)',to:'lighting',value:0.078	},
        {from:'education',to:'education (passthrough1)',value:0.015	},
        {from:'education (passthrough1)',to:'education (passthrough2)',value:0.015	},
        {from:'education (passthrough2)',to:'cooking',value:0.015	},
        {from:'education',to:'education (passthrough1)',value:0.04	},
        {from:'education (passthrough1)',to:'refrigerators',value:0.04	},
        {from:'education',to:'education (passthrough1)',value:0.084	},
        {from:'education (passthrough1)',to:'education (passthrough2)',value:0.084	},
        {from:'education (passthrough2)',to:'other appliances',value:0.084	},
        {from:'food sales',to:'food sales (passthrough1)',value:0.031	},
        {from:'food sales (passthrough1)',to:'space heating',value:0.031	},
        {from:'food sales',to:'food sales (passthrough1)',value:0.006	},
        {from:'food sales (passthrough1)',to:'air conditioning',value:0.006	},
        {from:'food sales',to:'food sales (passthrough1)',value:0.012	},
        {from:'food sales (passthrough1)',to:'food sales (passthrough2)',value:0.012	},
        {from:'food sales (passthrough2)',to:'ventilation',value:0.012	},
        {from:'food sales',to:'food sales (passthrough1)',value:0.003	},
        {from:'food sales (passthrough1)',to:'water heating',value:0.003	},
        {from:'food sales',to:'food sales (passthrough1)',value:0.016	},
        {from:'food sales (passthrough1)',to:'food sales (passthrough2)',value:0.016	},
        {from:'food sales (passthrough2)',to:'lighting',value:0.016	},
        {from:'food sales',to:'food sales (passthrough1)',value:0.029	},
        {from:'food sales (passthrough1)',to:'food sales (passthrough2)',value:0.029	},
        {from:'food sales (passthrough2)',to:'cooking',value:0.029	},
        {from:'food sales',to:'food sales (passthrough1)',value:0.147	},
        {from:'food sales (passthrough1)',to:'refrigerators',value:0.147	},
        {from:'food sales',to:'food sales (passthrough1)',value:0.014	},
        {from:'food sales (passthrough1)',to:'food sales (passthrough2)',value:0.014	},
        {from:'food sales (passthrough2)',to:'other appliances',value:0.014	},
        {from:'food service',to:'food service (passthrough1)',value:0.046	},
        {from:'food service (passthrough1)',to:'space heating',value:0.046	},
        {from:'food service',to:'food service (passthrough1)',value:0.03	},
        {from:'food service (passthrough1)',to:'air conditioning',value:0.03	},
        {from:'food service',to:'food service (passthrough1)',value:0.031	},
        {from:'food service (passthrough1)',to:'food service (passthrough2)',value:0.031	},
        {from:'food service (passthrough2)',to:'ventilation',value:0.031	},
        {from:'food service',to:'food service (passthrough1)',value:0.043	},
        {from:'food service (passthrough1)',to:'water heating',value:0.043	},
        {from:'food service',to:'food service (passthrough1)',value:0.019	},
        {from:'food service (passthrough1)',to:'food service (passthrough2)',value:0.019	},
        {from:'food service (passthrough2)',to:'lighting',value:0.019	},
        {from:'food service',to:'food service (passthrough1)',value:0.199	},
        {from:'food service (passthrough1)',to:'food service (passthrough2)',value:0.199	},
        {from:'food service (passthrough2)',to:'cooking',value:0.199	},
        {from:'food service',to:'food service (passthrough1)',value:0.114	},
        {from:'food service (passthrough1)',to:'refrigerators',value:0.114	},
        {from:'food service',to:'food service (passthrough1)',value:0.021	},
        {from:'food service (passthrough1)',to:'food service (passthrough2)',value:0.021	},
        {from:'food service (passthrough2)',to:'other appliances',value:0.021	},
        {from:'healthcare-inpatient',to:'healthcare-inpatient (passthrough1)',value:0.164	},
        {from:'healthcare-inpatient (passthrough1)',to:'space heating',value:0.164	},
        {from:'healthcare-inpatient',to:'healthcare-inpatient (passthrough1)',value:0.067	},
        {from:'healthcare-inpatient (passthrough1)',to:'air conditioning',value:0.067	},
        {from:'healthcare-inpatient',to:'healthcare-inpatient (passthrough1)',value:0.046	},
        {from:'healthcare-inpatient (passthrough1)',to:'healthcare-inpatient (passthrough2)',value:0.046	},
        {from:'healthcare-inpatient (passthrough2)',to:'ventilation',value:0.046	},
        {from:'healthcare-inpatient',to:'healthcare-inpatient (passthrough1)',value:0.078	},
        {from:'healthcare-inpatient (passthrough1)',to:'water heating',value:0.078	},
        {from:'healthcare-inpatient',to:'healthcare-inpatient (passthrough1)',value:0.04	},
        {from:'healthcare-inpatient (passthrough1)',to:'healthcare-inpatient (passthrough2)',value:0.04	},
        {from:'healthcare-inpatient (passthrough2)',to:'lighting',value:0.04	},
        {from:'healthcare-inpatient',to:'healthcare-inpatient (passthrough1)',value:0.047	},
        {from:'healthcare-inpatient (passthrough1)',to:'healthcare-inpatient (passthrough2)',value:0.047	},
        {from:'healthcare-inpatient (passthrough2)',to:'cooking',value:0.047	},
        {from:'healthcare-inpatient',to:'healthcare-inpatient (passthrough1)',value:0.014	},
        {from:'healthcare-inpatient (passthrough1)',to:'refrigerators',value:0.014	},
        {from:'healthcare-inpatient',to:'healthcare-inpatient (passthrough1)',value:0.059	},
        {from:'healthcare-inpatient (passthrough1)',to:'healthcare-inpatient (passthrough2)',value:0.059	},
        {from:'healthcare-inpatient (passthrough2)',to:'other appliances',value:0.059	},
        {from:'healthcare-outpatient',to:'healthcare-outpatient (passthrough1)',value:0.046	},
        {from:'healthcare-outpatient (passthrough1)',to:'space heating',value:0.046	},
        {from:'healthcare-outpatient',to:'healthcare-outpatient (passthrough1)',value:0.012	},
        {from:'healthcare-outpatient (passthrough1)',to:'air conditioning',value:0.012	},
        {from:'healthcare-outpatient',to:'healthcare-outpatient (passthrough1)',value:0.037	},
        {from:'healthcare-outpatient (passthrough1)',to:'healthcare-outpatient (passthrough2)',value:0.037	},
        {from:'healthcare-outpatient (passthrough2)',to:'ventilation',value:0.037	},
        {from:'healthcare-outpatient',to:'healthcare-outpatient (passthrough1)',value:0.004	},
        {from:'healthcare-outpatient (passthrough1)',to:'water heating',value:0.004	},
        {from:'healthcare-outpatient',to:'healthcare-outpatient (passthrough1)',value:0.021	},
        {from:'healthcare-outpatient (passthrough1)',to:'healthcare-outpatient (passthrough2)',value:0.021	},
        {from:'healthcare-outpatient (passthrough2)',to:'lighting',value:0.021	},
        {from:'healthcare-outpatient',to:'healthcare-outpatient (passthrough1)',value:0.004	},
        {from:'healthcare-outpatient (passthrough1)',to:'healthcare-outpatient (passthrough2)',value:0.004	},
        {from:'healthcare-outpatient (passthrough2)',to:'cooking',value:0.004	},
        {from:'healthcare-outpatient',to:'healthcare-outpatient (passthrough1)',value:0.004	},
        {from:'healthcare-outpatient (passthrough1)',to:'refrigerators',value:0.004	},
        {from:'healthcare-outpatient',to:'healthcare-outpatient (passthrough1)',value:0.023	},
        {from:'healthcare-outpatient (passthrough1)',to:'healthcare-outpatient (passthrough2)',value:0.023	},
        {from:'healthcare-outpatient (passthrough2)',to:'other appliances',value:0.023	},
        {from:'lodging',to:'lodging (passthrough1)',value:0.067	},
        {from:'lodging (passthrough1)',to:'space heating',value:0.067	},
        {from:'lodging',to:'lodging (passthrough1)',value:0.039	},
        {from:'lodging (passthrough1)',to:'air conditioning',value:0.039	},
        {from:'lodging',to:'lodging (passthrough1)',value:0.049	},
        {from:'lodging (passthrough1)',to:'lodging (passthrough2)',value:0.049	},
        {from:'lodging (passthrough2)',to:'ventilation',value:0.049	},
        {from:'lodging',to:'lodging (passthrough1)',value:0.136	},
        {from:'lodging (passthrough1)',to:'water heating',value:0.136	},
        {from:'lodging',to:'lodging (passthrough1)',value:0.04	},
        {from:'lodging (passthrough1)',to:'lodging (passthrough2)',value:0.04	},
        {from:'lodging (passthrough2)',to:'lighting',value:0.04	},
        {from:'lodging',to:'lodging (passthrough1)',value:0.069	},
        {from:'lodging (passthrough1)',to:'lodging (passthrough2)',value:0.069	},
        {from:'lodging (passthrough2)',to:'cooking',value:0.069	},
        {from:'lodging',to:'lodging (passthrough1)',value:0.033	},
        {from:'lodging (passthrough1)',to:'refrigerators',value:0.033	},
        {from:'lodging',to:'lodging (passthrough1)',value:0.083	},
        {from:'lodging (passthrough1)',to:'lodging (passthrough2)',value:0.083	},
        {from:'lodging (passthrough2)',to:'other appliances',value:0.083	},
        {from:'retail (other than mall)',to:'retail (other than mall) (passthrough1)',value:0.076	},
        {from:'retail (other than mall) (passthrough1)',to:'space heating',value:0.076	},
        {from:'retail (other than mall)',to:'retail (other than mall) (passthrough1)',value:0.04	},
        {from:'retail (other than mall) (passthrough1)',to:'air conditioning',value:0.04	},
        {from:'retail (other than mall)',to:'retail (other than mall) (passthrough1)',value:0.047	},
        {from:'retail (other than mall) (passthrough1)',to:'retail (other than mall) (passthrough2)',value:0.047	},
        {from:'retail (other than mall) (passthrough2)',to:'ventilation',value:0.047	},
        {from:'retail (other than mall)',to:'retail (other than mall) (passthrough1)',value:0.005	},
        {from:'retail (other than mall) (passthrough1)',to:'water heating',value:0.005	},
        {from:'retail (other than mall)',to:'retail (other than mall) (passthrough1)',value:0.072	},
        {from:'retail (other than mall) (passthrough1)',to:'retail (other than mall) (passthrough2)',value:0.072	},
        {from:'retail (other than mall) (passthrough2)',to:'lighting',value:0.072	},
        {from:'retail (other than mall)',to:'retail (other than mall) (passthrough1)',value:0.008	},
        {from:'retail (other than mall) (passthrough1)',to:'retail (other than mall) (passthrough2)',value:0.008	},
        {from:'retail (other than mall) (passthrough2)',to:'cooking',value:0.008	},
        {from:'retail (other than mall)',to:'retail (other than mall) (passthrough1)',value:0.053	},
        {from:'retail (other than mall) (passthrough1)',to:'refrigerators',value:0.053	},
        {from:'retail (other than mall)',to:'retail (other than mall) (passthrough1)',value:0.046	},
        {from:'retail (other than mall) (passthrough1)',to:'retail (other than mall) (passthrough2)',value:0.046	},
        {from:'retail (other than mall) (passthrough2)',to:'other appliances',value:0.046	},
        {from:'enclosed and strip malls',to:'enclosed and strip malls (passthrough1)',value:0.106	},
        {from:'enclosed and strip malls (passthrough1)',to:'space heating',value:0.106	},
        {from:'enclosed and strip malls',to:'enclosed and strip malls (passthrough1)',value:0.052	},
        {from:'enclosed and strip malls (passthrough1)',to:'air conditioning',value:0.052	},
        {from:'enclosed and strip malls',to:'enclosed and strip malls (passthrough1)',value:0.075	},
        {from:'enclosed and strip malls (passthrough1)',to:'enclosed and strip malls (passthrough2)',value:0.075	},
        {from:'enclosed and strip malls (passthrough2)',to:'ventilation',value:0.075	},
        {from:'enclosed and strip malls',to:'enclosed and strip malls (passthrough1)',value:0.061	},
        {from:'enclosed and strip malls (passthrough1)',to:'water heating',value:0.061	},
        {from:'enclosed and strip malls',to:'enclosed and strip malls (passthrough1)',value:0.068	},
        {from:'enclosed and strip malls (passthrough1)',to:'enclosed and strip malls (passthrough2)',value:0.068	},
        {from:'enclosed and strip malls (passthrough2)',to:'lighting',value:0.068	},
        {from:'enclosed and strip malls',to:'enclosed and strip malls (passthrough1)',value:0.064	},
        {from:'enclosed and strip malls (passthrough1)',to:'enclosed and strip malls (passthrough2)',value:0.064	},
        {from:'enclosed and strip malls (passthrough2)',to:'cooking',value:0.064	},
        {from:'enclosed and strip malls',to:'enclosed and strip malls (passthrough1)',value:0.139	},
        {from:'enclosed and strip malls (passthrough1)',to:'refrigerators',value:0.139	},
        {from:'enclosed and strip malls',to:'enclosed and strip malls (passthrough1)',value:0.057	},
        {from:'enclosed and strip malls (passthrough1)',to:'enclosed and strip malls (passthrough2)',value:0.057	},
        {from:'enclosed and strip malls (passthrough2)',to:'other appliances',value:0.057	},
        {from:'office',to:'office (passthrough1)',value:0.305	},
        {from:'office (passthrough1)',to:'space heating',value:0.305	},
        {from:'office',to:'office (passthrough1)',value:0.118	},
        {from:'office (passthrough1)',to:'air conditioning',value:0.118	},
        {from:'office',to:'office (passthrough1)',value:0.214	},
        {from:'office (passthrough1)',to:'office (passthrough2)',value:0.214	},
        {from:'office (passthrough2)',to:'ventilation',value:0.214	},
        {from:'office',to:'office (passthrough1)',value:0.035	},
        {from:'office (passthrough1)',to:'water heating',value:0.035	},
        {from:'office',to:'office (passthrough1)',value:0.148	},
        {from:'office (passthrough1)',to:'office (passthrough2)',value:0.148	},
        {from:'office (passthrough2)',to:'lighting',value:0.148	},
        {from:'office',to:'office (passthrough1)',value:0.028	},
        {from:'office (passthrough1)',to:'refrigerators',value:0.028	},
        {from:'office',to:'office (passthrough1)',value:0.153	},
        {from:'office (passthrough1)',to:'office (passthrough2)',value:0.153	},
        {from:'office (passthrough2)',to:'other appliances',value:0.153	},
        {from:'public assembly',to:'public assembly (passthrough1)',value:0.189	},
        {from:'public assembly (passthrough1)',to:'space heating',value:0.189	},
        {from:'public assembly',to:'public assembly (passthrough1)',value:0.086	},
        {from:'public assembly (passthrough1)',to:'air conditioning',value:0.086	},
        {from:'public assembly',to:'public assembly (passthrough1)',value:0.024	},
        {from:'public assembly (passthrough1)',to:'public assembly (passthrough2)',value:0.024	},
        {from:'public assembly (passthrough2)',to:'ventilation',value:0.024	},
        {from:'public assembly',to:'public assembly (passthrough1)',value:0.007	},
        {from:'public assembly (passthrough1)',to:'water heating',value:0.007	},
        {from:'public assembly',to:'public assembly (passthrough1)',value:0.035	},
        {from:'public assembly (passthrough1)',to:'public assembly (passthrough2)',value:0.035	},
        {from:'public assembly (passthrough2)',to:'lighting',value:0.035	},
        {from:'public assembly',to:'public assembly (passthrough1)',value:0.014	},
        {from:'public assembly (passthrough1)',to:'public assembly (passthrough2)',value:0.014	},
        {from:'public assembly (passthrough2)',to:'cooking',value:0.014	},
        {from:'public assembly',to:'public assembly (passthrough1)',value:0.025	},
        {from:'public assembly (passthrough1)',to:'refrigerators',value:0.025	},
        {from:'public assembly',to:'public assembly (passthrough1)',value:0.072	},
        {from:'public assembly (passthrough1)',to:'public assembly (passthrough2)',value:0.072	},
        {from:'public assembly (passthrough2)',to:'other appliances',value:0.072	},
        {from:'public order and safety',to:'public order and safety (passthrough1)',value:0.036	},
        {from:'public order and safety (passthrough1)',to:'space heating',value:0.036	},
        {from:'public order and safety',to:'public order and safety (passthrough1)',value:0.016	},
        {from:'public order and safety (passthrough1)',to:'air conditioning',value:0.016	},
        {from:'public order and safety',to:'public order and safety (passthrough1)',value:0.005	},
        {from:'public order and safety (passthrough1)',to:'public order and safety (passthrough2)',value:0.005	},
        {from:'public order and safety (passthrough2)',to:'ventilation',value:0.005	},
        {from:'public order and safety',to:'public order and safety (passthrough1)',value:0.021	},
        {from:'public order and safety (passthrough1)',to:'water heating',value:0.021	},
        {from:'public order and safety',to:'public order and safety (passthrough1)',value:0.015	},
        {from:'public order and safety (passthrough1)',to:'public order and safety (passthrough2)',value:0.015	},
        {from:'public order and safety (passthrough2)',to:'lighting',value:0.015	},
        {from:'public order and safety',to:'public order and safety (passthrough1)',value:0.004	},
        {from:'public order and safety (passthrough1)',to:'public order and safety (passthrough2)',value:0.004	},
        {from:'public order and safety (passthrough2)',to:'cooking',value:0.004	},
        {from:'public order and safety',to:'public order and safety (passthrough1)',value:0.003	},
        {from:'public order and safety (passthrough1)',to:'refrigerators',value:0.003	},
        {from:'public order and safety',to:'public order and safety (passthrough1)',value:0.022	},
        {from:'public order and safety (passthrough1)',to:'public order and safety (passthrough2)',value:0.022	},
        {from:'public order and safety (passthrough2)',to:'other appliances',value:0.022	},
        {from:'religious worship',to:'religious worship (passthrough1)',value:0.075	},
        {from:'religious worship (passthrough1)',to:'space heating',value:0.075	},
        {from:'religious worship',to:'religious worship (passthrough1)',value:0.015	},
        {from:'religious worship (passthrough1)',to:'air conditioning',value:0.015	},
        {from:'religious worship',to:'religious worship (passthrough1)',value:0.013	},
        {from:'religious worship (passthrough1)',to:'religious worship (passthrough2)',value:0.013	},
        {from:'religious worship (passthrough2)',to:'ventilation',value:0.013	},
        {from:'religious worship',to:'religious worship (passthrough1)',value:0.009	},
        {from:'religious worship (passthrough1)',to:'religious worship (passthrough2)',value:0.009	},
        {from:'religious worship (passthrough2)',to:'lighting',value:0.009	},
        {from:'religious worship',to:'religious worship (passthrough1)',value:0.011	},
        {from:'religious worship (passthrough1)',to:'religious worship (passthrough2)',value:0.011	},
        {from:'religious worship (passthrough2)',to:'cooking',value:0.011	},
        {from:'religious worship',to:'religious worship (passthrough1)',value:0.004	},
        {from:'religious worship (passthrough1)',to:'refrigerators',value:0.004	},
        {from:'religious worship',to:'religious worship (passthrough1)',value:0.026	},
        {from:'religious worship (passthrough1)',to:'religious worship (passthrough2)',value:0.026	},
        {from:'religious worship (passthrough2)',to:'other appliances',value:0.026	},
        {from:'service',to:'service (passthrough1)',value:0.118	},
        {from:'service (passthrough1)',to:'space heating',value:0.118	},
        {from:'service',to:'service (passthrough1)',value:0.021	},
        {from:'service (passthrough1)',to:'air conditioning',value:0.021	},
        {from:'service',to:'service (passthrough1)',value:0.014	},
        {from:'service (passthrough1)',to:'service (passthrough2)',value:0.014	},
        {from:'service (passthrough2)',to:'ventilation',value:0.014	},
        {from:'service',to:'service (passthrough1)',value:0.022	},
        {from:'service (passthrough1)',to:'water heating',value:0.022	},
        {from:'service',to:'service (passthrough1)',value:0.037	},
        {from:'service (passthrough1)',to:'service (passthrough2)',value:0.037	},
        {from:'service (passthrough2)',to:'lighting',value:0.037	},
        {from:'service',to:'service (passthrough1)',value:0.001	},
        {from:'service (passthrough1)',to:'service (passthrough2)',value:0.001	},
        {from:'service (passthrough2)',to:'cooking',value:0.001	},
        {from:'service',to:'service (passthrough1)',value:0.005	},
        {from:'service (passthrough1)',to:'refrigerators',value:0.005	},
        {from:'service',to:'service (passthrough1)',value:0.039	},
        {from:'service (passthrough1)',to:'service (passthrough2)',value:0.039	},
        {from:'service (passthrough2)',to:'other appliances',value:0.039	},
        {from:'warehouse and storage',to:'warehouse and storage (passthrough1)',value:0.116	},
        {from:'warehouse and storage (passthrough1)',to:'space heating',value:0.116	},
        {from:'warehouse and storage',to:'warehouse and storage (passthrough1)',value:0.035	},
        {from:'warehouse and storage (passthrough1)',to:'air conditioning',value:0.035	},
        {from:'warehouse and storage',to:'warehouse and storage (passthrough1)',value:0.013	},
        {from:'warehouse and storage (passthrough1)',to:'warehouse and storage (passthrough2)',value:0.013	},
        {from:'warehouse and storage (passthrough2)',to:'ventilation',value:0.013	},
        {from:'warehouse and storage',to:'warehouse and storage (passthrough1)',value:0.011	},
        {from:'warehouse and storage (passthrough1)',to:'water heating',value:0.011	},
        {from:'warehouse and storage',to:'warehouse and storage (passthrough1)',value:0.085	},
        {from:'warehouse and storage (passthrough1)',to:'warehouse and storage (passthrough2)',value:0.085	},
        {from:'warehouse and storage (passthrough2)',to:'lighting',value:0.085	},
        {from:'warehouse and storage',to:'warehouse and storage (passthrough1)',value:0.047	},
        {from:'warehouse and storage (passthrough1)',to:'refrigerators',value:0.047	},
        {from:'warehouse and storage',to:'warehouse and storage (passthrough1)',value:0.074	},
        {from:'warehouse and storage (passthrough1)',to:'warehouse and storage (passthrough2)',value:0.074	},
        {from:'warehouse and storage (passthrough2)',to:'other appliances',value:0.074	},
        {from:'commercial-other',to:'commercial-other (passthrough1)',value:0.069	},
        {from:'commercial-other (passthrough1)',to:'space heating',value:0.069	},
        {from:'commercial-other',to:'commercial-other (passthrough1)',value:0.026	},
        {from:'commercial-other (passthrough1)',to:'air conditioning',value:0.026	},
        {from:'commercial-other',to:'commercial-other (passthrough1)',value:0.016	},
        {from:'commercial-other (passthrough1)',to:'commercial-other (passthrough2)',value:0.016	},
        {from:'commercial-other (passthrough2)',to:'ventilation',value:0.016	},
        {from:'commercial-other',to:'commercial-other (passthrough1)',value:0.002	},
        {from:'commercial-other (passthrough1)',to:'water heating',value:0.002	},
        {from:'commercial-other',to:'commercial-other (passthrough1)',value:0.037	},
        {from:'commercial-other (passthrough1)',to:'commercial-other (passthrough2)',value:0.037	},
        {from:'commercial-other (passthrough2)',to:'lighting',value:0.037	},
        {from:'commercial-other',to:'commercial-other (passthrough1)',value:0.015	},
        {from:'commercial-other (passthrough1)',to:'refrigerators',value:0.015	},
        {from:'commercial-other',to:'commercial-other (passthrough1)',value:0.077	},
        {from:'commercial-other (passthrough1)',to:'commercial-other (passthrough2)',value:0.077	},
        {from:'commercial-other (passthrough2)',to:'other appliances',value:0.077	},
        {from:'vacant',to:'vacant (passthrough1)',value:0.013	},
        {from:'vacant (passthrough1)',to:'space heating',value:0.013	},
        {from:'vacant',to:'vacant (passthrough1)',value:0.002	},
        {from:'vacant (passthrough1)',to:'air conditioning',value:0.002	},
        {from:'vacant',to:'vacant (passthrough1)',value:0.004	},
        {from:'vacant (passthrough1)',to:'vacant (passthrough2)',value:0.004	},
        {from:'vacant (passthrough2)',to:'ventilation',value:0.004	},
        {from:'vacant',to:'vacant (passthrough1)',value:0.005	},
        {from:'vacant (passthrough1)',to:'vacant (passthrough2)',value:0.005	},
        {from:'vacant (passthrough2)',to:'lighting',value:0.005	},
        {from:'vacant',to:'vacant (passthrough1)',value:0.001	},
        {from:'vacant (passthrough1)',to:'refrigerators',value:0.001	},
        {from:'vacant',to:'vacant (passthrough1)',value:0.008	},
        {from:'vacant (passthrough1)',to:'vacant (passthrough2)',value:0.008	},
        {from:'vacant (passthrough2)',to:'other appliances',value:0.008	},
        {from:'mobile homes',to:'mobile homes (passthrough1)',value:0.15	},
        {from:'mobile homes (passthrough1)',to:'space heating',value:0.15	},
        {from:'mobile homes',to:'mobile homes (passthrough1)',value:0.039	},
        {from:'mobile homes (passthrough1)',to:'air conditioning',value:0.039	},
        {from:'mobile homes',to:'mobile homes (passthrough1)',value:0.08	},
        {from:'mobile homes (passthrough1)',to:'water heating',value:0.08	},
        {from:'mobile homes',to:'mobile homes (passthrough1)',value:0.029	},
        {from:'mobile homes (passthrough1)',to:'refrigerators',value:0.029	},
        {from:'mobile homes',to:'mobile homes (passthrough1)',value:0.173	},
        {from:'mobile homes (passthrough1)',to:'other-residential',value:0.173	},
        {from:'grain and oilseed milling',to:'grain and oilseed milling (passthrough1)',value:0.003	},
        {from:'grain and oilseed milling (passthrough1)',to:'energy materials in products',value:0.003	},
        {from:'grain and oilseed milling',to:'grain and oilseed milling (passthrough1)',value:0.13	},
        {from:'grain and oilseed milling (passthrough1)',to:'boiler fuel',value:0.13	},
        {from:'grain and oilseed milling',to:'grain and oilseed milling (passthrough1)',value:0.086	},
        {from:'grain and oilseed milling (passthrough1)',to:'process energy',value:0.086	},
        {from:'grain and oilseed milling',to:'grain and oilseed milling (passthrough1)',value:0.01	},
        {from:'grain and oilseed milling (passthrough1)',to:'nonprocess energy',value:0.01	},
        {from:'grain and oilseed milling',to:'grain and oilseed milling (passthrough1)',value:0.051	},
        {from:'grain and oilseed milling (passthrough1)',to:'end use not reported',value:0.051	},
        {from:'sugar manufacturing',to:'sugar manufacturing (passthrough1)',value:0.043	},
        {from:'sugar manufacturing (passthrough1)',to:'boiler fuel',value:0.043	},
        {from:'sugar manufacturing',to:'sugar manufacturing (passthrough1)',value:0.021	},
        {from:'sugar manufacturing (passthrough1)',to:'process energy',value:0.021	},
        {from:'sugar manufacturing',to:'sugar manufacturing (passthrough1)',value:0.002	},
        {from:'sugar manufacturing (passthrough1)',to:'nonprocess energy',value:0.002	},
        {from:'sugar manufacturing',to:'sugar manufacturing (passthrough1)',value:0.108	},
        {from:'sugar manufacturing (passthrough1)',to:'end use not reported',value:0.108	},
        {from:'fruit and vegetable preserving and specialty food',to:'fruit and vegetable preserving and specialty food (passthrough1)',value:0.001	},
        {from:'fruit and vegetable preserving and specialty food (passthrough1)',to:'energy materials in products',value:0.001	},
        {from:'fruit and vegetable preserving and specialty food',to:'fruit and vegetable preserving and specialty food (passthrough1)',value:0.07	},
        {from:'fruit and vegetable preserving and specialty food (passthrough1)',to:'boiler fuel',value:0.07	},
        {from:'fruit and vegetable preserving and specialty food',to:'fruit and vegetable preserving and specialty food (passthrough1)',value:0.045	},
        {from:'fruit and vegetable preserving and specialty food (passthrough1)',to:'process energy',value:0.045	},
        {from:'fruit and vegetable preserving and specialty food',to:'fruit and vegetable preserving and specialty food (passthrough1)',value:0.017	},
        {from:'fruit and vegetable preserving and specialty food (passthrough1)',to:'nonprocess energy',value:0.017	},
        {from:'fruit and vegetable preserving and specialty food',to:'fruit and vegetable preserving and specialty food (passthrough1)',value:0.011	},
        {from:'fruit and vegetable preserving and specialty food (passthrough1)',to:'end use not reported',value:0.011	},
        {from:'dairy product',to:'dairy product (passthrough1)',value:0.001	},
        {from:'dairy product (passthrough1)',to:'energy materials in products',value:0.001	},
        {from:'dairy product',to:'dairy product (passthrough1)',value:0.047	},
        {from:'dairy product (passthrough1)',to:'boiler fuel',value:0.047	},
        {from:'dairy product',to:'dairy product (passthrough1)',value:0.043	},
        {from:'dairy product (passthrough1)',to:'process energy',value:0.043	},
        {from:'dairy product',to:'dairy product (passthrough1)',value:0.011	},
        {from:'dairy product (passthrough1)',to:'nonprocess energy',value:0.011	},
        {from:'dairy product',to:'dairy product (passthrough1)',value:0.006	},
        {from:'dairy product (passthrough1)',to:'end use not reported',value:0.006	},
        {from:'animal slaughtering and processing',to:'animal slaughtering and processing (passthrough1)',value:0.084	},
        {from:'animal slaughtering and processing (passthrough1)',to:'boiler fuel',value:0.084	},
        {from:'animal slaughtering and processing',to:'animal slaughtering and processing (passthrough1)',value:0.075	},
        {from:'animal slaughtering and processing (passthrough1)',to:'process energy',value:0.075	},
        {from:'animal slaughtering and processing',to:'animal slaughtering and processing (passthrough1)',value:0.034	},
        {from:'animal slaughtering and processing (passthrough1)',to:'nonprocess energy',value:0.034	},
        {from:'animal slaughtering and processing',to:'animal slaughtering and processing (passthrough1)',value:0.006	},
        {from:'animal slaughtering and processing (passthrough1)',to:'end use not reported',value:0.006	},
        {from:'beverages',to:'beverages (passthrough1)',value:0.037	},
        {from:'beverages (passthrough1)',to:'boiler fuel',value:0.037	},
        {from:'beverages',to:'beverages (passthrough1)',value:0.024	},
        {from:'beverages (passthrough1)',to:'process energy',value:0.024	},
        {from:'beverages',to:'beverages (passthrough1)',value:0.015	},
        {from:'beverages (passthrough1)',to:'nonprocess energy',value:0.015	},
        {from:'beverages',to:'beverages (passthrough1)',value:0.009	},
        {from:'beverages (passthrough1)',to:'end use not reported',value:0.009	},
        {from:'tobacco',to:'tobacco (passthrough1)',value:0.004	},
        {from:'tobacco (passthrough1)',to:'boiler fuel',value:0.004	},
        {from:'tobacco',to:'tobacco (passthrough1)',value:0.003	},
        {from:'tobacco (passthrough1)',to:'process energy',value:0.003	},
        {from:'tobacco',to:'tobacco (passthrough1)',value:0.003	},
        {from:'tobacco (passthrough1)',to:'nonprocess energy',value:0.003	},
        {from:'sawmills',to:'sawmills (passthrough1)',value:0.002	},
        {from:'sawmills (passthrough1)',to:'boiler fuel',value:0.002	},
        {from:'sawmills',to:'sawmills (passthrough1)',value:0.02	},
        {from:'sawmills (passthrough1)',to:'process energy',value:0.02	},
        {from:'sawmills',to:'sawmills (passthrough1)',value:0.006	},
        {from:'sawmills (passthrough1)',to:'nonprocess energy',value:0.006	},
        {from:'sawmills',to:'sawmills (passthrough1)',value:0.095	},
        {from:'sawmills (passthrough1)',to:'end use not reported',value:0.095	},
        {from:'veneer, plywood, and engineered woods',to:'veneer, plywood, and engineered woods (passthrough1)',value:0.006	},
        {from:'veneer, plywood, and engineered woods (passthrough1)',to:'boiler fuel',value:0.006	},
        {from:'veneer, plywood, and engineered woods',to:'veneer, plywood, and engineered woods (passthrough1)',value:0.043	},
        {from:'veneer, plywood, and engineered woods (passthrough1)',to:'process energy',value:0.043	},
        {from:'veneer, plywood, and engineered woods',to:'veneer, plywood, and engineered woods (passthrough1)',value:0.007	},
        {from:'veneer, plywood, and engineered woods (passthrough1)',to:'nonprocess energy',value:0.007	},
        {from:'veneer, plywood, and engineered woods',to:'veneer, plywood, and engineered woods (passthrough1)',value:0.104	},
        {from:'veneer, plywood, and engineered woods (passthrough1)',to:'end use not reported',value:0.104	},
        {from:'other wood products',to:'other wood products (passthrough1)',value:0.004	},
        {from:'other wood products (passthrough1)',to:'boiler fuel',value:0.004	},
        {from:'other wood products',to:'other wood products (passthrough1)',value:0.028	},
        {from:'other wood products (passthrough1)',to:'process energy',value:0.028	},
        {from:'other wood products',to:'other wood products (passthrough1)',value:0.013	},
        {from:'other wood products (passthrough1)',to:'nonprocess energy',value:0.013	},
        {from:'pulp mills',to:'pulp mills (passthrough1)',value:0.018	},
        {from:'pulp mills (passthrough1)',to:'boiler fuel',value:0.018	},
        {from:'pulp mills',to:'pulp mills (passthrough1)',value:0.018	},
        {from:'pulp mills (passthrough1)',to:'process energy',value:0.018	},
        {from:'pulp mills',to:'pulp mills (passthrough1)',value:0.216	},
        {from:'pulp mills (passthrough1)',to:'end use not reported',value:0.216	},
        {from:'paper mills, except newsprint',to:'paper mills, except newsprint (passthrough1)',value:0.183	},
        {from:'paper mills, except newsprint (passthrough1)',to:'boiler fuel',value:0.183	},
        {from:'paper mills, except newsprint',to:'paper mills, except newsprint (passthrough1)',value:0.125	},
        {from:'paper mills, except newsprint (passthrough1)',to:'process energy',value:0.125	},
        {from:'paper mills, except newsprint',to:'paper mills, except newsprint (passthrough1)',value:0.013	},
        {from:'paper mills, except newsprint (passthrough1)',to:'nonprocess energy',value:0.013	},
        {from:'paper mills, except newsprint',to:'paper mills, except newsprint (passthrough1)',value:0.43	},
        {from:'paper mills, except newsprint (passthrough1)',to:'end use not reported',value:0.43	},
        {from:'newsprint mills',to:'newsprint mills (passthrough1)',value:0.008	},
        {from:'newsprint mills (passthrough1)',to:'boiler fuel',value:0.008	},
        {from:'newsprint mills',to:'newsprint mills (passthrough1)',value:0.028	},
        {from:'newsprint mills (passthrough1)',to:'process energy',value:0.028	},
        {from:'newsprint mills',to:'newsprint mills (passthrough1)',value:0.001	},
        {from:'newsprint mills (passthrough1)',to:'nonprocess energy',value:0.001	},
        {from:'newsprint mills',to:'newsprint mills (passthrough1)',value:0.023	},
        {from:'newsprint mills (passthrough1)',to:'end use not reported',value:0.023	},
        {from:'paperboard mills',to:'paperboard mills (passthrough1)',value:0.187	},
        {from:'paperboard mills (passthrough1)',to:'boiler fuel',value:0.187	},
        {from:'paperboard mills',to:'paperboard mills (passthrough1)',value:0.096	},
        {from:'paperboard mills (passthrough1)',to:'process energy',value:0.096	},
        {from:'paperboard mills',to:'paperboard mills (passthrough1)',value:0.011	},
        {from:'paperboard mills (passthrough1)',to:'nonprocess energy',value:0.011	},
        {from:'paperboard mills',to:'paperboard mills (passthrough1)',value:0.622	},
        {from:'paperboard mills (passthrough1)',to:'end use not reported',value:0.622	},
        {from:'petroleum refineries',to:'petroleum refineries (passthrough1)',value:0.341	},
        {from:'petroleum refineries (passthrough1)',to:'boiler fuel',value:0.341	},
        {from:'petroleum refineries',to:'petroleum refineries (passthrough1)',value:0.737	},
        {from:'petroleum refineries (passthrough1)',to:'process energy',value:0.737	},
        {from:'petroleum refineries',to:'petroleum refineries (passthrough1)',value:0.021	},
        {from:'petroleum refineries (passthrough1)',to:'nonprocess energy',value:0.021	},
        {from:'petroleum refineries',to:'petroleum refineries (passthrough1)',value:2.274	},
        {from:'petroleum refineries (passthrough1)',to:'end use not reported',value:2.274	},
        {from:'asphalt paving mixture and block',to:'asphalt paving mixture and block (passthrough1)',value:0.373	},
        {from:'asphalt paving mixture and block (passthrough1)',to:'energy materials in products',value:0.373	},
        {from:'asphalt paving mixture and block',to:'asphalt paving mixture and block (passthrough1)',value:0.005	},
        {from:'asphalt paving mixture and block (passthrough1)',to:'boiler fuel',value:0.005	},
        {from:'asphalt paving mixture and block',to:'asphalt paving mixture and block (passthrough1)',value:0.045	},
        {from:'asphalt paving mixture and block (passthrough1)',to:'process energy',value:0.045	},
        {from:'asphalt paving mixture and block',to:'asphalt paving mixture and block (passthrough1)',value:0.002	},
        {from:'asphalt paving mixture and block (passthrough1)',to:'nonprocess energy',value:0.002	},
        {from:'asphalt paving mixture and block',to:'asphalt paving mixture and block (passthrough1)',value:0.004	},
        {from:'asphalt paving mixture and block (passthrough1)',to:'end use not reported',value:0.004	},
        {from:'asphalt shingle and coating materials',to:'asphalt shingle and coating materials (passthrough1)',value:0.153	},
        {from:'asphalt shingle and coating materials (passthrough1)',to:'energy materials in products',value:0.153	},
        {from:'asphalt shingle and coating materials',to:'asphalt shingle and coating materials (passthrough1)',value:0.003	},
        {from:'asphalt shingle and coating materials (passthrough1)',to:'boiler fuel',value:0.003	},
        {from:'asphalt shingle and coating materials',to:'asphalt shingle and coating materials (passthrough1)',value:0.009	},
        {from:'asphalt shingle and coating materials (passthrough1)',to:'process energy',value:0.009	},
        {from:'asphalt shingle and coating materials',to:'asphalt shingle and coating materials (passthrough1)',value:0.001	},
        {from:'asphalt shingle and coating materials (passthrough1)',to:'nonprocess energy',value:0.001	},
        {from:'other petroleum and coal products',to:'other petroleum and coal products (passthrough1)',value:0.143	},
        {from:'other petroleum and coal products (passthrough1)',to:'energy materials in products',value:0.143	},
        {from:'other petroleum and coal products',to:'other petroleum and coal products (passthrough1)',value:0.002	},
        {from:'other petroleum and coal products (passthrough1)',to:'boiler fuel',value:0.002	},
        {from:'other petroleum and coal products',to:'other petroleum and coal products (passthrough1)',value:0.011	},
        {from:'other petroleum and coal products (passthrough1)',to:'process energy',value:0.011	},
        {from:'other petroleum and coal products',to:'other petroleum and coal products (passthrough1)',value:0.001	},
        {from:'other petroleum and coal products (passthrough1)',to:'nonprocess energy',value:0.001	},
        {from:'other petroleum and coal products',to:'other petroleum and coal products (passthrough1)',value:0.044	},
        {from:'other petroleum and coal products (passthrough1)',to:'end use not reported',value:0.044	},
        {from:'petrochemicals',to:'petrochemicals (passthrough1)',value:0.998	},
        {from:'petrochemicals (passthrough1)',to:'energy materials in products',value:0.998	},
        {from:'petrochemicals',to:'petrochemicals (passthrough1)',value:0.087	},
        {from:'petrochemicals (passthrough1)',to:'boiler fuel',value:0.087	},
        {from:'petrochemicals',to:'petrochemicals (passthrough1)',value:0.24	},
        {from:'petrochemicals (passthrough1)',to:'process energy',value:0.24	},
        {from:'petrochemicals',to:'petrochemicals (passthrough1)',value:0.002	},
        {from:'petrochemicals (passthrough1)',to:'nonprocess energy',value:0.002	},
        {from:'petrochemicals',to:'petrochemicals (passthrough1)',value:0.207	},
        {from:'petrochemicals (passthrough1)',to:'end use not reported',value:0.207	},
        {from:'industrial gases',to:'industrial gases (passthrough1)',value:0.087	},
        {from:'industrial gases (passthrough1)',to:'energy materials in products',value:0.087	},
        {from:'industrial gases',to:'industrial gases (passthrough1)',value:0.005	},
        {from:'industrial gases (passthrough1)',to:'boiler fuel',value:0.005	},
        {from:'industrial gases',to:'industrial gases (passthrough1)',value:0.083	},
        {from:'industrial gases (passthrough1)',to:'process energy',value:0.083	},
        {from:'industrial gases',to:'industrial gases (passthrough1)',value:0.018	},
        {from:'industrial gases (passthrough1)',to:'nonprocess energy',value:0.018	},
        {from:'industrial gases',to:'industrial gases (passthrough1)',value:0.003	},
        {from:'industrial gases (passthrough1)',to:'end use not reported',value:0.003	},
        {from:'other basic inorganic chemicals',to:'other basic inorganic chemicals (passthrough1)',value:0.017	},
        {from:'other basic inorganic chemicals (passthrough1)',to:'energy materials in products',value:0.017	},
        {from:'other basic inorganic chemicals',to:'other basic inorganic chemicals (passthrough1)',value:0.104	},
        {from:'other basic inorganic chemicals (passthrough1)',to:'boiler fuel',value:0.104	},
        {from:'other basic inorganic chemicals',to:'other basic inorganic chemicals (passthrough1)',value:0.169	},
        {from:'other basic inorganic chemicals (passthrough1)',to:'process energy',value:0.169	},
        {from:'other basic inorganic chemicals',to:'other basic inorganic chemicals (passthrough1)',value:0.01	},
        {from:'other basic inorganic chemicals (passthrough1)',to:'nonprocess energy',value:0.01	},
        {from:'other basic inorganic chemicals',to:'other basic inorganic chemicals (passthrough1)',value:0.074	},
        {from:'other basic inorganic chemicals (passthrough1)',to:'end use not reported',value:0.074	},
        {from:'ethyl alcohol',to:'ethyl alcohol (passthrough1)',value:0.001	},
        {from:'ethyl alcohol (passthrough1)',to:'energy materials in products',value:0.001	},
        {from:'ethyl alcohol',to:'ethyl alcohol (passthrough1)',value:0.254	},
        {from:'ethyl alcohol (passthrough1)',to:'boiler fuel',value:0.254	},
        {from:'ethyl alcohol',to:'ethyl alcohol (passthrough1)',value:0.174	},
        {from:'ethyl alcohol (passthrough1)',to:'process energy',value:0.174	},
        {from:'ethyl alcohol',to:'ethyl alcohol (passthrough1)',value:0.007	},
        {from:'ethyl alcohol (passthrough1)',to:'nonprocess energy',value:0.007	},
        {from:'ethyl alcohol',to:'ethyl alcohol (passthrough1)',value:0.052	},
        {from:'ethyl alcohol (passthrough1)',to:'end use not reported',value:0.052	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals',to:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',value:0.001	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',to:'energy materials in products',value:0.001	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals',to:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',value:0.015	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',to:'boiler fuel',value:0.015	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals',to:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',value:0.017	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',to:'process energy',value:0.017	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals',to:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',value:0.002	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',to:'nonprocess energy',value:0.002	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals',to:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',value:0.007	},
        {from:'cyclic crudes, intermediate and gum and wood chemicals (passthrough1)',to:'end use not reported',value:0.007	},
        {from:'other basic organic chemicals',to:'other basic organic chemicals (passthrough1)',value:0.843	},
        {from:'other basic organic chemicals (passthrough1)',to:'energy materials in products',value:0.843	},
        {from:'other basic organic chemicals',to:'other basic organic chemicals (passthrough1)',value:0.279	},
        {from:'other basic organic chemicals (passthrough1)',to:'boiler fuel',value:0.279	},
        {from:'other basic organic chemicals',to:'other basic organic chemicals (passthrough1)',value:0.176	},
        {from:'other basic organic chemicals (passthrough1)',to:'process energy',value:0.176	},
        {from:'other basic organic chemicals',to:'other basic organic chemicals (passthrough1)',value:0.015	},
        {from:'other basic organic chemicals (passthrough1)',to:'nonprocess energy',value:0.015	},
        {from:'other basic organic chemicals',to:'other basic organic chemicals (passthrough1)',value:0.321	},
        {from:'other basic organic chemicals (passthrough1)',to:'end use not reported',value:0.321	},
        {from:'plastics materials and resins',to:'plastics materials and resins (passthrough1)',value:1.306	},
        {from:'plastics materials and resins (passthrough1)',to:'energy materials in products',value:1.306	},
        {from:'plastics materials and resins',to:'plastics materials and resins (passthrough1)',value:0.29	},
        {from:'plastics materials and resins (passthrough1)',to:'boiler fuel',value:0.29	},
        {from:'plastics materials and resins',to:'plastics materials and resins (passthrough1)',value:0.136	},
        {from:'plastics materials and resins (passthrough1)',to:'process energy',value:0.136	},
        {from:'plastics materials and resins',to:'plastics materials and resins (passthrough1)',value:0.014	},
        {from:'plastics materials and resins (passthrough1)',to:'nonprocess energy',value:0.014	},
        {from:'plastics materials and resins',to:'plastics materials and resins (passthrough1)',value:0.104	},
        {from:'plastics materials and resins (passthrough1)',to:'end use not reported',value:0.104	},
        {from:'synthetic rubber',to:'synthetic rubber (passthrough1)',value:0.019	},
        {from:'synthetic rubber (passthrough1)',to:'boiler fuel',value:0.019	},
        {from:'synthetic rubber',to:'synthetic rubber (passthrough1)',value:0.004	},
        {from:'synthetic rubber (passthrough1)',to:'process energy',value:0.004	},
        {from:'synthetic rubber',to:'synthetic rubber (passthrough1)',value:0.001	},
        {from:'synthetic rubber (passthrough1)',to:'nonprocess energy',value:0.001	},
        {from:'synthetic rubber',to:'synthetic rubber (passthrough1)',value:0.01	},
        {from:'synthetic rubber (passthrough1)',to:'end use not reported',value:0.01	},
        {from:'artificial and synthetic fibers and filaments',to:'artificial and synthetic fibers and filaments (passthrough1)',value:0.019	},
        {from:'artificial and synthetic fibers and filaments (passthrough1)',to:'boiler fuel',value:0.019	},
        {from:'artificial and synthetic fibers and filaments',to:'artificial and synthetic fibers and filaments (passthrough1)',value:0.013	},
        {from:'artificial and synthetic fibers and filaments (passthrough1)',to:'process energy',value:0.013	},
        {from:'artificial and synthetic fibers and filaments',to:'artificial and synthetic fibers and filaments (passthrough1)',value:0.002	},
        {from:'artificial and synthetic fibers and filaments (passthrough1)',to:'nonprocess energy',value:0.002	},
        {from:'nitrogenous fertilizers',to:'nitrogenous fertilizers (passthrough1)',value:0.524	},
        {from:'nitrogenous fertilizers (passthrough1)',to:'energy materials in products',value:0.524	},
        {from:'nitrogenous fertilizers',to:'nitrogenous fertilizers (passthrough1)',value:0.036	},
        {from:'nitrogenous fertilizers (passthrough1)',to:'boiler fuel',value:0.036	},
        {from:'nitrogenous fertilizers',to:'nitrogenous fertilizers (passthrough1)',value:0.125	},
        {from:'nitrogenous fertilizers (passthrough1)',to:'process energy',value:0.125	},
        {from:'nitrogenous fertilizers',to:'nitrogenous fertilizers (passthrough1)',value:0.002	},
        {from:'nitrogenous fertilizers (passthrough1)',to:'nonprocess energy',value:0.002	},
        {from:'nitrogenous fertilizers',to:'nitrogenous fertilizers (passthrough1)',value:0.018	},
        {from:'nitrogenous fertilizers (passthrough1)',to:'end use not reported',value:0.018	},
        {from:'phosphatic fertilizers',to:'phosphatic fertilizers (passthrough1)',value:0.006	},
        {from:'phosphatic fertilizers (passthrough1)',to:'boiler fuel',value:0.006	},
        {from:'phosphatic fertilizers',to:'phosphatic fertilizers (passthrough1)',value:0.028	},
        {from:'phosphatic fertilizers (passthrough1)',to:'process energy',value:0.028	},
        {from:'phosphatic fertilizers',to:'phosphatic fertilizers (passthrough1)',value:0.001	},
        {from:'phosphatic fertilizers (passthrough1)',to:'nonprocess energy',value:0.001	},
        {from:'pharmaceuticals and medicines',to:'pharmaceuticals and medicines (passthrough1)',value:0.001	},
        {from:'pharmaceuticals and medicines (passthrough1)',to:'energy materials in products',value:0.001	},
        {from:'pharmaceuticals and medicines',to:'pharmaceuticals and medicines (passthrough1)',value:0.039	},
        {from:'pharmaceuticals and medicines (passthrough1)',to:'boiler fuel',value:0.039	},
        {from:'pharmaceuticals and medicines',to:'pharmaceuticals and medicines (passthrough1)',value:0.023	},
        {from:'pharmaceuticals and medicines (passthrough1)',to:'process energy',value:0.023	},
        {from:'pharmaceuticals and medicines',to:'pharmaceuticals and medicines (passthrough1)',value:0.027	},
        {from:'pharmaceuticals and medicines (passthrough1)',to:'nonprocess energy',value:0.027	},
        {from:'pharmaceuticals and medicines',to:'pharmaceuticals and medicines (passthrough1)',value:0.004	},
        {from:'pharmaceuticals and medicines (passthrough1)',to:'end use not reported',value:0.004	},
        {from:'photographic film, paper, plate, and chemicals',to:'photographic film, paper, plate, and chemicals (passthrough1)',value:0.002	},
        {from:'photographic film, paper, plate, and chemicals (passthrough1)',to:'boiler fuel',value:0.002	},
        {from:'photographic film, paper, plate, and chemicals',to:'photographic film, paper, plate, and chemicals (passthrough1)',value:0.003	},
        {from:'photographic film, paper, plate, and chemicals (passthrough1)',to:'process energy',value:0.003	},
        {from:'photographic film, paper, plate, and chemicals',to:'photographic film, paper, plate, and chemicals (passthrough1)',value:0.001	},
        {from:'photographic film, paper, plate, and chemicals (passthrough1)',to:'nonprocess energy',value:0.001	},
        {from:'photographic film, paper, plate, and chemicals',to:'photographic film, paper, plate, and chemicals (passthrough1)',value:0.002	},
        {from:'photographic film, paper, plate, and chemicals (passthrough1)',to:'end use not reported',value:0.002	},
        {from:'clay building material and refractories',to:'clay building material and refractories (passthrough1)',value:0.001	},
        {from:'clay building material and refractories (passthrough1)',to:'boiler fuel',value:0.001	},
        {from:'clay building material and refractories',to:'clay building material and refractories (passthrough1)',value:0.037	},
        {from:'clay building material and refractories (passthrough1)',to:'process energy',value:0.037	},
        {from:'clay building material and refractories',to:'clay building material and refractories (passthrough1)',value:0.003	},
        {from:'clay building material and refractories (passthrough1)',to:'nonprocess energy',value:0.003	},
        {from:'clay building material and refractories',to:'clay building material and refractories (passthrough1)',value:0.002	},
        {from:'clay building material and refractories (passthrough1)',to:'end use not reported',value:0.002	},
        {from:'flat glass',to:'flat glass (passthrough1)',value:0.048	},
        {from:'flat glass (passthrough1)',to:'process energy',value:0.048	},
        {from:'flat glass',to:'flat glass (passthrough1)',value:0.002	},
        {from:'flat glass (passthrough1)',to:'nonprocess energy',value:0.002	},
        {from:'flat glass',to:'flat glass (passthrough1)',value:0.011	},
        {from:'flat glass (passthrough1)',to:'end use not reported',value:0.011	},
        {from:'other pressed and blown glass and glassware',to:'other pressed and blown glass and glassware (passthrough1)',value:0.003	},
        {from:'other pressed and blown glass and glassware (passthrough1)',to:'boiler fuel',value:0.003	},
        {from:'other pressed and blown glass and glassware',to:'other pressed and blown glass and glassware (passthrough1)',value:0.026	},
        {from:'other pressed and blown glass and glassware (passthrough1)',to:'process energy',value:0.026	},
        {from:'other pressed and blown glass and glassware',to:'other pressed and blown glass and glassware (passthrough1)',value:0.002	},
        {from:'other pressed and blown glass and glassware (passthrough1)',to:'nonprocess energy',value:0.002	},
        {from:'glass containers',to:'glass containers (passthrough1)',value:0.054	},
        {from:'glass containers (passthrough1)',to:'process energy',value:0.054	},
        {from:'glass containers',to:'glass containers (passthrough1)',value:0.003	},
        {from:'glass containers (passthrough1)',to:'nonprocess energy',value:0.003	},
        {from:'glass products from purchased glass',to:'glass products from purchased glass (passthrough1)',value:0.001	},
        {from:'glass products from purchased glass (passthrough1)',to:'boiler fuel',value:0.001	},
        {from:'glass products from purchased glass',to:'glass products from purchased glass (passthrough1)',value:0.017	},
        {from:'glass products from purchased glass (passthrough1)',to:'process energy',value:0.017	},
        {from:'glass products from purchased glass',to:'glass products from purchased glass (passthrough1)',value:0.004	},
        {from:'glass products from purchased glass (passthrough1)',to:'nonprocess energy',value:0.004	},
        {from:'glass products from purchased glass',to:'glass products from purchased glass (passthrough1)',value:0.001	},
        {from:'glass products from purchased glass (passthrough1)',to:'end use not reported',value:0.001	},
        {from:'cements',to:'cements (passthrough1)',value:0.003	},
        {from:'cements (passthrough1)',to:'energy materials in products',value:0.003	},
        {from:'cements',to:'cements (passthrough1)',value:0.001	},
        {from:'cements (passthrough1)',to:'boiler fuel',value:0.001	},
        {from:'cements',to:'cements (passthrough1)',value:0.214	},
        {from:'cements (passthrough1)',to:'process energy',value:0.214	},
        {from:'cements',to:'cements (passthrough1)',value:0.004	},
        {from:'cements (passthrough1)',to:'nonprocess energy',value:0.004	},
        {from:'cements',to:'cements (passthrough1)',value:0.077	},
        {from:'cements (passthrough1)',to:'end use not reported',value:0.077	},
        {from:'lime',to:'lime (passthrough1)',value:0.084	},
        {from:'lime (passthrough1)',to:'process energy',value:0.084	},
        {from:'lime',to:'lime (passthrough1)',value:0.001	},
        {from:'lime (passthrough1)',to:'nonprocess energy',value:0.001	},
        {from:'lime',to:'lime (passthrough1)',value:0.019	},
        {from:'lime (passthrough1)',to:'end use not reported',value:0.019	},
        {from:'gypsum',to:'gypsum (passthrough1)',value:0.001	},
        {from:'gypsum (passthrough1)',to:'boiler fuel',value:0.001	},
        {from:'gypsum',to:'gypsum (passthrough1)',value:0.049	},
        {from:'gypsum (passthrough1)',to:'process energy',value:0.049	},
        {from:'gypsum',to:'gypsum (passthrough1)',value:0.003	},
        {from:'gypsum (passthrough1)',to:'nonprocess energy',value:0.003	},
        {from:'mineral wool',to:'mineral wool (passthrough1)',value:0.027	},
        {from:'mineral wool (passthrough1)',to:'process energy',value:0.027	},
        {from:'mineral wool',to:'mineral wool (passthrough1)',value:0.003	},
        {from:'mineral wool (passthrough1)',to:'nonprocess energy',value:0.003	},
        {from:'mineral wool',to:'mineral wool (passthrough1)',value:0.001	},
        {from:'mineral wool (passthrough1)',to:'end use not reported',value:0.001	},
        {from:'iron and steel mills and ferroalloys',to:'iron and steel mills and ferroalloys (passthrough1)',value:0.043	},
        {from:'iron and steel mills and ferroalloys (passthrough1)',to:'energy materials in products',value:0.043	},
        {from:'iron and steel mills and ferroalloys',to:'iron and steel mills and ferroalloys (passthrough1)',value:0.046	},
        {from:'iron and steel mills and ferroalloys (passthrough1)',to:'boiler fuel',value:0.046	},
        {from:'iron and steel mills and ferroalloys',to:'iron and steel mills and ferroalloys (passthrough1)',value:0.533	},
        {from:'iron and steel mills and ferroalloys (passthrough1)',to:'process energy',value:0.533	},
        {from:'iron and steel mills and ferroalloys',to:'iron and steel mills and ferroalloys (passthrough1)',value:0.036	},
        {from:'iron and steel mills and ferroalloys (passthrough1)',to:'nonprocess energy',value:0.036	},
        {from:'iron and steel mills and ferroalloys',to:'iron and steel mills and ferroalloys (passthrough1)',value:0.556	},
        {from:'iron and steel mills and ferroalloys (passthrough1)',to:'end use not reported',value:0.556	},
        {from:'steel products from purchased steel',to:'steel products from purchased steel (passthrough1)',value:0.001	},
        {from:'steel products from purchased steel (passthrough1)',to:'energy materials in products',value:0.001	},
        {from:'steel products from purchased steel',to:'steel products from purchased steel (passthrough1)',value:0.003	},
        {from:'steel products from purchased steel (passthrough1)',to:'boiler fuel',value:0.003	},
        {from:'steel products from purchased steel',to:'steel products from purchased steel (passthrough1)',value:0.038	},
        {from:'steel products from purchased steel (passthrough1)',to:'process energy',value:0.038	},
        {from:'steel products from purchased steel',to:'steel products from purchased steel (passthrough1)',value:0.008	},
        {from:'steel products from purchased steel (passthrough1)',to:'nonprocess energy',value:0.008	},
        {from:'steel products from purchased steel',to:'steel products from purchased steel (passthrough1)',value:0.007	},
        {from:'steel products from purchased steel (passthrough1)',to:'end use not reported',value:0.007	},
        {from:'alumina and aluminum',to:'alumina and aluminum (passthrough1)',value:0.011	},
        {from:'alumina and aluminum (passthrough1)',to:'energy materials in products',value:0.011	},
        {from:'alumina and aluminum',to:'alumina and aluminum (passthrough1)',value:0.027	},
        {from:'alumina and aluminum (passthrough1)',to:'boiler fuel',value:0.027	},
        {from:'alumina and aluminum',to:'alumina and aluminum (passthrough1)',value:0.191	},
        {from:'alumina and aluminum (passthrough1)',to:'process energy',value:0.191	},
        {from:'alumina and aluminum',to:'alumina and aluminum (passthrough1)',value:0.016	},
        {from:'alumina and aluminum (passthrough1)',to:'nonprocess energy',value:0.016	},
        {from:'alumina and aluminum',to:'alumina and aluminum (passthrough1)',value:0.008	},
        {from:'alumina and aluminum (passthrough1)',to:'end use not reported',value:0.008	},
        {from:'nonferrous metals, except aluminum',to:'nonferrous metals, except aluminum (passthrough1)',value:0.013	},
        {from:'nonferrous metals, except aluminum (passthrough1)',to:'energy materials in products',value:0.013	},
        {from:'nonferrous metals, except aluminum',to:'nonferrous metals, except aluminum (passthrough1)',value:0.008	},
        {from:'nonferrous metals, except aluminum (passthrough1)',to:'boiler fuel',value:0.008	},
        {from:'nonferrous metals, except aluminum',to:'nonferrous metals, except aluminum (passthrough1)',value:0.072	},
        {from:'nonferrous metals, except aluminum (passthrough1)',to:'process energy',value:0.072	},
        {from:'nonferrous metals, except aluminum',to:'nonferrous metals, except aluminum (passthrough1)',value:0.008	},
        {from:'nonferrous metals, except aluminum (passthrough1)',to:'nonprocess energy',value:0.008	},
        {from:'nonferrous metals, except aluminum',to:'nonferrous metals, except aluminum (passthrough1)',value:0.007	},
        {from:'nonferrous metals, except aluminum (passthrough1)',to:'end use not reported',value:0.007	},
        {from:'foundries',to:'foundries (passthrough1)',value:0.002	},
        {from:'foundries (passthrough1)',to:'energy materials in products',value:0.002	},
        {from:'foundries',to:'foundries (passthrough1)',value:0.001	},
        {from:'foundries (passthrough1)',to:'boiler fuel',value:0.001	},
        {from:'foundries',to:'foundries (passthrough1)',value:0.078	},
        {from:'foundries (passthrough1)',to:'process energy',value:0.078	},
        {from:'foundries',to:'foundries (passthrough1)',value:0.021	},
        {from:'foundries (passthrough1)',to:'nonprocess energy',value:0.021	},
        {from:'foundries',to:'foundries (passthrough1)',value:0.015	},
        {from:'foundries (passthrough1)',to:'end use not reported',value:0.015	},
        {from:'semiconductors and related devices',to:'semiconductors and related devices (passthrough1)',value:0.011	},
        {from:'semiconductors and related devices (passthrough1)',to:'boiler fuel',value:0.011	},
        {from:'semiconductors and related devices',to:'semiconductors and related devices (passthrough1)',value:0.046	},
        {from:'semiconductors and related devices (passthrough1)',to:'process energy',value:0.046	},
        {from:'semiconductors and related devices',to:'semiconductors and related devices (passthrough1)',value:0.032	},
        {from:'semiconductors and related devices (passthrough1)',to:'nonprocess energy',value:0.032	},
        {from:'semiconductors and related devices',to:'semiconductors and related devices (passthrough1)',value:0.001	},
        {from:'semiconductors and related devices (passthrough1)',to:'end use not reported',value:0.001	},
        {from:'automobiles',to:'automobiles (passthrough1)',value:0.002	},
        {from:'automobiles (passthrough1)',to:'boiler fuel',value:0.002	},
        {from:'automobiles',to:'automobiles (passthrough1)',value:0.02	},
        {from:'automobiles (passthrough1)',to:'process energy',value:0.02	},
        {from:'automobiles',to:'automobiles (passthrough1)',value:0.009	},
        {from:'automobiles (passthrough1)',to:'nonprocess energy',value:0.009	},
        {from:'automobiles',to:'automobiles (passthrough1)',value:0.001	},
        {from:'automobiles (passthrough1)',to:'end use not reported',value:0.001	},
        {from:'light trucks and utility vehicles',to:'light trucks and utility vehicles (passthrough1)',value:0.005	},
        {from:'light trucks and utility vehicles (passthrough1)',to:'boiler fuel',value:0.005	},
        {from:'light trucks and utility vehicles',to:'light trucks and utility vehicles (passthrough1)',value:0.022	},
        {from:'light trucks and utility vehicles (passthrough1)',to:'process energy',value:0.022	},
        {from:'light trucks and utility vehicles',to:'light trucks and utility vehicles (passthrough1)',value:0.01	},
        {from:'light trucks and utility vehicles (passthrough1)',to:'nonprocess energy',value:0.01	},
        {from:'light trucks and utility vehicles',to:'light trucks and utility vehicles (passthrough1)',value:0.002	},
        {from:'light trucks and utility vehicles (passthrough1)',to:'end use not reported',value:0.002	},
        {from:'aerospace product and parts',to:'aerospace product and parts (passthrough1)',value:0.002	},
        {from:'aerospace product and parts (passthrough1)',to:'energy materials in products',value:0.002	},
        {from:'aerospace product and parts',to:'aerospace product and parts (passthrough1)',value:0.011	},
        {from:'aerospace product and parts (passthrough1)',to:'boiler fuel',value:0.011	},
        {from:'aerospace product and parts',to:'aerospace product and parts (passthrough1)',value:0.02	},
        {from:'aerospace product and parts (passthrough1)',to:'process energy',value:0.02	},
        {from:'aerospace product and parts',to:'aerospace product and parts (passthrough1)',value:0.028	},
        {from:'aerospace product and parts (passthrough1)',to:'nonprocess energy',value:0.028	},
        {from:'aerospace product and parts',to:'aerospace product and parts (passthrough1)',value:0.006	},
        {from:'aerospace product and parts (passthrough1)',to:'end use not reported',value:0.006	} 
        //jagaban end
      ],
      minVerticalGap:15,
      height:0,
      width:0,
      totalPerNodeLevel:[],
      nodeWidth:15,
      gapInBetween:20,
      gapIncrementor:90000,
      sankeyType:'LEFT',
      max:0
    };
  },
  methods:{
    normalizeValue(){
      this.category.forEach(item=>{
        item.value = item.value*1000;
      });
    },
    checkNode(from, to){
      let foundfrom = false, foundfromindex = 0, foundtoindex = 0, foundto = false;
      for(let j=0; j<this.sankeyNode.length; j++){
        if(this.sankeyNode[j].hasOwnProperty(from)){
          foundfrom = true;
          foundfromindex = j;
          break;
        }
      }
      for(let k=0; k<this.sankeyNode.length; k++){
        if(this.sankeyNode[k].hasOwnProperty(to)){
          foundto = true;
          foundtoindex = k;
          break;
        }
      }
      return {foundfrom,foundfromindex,foundto,foundtoindex};
    },
    updateFromPositionInTosFroms(index,to){
      if(this.sankeyNode[index].hasOwnProperty(to)){
        if(this.sankeyNode[index][to].hasOwnProperty('tos')){
          Object.entries(this.sankeyNode[index][to].tos).forEach(entity=>{
            let value = entity[1][0], key = entity[0];
            if(this.sankeyNode[value].hasOwnProperty(key)){
              if(this.sankeyNode[value][key].hasOwnProperty('froms')){
                let copy = JSON.parse(JSON.stringify(this.sankeyNode[value][key].froms));
                this.sankeyNode[value][key].froms = Object.assign({},copy,{[to]:index});
              }
            }
          });
        }
      }
    },
    updateToPositionInFromsTos(index,to){
      if(this.sankeyNode[index].hasOwnProperty(to)){
        if(this.sankeyNode[index][to].hasOwnProperty('froms')){
          Object.entries(this.sankeyNode[index][to].froms).forEach(entity=>{
            let value = entity[1], key = entity[0];
            if(this.sankeyNode[value].hasOwnProperty(key)){
              if(this.sankeyNode[value][key].hasOwnProperty('tos')){
                let copy = JSON.parse(JSON.stringify(this.sankeyNode[value][key].tos)),
                    weight = this.sankeyNode[value][key].tos[to][1];
                this.sankeyNode[value][key].tos = Object.assign({},copy,{[to]:[index,weight]});
              }
            }
          });
        }
        else{
          if(this.sankeyNode[index][to].hasOwnProperty('tos')){
            Object.entries(this.sankeyNode[index][to].tos).forEach(entity=>{
              let nindex = entity[1][0], key = entity[0];
              if(this.sankeyNode[nindex].hasOwnProperty(key)){
                if(this.sankeyNode[nindex][key].hasOwnProperty('froms')){
                  if(this.sankeyNode[nindex][key].froms.hasOwnProperty(to))
                    this.sankeyNode[nindex][key].froms[to] = index;
                }
              }
            });
          }
        }
      }
    },
    moveTosInSamePositionWithItsFromButTo(index,to){
      if(this.sankeyNode[index].hasOwnProperty(to)){
        if(this.sankeyNode[index][to].hasOwnProperty('tos')){
          Object.entries(this.sankeyNode[index][to].tos).forEach(entity=>{
            let key = entity[0], value1 = entity[1][0], value = entity[1][1];
            if(value1==index){
              if((this.sankeyNode.length-1)>=index){
                //let cur = JSON.parse(JSON.stringify(this.sankeyNode));
                if((this.sankeyNode.length-1)==index){
                  if(this.sankeyNode[index][key].hasOwnProperty('tos')){
                    let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[index][key].tos));
                    if(this.sankeyNode[index][key].hasOwnProperty('froms')){
                      let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[index][key].froms));
                      this.sankeyNode.push({[key]:{tos:toscopy,froms:fromscopy}});
                      this.sankeyNode[(index+1)][key].froms = Object.assign({},fromscopy,{[to]:index});
                    }
                    else{
                      this.sankeyNode.push({[key]:{tos:toscopy}});
                    }
                  }
                  else{
                    if(this.sankeyNode[index][key].hasOwnProperty('froms')){
                      let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[index][key].froms));
                      this.sankeyNode.push({[key]:{froms:fromscopy}});
                      this.sankeyNode[(index+1)][key].froms = Object.assign({},fromscopy,{[to]:index});
                    }
                  }
                }
                if(this.sankeyNode[index][to].hasOwnProperty('tos')){
                  let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][to].tos));
                  this.sankeyNode[index][to].tos = Object.assign({},copy,{[key]:[(index+1),value]});
                }
                else{
                  if(this.sankeyNode[index][to].hasOwnProperty('froms')){
                    let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[index][to].froms));
                    this.sankeyNode[index][to] = Object.assign({},{froms:fromscopy,tos:{[key]:[(index+1),value]}});
                  }
                }
                if(!this.sankeyNode[(index+1)].hasOwnProperty(key)){
                  let copy = JSON.parse(JSON.stringify(this.sankeyNode[(index+1)]));
                  if(this.sankeyNode[index][key].hasOwnProperty('tos')){
                    let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[index][key].tos));
                    if(this.sankeyNode[index][key].hasOwnProperty('froms')){
                      let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[index][key].froms));
                      this.sankeyNode[(index+1)] = Object.assign({},copy,{[key]:{tos:toscopy,froms:fromscopy}});
                      this.sankeyNode[(index+1)][key].froms = Object.assign({},fromscopy,{[to]:index});
                    }
                    else{
                      this.sankeyNode[(index+1)] = Object.assign({},copy,{[key]:{tos:toscopy}});
                    }
                  }
                  else{
                    if(this.sankeyNode[index][key].hasOwnProperty('froms')){
                      let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[index][key].froms));
                      this.sankeyNode[(index+1)] = Object.assign({},copy,{[key]:{froms:fromscopy}});
                      this.sankeyNode[(index+1)][key].froms = Object.assign({},fromscopy,{[to]:index});
                    }
                  }
                }
                delete this.sankeyNode[index][key];
                if(this.sankeyNode[(index+1)][key].hasOwnProperty('tos')){
                  this.moveTosInSamePositionWithItsFromButTo((index+1),key);
                }
                this.updateToPositionInFromsTos((index+1),key);
              }
            }
          });
        }
      }
    },
    moveTosOfAlreadyMovedNode(foundfromindex,from){
      if(this.sankeyNode[foundfromindex].hasOwnProperty(from)){
        if(this.sankeyNode[foundfromindex][from].hasOwnProperty('tos')){
          let size = (this.sankeyNode.length-1);
          Object.entries(this.sankeyNode[foundfromindex][from].tos).forEach(entity=>{
            let to = entity[0], value = entity[1][1], foundtoindex = entity[1][0];
            //let cur = JSON.parse(JSON.stringify(this.sankeyNode));
            if(size>foundfromindex){ //from may have tos
              let copy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex+1]));
              if(this.sankeyNode[foundtoindex][to].hasOwnProperty('tos')){
                let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].tos));
                if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                  let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                  this.sankeyNode[foundfromindex+1] = Object.assign({},copy,{[to]:{tos:toscopy,froms:fromscopy}});
                  this.sankeyNode[foundfromindex+1][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                }
                else{
                  this.sankeyNode[foundfromindex+1] = Object.assign({},copy,{[to]:{tos:toscopy,froms:{[from]:foundfromindex}}});
                }
                if(this.sankeyNode[foundfromindex][from].hasOwnProperty('tos')){
                  let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].tos));
                  this.sankeyNode[foundfromindex][from].tos = Object.assign({},toscopy,{[to]:[(foundfromindex+1),value]});
                }
                else{
                  if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                    let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                    this.sankeyNode[foundfromindex][from] = Object.assign({},{froms:fromscopy,tos:{[to]:[(foundfromindex+1),value]}});
                  }
                }
                delete this.sankeyNode[foundtoindex][to];
                if(this.sankeyNode[(foundfromindex+1)][to].hasOwnProperty('tos')){
                  this.moveTosInSamePositionWithItsFromButTo((foundfromindex+1),to);
                }
                this.updateToPositionInFromsTos((foundfromindex+1),to);
                if(this.sankeyNode[(foundfromindex+1)][to].hasOwnProperty('tos')){
                  this.moveTosOfAlreadyMovedNode((foundfromindex+1),to);
                }
              }
              else{
                if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                  let tofromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                  if(this.sankeyNode[foundfromindex][from].hasOwnProperty('tos')){
                    let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].tos));
                    this.sankeyNode[foundfromindex][from].tos = Object.assign({},toscopy,{[to]:[(foundfromindex+1),value]});
                  }
                  else{
                    if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                      let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                      this.sankeyNode[foundfromindex][from] = Object.assign({},{froms:fromscopy,tos:{[to]:[(foundfromindex+1),value]}});
                    }
                  }
                  delete this.sankeyNode[foundtoindex][to];
                  this.sankeyNode[foundfromindex+1] = Object.assign({},copy,{[to]:{froms:tofromscopy}});
                  this.sankeyNode[foundfromindex+1][to].froms = Object.assign({},tofromscopy,{[from]:foundfromindex});
                  this.updateToPositionInFromsTos((foundfromindex+1),to);
                }
              }
            }
            else{ //from doesn't have tos
              if(this.sankeyNode[foundtoindex][to].hasOwnProperty('tos')){
                let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].tos));
                if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                  let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                  this.sankeyNode.push({[to]:{tos:toscopy,froms:fromscopy}});
                  this.sankeyNode[foundfromindex+1][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                }
                else{
                  this.sankeyNode.push({[to]:{tos:toscopy,froms:{[from]:foundfromindex}}});
                }
                if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                  let ffromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                  this.sankeyNode[foundfromindex][from] = Object.assign({},{froms:ffromscopy,tos:{[to]:[(foundfromindex+1),value]}});
                }
                delete this.sankeyNode[foundtoindex][to];
                if(this.sankeyNode[(foundfromindex+1)][to].hasOwnProperty('tos')){
                  this.moveTosInSamePositionWithItsFromButTo((foundfromindex+1),to);
                }
                this.updateToPositionInFromsTos((foundfromindex+1),to);
                if(this.sankeyNode[(foundfromindex+1)][to].hasOwnProperty('tos')){
                  this.moveTosOfAlreadyMovedNode((foundfromindex+1),to);
                }
              }
              else{
                if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                  let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                  if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                    let ffromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                    this.sankeyNode[foundfromindex][from] = Object.assign({},{froms:ffromscopy,tos:{[to]:[(foundfromindex+1),value]}});
                  }
                  delete this.sankeyNode[foundtoindex][to];
                  this.sankeyNode.push({[to]:{froms:fromscopy}});
                  this.sankeyNode[foundfromindex+1][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                  this.updateToPositionInFromsTos((foundfromindex+1),to);
                }
              }
            }
          });
        }
      }
    },
    findLeftNodeOrder(){
      this.sankeyNode[0] = Object.assign({},{});
      this.sankeyNode[1] = Object.assign({},{});
      let insertnotmade = true;
      for(let i=0; i<this.category.length; i++){
        let from = this.category[i].from, to = this.category[i].to, value = this.category[i].value;
        if(insertnotmade){
          this.sankeyNode[0][from] = Object.assign({},{tos:{}});
          this.sankeyNode[0][from].tos[to] = [1,value];
          this.sankeyNode[1][to] = Object.assign({},{froms:{}});
          this.sankeyNode[1][to].froms[from] = 0;
          insertnotmade = false;
        }
        else{
          let checknoderesult = this.checkNode(from, to), foundfrom = checknoderesult.foundfrom, foundto = checknoderesult.foundto, foundfromindex = checknoderesult.foundfromindex, foundtoindex  = checknoderesult.foundtoindex;
          if(foundfrom){
            if(foundto){
              if(foundtoindex>=foundfromindex){
                if(foundtoindex==foundfromindex){
                  if((this.sankeyNode.length-1)>=foundfromindex){
                    //let cur = JSON.parse(JSON.stringify(this.sankeyNode));
                    if((this.sankeyNode.length-1)==foundfromindex){
                      if(this.sankeyNode[foundtoindex][to].hasOwnProperty('tos')){
                        let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].tos));
                        if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                          let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                          this.sankeyNode.push({[to]:{tos:toscopy,froms:fromscopy}});
                          this.sankeyNode[(foundfromindex+1)][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                        }
                        else{
                          this.sankeyNode.push({[to]:{tos:toscopy}});
                        }
                      }
                      else{
                        if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                          let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                          this.sankeyNode.push({[to]:{froms:fromscopy}});
                          this.sankeyNode[(foundfromindex+1)][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                        }
                      }
                    }
                    if(this.sankeyNode[foundfromindex][from].hasOwnProperty('tos')){
                      let copy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].tos));
                      this.sankeyNode[foundfromindex][from].tos = Object.assign({},copy,{[to]:[(foundfromindex+1),value]});
                    }
                    else{
                      if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                        let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                        this.sankeyNode[foundfromindex][from] = Object.assign({},{froms:fromscopy,tos:{[to]:[(foundfromindex+1),value]}});
                      }
                    }
                    if(!this.sankeyNode[(foundfromindex+1)].hasOwnProperty(to)){
                      let copy = JSON.parse(JSON.stringify(this.sankeyNode[(foundfromindex+1)]));
                      if(this.sankeyNode[foundtoindex][to].hasOwnProperty('tos')){
                        let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].tos));
                        if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                          let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                          this.sankeyNode[(foundfromindex+1)] = Object.assign({},copy,{[to]:{tos:toscopy,froms:fromscopy}});
                          this.sankeyNode[(foundfromindex+1)][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                        }
                        else{
                          this.sankeyNode[(foundfromindex+1)] = Object.assign({},copy,{[to]:{tos:toscopy}});
                        }
                      }
                      else{
                        if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                          let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                          this.sankeyNode[(foundfromindex+1)] = Object.assign({},copy,{[to]:{froms:fromscopy}});
                          this.sankeyNode[(foundfromindex+1)][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                        }
                      }
                    }
                    delete this.sankeyNode[foundtoindex][to];
                    if(this.sankeyNode[(foundfromindex+1)][to].hasOwnProperty('tos')){
                      this.moveTosInSamePositionWithItsFromButTo((foundfromindex+1),to);
                    }
                    this.updateToPositionInFromsTos((foundfromindex+1),to);
                  }
                }
                else{
                  if(this.sankeyNode[foundfromindex][from].hasOwnProperty('tos')){
                    let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].tos));
                    this.sankeyNode[foundfromindex][from].tos = Object.assign({},toscopy,{[to]:[foundtoindex,value]});
                  }
                  else{
                    if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                      let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                      this.sankeyNode[foundfromindex][from] = Object.assign({},{tos:{[to]:[foundtoindex,value]},froms:fromscopy});
                    }
                  }
                  if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                    let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                    this.sankeyNode[foundtoindex][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                  }
                  else{
                    if(this.sankeyNode[foundtoindex][to].hasOwnProperty('tos')){
                      let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].tos));
                      this.sankeyNode[foundtoindex][to] = Object.assign({},{tos:toscopy,froms:{[from]:foundfromindex}});
                    }
                  }
                }
              }
              else{
                //let cur = JSON.parse(JSON.stringify(this.sankeyNode));
                if((this.sankeyNode.length-1)>foundfromindex){ //from may have tos
                  let copy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex+1]));
                  if(this.sankeyNode[foundtoindex][to].hasOwnProperty('tos')){
                    let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].tos));
                    if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                      let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                      this.sankeyNode[foundfromindex+1] = Object.assign({},copy,{[to]:{tos:toscopy,froms:fromscopy}});
                      this.sankeyNode[foundfromindex+1][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                    }
                    else{
                      this.sankeyNode[foundfromindex+1] = Object.assign({},copy,{[to]:{tos:toscopy,froms:{[from]:foundfromindex}}});
                    }
                    if(this.sankeyNode[foundfromindex][from].hasOwnProperty('tos')){
                      let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].tos));
                      this.sankeyNode[foundfromindex][from].tos = Object.assign({},toscopy,{[to]:[(foundfromindex+1),value]});
                    }
                    else{
                      if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                        let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                        this.sankeyNode[foundfromindex][from] = Object.assign({},{froms:fromscopy,tos:{[to]:[(foundfromindex+1),value]}});
                      }
                    }
                    delete this.sankeyNode[foundtoindex][to];
                    if(this.sankeyNode[(foundfromindex+1)][to].hasOwnProperty('tos')){
                      this.moveTosInSamePositionWithItsFromButTo((foundfromindex+1),to);
                    }
                    this.updateToPositionInFromsTos((foundfromindex+1),to);
                    if(this.sankeyNode[(foundfromindex+1)][to].hasOwnProperty('tos')){
                      this.moveTosOfAlreadyMovedNode((foundfromindex+1),to);
                    }
                  }
                  else{
                    if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                      let tofromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                      if(this.sankeyNode[foundfromindex][from].hasOwnProperty('tos')){
                        let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].tos));
                        this.sankeyNode[foundfromindex][from].tos = Object.assign({},toscopy,{[to]:[(foundfromindex+1),value]});
                      }
                      else{
                        if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                          let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                          this.sankeyNode[foundfromindex][from] = Object.assign({},{froms:fromscopy,tos:{[to]:[(foundfromindex+1),value]}});
                        }
                      }
                      delete this.sankeyNode[foundtoindex][to];
                      this.sankeyNode[foundfromindex+1] = Object.assign({},copy,{[to]:{froms:tofromscopy}});
                      this.sankeyNode[foundfromindex+1][to].froms = Object.assign({},tofromscopy,{[from]:foundfromindex});
                      this.updateToPositionInFromsTos((foundfromindex+1),to);
                    }
                  }
                }
                else{ //from doesn't have tos
                  if(this.sankeyNode[foundtoindex][to].hasOwnProperty('tos')){
                    let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].tos));
                    if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                      let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                      this.sankeyNode.push({[to]:{tos:toscopy,froms:fromscopy}});
                      this.sankeyNode[foundfromindex+1][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                    }
                    else{
                      this.sankeyNode.push({[to]:{tos:toscopy,froms:{[from]:foundfromindex}}});
                    }
                    if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                      let ffromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                      this.sankeyNode[foundfromindex][from] = Object.assign({},{froms:ffromscopy,tos:{[to]:[(foundfromindex+1),value]}});
                    }
                    delete this.sankeyNode[foundtoindex][to];
                    if(this.sankeyNode[(foundfromindex+1)][to].hasOwnProperty('tos')){
                      this.moveTosInSamePositionWithItsFromButTo((foundfromindex+1),to);
                    }
                    this.updateToPositionInFromsTos((foundfromindex+1),to);
                    if(this.sankeyNode[(foundfromindex+1)][to].hasOwnProperty('tos')){
                      this.moveTosOfAlreadyMovedNode((foundfromindex+1),to);
                    }
                  }
                  else{
                    if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                      let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                      if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                        let ffromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                        this.sankeyNode[foundfromindex][from] = Object.assign({},{froms:ffromscopy,tos:{[to]:[(foundfromindex+1),value]}});
                      }
                      delete this.sankeyNode[foundtoindex][to];
                      this.sankeyNode.push({[to]:{froms:fromscopy}});
                      this.sankeyNode[foundfromindex+1][to].froms = Object.assign({},fromscopy,{[from]:foundfromindex});
                      this.updateToPositionInFromsTos((foundfromindex+1),to);
                    }
                  }
                }
              }
            }
            else{
              if((this.sankeyNode.length-1)>=foundfromindex){
                if((this.sankeyNode.length-1)==foundfromindex){
                  this.sankeyNode.push({[to]:{froms:{[from]:foundfromindex}}});
                }
                if(this.sankeyNode[foundfromindex][from].hasOwnProperty('tos')){
                  let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].tos));
                  this.sankeyNode[foundfromindex][from].tos = Object.assign({},toscopy,{[to]:[(foundfromindex+1),value]});
                }
                else{
                  if(this.sankeyNode[foundfromindex][from].hasOwnProperty('froms')){
                    let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundfromindex][from].froms));
                    this.sankeyNode[foundfromindex][from] = Object.assign({},{tos:{[to]:[(foundfromindex+1),value]},froms:fromscopy});
                  }
                }
                if(!this.sankeyNode[(foundfromindex+1)].hasOwnProperty(to)){
                  let copy = JSON.parse(JSON.stringify(this.sankeyNode[(foundfromindex+1)]));
                  this.sankeyNode[(foundfromindex+1)] = Object.assign({},copy,{[to]:{froms:{[from]:foundfromindex}}});
                }
              }
            }
          }
          else{
            if(foundto){
              if((foundtoindex-1)>=0){
                //let cur = JSON.parse(JSON.stringify(this.sankeyNode));
                let copy = JSON.parse(JSON.stringify(this.sankeyNode[0]));
                this.sankeyNode[0] = Object.assign({},copy,{[from]:{tos:{[to]:[foundtoindex,value]}}});
                if(this.sankeyNode[foundtoindex][to].hasOwnProperty('froms')){
                  let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].froms));
                  this.sankeyNode[foundtoindex][to].froms = Object.assign({},fromscopy,{[from]:0});
                }
                else{
                  if(this.sankeyNode[foundtoindex][to].hasOwnProperty('tos')){
                    let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[foundtoindex][to].tos));
                    this.sankeyNode[foundtoindex][to] = Object.assign({},{tos:toscopy,froms:{[from]:0}});
                  }
                }
              }
              else{
                //let cur = JSON.parse(JSON.stringify(this.sankeyNode));
                let copy = JSON.parse(JSON.stringify(this.sankeyNode[0]));
                this.sankeyNode[0] = Object.assign({},copy,{[from]:{tos:{[to]:[1,value]}}});
                let newcopy = JSON.parse(JSON.stringify(this.sankeyNode[1]));
                if(this.sankeyNode[0][to].hasOwnProperty('froms')){
                  let fromscopy = JSON.parse(JSON.stringify(this.sankeyNode[0][to].froms));
                  if(this.sankeyNode[0][to].hasOwnProperty('tos')){
                    let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[0][to].tos));
                    this.sankeyNode[1] = Object.assign({},newcopy,{[to]:{tos:toscopy,froms:fromscopy}});
                    this.sankeyNode[1][to].froms = Object.assign({},fromscopy,{[from]:0});
                  }
                  else{
                    this.sankeyNode[1] = Object.assign({},newcopy,{[to]:{froms:fromscopy}});
                    this.sankeyNode[1][to].froms = Object.assign({},fromscopy,{[from]:0});
                  }
                }
                else{
                  if(this.sankeyNode[0][to].hasOwnProperty('tos')){
                    let toscopy = JSON.parse(JSON.stringify(this.sankeyNode[0][to].tos));
                    this.sankeyNode[1] = Object.assign({},newcopy,{[to]:{tos:toscopy,froms:{[from]:0}}});
                  }
                }
                delete this.sankeyNode[0][to];
                if(this.sankeyNode[1][to].hasOwnProperty('tos')){
                  this.moveTosInSamePositionWithItsFromButTo(1,to);
                }
                this.updateToPositionInFromsTos(1,to);
                this.updateFromPositionInTosFroms(1,to);
              }
            }
            else{
              this.sankeyNode[0][from] = Object.assign({},{tos:{}});
              this.sankeyNode[0][from].tos[to] = [1,value];
              this.sankeyNode[1][to] = Object.assign({},{froms:{}});
              this.sankeyNode[1][to].froms[from] = 0;
            }
          }
        }
      }
    },
    findJustifyNodeOrder(){
      this.findLeftNodeOrder();
      this.sankeyNode.forEach((nodes,index)=>{
        Object.entries(nodes).forEach(entity=>{
          let toorfromkey = entity[0], tosorfromsobject = entity[1], hasTo = false;
          if(tosorfromsobject.hasOwnProperty('tos')) hasTo = true;
          if(hasTo==false){
            let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][toorfromkey]));
            if(index!=(this.sankeyNode.length-1)){
              delete this.sankeyNode[index][toorfromkey];
              let tempcopy = JSON.parse(JSON.stringify(this.sankeyNode[(this.sankeyNode.length-1)]));
              this.sankeyNode[(this.sankeyNode.length-1)] = Object.assign({},tempcopy,{[toorfromkey]:copy});
              this.updateToPositionInFromsTos((this.sankeyNode.length-1),toorfromkey);
            }
          }
        });
      });
    },
    moveFromsOfAlreadyMovedNode(point,tonode){
      if(this.sankeyNode[point].hasOwnProperty(tonode)){
        if(this.sankeyNode[point][tonode].hasOwnProperty('froms')){
          Object.entries(this.sankeyNode[point][tonode].froms).forEach(entity=>{
            let toorfromkey = entity[0], index = entity[1], tosorfromsobject = this.sankeyNode[index][toorfromkey], hasTos = false, pos = 0;
            if(tosorfromsobject.hasOwnProperty('tos')) hasTos = true;
            if(hasTos){
              let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][toorfromkey])), list = Object.entries(copy.tos);
              pos = (this.sortList(list,'MIN'))[0][1][0];
              if(pos>0) pos-=1;
              if(index<pos&&index!=(this.sankeyNode.length-1)){
                delete this.sankeyNode[index][toorfromkey];
                let tempcopy = JSON.parse(JSON.stringify(this.sankeyNode[pos]));
                this.sankeyNode[pos] = Object.assign({},tempcopy,{[toorfromkey]:copy});
                this.updateFromPositionInTosFroms(pos,toorfromkey);
                this.updateToPositionInFromsTos(pos,toorfromkey);
                if(this.sankeyNode[pos][toorfromkey].hasOwnProperty('froms')){
                  this.moveFromsOfAlreadyMovedNode(pos,toorfromkey);
                }
                this.updateFromPositionInTosFroms(pos,toorfromkey);
                this.updateToPositionInFromsTos(pos,toorfromkey);
              }
            }
          });
        }
      }
    },
    findRightNodeOrder(){
      this.findJustifyNodeOrder();
      this.sankeyNode.forEach((nodes,index)=>{
        Object.entries(nodes).forEach(entity=>{
          let toorfromkey = entity[0], tosorfromsobject = entity[1], hasTos = false, pos = 0;
          if(tosorfromsobject.hasOwnProperty('tos')) hasTos = true;
          if(hasTos){
            let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][toorfromkey])),
                list = Object.entries(copy.tos);
            pos = (this.sortList(list,'MIN'))[0][1][0];
            if(pos>0) pos-=1;
            if(index<pos&&index!=(this.sankeyNode.length-1)){
              delete this.sankeyNode[index][toorfromkey];
              let tempcopy = JSON.parse(JSON.stringify(this.sankeyNode[pos]));
              this.sankeyNode[pos] = Object.assign({},tempcopy,{[toorfromkey]:copy});
              this.updateFromPositionInTosFroms(pos,toorfromkey);
              this.updateToPositionInFromsTos(pos,toorfromkey);
              if(this.sankeyNode[pos][toorfromkey].hasOwnProperty("froms")){
                this.moveFromsOfAlreadyMovedNode(pos,toorfromkey);
              }
              this.updateFromPositionInTosFroms(pos,toorfromkey);
              this.updateToPositionInFromsTos(pos,toorfromkey);
            }
          }
        });
      });
    },
    findCenterNodeOrder(){
      this.findLeftNodeOrder();
      this.sankeyNode.forEach((nodes,index)=>{
        Object.entries(nodes).forEach(entity=>{
          let toorfromkey = entity[0], tosorfromsobject = entity[1], hasFroms = false, pos = 0;
          if(tosorfromsobject.hasOwnProperty('froms')) hasFroms = true;
          if(hasFroms==false){
            let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][toorfromkey]));
            let list = Object.entries(copy.tos);
            pos = (this.sortList(list,'MIN'))[0][1][0];
            if(pos>0) pos-=1;
            delete this.sankeyNode[index][toorfromkey];
            let tempcopy = JSON.parse(JSON.stringify(this.sankeyNode[pos]));
            this.sankeyNode[pos] = Object.assign({},tempcopy,{[toorfromkey]:copy});
            this.updateToPositionInFromsTos(pos,toorfromkey);
          }
        });
      });
    },
    sortList(list,type) {
      let inlist = list;
      if(type=='MIN') //SORT IN MIN ORDER
        return inlist.sort((a, b) => {
          if (a[1][0] < b[1][0]) return -1;
          if (a[1][0] > b[1][0]) return 1;
          return 0;
        });
      else if(type=='MAX') //SORT IN MAX ORDER
        return inlist.sort((a, b) => {
          if (a[1][0] < b[1][0]) return 1;
          if (a[1][0] > b[1][0]) return -1;
          return 0;
        });
      else if(type=='POS') //SORT IN MAX ORDER
        return inlist.sort((a, b) => {
          if (a[1].pos < b[1].pos) return 1;
          if (a[1].pos > b[1].pos) return -1;
          return 0;
        });
      else if(type=='CONNECTED') //SORT IN MIN ORDER TOPMOST POINT IS THE HIGHEST BUT SMALLEST
        return inlist.sort((a, b) => {
          if (a[1][1] < b[1][1]) return -1;
          if (a[1][1] > b[1][1]) return 1;
          return 0;
        });
      else if(type=='ANOTHER-START'){
        return inlist.sort((a, b) => {
          if (a[1] < b[1]) return -1;
          if (a[1] > b[1]) return 1;
          return 0;
        });
      }
      else{ //SORT IN MIN ORDER
        for(let i=0;i<inlist.length;i++){
          for(let k=(i+1);k<inlist.length;k++){
            if(inlist[i][1].hasOwnProperty('start')){
              if(inlist[k][1].hasOwnProperty('start')){
                if(inlist[i][1].start>inlist[k][1].start){
                  let temp1 = JSON.parse(JSON.stringify(inlist[k])), temp2 = JSON.parse(JSON.stringify(inlist[i]));
                  inlist[i] = temp1;
                  inlist[k] = temp2;
                }
              }
            }
            else{
              if(inlist[k][1].hasOwnProperty('start')){
                let temp1 = JSON.parse(JSON.stringify(inlist[k])), temp2 = JSON.parse(JSON.stringify(inlist[i]));
                inlist[i] = temp1;
                inlist[k] = temp2;
              }
            }
          }
        }
        return inlist;
      }
    },
    getSortedAndConnectedNodes(lists,type){
      let list = {};
      if(type=='FROMS'){
        lists.forEach(item=>{
          let index = item[1], key = item[0];
          if(this.sankeyNode[index].hasOwnProperty(key)){
            if(this.sankeyNode[index][key].hasOwnProperty('start')){
              let start = this.sankeyNode[index][key].start, copy = JSON.parse(JSON.stringify(list));
              list = Object.assign({},copy,{[key]:[index,start]});
            }
          }
        });
      }
      else{
        lists.forEach(item=>{
          let key = item[0], index = item[1][0], copy = JSON.parse(JSON.stringify(list));
          let start = this.sankeyNode[index][key].start;
          list = Object.assign({},copy,{[key]:[index,start]});
        });
      }
      return this.sortList(Object.entries(list),'CONNECTED');
    },
    sumWeightsAndBreakFromNode(key,list,nindex,nkey,type){
      let sum = 0;
      if(type=='TOS'){
        for(let item of list){
          if(item[0].toUpperCase()==key.toUpperCase())
            break;
          else{
            sum+=this.sankeyNode[nindex][nkey].tos[item[0]][1];
          }
        }
      }
      else{
        for(let item of list){
          if(item[0].toUpperCase()==key.toUpperCase())
            break;
          else{
            sum+=this.sankeyNode[item[1][0]][item[0]].tos[nkey][1];
          }
        }
      }
      return sum;
    },
    plotNodeToNodeQBZCurvePaths(){
      this.sankeyNode.forEach((nodes,index)=>{
        Object.entries(nodes).forEach(entity=>{
          let tofromkey = entity[0], tofromobject = entity[1];
          if(tofromobject.hasOwnProperty('froms')){
            let list = this.getSortedAndConnectedNodes(Object.entries(tofromobject.froms),'FROMS');
            Object.entries(list).forEach(nentity=>{
              let nkey = nentity[1][0], nindex = nentity[1][1][0];
              if(this.sankeyNode[nindex][nkey].hasOwnProperty('tos')){
                let  nlist = this.getSortedAndConnectedNodes(Object.entries(this.sankeyNode[nindex][nkey].tos),'TOS'),
                    otherNodeSum = this.sumWeightsAndBreakFromNode(tofromkey,nlist,nindex,nkey,'TOS'),
                    thisNodeSum = this.sumWeightsAndBreakFromNode(nkey,list,nindex,tofromkey,'FROMS'),
                    otherNodeX = (this.sankeyNode[nindex][nkey].x1+this.nodeWidth), otherNodeStart = this.sankeyNode[nindex][nkey].start+otherNodeSum,
                    thisNodeX = tofromobject.x1, thisNodeStart = tofromobject.start+thisNodeSum
                ;
                if(thisNodeStart<=otherNodeStart){
                  let dy = (thisNodeStart-otherNodeStart), dx = (thisNodeX - otherNodeX), midY = dy/2.0, midX = dx/2.0, otherY1 = otherNodeStart,
                    otherY2 = otherY1+midY, otherX1 = otherNodeX, otherX2 = otherX1+midX, otherQBCY = otherY1, otherQBCX = otherX1+(midX/2.0),
                    thisX1 = otherX2, thisY1 = otherY2, thisX2 = thisNodeX, thisY2 = thisNodeStart, thisQBCX = thisX1+(midX/2.0), thisQBCY = thisY2,
                    otherNX1 = otherX1, otherNX2 = otherX2,
                    otherNY1 = (otherY1+this.sankeyNode[nindex][nkey].tos[tofromkey][1]),
                    otherNY2 = (otherY2+this.sankeyNode[nindex][nkey].tos[tofromkey][1]),
                    otherNQBCX = otherQBCX, otherNQBCY = otherNY1, thisNX1 = otherNX2, thisNX2 = thisX2,
                    thisNY1 = thisY1+this.sankeyNode[nindex][nkey].tos[tofromkey][1],
                    thisNY2 = thisY2+this.sankeyNode[nindex][nkey].tos[tofromkey][1],
                    thisNQBCX = thisQBCX, thisNQBCY = thisNY2,
                    thisPath = 'M '+otherX1+' '+otherY1+' q '+(otherQBCX-otherX1)+' '+(otherQBCY-otherY1)+' '+(otherX2-otherX1)+' '+(otherY2-otherY1)+
                    'L'+otherNX2+','+otherNY2+'Q'+otherQBCX+','+otherNY1+' '+otherNX1+','+otherNY1+' Z',
                    //otherPath2 = 'M '+otherNX1+' '+otherNY1+' q '+(otherNQBCX-otherNX1)+' '+(otherNQBCY-otherNY1)+' '+(otherNX2-otherNX1)+' '+(otherNY2-otherNY1),
                    //thisPath2 = 'M '+thisNX1+' '+thisNY1+' q '+(thisNQBCX-thisNX1)+' '+(thisNQBCY-thisNY1)+' '+(thisNX2-thisNX1)+' '+(thisNY2-thisNY1),
                    otherPath = 'M '+thisX1+' '+thisY1+' q '+(thisQBCX-thisX1)+' '+(thisQBCY-thisY1)+' '+(thisX2-thisX1)+' '+(thisY2-thisY1)+
                    'L'+thisNX2+','+thisNY2+'Q'+thisNQBCX+','+thisNQBCY+' '+thisNX1+','+thisNY1+' Z'
                  ;
                  if(this.sankeyNode[nindex][nkey].hasOwnProperty('paths')){
                    this.sankeyNode[nindex][nkey].paths.push(otherPath);
                  }
                  else{
                    let copy = JSON.parse(JSON.stringify(this.sankeyNode[nindex][nkey]));
                    this.sankeyNode[nindex][nkey] = Object.assign({},copy,{paths:[otherPath]});
                  }
                  if(this.sankeyNode[index][tofromkey].hasOwnProperty('paths')){
                    this.sankeyNode[index][tofromkey].paths.push(thisPath);
                  }
                  else{
                    let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][tofromkey]));
                    this.sankeyNode[index][tofromkey] = Object.assign({},copy,{paths:[thisPath]});
                  }
                }
                else{
                  let dy = (thisNodeStart-otherNodeStart), dx = (thisNodeX - otherNodeX), midY = dy/2.0, midX = dx/2.0, otherY1 = otherNodeStart,
                    otherY2 = otherY1+midY, otherX1 = otherNodeX, otherX2 = otherX1+midX, otherQBCY = otherY1, otherQBCX = otherX1+(midX/2.0),
                    thisX1 = otherX2, thisY1 = otherY2, thisX2 = thisNodeX, thisY2 = thisNodeStart, thisQBCX = thisX1+(midX/2.0), thisQBCY = thisY2,
                    otherNX1 = otherX1, otherNX2 = otherX2,
                    otherNY1 = (otherY1+this.sankeyNode[nindex][nkey].tos[tofromkey][1]),
                    otherNY2 = (otherY2+this.sankeyNode[nindex][nkey].tos[tofromkey][1]),
                    otherNQBCX = otherQBCX, otherNQBCY = otherNY1, thisNX1 = otherNX2, thisNX2 = thisX2,
                    thisNY1 = thisY1+this.sankeyNode[nindex][nkey].tos[tofromkey][1],
                    thisNY2 = thisY2+this.sankeyNode[nindex][nkey].tos[tofromkey][1],
                    thisNQBCX = thisQBCX, thisNQBCY = thisNY2,
                    otherPath = 'M '+otherX1+' '+otherY1+' q '+(otherQBCX-otherX1)+' '+(otherQBCY-otherY1)+' '+(otherX2-otherX1)+' '+(otherY2-otherY1)+
                    'L'+otherNX2+','+otherNY2+'Q'+otherQBCX+','+otherNY1+' '+otherNX1+','+otherNY1+' Z',
                    //otherPath2 = 'M '+otherNX1+' '+otherNY1+' q '+(otherNQBCX-otherNX1)+' '+(otherNQBCY-otherNY1)+' '+(otherNX2-otherNX1)+' '+(otherNY2-otherNY1),
                    //thisPath2 = 'M '+thisNX1+' '+thisNY1+' q '+(thisNQBCX-thisNX1)+' '+(thisNQBCY-thisNY1)+' '+(thisNX2-thisNX1)+' '+(thisNY2-thisNY1),
                    thisPath = 'M '+thisX1+' '+thisY1+' q '+(thisQBCX-thisX1)+' '+(thisQBCY-thisY1)+' '+(thisX2-thisX1)+' '+(thisY2-thisY1)+
                    'L'+thisNX2+','+thisNY2+'Q'+thisNQBCX+','+thisNQBCY+' '+thisNX1+','+thisNY1+' Z'
                  ;
                  if(this.sankeyNode[nindex][nkey].hasOwnProperty('paths')){
                    this.sankeyNode[nindex][nkey].paths.push(otherPath);
                  }
                  else{
                    let copy = JSON.parse(JSON.stringify(this.sankeyNode[nindex][nkey]));
                    this.sankeyNode[nindex][nkey] = Object.assign({},copy,{paths:[otherPath]});
                  }
                  if(this.sankeyNode[index][tofromkey].hasOwnProperty('paths')){
                    this.sankeyNode[index][tofromkey].paths.push(thisPath);
                  }
                  else{
                    let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][tofromkey]));
                    this.sankeyNode[index][tofromkey] = Object.assign({},copy,{paths:[thisPath]});
                  }
                }
              }
            });
          }
        });
      });
    },
    findNodeFrequencyAndActualWeight(nodes,index){
      let sumFroms = 0, sumTos = 0, sum = 0;
      Object.entries(nodes).forEach(entity=>{
        let toorfromkey = entity[0], tosorfromsobject = entity[1], hasTos = false, counter = 0, ssumTos = 0, ssumFroms = 0;
        if(tosorfromsobject.hasOwnProperty('tos')) hasTos = true;
        if(hasTos){
          if(tosorfromsobject.hasOwnProperty('froms')){
            Object.entries(tosorfromsobject.froms).forEach(nentity=>{
              if(this.sankeyNode[nentity[1]][nentity[0]].hasOwnProperty('tos')){
                sumFroms+=this.sankeyNode[nentity[1]][nentity[0]].tos[toorfromkey][1];
                ssumFroms+=this.sankeyNode[nentity[1]][nentity[0]].tos[toorfromkey][1];
              }
            });
          }
          Object.entries(tosorfromsobject.tos).forEach(nentity=>{
            let key = nentity[0], nvalue = nentity[1];
            sumTos+=nvalue[1];
            ssumTos+=nvalue[1];
          });
          let toorfromscopy = JSON.parse(JSON.stringify(tosorfromsobject));
          sum = (sumFroms>=sumTos)? sumFroms:sumTos;
          this.sankeyNode[index][toorfromkey] = Object.assign({},toorfromscopy,{weight:(ssumFroms>=ssumTos)?ssumFroms:ssumTos});
        }
        else{
          Object.entries(tosorfromsobject.froms).forEach(nentity=>{
            let key = nentity[0], nvalue = nentity[1];
            if(this.sankeyNode[nvalue].hasOwnProperty(key)){
              if(this.sankeyNode[nvalue][key].hasOwnProperty('tos')){
                if(this.sankeyNode[nvalue][key].tos.hasOwnProperty(toorfromkey)){
                  sum+=this.sankeyNode[nvalue][key].tos[toorfromkey][1];
                  ssumFroms+=this.sankeyNode[nvalue][key].tos[toorfromkey][1];
                }
              }
            }
          });
          let toorfromscopy = JSON.parse(JSON.stringify(tosorfromsobject));
          this.sankeyNode[index][toorfromkey] = Object.assign({},toorfromscopy,{weight:ssumFroms});
        }
      });
      return sum;
    },
    markNodePositionAndSumWeight(nodes,index,sums){
      let sum = sums;
      if(index!=(this.sankeyNode.length-1)){
        sum+=(this.gapIncrementor*(Object.keys(nodes).length-1));
        this.totalPerNodeLevel.push(sum);
      }
      else{
        Object.entries(nodes).forEach(entity=>{
          let toorfromkey = entity[0], ssum = 0;
          Object.entries(nodes[toorfromkey].froms).forEach(nentity=>{
            var key = nentity[0], nindex = nentity[1];
            sum+=this.sankeyNode[nindex][key].tos[toorfromkey][1];
            ssum+=this.sankeyNode[nindex][key].tos[toorfromkey][1];
          });
          let toorfromscopy = JSON.parse(JSON.stringify(entity[1]));
          this.sankeyNode[index][toorfromkey] = Object.assign({},toorfromscopy,{weight:ssum});
        });
        this.totalPerNodeLevel.push(sum);
      }
    },
    findNextMinimumWeight(min){
      let nextmin = 0, minAssigned = false;
      this.sankeyNode.forEach((nodes,index)=>{
        Object.entries(nodes).forEach(entity=>{
          let tofromkey = entity[0], tofromobject = entity[1];
          if(tofromobject.hasOwnProperty('froms')){
            Object.entries(tofromobject.froms).forEach(nentity=>{
              if(minAssigned==false){
                nextmin = this.sankeyNode[nentity[1]][nentity[0]].tos[tofromkey][1];
                minAssigned = true;
              }
              if(minAssigned){
                if(nextmin>this.sankeyNode[nentity[1]][nentity[0]].tos[tofromkey][1]&&min!=this.sankeyNode[nentity[1]][nentity[0]].tos[tofromkey][1]){
                  nextmin = this.sankeyNode[nentity[1]][nentity[0]].tos[tofromkey][1];
                }
              }
            });
          }
        });
      });
      return nextmin;
    },
    findMinWeightAndHandleZeroWeight(){
      let min = 0, minAssigned = false;
      this.sankeyNode.forEach((nodes,index)=>{
        Object.entries(nodes).forEach(entity=>{
          let tofromkey = entity[0], tofromobject = entity[1];
          if(tofromobject.hasOwnProperty('froms')){
            Object.entries(tofromobject.froms).forEach(nentity=>{
              if(minAssigned==false){
                min = this.sankeyNode[nentity[1]][nentity[0]].tos[tofromkey][1];
                minAssigned = true;
              }
              if(minAssigned){
                if(min>this.sankeyNode[nentity[1]][nentity[0]].tos[tofromkey][1]){
                  min = this.sankeyNode[nentity[1]][nentity[0]].tos[tofromkey][1];
                }
              }
            });
          }
        });
      });
      let nextmin = this.findNextMinimumWeight(min);
      if(min==0){
        this.sankeyNode.forEach((nodes,index)=>{
          Object.entries(nodes).forEach(entity=>{
            let tofromkey = entity[0], tofromobject = entity[1];
            if(tofromobject.hasOwnProperty('froms')){
              Object.entries(tofromobject.froms).forEach(nentity=>{
                if(this.sankeyNode[nentity[1]][nentity[0]].tos[tofromkey][1]==min){
                  this.sankeyNode[nentity[1]][nentity[0]].tos[tofromkey][1] = nextmin/2.0;
                }
              });
            }
          });
        });
      }
    },
    findDensedAreaStart(listWithStart){
      let densedAreaStart = [];
      for(let list of listWithStart){
        if(list[4]){
          densedAreaStart = list;
          break;
        }
      }
      return densedAreaStart;
    },
    sortFromListByStart(listn){
      let list1 = [];
      listn.forEach(item=>{
        if(this.sankeyNode[item[1]][item[0]].hasOwnProperty('start'))
          list1.push([item[0],item[1],this.sankeyNode[item[1]][item[0]].start]);
      });
      if(list1.length>0){
        let min = list1[0][2], count = 0, temp = list1[count], minindex = 0;
        list1.forEach(item=>{
          if(count>0){
            if(min>item[2]){
              list1[minindex] = list1[count];
              list1[count] = temp;
              temp = list1[count];
              minindex = count;
              min = list1[count][2];
            }
          }
          count++;
        });
      }
      listn.forEach(item=>{
        if(!this.sankeyNode[item[1]][item[0]].hasOwnProperty('start'))
          list1.push([item[0],item[1],0]);
      });
      return list1;
    },
    sortFromListByStart1(listn){
      let list1 = [];
      listn.forEach(item=>{
        if(this.sankeyNode[item[1][0]][item[0]].hasOwnProperty('start'))
          list1.push([item[0],item[1][0],this.sankeyNode[item[1][0]][item[0]].start]);
      });
      if(list1.length>0){
        let min = list1[0][2], count = 0, temp = list1[count], minindex = 0;
        list1.forEach(item=>{
          if(count>0){
            if(min>item[2]){
              list1[minindex] = list1[count];
              list1[count] = temp;
              temp = list1[count];
              minindex = count;
              min = list1[count][2];
            }
          }
          count++;
        });
      }
      listn.forEach(item=>{
        if(!this.sankeyNode[item[1][0]][item[0]].hasOwnProperty('start'))
          list1.push([item[0],item[1][0],0]);
      });
      return list1;
    },
    findGap(index){
      let list = Object.entries(this.sankeyNode[index]), ssize = list.length,
          newh = (this.totalPerNodeLevel[index]/this.max)*this.height, totalNodeHeights = 0
      ;
      list.forEach(entity=>{
        totalNodeHeights+=(this.sankeyNode[index][entity[0]].weight/parseFloat(this.totalPerNodeLevel[index]))*newh;
      });
      let gap = (this.height-totalNodeHeights)/parseFloat(ssize+2), actualGap = ((gap>=12)?12:gap);
      return actualGap;
    },
    findMoreDensedAreaList(listn,index,key,sankeyType){
      let nindex=0, list = this.sortFromListByStart(listn), listWithStart = [], diffBetweenNodes = [], counter = 0, densedAreaMap = [], densedAreaMap1 = [], densedAreaMap2 = [], densedAreaStart = 0;
      list.forEach(item=>{
        if(this.sankeyNode[item[1]][item[0]].hasOwnProperty('start')&&this.sankeyNode[item[1]][item[0]].hasOwnProperty('weight')){
          listWithStart.push([
            item[0],
            this.sankeyNode[item[1]][item[0]].start,
            this.sankeyNode[item[1]][item[0]].weight,
            item[1],
            false
          ]);
        }
        else{
          let gap = this.findGap(item[1]);
          if((nindex-1)>=0){
            this.sankeyNode[item[1]][item[0]].start = this.sankeyNode[list[nindex-1][1]][list[nindex-1][0]].start+gap;
            listWithStart.push([
              item[0],
              this.sankeyNode[item[1]][item[0]].start,
              this.sankeyNode[item[1]][item[0]].weight,
              item[1],
              false
            ]);
          }
        }
        nindex++;
      });
      listWithStart = this.sortList(listWithStart,'ANOTHER-START');
      let size = listWithStart.length;
      if(size==1){
        if(this.sankeyNode[listWithStart[0][3]][listWithStart[0][0]].hasOwnProperty('tos')){
          let tos = Object.entries(this.sankeyNode[listWithStart[0][3]][listWithStart[0][0]].tos);
          for(let to of tos){
            if(to[0]!=key){
              listWithStart[0][1]+=to[1][1];
            }
          }
        }
        listWithStart[0][4] = true;
      }
      else{
        listWithStart.forEach(item=>{
          if((counter+1)<size){
            if((item[1]+item[2])>=listWithStart[counter+1][1]){
              if(this.sankeyNode[item[3]][item[0]].hasOwnProperty('tos')){
                let tos = Object.entries(this.sankeyNode[item[3]][item[0]].tos);
                for(let to of tos){
                  if(to[1][0]>index){
                    listWithStart[counter][1]+=to[1][1];
                  }
                }
              }
              listWithStart[counter][4] = true;
              listWithStart[counter+1][4] = true;
            }
            else{
              if(item[3]==listWithStart[counter+1][3]){ //same level
                let minList = this.sortList(Object.entries(this.sankeyNode[item[3]]),'START'), firstfound = false, icounter = 0, breakTrue = false;
                for(let mList of minList){
                  if(item[0]==mList[0]) firstfound = true;
                  if(firstfound){
                    if(minList.length>1){
                      if((icounter+1)<minList.length){
                        if(minList[icounter+1][0]==listWithStart[counter+1][0]){
                          listWithStart[counter][4] = true;
                          listWithStart[counter+1][4] = true;
                        }
                        else{
                          if(this.sankeyNode[item[3]][minList[icounter+1][0]].hasOwnProperty('tos')){
                            let tos = Object.entries(this.sankeyNode[item[3]][minList[icounter+1][0]].tos);
                            for(let to of tos){
                              if(to[1][0]>index){
                                breakTrue = true;
                                break;
                              }
                            }
                          }
                          if(breakTrue){
                            densedAreaMap.push((counter+1));
                          }
                        }
                      }
                    }
                    else{
                      if(minList.length==1){
                        listWithStart[counter][4] = true;
                        listWithStart[counter+1][4] = true;
                      }
                    }
                    if(breakTrue) break;
                  }
                  icounter++;
                }
              }
              else{
                let minList1 = this.sortList(Object.entries(this.sankeyNode[item[3]]),'START'), firstfound1 = false, icounter1 = 0, level1 = false, level2 = false,
                    minList2 = this.sortList(Object.entries(this.sankeyNode[listWithStart[counter+1][3]]),'START'), firstfound2 = false, icounter2 = 0,
                    breakTrue1 = false, breakTrue2 = false
                ;
                for(let mList of minList1){
                  if(item[0]==mList[0]) firstfound1 = true;
                  if(firstfound1){
                    if(minList1.length>1){
                      if((icounter1+1)<minList1.length){
                        if(minList1[icounter1+1][1].start>listWithStart[counter+1][1]){
                          level1 = true;
                        }
                        else{
                          if(this.sankeyNode[item[3]][minList1[icounter1+1][0]].hasOwnProperty('tos')){
                            let tos = Object.entries(this.sankeyNode[item[3]][minList1[icounter1+1][0]].tos);
                            for(let to of tos){
                              if(to[1][0]>index){
                                breakTrue1 = true;
                                break;
                              }
                            }
                          }
                          if(breakTrue1){
                            densedAreaMap1.push((counter+1));
                          }
                        }
                      }
                    }
                    if(breakTrue1) break;
                  }
                  icounter1++;
                }
                for(let mList of minList2){
                  if(listWithStart[counter+1][0]==mList[0]) firstfound2 = true;
                  if(firstfound2){
                    if(minList2.length>1){
                      if((icounter2-1)>=0){
                        if(minList2[icounter2-1][1].start<=(item[1]+item[2])){
                          level2 = true;
                        }
                        else{
                          if(this.sankeyNode[listWithStart[counter+1][3]][minList2[icounter2-1][0]].hasOwnProperty('tos')){
                            let tos = Object.entries(this.sankeyNode[listWithStart[counter+1][3]][minList2[icounter2-1][0]].tos);
                            for(let to of tos){
                              if(to[1][0]>index){
                                breakTrue2 = true;
                                break;
                              }
                            }
                          }
                          if(breakTrue2){
                            densedAreaMap2.push((counter+1));
                          }
                        }
                      }
                    }
                    if(breakTrue2) break;
                  }
                  icounter2++;
                }
                if(item[3]<listWithStart[counter+1][3]){
                  if(level1||level2){
                    if(level1&&level2){
                      listWithStart[counter][4] = true;
                      listWithStart[counter+1][4] = true;
                    }
                    else{
                      if(level1&&!level2){
                        if(minList2.length==1||icounter2==0){
                          listWithStart[counter][4] = true;
                          listWithStart[counter+1][4] = true;
                        }
                        else{
                          listWithStart[counter][4] = true;
                        }
                      }
                      else{
                        if(minList1.length==1||icounter1==(minList1.length-1)){
                          listWithStart[counter][4] = true;
                          listWithStart[counter+1][4] = true;
                        }
                        else{
                          listWithStart[counter][4] = true;
                        }
                      }
                    }
                  }
                  else{
                    listWithStart[counter][4] = true;
                  }
                }
                else{
                  if(level1||level2){
                    if(level1&&!level2){
                      if(minList2.length==1||icounter2==0){
                        listWithStart[counter][4] = true;
                        listWithStart[counter+1][4] = true;
                      }
                      else{
                        listWithStart[counter+1][4] = true;
                      }
                    }
                    else{
                      if(minList1.length==1||icounter1==minList1.length){
                        listWithStart[counter][4] = true;
                        listWithStart[counter+1][4] = true;
                      }
                      else{
                        listWithStart[counter+1][4] = true;
                      }
                    }
                  }
                  else{
                    listWithStart[counter+1][4] = true;
                  }
                }
              }
            }
          }
          counter++;
        });
      }
      let checkTrue = true;
      if(densedAreaMap.length==0) checkTrue = false;
      for(let k=0;k<densedAreaMap[0];k++){
        if(listWithStart[k][4]==false){
          checkTrue = false;
          break;
        }
      }
      if(checkTrue){
        for(let breakIndex of densedAreaMap){
          let frequency = breakIndex, trueCount = 0;
          for(let i=breakIndex;i<listWithStart.length;i++){
            if(listWithStart[i][4]) trueCount++;
            if(listWithStart[i][4]==false||i==(listWithStart.length-1)){
              if(trueCount<frequency){
                for(let j=breakIndex;j<(breakIndex+trueCount);j++){
                  listWithStart[j][4] = false;
                }
              }
              break;
            }
          }
        }
      }
      return {listWithStart:listWithStart,densedAreaStart:this.findDensedAreaStart(listWithStart)};
    },
    findMoreDensedAreaList1(listn,index,key,sankeyType){
      let nindex=0, list = this.sortFromListByStart1(listn), listWithStart = [], diffBetweenNodes = [], counter = 0, densedAreaMap = [], densedAreaMap1 = [], densedAreaMap2 = [], densedAreaStart = 0;
      list.forEach(item=>{
        if(this.sankeyNode[item[1]][item[0]].hasOwnProperty('start')&&this.sankeyNode[item[1]][item[0]].hasOwnProperty('weight')){
          listWithStart.push([
            item[0],
            this.sankeyNode[item[1]][item[0]].start,
            this.sankeyNode[item[1]][item[0]].weight,
            item[1],
            false
          ]);
        }
        else{
          let gap = this.findGap(item[1]);
          if((nindex-1)>=0){
            this.sankeyNode[item[1]][item[0]].start = this.sankeyNode[list[nindex-1][1]][list[nindex-1][0]].start+gap;
            listWithStart.push([
              item[0],
              this.sankeyNode[item[1]][item[0]].start,
              this.sankeyNode[item[1]][item[0]].weight,
              item[1],
              false
            ]);
          }
        }
        nindex++;
      });
      listWithStart = this.sortList(listWithStart,'ANOTHER-START');
      let size = listWithStart.length;
      if(size==1){
        if(this.sankeyNode[listWithStart[0][3]][listWithStart[0][0]].hasOwnProperty('froms')){
          let froms = Object.entries(this.sankeyNode[listWithStart[0][3]][listWithStart[0][0]].froms);
          for(let from of froms){
            if(from[0]!=key){
              listWithStart[0][1]+=this.sankeyNode[from[1]][from[0]].tos[listWithStart[0][0]][1];
            }
          }
        }
        listWithStart[0][4] = true;
      }
      else{
        listWithStart.forEach(item=>{
          if((counter+1)<size){
            if((item[1]+item[2])>=listWithStart[counter+1][1]){
              if(this.sankeyNode[item[3]][item[0]].hasOwnProperty('froms')){
                let froms = Object.entries(this.sankeyNode[item[3]][item[0]].froms);
                for(let from of froms){
                  if(from[1]>index){
                    listWithStart[counter][1]+=this.sankeyNode[from[1]][from[0]].tos[item[0]][1];
                  }
                }
              }
              listWithStart[counter][4] = true;
              listWithStart[counter+1][4] = true;
            }
            else{
              if(item[3]==listWithStart[counter+1][3]){ //same level
                let minList = this.sortList(Object.entries(this.sankeyNode[item[3]]),'START'), firstfound = false, icounter = 0, breakTrue = false;
                for(let mList of minList){
                  if(item[0]==mList[0]) firstfound = true;
                  if(firstfound){
                    if(minList.length>1){
                      if((icounter+1)<minList.length){
                        if(minList[icounter+1][0]==listWithStart[counter+1][0]){
                          listWithStart[counter][4] = true;
                          listWithStart[counter+1][4] = true;
                        }
                        else{
                          if(this.sankeyNode[item[3]][minList[icounter+1][0]].hasOwnProperty('froms')){
                            let froms = Object.entries(this.sankeyNode[item[3]][minList[icounter+1][0]].froms);
                            for(let from of froms){
                              if(from[1]>index){
                                breakTrue = true;
                                break;
                              }
                            }
                          }
                          if(breakTrue){
                            densedAreaMap.push((counter+1));
                          }
                        }
                      }
                    }
                    else{
                      if(minList.length==1){
                        listWithStart[counter][4] = true;
                        listWithStart[counter+1][4] = true;
                      }
                    }
                    if(breakTrue) break;
                  }
                  icounter++;
                }
              }
              else{
                let minList1 = this.sortList(Object.entries(this.sankeyNode[item[3]]),'START'), firstfound1 = false, icounter1 = 0, level1 = false, level2 = false,
                    minList2 = this.sortList(Object.entries(this.sankeyNode[listWithStart[counter+1][3]]),'START'), firstfound2 = false, icounter2 = 0,
                    breakTrue1 = false, breakTrue2 = false
                ;
                for(let mList of minList1){
                  if(item[0]==mList[0]) firstfound1 = true;
                  if(firstfound1){
                    if(minList1.length>1){
                      if((icounter1+1)<minList1.length){
                        if(minList1[icounter1+1][1].start>listWithStart[counter+1][1]){
                          level1 = true;
                        }
                        else{
                          if(this.sankeyNode[item[3]][minList1[icounter1+1][0]].hasOwnProperty('froms')){
                            let froms = Object.entries(this.sankeyNode[item[3]][minList1[icounter1+1][0]].froms);
                            for(let from of froms){
                              if(from[1]>index){
                                breakTrue1 = true;
                                break;
                              }
                            }
                          }
                          if(breakTrue1){
                            densedAreaMap1.push((counter+1));
                          }
                        }
                      }
                    }
                    if(breakTrue1) break;
                  }
                  icounter1++;
                }
                for(let mList of minList2){
                  if(listWithStart[counter+1][0]==mList[0]) firstfound2 = true;
                  if(firstfound2){
                    if(minList2.length>1){
                      if((icounter2-1)>=0){
                        if(minList2[icounter2-1][1].start<=(item[1]+item[2])){
                          level2 = true;
                        }
                        else{
                          if(this.sankeyNode[listWithStart[counter+1][3]][minList2[icounter2-1][0]].hasOwnProperty('froms')){
                            let froms = Object.entries(this.sankeyNode[listWithStart[counter+1][3]][minList2[icounter2-1][0]].froms);
                            for(let from of froms){
                              if(from[1]>index){
                                breakTrue2 = true;
                                break;
                              }
                            }
                          }
                          if(breakTrue2){
                            densedAreaMap2.push((counter+1));
                          }
                        }
                      }
                    }
                    if(breakTrue2) break;
                  }
                  icounter2++;
                }
                if(item[3]<listWithStart[counter+1][3]){
                  if(level1||level2){
                    if(level1&&level2){
                      listWithStart[counter][4] = true;
                      listWithStart[counter+1][4] = true;
                    }
                    else{
                      if(level1&&!level2){
                        if(minList2.length==1||icounter2==0){
                          listWithStart[counter][4] = true;
                          listWithStart[counter+1][4] = true;
                        }
                        else{
                          listWithStart[counter][4] = true;
                        }
                      }
                      else{
                        if(minList1.length==1||icounter1==(minList1.length-1)){
                          listWithStart[counter][4] = true;
                          listWithStart[counter+1][4] = true;
                        }
                        else{
                          listWithStart[counter][4] = true;
                        }
                      }
                    }
                  }
                  else{
                    listWithStart[counter][4] = true;
                  }
                }
                else{
                  if(level1||level2){
                    if(level1&&!level2){
                      if(minList2.length==1||icounter2==0){
                        listWithStart[counter][4] = true;
                        listWithStart[counter+1][4] = true;
                      }
                      else{
                        listWithStart[counter+1][4] = true;
                      }
                    }
                    else{
                      if(minList1.length==1||icounter1==minList1.length){
                        listWithStart[counter][4] = true;
                        listWithStart[counter+1][4] = true;
                      }
                      else{
                        listWithStart[counter+1][4] = true;
                      }
                    }
                  }
                  else{
                    listWithStart[counter+1][4] = true;
                  }
                }
              }
            }
          }
          counter++;
        });
      }
      let checkTrue = true;
      if(densedAreaMap.length==0) checkTrue = false;
      for(let k=0;k<densedAreaMap[0];k++){
        if(listWithStart[k][4]==false){
          checkTrue = false;
          break;
        }
      }
      if(checkTrue){
        for(let breakIndex of densedAreaMap){
          let frequency = breakIndex, trueCount = 0;
          for(let i=breakIndex;i<listWithStart.length;i++){
            if(listWithStart[i][4]) trueCount++;
            if(listWithStart[i][4]==false||i==(listWithStart.length-1)){
              if(trueCount<frequency){
                for(let j=breakIndex;j<(breakIndex+trueCount);j++){
                  listWithStart[j][4] = false;
                }
              }
              break;
            }
          }
        }
      }
      return {listWithStart:listWithStart,densedAreaStart:this.findDensedAreaStart(listWithStart)};
    },
    findHighestIntersectionPair(list,sankeytype){
      let pair = [], size = list.length;
      if(sankeytype=='LEFT'||sankeytype=='JUSTIFY'||sankeytype=='CENTER'){
        for(let i=0; i<size; i++){
          let tos1 = list[i][1].tos;
          for(let j=(i+1); j<size; j++){
            let tos2 = list[j][1].tos;
            console.log(list[i][0],' ',tos1,' ',list[j][0],' ',tos2);

          }
        }
      }
      else{

      }
    },
    plotSankeyNodes(){
      this.findMinWeightAndHandleZeroWeight();
      let ssize = this.sankeyNode.length, xSpacer = (this.width-(2*this.gapInBetween)-ssize*this.nodeWidth)/parseFloat(ssize-1);
      this.sankeyNode.forEach((nodes,index)=>{
        this.markNodePositionAndSumWeight(nodes,index,this.findNodeFrequencyAndActualWeight(nodes,index));
      });
      this.max = this.findMax();
      let totalsum = 0;
      if(this.sankeyType=='LEFT'||this.sankeyType=='JUSTIFY'||this.sankeyType=='CENTER'){
        this.sankeyNode.forEach((nodes,index)=>{
          let newh = (this.totalPerNodeLevel[index]/this.max)*this.height;
          Object.entries(nodes).forEach(entity=>{
            let tofromkey = entity[0], tofromobject = entity[1], nsum = 0;
            if(tofromobject.hasOwnProperty('tos')){
              Object.entries(tofromobject.tos).forEach(nentity=>{
                let key = nentity[0], nvalue = nentity[1];
                this.sankeyNode[index][tofromkey].tos[key][1] = (this.sankeyNode[index][tofromkey].tos[key][1]/parseFloat(this.totalPerNodeLevel[index]))*newh;
              });
              nsum = (this.sankeyNode[index][tofromkey].weight/parseFloat(this.totalPerNodeLevel[index]))*newh;
              this.sankeyNode[index][tofromkey].weight = nsum;
              let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][tofromkey]));
              this.sankeyNode[index][tofromkey] = Object.assign({},copy,{x1:(this.gapInBetween+(xSpacer*index)+(index*this.nodeWidth))});
              if(index==0) totalsum+=nsum;
            }
            else{
              this.sankeyNode[index][tofromkey].weight = (this.sankeyNode[index][tofromkey].weight/parseFloat(this.totalPerNodeLevel[index]))*newh;
              let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][tofromkey]));
              this.sankeyNode[index][tofromkey] = Object.assign({},copy,{x1:(this.gapInBetween+(xSpacer*index)+(index*this.nodeWidth))});
            }
          });
          if(index==0){
            let highestIntersectionPair = this.findHighestIntersectionPair(Object.entries(this.sankeyNode[index]),this.sankeyType);
            let list = Object.entries(this.sankeyNode[index]), gap = 0, size = Object.keys(nodes).length;
            list.forEach((nlist,j)=>{
              let oldcopy = JSON.parse(JSON.stringify(this.sankeyNode[index][nlist[0]])), start = 0, height = 0;
              if(j==0){
                gap = (this.height-totalsum)/parseFloat(size+2);
                height = totalsum+((size-1)*gap);
                start = (this.height-height)/2.0;
              }
              else{
                start = this.sankeyNode[index][list[j-1][0]].start+this.sankeyNode[index][list[j-1][0]].weight+gap;
              }
              this.sankeyNode[index][nlist[0]] = Object.assign({},oldcopy,{start:start});
            });
          }
          else{
            let sList = this.sortList(Object.entries(this.sankeyNode[index]),'START');
            sList.forEach(entity=>{
              let tofromkey = entity[0], tofromobject = entity[1];
              if(tofromobject.hasOwnProperty('froms')){
                let minList1 = this.findMoreDensedAreaList(Object.entries(this.sankeyNode[index][tofromkey].froms),index,tofromkey,this.sankeyType), minList = minList1.listWithStart, densedAreaStart = minList1.densedAreaStart, _size = minList.length, count = 0, sum = 0;
                if(_size>1){
                  minList.forEach(nentity=>{
                    if((count+1)<_size){
                      if(minList[count+1][4]&&minList[count][4]){
                        sum+=(minList[(count+1)][1]-minList[count][1]);
                      }
                    }
                    if(count==(_size-1)){
                      let key = nentity[0], nindex = nentity[3];
                      sum+=this.sankeyNode[nindex][key].weight;
                    }
                    count++;
                  });
                }
                let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][tofromkey]));
                if(sum==0){
                  if(minList.length>=1){
                    let start = minList[0][1];
                    this.sankeyNode[index][tofromkey] = Object.assign({},copy,{start:start});
                  }
                }
                else{
                  let start = ((densedAreaStart.length>1)?densedAreaStart[1]:minList[0][1])+((sum-this.sankeyNode[index][tofromkey].weight)/2.0);
                  this.sankeyNode[index][tofromkey] = Object.assign({},copy,{start:start});
                }
              }
            });
          }
        });
      }
      else{
        let ssize1 = index = this.sankeyNode.length-1;
        this.sankeyNode.forEach((nodes,index1)=>{
          let newh = (this.totalPerNodeLevel[index1]/this.max)*this.height;
          Object.entries(nodes).forEach(entity=>{
            let tofromkey = entity[0], tofromobject = entity[1], nsum = 0;
            if(tofromobject.hasOwnProperty('tos')){
              Object.entries(tofromobject.tos).forEach(nentity=>{
                let key = nentity[0], nvalue = nentity[1];
                this.sankeyNode[index1][tofromkey].tos[key][1] = (this.sankeyNode[index1][tofromkey].tos[key][1]/parseFloat(this.totalPerNodeLevel[index1]))*newh;
              });
              nsum = (this.sankeyNode[index1][tofromkey].weight/parseFloat(this.totalPerNodeLevel[index1]))*newh;
              this.sankeyNode[index1][tofromkey].weight = nsum;
              let copy = JSON.parse(JSON.stringify(this.sankeyNode[index1][tofromkey]));
              this.sankeyNode[index1][tofromkey] = Object.assign({},copy,{x1:(this.gapInBetween+(xSpacer*index1)+(index1*this.nodeWidth))});
            }
            else{
              this.sankeyNode[index1][tofromkey].weight = (this.sankeyNode[index1][tofromkey].weight/parseFloat(this.totalPerNodeLevel[index1]))*newh;
              let copy = JSON.parse(JSON.stringify(this.sankeyNode[index1][tofromkey]));
              this.sankeyNode[index1][tofromkey] = Object.assign({},copy,{x1:(this.gapInBetween+(xSpacer*index1)+(index1*this.nodeWidth))});
              if(index1==ssize1) totalsum+=this.sankeyNode[index1][tofromkey].weight;
            }
          });
        });
        let reverseSankeyNode = JSON.parse(JSON.stringify(this.sankeyNode)).reverse();
        reverseSankeyNode.forEach(nodes=>{
          if(index==ssize1){
            let list = Object.entries(this.sankeyNode[index]), gap = 0, size = Object.keys(nodes).length;
            list.forEach((nlist,j)=>{
              let oldcopy = JSON.parse(JSON.stringify(this.sankeyNode[index][nlist[0]])), start = 0, height = 0;
              if(j==0){
                gap = (this.height-totalsum)/parseFloat(size+2);
                height = totalsum+((size-1)*gap);
                start = (this.height-height)/2.0;
              }
              else{
                start = this.sankeyNode[index][list[j-1][0]].start+this.sankeyNode[index][list[j-1][0]].weight+gap;
              }
              this.sankeyNode[index][nlist[0]] = Object.assign({},oldcopy,{start:start});
            });
          }
          else{
            let sList = this.sortList(Object.entries(this.sankeyNode[index]),'START');
            sList.forEach(entity=>{
              let tofromkey = entity[0], tofromobject = entity[1];
              if(tofromobject.hasOwnProperty('tos')){
                let minList1 = this.findMoreDensedAreaList1(Object.entries(this.sankeyNode[index][tofromkey].tos),index,tofromkey,this.sankeyType), minList = minList1.listWithStart, densedAreaStart = minList1.densedAreaStart, _size = minList.length, count = 0, sum = 0;
                if(_size>1){
                  minList.forEach(nentity=>{
                    if((count+1)<_size){
                      if(minList[count+1][4]&&minList[count][4]){
                        sum+=(minList[(count+1)][1]-minList[count][1]);
                      }
                    }
                    if(count==(_size-1)){
                      let key = nentity[0], nindex = nentity[3];
                      sum+=this.sankeyNode[nindex][key].weight;
                    }
                    count++;
                  });
                }
                let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][tofromkey]));
                if(sum==0){
                  if(minList.length>=1){
                    let start = minList[0][1];
                    this.sankeyNode[index][tofromkey] = Object.assign({},copy,{start:start});
                  }
                }
                else{
                  let start = ((densedAreaStart.length>1)?densedAreaStart[1]:minList[0][1])+((sum-this.sankeyNode[index][tofromkey].weight)/2.0);
                  this.sankeyNode[index][tofromkey] = Object.assign({},copy,{start:start});
                }
              }
            });
          }
          index--;
        });
      }
      let movePoint = false;
      this.sankeyNode.forEach((nodes,index)=>{
        if(this.sankeyType=='LEFT'||this.sankeyType=='JUSTIFY'||this.sankeyType=='CENTER'){
          if(index>0) movePoint = true;
          else movePoint = false;
        }
        else{
          if(index<this.sankeyNode.length-1) movePoint = true;
          else movePoint = false;
        }
        if(movePoint){
          let sortedList = this.sortList(Object.entries(nodes),'START'), count = 0, ssize = Object.keys(nodes).length, noGapPlaces = [],
              newh = (this.totalPerNodeLevel[index]/this.max)*this.height, totalNodeHeights = 0
          ;
          sortedList.forEach(entity=>{
            totalNodeHeights+=(this.sankeyNode[index][entity[0]].weight/parseFloat(this.totalPerNodeLevel[index]))*newh;
          });
          let gap = (this.height-totalNodeHeights)/parseFloat(ssize+2), actualGap = ((gap>=12)?12:gap);
          if(ssize>1){
            sortedList.forEach(entity=>{
              let tofromkey = entity[0], tofromobject = entity[1];
              if((count+1)<ssize){
                if((this.sankeyNode[index][sortedList[count][0]].start+this.sankeyNode[index][sortedList[count][0]].weight)>=this.sankeyNode[index][sortedList[count+1][0]].start){
                  this.sankeyNode[index][sortedList[count+1][0]].start=(this.sankeyNode[index][sortedList[count][0]].start+this.sankeyNode[index][sortedList[count][0]].weight)+actualGap;
                }
                else{
                  let gapDiff = this.sankeyNode[index][sortedList[count+1][0]].start-(this.sankeyNode[index][sortedList[count][0]].start+this.sankeyNode[index][sortedList[count][0]].weight);
                  if(gapDiff<actualGap){
                    this.sankeyNode[index][sortedList[count+1][0]].start=(this.sankeyNode[index][sortedList[count][0]].start+this.sankeyNode[index][sortedList[count][0]].weight)+actualGap;
                  }
                  else{
                    noGapPlaces.push([count+1,sortedList[count+1][0]]);
                  }
                }
              }
              else{
                if((this.sankeyNode[index][sortedList[count][0]].start+this.sankeyNode[index][sortedList[count][0]].weight)>=(this.height-actualGap)){
                  let revNoGap = noGapPlaces.reverse(), sortListed = this.sortList(Object.entries(this.sankeyNode[index]),'START'), s_size = sortListed.length,
                      gapH = this.height-actualGap-(this.sankeyNode[index][sortedList[count][0]].start+this.sankeyNode[index][sortedList[count][0]].weight),
                      startmovingup = false
                  ;
                  if(noGapPlaces.length>0){
                    let lastmovingpoint = 0;
                    revNoGap.forEach(n=>{
                      let v = 0;
                      if(startmovingup==false){
                        sortListed.forEach(nitem=>{
                          if(v==n[0]){
                            startmovingup = true;
                            lastmovingpoint = v;
                          }
                          if(startmovingup){
                            this.sankeyNode[index][sortListed[v][0]].start+=gapH;
                            if(v==(s_size-1)){
                              if(lastmovingpoint>0){
                                if((this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].start+this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].weight)<this.sankeyNode[index][sortListed[lastmovingpoint][0]].start){
                                  let diff = this.sankeyNode[index][sortListed[lastmovingpoint][0]].start - (this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].start+this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].weight);
                                  if(diff<actualGap){
                                    this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].start = this.sankeyNode[index][sortListed[lastmovingpoint][0]].start-this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].weight-actualGap;
                                    lastmovingpoint--;
                                  }
                                }
                                else{
                                  this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].start = this.sankeyNode[index][sortListed[lastmovingpoint][0]].start-this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].weight-actualGap;
                                  lastmovingpoint--;
                                }
                              }
                            }
                          }
                          v++;
                        });
                      }
                      else{
                        if(lastmovingpoint>0){
                          if((this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].start+this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].weight)<this.sankeyNode[index][sortListed[lastmovingpoint][0]].start){
                            let diff = this.sankeyNode[index][sortListed[lastmovingpoint][0]].start - (this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].start+this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].weight);
                            if(diff<actualGap){
                              this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].start = this.sankeyNode[index][sortListed[lastmovingpoint][0]].start-this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].weight-actualGap;
                              lastmovingpoint--;
                            }
                          }
                          else{
                            this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].start = this.sankeyNode[index][sortListed[lastmovingpoint][0]].start-this.sankeyNode[index][sortListed[lastmovingpoint-1][0]].weight-actualGap;
                            lastmovingpoint--;
                          }
                        }
                      }
                    });
                  }
                  else{
                    sortListed.forEach(nitem=>{
                      this.sankeyNode[index][nitem[0]].start+=gapH;
                    });
                  }
                }
              }
              count++;
            });
          }
        }
      });
      this.plotNodeToNodeQBZCurvePaths();
      this.findTextLocation();
    },
    findTextLocation(){
      let size = this.sankeyNode.length, xSpacer = (this.width-(2*this.gapInBetween)-size*this.nodeWidth)/parseFloat(size-1);
      this.sankeyNode.forEach((nodes,index)=>{
        let fronttextdisplay = true, previous = fronttextdisplay;
        Object.entries(nodes).forEach(entity=>{
          let key = entity[0], tofromobject = entity[1], copy = JSON.parse(JSON.stringify(this.sankeyNode[index][key]));;
          if(index==0){
            this.sankeyNode[index][key] = Object.assign(
              {},
              copy,{
                text:'FRONT'
              }
            );
          }
          else if(index==(size-1)){
            this.sankeyNode[index][key] = Object.assign(
              {},
              copy,
              {
                text:'BACK'
              }
            );
          }
          else{
            let textDistance = this.measureText(key,13);
            if(textDistance>xSpacer||(textDistance-20)>xSpacer){
              fronttextdisplay = false;
              previous = fronttextdisplay;
            }
          }
        });
        if(index!=0&&index!=(size-1)){
          Object.entries(nodes).forEach(entity=>{
            let key = entity[0], tofromobject = entity[1];
            let copy = JSON.parse(JSON.stringify(this.sankeyNode[index][key]));
            if(fronttextdisplay){
              this.sankeyNode[index][key] = Object.assign(
                {},
                copy,
                {
                  text:'FRONT'
                }
              );
            }
            else{
              this.sankeyNode[index][key] = Object.assign(
                {},
                copy,
                {
                  text:'BACK'
                }
              );
            }
          });
        }
      });
    },
    measureText(str, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
      const avg = 0.5279276315789471
      return str
        .split('')
        .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
        .reduce((cur, acc) => acc + cur) * fontSize
    },
    findMax(){
      let max = this.totalPerNodeLevel[0];
      for(let i=1; i<this.totalPerNodeLevel.length; i++){
        if(max<this.totalPerNodeLevel[i]) max = this.totalPerNodeLevel[i];
      }
      return max;
    },
    handleResize(){
      let container = document.getElementById('sankey-diagram');
      this.height = container.offsetHeight;
      this.width = container.offsetWidth;
      this.sankeyNode = [];
      this.totalPerNodeLevel = [];
      this.sankeyType = 'CENTRE';
      if(this.sankeyType=='RIGHT')
        this.findRightNodeOrder();
      else if(this.sankeyType=='LEFT')
        this.findLeftNodeOrder();
      else if(this.sankeyType=='JUSTIFY')
        this.findJustifyNodeOrder();
      else
        this.findCenterNodeOrder();
      this.plotSankeyNodes();
      console.log(this.sankeyNode);
    }
  },
  created:function(){
    this.normalizeValue();
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  template:
  `
  <div class="block height-100-percent overflow-hidden text-center">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="height-100-percent width-100-percent" aria-labelledby="title" role="img">
      <title id="title">Sankey Diagram</title>
      <g>
        <template v-for="(point,index) in sankeyNode">
          <template v-for="(pnode, idex) in Object.entries(point)">
            <template v-for="(paths,idx) in pnode[1].paths" v-if="pnode[1].hasOwnProperty('paths')">
              <g stroke="pink" fill="pink" stroke-opacity="0.3" fill-opacity="0.6">
                <path :d="paths" />
              </g>
            </template>
          </template>
        </template>
      </g>
      <g>
        <template v-for="(point,index) in sankeyNode">
          <template v-for="(pnode, idex) in Object.entries(point)">
            <rect v-if="pnode[1].start" :x="pnode[1].x1" :y="pnode[1].start" :width="nodeWidth" :height="pnode[1].weight" style="fill:black;" />
            <template v-if="pnode[1].text=='BACK'">
              <text v-if="pnode[1].start" style="font-size:11px;" :x="(pnode[1].x1-nodeWidth-measureText(pnode[0],11)+10)" :y="pnode[1].start+(pnode[1].weight/2.0)+5">{{pnode[0]}}</text>
            </template>
            <template v-else>
              <text v-if="pnode[1].start" style="font-size:11px;" :x="(pnode[1].x1+nodeWidth+5)" :y="pnode[1].start+(pnode[1].weight/2.0)+5">{{pnode[0]}}</text>
            </template>
          </template>
        </template>
      </g>
    </svg>
  </div>
  `
};

new Vue({
  el: "#sankey-diagram",
  components:{
    'sankey-diagram':SankeyDiagram
  }
});
