var setData = [
	{ckid:'0', mkmid:'1391', edition:'2005 Player Cards'},
	{ckid:'0', mkmid:'1269', edition:'2006 Player Cards'},
	{ckid:'0', mkmid:'1392', edition:'2007 Player Cards'},
	{ckid:'3030', mkmid:'1718', edition:'Aether Revolt'},
	{ckid:'2630', mkmid:'1750', edition:'Aether Revolt: Promos'},
	{ckid:'0', mkmid:'1592', edition:'Alara Block All-Foil Booster'},
	{ckid:'2385', mkmid:'108', edition:'Alara Reborn'},
	{ckid:'2390', mkmid:'15', edition:'Alliances'},
	{ckid:'2395', mkmid:'1', edition:'Alpha'},
	{ckid:'3042', mkmid:'1729', edition:'Amonkhet'},
	{ckid:'3044', mkmid:'1798', edition:'Amonkhet Invocations'},
	{ckid:'2630', mkmid:'1803', edition:'Amonkhet: Promos'},
	{ckid:'2400', mkmid:'75', edition:'Anthologies'},
	{ckid:'2405', mkmid:'5', edition:'Antiquities'},
	{ckid:'0', mkmid:'97', edition:'APAC Lands'},
	{ckid:'2410', mkmid:'36', edition:'Apocalypse'},
	{ckid:'2415', mkmid:'4', edition:'Arabian Nights'},
	{ckid:'2846', mkmid:'1194', edition:'Archenemy'},
	{ckid:'3048', mkmid:'1730', edition:'Archenemy: Nicol Bolas'},
	{ckid:'2630', mkmid:'89', edition:'Arena League Promos'},
	{ckid:'0', mkmid:'117', edition:'Armada Comics'},
	{ckid:'0', mkmid:'1429', edition:'Artists of Magic'},
	{ckid:'2874', mkmid:'1358', edition:'Avacyn Restored'},
	{ckid:'2953', mkmid:'1668', edition:'Battle for Zendikar'},
	{ckid:'2630', mkmid:'1670', edition:'Battle for Zendikar: Promos'},
	{ckid:'2420', mkmid:'64', edition:'Battle Royale'},
	{ckid:'3088', mkmid:'2111', edition:'Battlebond'},
	{ckid:'2630', mkmid:'2333', edition:'Battlebond: Promos'},
	{ckid:'2425', mkmid:'62', edition:'Beatdown'},
	{ckid:'2430', mkmid:'2', edition:'Beta'},
	{ckid:'2435', mkmid:'51', edition:'Betrayers of Kamigawa'},
	{ckid:'0', mkmid:'1697', edition:'BoM Products'},
	{ckid:'2903', mkmid:'1469', edition:'Born of the Gods'},
	{ckid:'2630', mkmid:'1198', edition:'Buy a Box Promos'},
	{ckid:'0', mkmid:'1662', edition:'Cardmarket Tokens'},
	{ckid:'2630', mkmid:'1342', edition:'CardZ Promos'},
	{ckid:'2440', mkmid:'48', edition:'Champions of Kamigawa'},
	{ckid:'2630', mkmid:'94', edition:'Champs &amp; States Promos'},
	{ckid:'2445', mkmid:'12', edition:'Chronicles'},
	{ckid:'0', mkmid:'1599', edition:'Chronicles: Japanese'},
	{ckid:'2630', mkmid:'1490', edition:'Clash Pack Promos'},
	{ckid:'2450', mkmid:'52', edition:'Coldsnap'},
	{ckid:'3099', mkmid:'82', edition:'Coldsnap Theme Decks'},
	{ckid:'2460', mkmid:'61', edition:'Collectors Edition'},
	{ckid:'2862', mkmid:'1273', edition:'Commander'},
	{ckid:'2902', mkmid:'1464', edition:'Commander 2013'},
	{ckid:'2916', mkmid:'1513', edition:'Commander 2014'},
	{ckid:'2958', mkmid:'1679', edition:'Commander 2015'},
	{ckid:'2949', mkmid:'1719', edition:'Commander 2016'},
	{ckid:'3055', mkmid:'1813', edition:'Commander 2017'},
	{ckid:'3100', mkmid:'2110', edition:'Commander 2018'},
	{ckid:'3047', mkmid:'1732', edition:'Commander Anthology'},
	{ckid:'3089', mkmid:'2109', edition:'Commander Anthology II'},
	{ckid:'2888', mkmid:'1418', edition:'Commander\'s Arsenal'},
	{ckid:'2783', mkmid:'106', edition:'Conflux'},
	{ckid:'2908', mkmid:'1483', edition:'Conspiracy'},
	{ckid:'2977', mkmid:'1702', edition:'Conspiracy: Take the Crown'},
	{ckid:'2630', mkmid:'1597', edition:'Convention Promos'},
	{ckid:'3097', mkmid:'1835', edition:'Core 2019'},
	{ckid:'2630', mkmid:'2337', edition:'Core 2019: Promos'},
	{ckid:'0', mkmid:'2383', edition:'Creature Forge: Overwhelming Swarm'},
	{ckid:'0', mkmid:'1499', edition:'Custom Tokens'},
	{ckid:'2870', mkmid:'1345', edition:'Dark Ascension'},
	{ckid:'2465', mkmid:'46', edition:'Darksteel'},
	{ckid:'2630', mkmid:'66', edition:'DCI Promos'},
	{ckid:'2470', mkmid:'67', edition:'Deckmasters'},
	{ckid:'2630', mkmid:'1248', edition:'Dengeki Maoh Promos'},
	{ckid:'2475', mkmid:'53', edition:'Dissension'},
	{ckid:'3086', mkmid:'1822', edition:'Dominaria'},
	{ckid:'2630', mkmid:'2315', edition:'Dominaria: Promos'},
	{ckid:'2892', mkmid:'1435', edition:'Dragon\'s Maze'},
	{ckid:'2938', mkmid:'1601', edition:'Dragons of Tarkir'},
	{ckid:'2630', mkmid:'1602', edition:'Dragons Of Tarkir: Promos'},
	{ckid:'2865', mkmid:'1288', edition:'Duel Decks: Ajani vs. Nicol Bolas'},
	{ckid:'2918', mkmid:'1509', edition:'Duel Decks: Anthology'},
	{ckid:'2969', mkmid:'1692', edition:'Duel Decks: Blessed vs. Cursed'},
	{ckid:'2480', mkmid:'107', edition:'Duel Decks: Divine vs. Demonic'},
	{ckid:'2936', mkmid:'1593', edition:'Duel Decks: Elspeth vs. Kiora'},
	{ckid:'2851', mkmid:'1203', edition:'Duel Decks: Elspeth vs. Tezzeret'},
	{ckid:'2485', mkmid:'91', edition:'Duel Decks: Elves vs. Goblins'},
	{ckid:'3084', mkmid:'2068', edition:'Duel Decks: Elves vs. Inventors'},
	{ckid:'2838', mkmid:'115', edition:'Duel Decks: Garruk vs. Liliana'},
	{ckid:'2896', mkmid:'1456', edition:'Duel Decks: Heroes vs. Monsters'},
	{ckid:'2878', mkmid:'1398', edition:'Duel Decks: Izzet vs. Golgari'},
	{ckid:'2490', mkmid:'104', edition:'Duel Decks: Jace vs. Chandra'},
	{ckid:'2904', mkmid:'1477', edition:'Duel Decks: Jace vs. Vraska'},
	{ckid:'2860', mkmid:'1261', edition:'Duel Decks: Knights vs. Dragons'},
	{ckid:'3062', mkmid:'1818', edition:'Duel Decks: Merfolk vs. Goblins'},
	{ckid:'3041', mkmid:'1728', edition:'Duel Decks: Mind vs. Might'},
	{ckid:'2980', mkmid:'1720', edition:'Duel Decks: Nissa vs. Ob Nixilis'},
	{ckid:'2841', mkmid:'119', edition:'Duel Decks: Phyrexia vs. The Coalition'},
	{ckid:'2891', mkmid:'1430', edition:'Duel Decks: Sorin vs. Tibalt'},
	{ckid:'2911', mkmid:'1496', edition:'Duel Decks: Speed vs. Cunning'},
	{ckid:'2873', mkmid:'1350', edition:'Duel Decks: Venser vs. Koth'},
	{ckid:'2951', mkmid:'1663', edition:'Duel Decks: Zendikar vs. Eldrazi'},
	{ckid:'2845', mkmid:'1193', edition:'Duels of the Planeswalkers Decks'},
	{ckid:'2630', mkmid:'1278', edition:'Duels of the Planeswalkers Promos'},
	{ckid:'2370', mkmid:'44', edition:'Eighth Edition'},
	{ckid:'2976', mkmid:'1695', edition:'Eldritch Moon'},
	{ckid:'2630', mkmid:'1723', edition:'Eldritch Moon: Promos'},
	{ckid:'2973', mkmid:'1696', edition:'Eternal Masters'},
	{ckid:'0', mkmid:'81', edition:'Euro Lands'},
	{ckid:'2495', mkmid:'99', edition:'Eventide'},
	{ckid:'2500', mkmid:'21', edition:'Exodus'},
	{ckid:'3064', mkmid:'1830', edition:'Explorers of Ixalan'},
	{ckid:'2505', mkmid:'9', edition:'Fallen Empires'},
	{ckid:'0', mkmid:'1638', edition:'Fallen Empires: Wyvern Misprints'},
	{ckid:'2923', mkmid:'1522', edition:'Fate Reforged'},
	{ckid:'2630', mkmid:'1589', edition:'Fate Reforged: Promos'},
	{ckid:'2510', mkmid:'47', edition:'Fifth Dawn'},
	{ckid:'2355', mkmid:'23', edition:'Fifth Edition'},
	{ckid:'0', mkmid:'1408', edition:'Filler Cards'},
	{ckid:'0', mkmid:'57', edition:'Foreign Black Bordered'},
	{ckid:'0', mkmid:'73', edition:'Foreign White Bordered'},
	{ckid:'2350', mkmid:'10', edition:'Fourth Edition'},
	{ckid:'0', mkmid:'1600', edition:'Fourth Edition: Alternate'},
	{ckid:'0', mkmid:'1332', edition:'Fourth Edition: Black Bordered'},
	{ckid:'2630', mkmid:'72', edition:'Friday Night Magic Promos'},
	{ckid:'2952', mkmid:'1661', edition:'From the Vault: Angels'},
	{ckid:'2913', mkmid:'1494', edition:'From the Vault: Annihilation'},
	{ckid:'2515', mkmid:'100', edition:'From the Vault: Dragons'},
	{ckid:'2815', mkmid:'112', edition:'From the Vault: Exiled'},
	{ckid:'2868', mkmid:'1286', edition:'From the Vault: Legends'},
	{ckid:'2979', mkmid:'1703', edition:'From the Vault: Lore'},
	{ckid:'2883', mkmid:'1397', edition:'From the Vault: Realms'},
	{ckid:'2850', mkmid:'1202', edition:'From the Vault: Relics'},
	{ckid:'3065', mkmid:'1819', edition:'From the Vault: Transform'},
	{ckid:'2899', mkmid:'1455', edition:'From the Vault: Twenty'},
	{ckid:'2520', mkmid:'70', edition:'Future Sight'},
	{ckid:'2630', mkmid:'1209', edition:'Game Day Promos'},
	{ckid:'0', mkmid:'1642', edition:'GamingEtc Tokens'},
	{ckid:'2890', mkmid:'1424', edition:'Gatecrash'},
	{ckid:'2630', mkmid:'78', edition:'Gateway Promos'},
	{ckid:'3093', mkmid:'2108', edition:'Global Series Jiang Yanggu &amp; Mu Yanling'},
	{ckid:'0', mkmid:'1691', edition:'GnD Cards'},
	{ckid:'2630', mkmid:'1595', edition:'Grand Prix Promos'},
	{ckid:'2525', mkmid:'54', edition:'Guildpact'},
	{ckid:'3102', mkmid:'2348', edition:'Guilds of Ravnica'},
	{ckid:'0', mkmid:'2371', edition:'Guilds of Ravnica: Extras'},
	{ckid:'3103', mkmid:'2379', edition:'Guilds of Ravnica: Guild Kits'},
	{ckid:'3105', mkmid:'2373', edition:'Guilds of Ravnica: Mythic Edition'},
	{ckid:'0', mkmid:'88', edition:'Guru Lands'},
	{ckid:'2630', mkmid:'1247', edition:'Happy Holidays Promos'},
	{ckid:'2630', mkmid:'71', edition:'Harper Prism Promos'},
	{ckid:'2630', mkmid:'1841', edition:'Hascon 2017 Promos'},
	{ckid:'2630', mkmid:'2417', edition:'Heroes of the Realm Promos'},
	{ckid:'0', mkmid:'1421', edition:'Hobby Japan Commemorative Promos'},
	{ckid:'2530', mkmid:'14', edition:'Homelands'},
	{ckid:'3051', mkmid:'1731', edition:'Hour of Devastation'},
	{ckid:'0', mkmid:'1825', edition:'Hour of Devastation: Promos'},
	{ckid:'2535', mkmid:'11', edition:'Ice Age'},
	{ckid:'3059', mkmid:'1811', edition:'Iconic Masters'},
	{ckid:'2630', mkmid:'1413', edition:'IDW Promos'},
	{ckid:'2866', mkmid:'1327', edition:'Innistrad'},
	{ckid:'0', mkmid:'77', edition:'International Edition'},
	{ckid:'0', mkmid:'85', edition:'Introductory Two-Player Set'},
	{ckid:'2540', mkmid:'34', edition:'Invasion'},
	{ckid:'3058', mkmid:'1812', edition:'Ixalan'},
	{ckid:'2630', mkmid:'1847', edition:'Ixalan: Promos'},
	{ckid:'2630', mkmid:'87', edition:'Japan Junior Tournament Promos'},
	{ckid:'0', mkmid:'1705', edition:'Javi Alterations Tokens'},
	{ckid:'0', mkmid:'1328', edition:'JingHe Age: 2002 Tokens'},
	{ckid:'0', mkmid:'1329', edition:'JingHe Age: MtG 10th Anniversary Tokens'},
	{ckid:'0', mkmid:'2114', edition:'Johannes Voss Tokens'},
	{ckid:'2905', mkmid:'1481', edition:'Journey into Nyx'},
	{ckid:'0', mkmid:'1643', edition:'Judge Program Tokens'},
	{ckid:'2630', mkmid:'80', edition:'Judge Rewards Promos'},
	{ckid:'2545', mkmid:'40', edition:'Judgment'},
	{ckid:'2630', mkmid:'1586', edition:'Junior APAC Series Promos'},
	{ckid:'2630', mkmid:'1361', edition:'Junior Series Promos'},
	{ckid:'2630', mkmid:'86', edition:'Junior Super Series Promos'},
	{ckid:'2983', mkmid:'1717', edition:'Kaladesh'},
	{ckid:'2984', mkmid:'1733', edition:'Kaladesh Inventions'},
	{ckid:'2630', mkmid:'1726', edition:'Kaladesh: Promos'},
	{ckid:'2914', mkmid:'1495', edition:'Khans of Tarkir'},
	{ckid:'2630', mkmid:'1588', edition:'Khans of Tarkir: Promos'},
	{ckid:'2630', mkmid:'1594', edition:'League Promos'},
	{ckid:'2550', mkmid:'7', edition:'Legends'},
	{ckid:'0', mkmid:'1838', edition:'Legends Italian'},
	{ckid:'2555', mkmid:'42', edition:'Legions'},
	{ckid:'2560', mkmid:'84', edition:'Lorwyn'},
	{ckid:'2789', mkmid:'109', edition:'Magic 2010'},
	{ckid:'2847', mkmid:'1197', edition:'Magic 2011'},
	{ckid:'2863', mkmid:'1280', edition:'Magic 2012'},
	{ckid:'2876', mkmid:'1388', edition:'Magic 2013'},
	{ckid:'2895', mkmid:'1449', edition:'Magic 2014'},
	{ckid:'2910', mkmid:'1485', edition:'Magic 2015'},
	{ckid:'3104', mkmid:'2381', edition:'Magic Game Night'},
	{ckid:'2950', mkmid:'1652', edition:'Magic Origins'},
	{ckid:'2630', mkmid:'1655', edition:'Magic Origins: Promos'},
	{ckid:'2630', mkmid:'101', edition:'Magic Premiere Shop Promos'},
	{ckid:'2630', mkmid:'1360', edition:'Magic Scholarship Series Promos'},
	{ckid:'0', mkmid:'1407', edition:'Magic the Gathering Products'},
	{ckid:'2630', mkmid:'2413', edition:'MagicFest Promos'},
	{ckid:'3078', mkmid:'1820', edition:'Masters 25'},
	{ckid:'2565', mkmid:'31', edition:'Mercadian Masques'},
	{ckid:'0', mkmid:'1834', edition:'Mezzocielo &amp; Friends Classic Tokens'},
	{ckid:'0', mkmid:'1765', edition:'Mezzocielo &amp; Friends Mini Tokens'},
	{ckid:'2570', mkmid:'16', edition:'Mirage'},
	{ckid:'2575', mkmid:'45', edition:'Mirrodin'},
	{ckid:'2859', mkmid:'1253', edition:'Mirrodin Besieged'},
	{ckid:'0', mkmid:'1367', edition:'Misprints'},
	{ckid:'0', mkmid:'1665', edition:'MKM Series'},
	{ckid:'2907', mkmid:'1484', edition:'Modern Event Deck 2014'},
	{ckid:'2894', mkmid:'1444', edition:'Modern Masters'},
	{ckid:'2947', mkmid:'1641', edition:'Modern Masters 2015'},
	{ckid:'3032', mkmid:'1727', edition:'Modern Masters 2017'},
	{ckid:'2580', mkmid:'92', edition:'Morningtide'},
	{ckid:'0', mkmid:'1519', edition:'Multiverse Gift Box'},
	{ckid:'2590', mkmid:'32', edition:'Nemesis'},
	{ckid:'2861', mkmid:'1262', edition:'New Phyrexia'},
	{ckid:'2375', mkmid:'49', edition:'Ninth Edition'},
	{ckid:'2967', mkmid:'1676', edition:'Oath of the Gatewatch'},
	{ckid:'2630', mkmid:'1686', edition:'Oath of the Gatewatch: Promos'},
	{ckid:'2595', mkmid:'38', edition:'Odyssey'},
	{ckid:'0', mkmid:'2360', edition:'Old School Tokens'},
	{ckid:'2600', mkmid:'41', edition:'Onslaught'},
	{ckid:'2630', mkmid:'1844', edition:'Open House Promos'},
	{ckid:'2630', mkmid:'110', edition:'Oversized 6x9 Promos'},
	{ckid:'2630', mkmid:'1639', edition:'Oversized 9x12 Promos'},
	{ckid:'0', mkmid:'111', edition:'Oversized Box Toppers'},
	{ckid:'0', mkmid:'1654', edition:'Perfektpro Products'},
	{ckid:'2605', mkmid:'58', edition:'Planar Chaos'},
	{ckid:'2839', mkmid:'113', edition:'Planechase'},
	{ckid:'2875', mkmid:'1369', edition:'Planechase 2012'},
	{ckid:'2989', mkmid:'1722', edition:'Planechase Anthology'},
	{ckid:'2610', mkmid:'35', edition:'Planeshift'},
	{ckid:'2630', mkmid:'79', edition:'Player Rewards Promos'},
	{ckid:'2615', mkmid:'25', edition:'Portal'},
	{ckid:'2625', mkmid:'24', edition:'Portal Second Age'},
	{ckid:'2620', mkmid:'30', edition:'Portal Three Kingdoms'},
	{ckid:'2854', mkmid:'1218', edition:'Premium Deck Series: Fire &amp; Lightning'},
	{ckid:'2867', mkmid:'1337', edition:'Premium Deck Series: Graveborn'},
	{ckid:'2837', mkmid:'116', edition:'Premium Deck Series: Slivers'},
	{ckid:'2630', mkmid:'83', edition:'Prerelease Promos'},
	{ckid:'0', mkmid:'121', edition:'Pro Tour 1996: Bertrand Lestree'},
	{ckid:'0', mkmid:'1516', edition:'Pro Tour 1996: Collector Set'},
	{ckid:'0', mkmid:'122', edition:'Pro Tour 1996: Eric Tam'},
	{ckid:'0', mkmid:'123', edition:'Pro Tour 1996: George Baxter'},
	{ckid:'0', mkmid:'124', edition:'Pro Tour 1996: Leon Lindback'},
	{ckid:'0', mkmid:'125', edition:'Pro Tour 1996: Mark Justice'},
	{ckid:'0', mkmid:'126', edition:'Pro Tour 1996: Michael Locanto'},
	{ckid:'0', mkmid:'127', edition:'Pro Tour 1996: Preston Poulter'},
	{ckid:'0', mkmid:'128', edition:'Pro Tour 1996: Shawn Regnier'},
	{ckid:'2630', mkmid:'1596', edition:'Pro Tour Promos'},
	{ckid:'2630', mkmid:'1249', edition:'Promos'},
	{ckid:'2635', mkmid:'33', edition:'Prophecy'},
	{ckid:'3113', mkmid:'2411', edition:'Ravnica Allegiance'},
	{ckid:'0', mkmid:'2419', edition:'Ravnica Allegiance: Extras'},
	{ckid:'3113', mkmid:'2423', edition:'Ravnica Allegiance: Guild Kits'},
	{ckid:'3105', mkmid:'2422', edition:'Ravnica Allegiance: Mythic Edition'},
	{ckid:'0', mkmid:'2372', edition:'Ravnica Weekend Promos'},
	{ckid:'2640', mkmid:'55', edition:'Ravnica: City of Guilds'},
	{ckid:'2630', mkmid:'1210', edition:'Release Promos'},
	{ckid:'0', mkmid:'2115', edition:'Relic Tokens: Eternal Collection'},
	{ckid:'0', mkmid:'2433', edition:'Relic Tokens: Legendary Collection'},
	{ckid:'0', mkmid:'2402', edition:'Relic Tokens: Lineage Collection'},
	{ckid:'2630', mkmid:'2403', edition:'Relic Tokens: Promos'},
	{ckid:'0', mkmid:'60', edition:'Renaissance'},
	{ckid:'2630', mkmid:'98', edition:'Resale Promos'},
	{ckid:'2884', mkmid:'1389', edition:'Return to Ravnica'},
	{ckid:'2345', mkmid:'6', edition:'Revised'},
	{ckid:'2630', mkmid:'1432', edition:'Revista Serra Promos'},
	{ckid:'0', mkmid:'96', edition:'Rinascimento'},
	{ckid:'2843', mkmid:'120', edition:'Rise of the Eldrazi'},
	{ckid:'3076', mkmid:'1829', edition:'Rivals of Ixalan'},
	{ckid:'2630', mkmid:'2063', edition:'Rivals of Ixalan: Promos'},
	{ckid:'0', mkmid:'1833', edition:'Rk post Products'},
	{ckid:'0', mkmid:'105', edition:'Salvat-Hachette'},
	{ckid:'0', mkmid:'1259', edition:'Salvat-Hachette 2011'},
	{ckid:'2630', mkmid:'1454', edition:'San Diego Comic-Con 2013 Promos'},
	{ckid:'2630', mkmid:'1491', edition:'San Diego Comic-Con 2014 Promos'},
	{ckid:'2630', mkmid:'1658', edition:'San Diego Comic-Con 2015 Promos'},
	{ckid:'2630', mkmid:'1725', edition:'San Diego Comic-Con 2016 Promos'},
	{ckid:'2630', mkmid:'1828', edition:'San Diego Comic-Con 2017 Promos'},
	{ckid:'2630', mkmid:'2341', edition:'San Diego Comic-Con 2018 Promos'},
	{ckid:'2645', mkmid:'50', edition:'Saviors of Kamigawa'},
	{ckid:'2852', mkmid:'1206', edition:'Scars of Mirrodin'},
	{ckid:'2650', mkmid:'43', edition:'Scourge'},
	{ckid:'2365', mkmid:'37', edition:'Seventh Edition'},
	{ckid:'2655', mkmid:'95', edition:'Shadowmoor'},
	{ckid:'2971', mkmid:'1694', edition:'Shadows over Innistrad'},
	{ckid:'0', mkmid:'1704', edition:'Shadows over Innistrad: Promos'},
	{ckid:'2660', mkmid:'102', edition:'Shards of Alara'},
	{ckid:'3091', mkmid:'2103', edition:'Signature Spellbook: Jace'},
	{ckid:'0', mkmid:'1401', edition:'Simplified Chinese Alternate Art Cards'},
	{ckid:'2360', mkmid:'29', edition:'Sixth Edition'},
	{ckid:'2630', mkmid:'1809', edition:'Standard Series Promos'},
	{ckid:'2630', mkmid:'1836', edition:'Standard Showdown Promos'},
	{ckid:'0', mkmid:'1500', edition:'Starcity Games: Commemorative Tokens'},
	{ckid:'0', mkmid:'1501', edition:'Starcity Games: Creature Collection'},
	{ckid:'0', mkmid:'1438', edition:'Starcity Games: Justin Treadway Tokens'},
	{ckid:'0', mkmid:'1512', edition:'Starcity Games: Kristen Plescow Tokens'},
	{ckid:'0', mkmid:'1514', edition:'Starcity Games: Token Series One'},
	{ckid:'2670', mkmid:'63', edition:'Starter 1999'},
	{ckid:'2675', mkmid:'65', edition:'Starter 2000'},
	{ckid:'2630', mkmid:'2023', edition:'Store Championship Promos'},
	{ckid:'2680', mkmid:'20', edition:'Stronghold'},
	{ckid:'0', mkmid:'76', edition:'Summer Magic'},
	{ckid:'2685', mkmid:'19', edition:'Tempest'},
	{ckid:'2380', mkmid:'74', edition:'Tenth Edition'},
	{ckid:'2690', mkmid:'8', edition:'The Dark'},
	{ckid:'0', mkmid:'1837', edition:'The Dark Italian'},
	{ckid:'2630', mkmid:'93', edition:'The Duelist Promos'},
	{ckid:'2900', mkmid:'1457', edition:'Theros'},
	{ckid:'0', mkmid:'1511', edition:'Tierra Media Tokens'},
	{ckid:'2695', mkmid:'56', edition:'Time Spiral'},
	{ckid:'0', mkmid:'1502', edition:'Tokens for MTG'},
	{ckid:'0', mkmid:'1515', edition:'TokyoMTG Products'},
	{ckid:'2630', mkmid:'129', edition:'TopDeck Promos'},
	{ckid:'2705', mkmid:'39', edition:'Torment'},
	{ckid:'2630', mkmid:'1587', edition:'Ugin\'s Fate Promos'},
	{ckid:'3107', mkmid:'2398', edition:'Ultimate Box Toppers'},
	{ckid:'3107', mkmid:'2397', edition:'Ultimate Masters'},
	{ckid:'0', mkmid:'1451', edition:'Ultra-Pro Puzzle Cards'},
	{ckid:'2710', mkmid:'22', edition:'Unglued'},
	{ckid:'2715', mkmid:'59', edition:'Unhinged'},
	{ckid:'2720', mkmid:'3', edition:'Unlimited'},
	{ckid:'3075', mkmid:'1821', edition:'Unstable'},
	{ckid:'2725', mkmid:'28', edition:'Urza\'s Destiny'},
	{ckid:'2730', mkmid:'27', edition:'Urza\'s Legacy'},
	{ckid:'2735', mkmid:'26', edition:'Urza\'s Saga'},
	{ckid:'2740', mkmid:'69', edition:'Vanguard'},
	{ckid:'2745', mkmid:'17', edition:'Visions'},
	{ckid:'2975', mkmid:'1199', edition:'WCD 1997: Jakub Slemr'},
	{ckid:'2975', mkmid:'1200', edition:'WCD 1997: Janosch Kuhn'},
	{ckid:'2975', mkmid:'1292', edition:'WCD 1997: Paul McCabe'},
	{ckid:'2975', mkmid:'1293', edition:'WCD 1997: Svend Geertsen'},
	{ckid:'2975', mkmid:'1296', edition:'WCD 1998: Ben Rubin'},
	{ckid:'2975', mkmid:'1295', edition:'WCD 1998: Brian Hacker'},
	{ckid:'2975', mkmid:'1297', edition:'WCD 1998: Brian Selden'},
	{ckid:'2975', mkmid:'1294', edition:'WCD 1998: Randy Buehler'},
	{ckid:'2975', mkmid:'1298', edition:'WCD 1999: Jakub Šlemr'},
	{ckid:'2975', mkmid:'1301', edition:'WCD 1999: Kai Budde'},
	{ckid:'2975', mkmid:'1300', edition:'WCD 1999: Mark Le Pine'},
	{ckid:'2975', mkmid:'1299', edition:'WCD 1999: Matt Linde'},
	{ckid:'2975', mkmid:'1304', edition:'WCD 2000: Janosch Kühn'},
	{ckid:'2975', mkmid:'1305', edition:'WCD 2000: Jon Finkel'},
	{ckid:'2975', mkmid:'1302', edition:'WCD 2000: Nicolas Labarre'},
	{ckid:'2975', mkmid:'1303', edition:'WCD 2000: Tom Van de Logt'},
	{ckid:'2975', mkmid:'1308', edition:'WCD 2001: Alex Borteh'},
	{ckid:'2975', mkmid:'1307', edition:'WCD 2001: Antoine Ruel'},
	{ckid:'2975', mkmid:'1306', edition:'WCD 2001: Jan Tomcani'},
	{ckid:'2975', mkmid:'1309', edition:'WCD 2001: Tom van de Logt'},
	{ckid:'2975', mkmid:'1312', edition:'WCD 2002: Brian Kibler'},
	{ckid:'2975', mkmid:'1313', edition:'WCD 2002: Carlos Romao'},
	{ckid:'2975', mkmid:'1311', edition:'WCD 2002: Raphael Levy'},
	{ckid:'2975', mkmid:'1310', edition:'WCD 2002: Sim Han How'},
	{ckid:'2975', mkmid:'1317', edition:'WCD 2003: Daniel Zink'},
	{ckid:'2975', mkmid:'1316', edition:'WCD 2003: Dave Humpherys'},
	{ckid:'2975', mkmid:'1314', edition:'WCD 2003: Peer Kröger'},
	{ckid:'2975', mkmid:'1315', edition:'WCD 2003: Wolfgang Eder'},
	{ckid:'2975', mkmid:'1320', edition:'WCD 2004: Aeo Paquette'},
	{ckid:'2975', mkmid:'1318', edition:'WCD 2004: Gabriel Nassif'},
	{ckid:'2975', mkmid:'1321', edition:'WCD 2004: Julien Nuijten'},
	{ckid:'2975', mkmid:'1319', edition:'WCD 2004: Manuel Bevand'},
	{ckid:'2750', mkmid:'18', edition:'Weatherlight'},
	{ckid:'0', mkmid:'1710', edition:'Welcome Deck 2016'},
	{ckid:'0', mkmid:'1802', edition:'Welcome Deck 2017'},
	{ckid:'2840', mkmid:'118', edition:'Worldwake'},
	{ckid:'0', mkmid:'1281', edition:'Your Move Games Tokens'},
	{ckid:'0', mkmid:'1659', edition:'Yummy Tokens'},
	{ckid:'2826', mkmid:'114', edition:'Zendikar'},
	{ckid:'2960', mkmid:'1669', edition:'Zendikar Expeditions'},
	{ckid:'3123', mkmid:'1669', edition:'Modern Horizons'}
];

var bulkThreshold = 0;

function makeFlagsCKLinksOrder() {
    $(".product-table").addClass("injected");

    $(".product-table tr").each(function () {
    	var linkGoldfish = "https://www.cardkingdom.com/purchasing/mtg_singles/?filter%5Bsearch%5D=mtg_advanced";
        var name = $(this).find(".name").find("a").attr("href"); console.log($(this).find(".name"));
        name = name.replace("/en/Magic/Products/Singles/", "").replace("Æ", "Ae");

        var edition, cardname;

        edition = name.split("/")[0];
        edition = edition.replace(/-/gi, " ");
        cardname = $(this).find(".name").find("a").text();

        cardname = cardname.replace("Æ", "Ae");
        cardname = cardname.replace(/\(.*\)/gi, "");
        cardname = cardname.replace(/\/.*/gi, "");
        
        
        var exception = false;
        var isFTV = false;
        if (edition === "Friday Night Magic Promos" || edition === "Release Promos"
        	|| edition === "Prerelease Promos") {
        	exception = true;
        	linkGoldfish += "&filter%5Bcategory_id%5D="+2630;
        }
        
        //if (exception === false) {
	        var bestScore = 0;
	        var currentScore = 0;
	        var hitId;
			var arrayLength = setData.length;
			for (var i = 0; i < arrayLength; i++) {
			    currentScore = parseFloat(similarity(setData[i].edition, edition));
			    // Perfect match, stop looping
			    if (currentScore === 1) {
			    	hitId = i;
			    	break;
			    }
			    
			    // Current set name is a better match, change and keep looping
			    if (bestScore < currentScore) {
			    	hitId = i;
			    	bestScore = currentScore;
			    }
			}
			linkGoldfish += "&filter%5Bcategory_id%5D="+setData[hitId].ckid;
        //} 

		// After setting edition, check for more exceptions
        if (edition.indexOf("From the Vault")>-1 ||
        	edition.indexOf("Premium Deck Series") > -1) {
        	exception = true;
        }
        
		// Dont' care about foil flag if card was exception, e.g. promo cards
		// CK doesn't flag FNM/Release promos as foil
		if (!exception) {
	        var foil = $(this).find("span[data-original-title='Foil']");
	        if (foil !== undefined && 
	            foil.lastIndexOf("Foil") > 0) {
	
	            linkGoldfish += "&filter%5Bfoil%5D=1";
	        } else {
	            linkGoldfish += "&filter%5Bnonfoil%5D=1";
	        }
		}
		
        $(this).find(".grade").attr("href", linkGoldfish + "&filter%5Bname%5D=" + cardname);
    });
    //appendPriceData(6, 10, userId, 7, $("span.automode").hasClass("active"));
}


function makeFlagsGoldfishLinks(nameCol, foilCol, linkCol) {
    var linkGoldfish = "https://www.mtggoldfish.com/price/";
    $(".MKMTable").addClass("injected");

    $(".MKMTable tbody tr").each(function () {
        var name = $(this).find("td:nth-child(" + nameCol + ")").find("a").attr("href");
        name = name.replace("/en/Magic/Products/Singles/", "").replace("Æ", "Ae");

        var edition, cardname;

        edition = name.split("/")[0];
        cardname = $(this).find("td:nth-child(" + nameCol + ")").find("a").text();

        edition = edition.replace("%27", "");
        edition = edition.replace("%2C", "");
        edition = edition.replace(".", "");
        edition = edition.replace("%3A", "");
        edition = edition.replace("%3A", "");
        edition = edition.replace("%26", "and");
        edition = edition.replace("Sixth-Edition", "Classic-Sixth-Edition");
        edition = edition.replace("Revised", "Revised-Edition");
        edition = edition.replace("Prerelease-Promos", "Prerelease-Cards");
        edition = edition.replace("Arena-League-Promos", "Arena+Promos");
        edition = edition.replace("Release-Promos", "Release-Event-Cards");
        edition = edition.replace("Buy-a-Box-Promos", "Media-Promos");
        edition = edition.replace("the-Dark", "The-Dark");
        edition = edition.replace("theros", "Theros");
        edition = edition.replace("Player-Rewards-Promos", "Magic-Player-Rewards");
        edition = edition.replace("Core-2019", "Core-Set-2019");

        // check for Timeshifted cards
        var rarity = $(this).find("td:nth-child(" + parseInt(linkCol - 1) + ")").find("span").attr("onmouseover");
        if (rarity.indexOf("Time Shifted") > -1) {
            edition = "Timeshifted"
        }

        if (edition.lastIndexOf("Magic-2015") > -1) {
            edition += "-Core-Set";
        }
        
        if (edition.lastIndexOf("Commander-Anthology-II") > -1) {
            edition = "Commander-Anthology-Volume-II";
        }

        if (edition.lastIndexOf("Magic-2014") > -1) {
            edition += "-Core-Set";
        }

        if (edition.lastIndexOf("Commander-2013") > -1) {
            edition += "-Edition";
        }

        if (edition.lastIndexOf("Modern-Masters-2017") > -1) {
            edition += "-Edition";
        }

        if (edition.lastIndexOf("Planechase-2012") > -1) {
            edition += "-Edition";
        }

        edition = edition.replace(/-/g, "+");
        
        cardname = cardname.replace("%2C", "");
        cardname = cardname.replace("%27", "");
        cardname = cardname.replace("'", "");
        cardname = cardname.replace(",", "");
        cardname = cardname.replace("+%28Version+1%29", "-A");
        cardname = cardname.replace("+%28Version+2%29", "-B");
        cardname = cardname.replace("+%28Version+3%29", "-C");
        cardname = cardname.replace("%2F%2F+", "");
        cardname = cardname.replace("Æ", "Ae");

        if (cardname.lastIndexOf("%2F") > -1) {
            cardname = cardname.split("+%2F+")[0];
        }
        
        // Replace + with - due to new link generation style of MKM and remove duplicate minuses
        cardname = cardname.replace(/\s/g, "+");
        cardname = cardname.replace(/\+\+/g, "+"); 

        var foil = $(this).find("td:nth-child(" + foilCol + ")").find("span").prop("outerHTML");
        if (foil !== undefined &&
            foil.lastIndexOf("Foil") > 0 &&
            edition.lastIndexOf("Promo") == -1 &&
            edition.lastIndexOf("Prerelease") == -1) {

            edition += ":Foil";
        }

        name = edition + "/" + cardname;

        $(this).find("td:nth-child(" + linkCol + ")").find("a")
            .attr("href", linkGoldfish + name);
    });
}

function parseCartData(orderData, makeLinks) {
    // workaround to have default parameter value 1
    makeLinks = (typeof makeLinks !== 'undefined') ? makeLinks : 1;
    var parseData = '';
    var shippingCost = $(".MKMShipmentSummary > tbody tr:nth-child(7)").find(".shipmentSummaryMoney").text();
    var numberOfCards = parseInt($(".MKMShipmentSummary > tbody tr:nth-child(4)").find("td:nth-child(2)").text());
    var bulkRareCost = 0, bulkFoilCost = 0, bulkRare = 0, bulkFoil = 0;
    var sumCost = $(".MKMShipmentSummary > tbody tr:nth-child(6)").find(".shipmentSummaryMoney").text();

    shippingCost = parseFloat(shippingCost.replace(",", "."));
    sumCost = parseFloat(sumCost.replace(",", "."));

    $(orderData).find(".MKMTable tbody tr").each(function () {
        var name = $(this).find("td:nth-child(4)").find("a").text();
        var link = $(this).find("td:nth-child(8)").find("a").attr("href");
        var price, amount;
        var condition = 1;

        var foil = $(this).find("td:nth-child(10)").find("span").prop("outerHTML");
        if (foil !== undefined &&
            foil.lastIndexOf("Foil") > 0 &&
            name.lastIndexOf("Promo") == -1) {
            foil = true;
            name += "*";
        }
        var conditionText = $(this).find("td:nth-child(9)").find(".icon").attr("onmouseover");

        if (conditionText !== undefined) {
            if (conditionText.indexOf("Near Mint") > -1) {
                condition = 1;
            } else if (conditionText.indexOf("Excellent") > -1) {
                condition = 0.8;
            } else if (conditionText.indexOf("Good") > -1) {
                condition = 0.6;
            }
        }
        price = $(this).find(".Price div.nowrap").text();
        price = parseFloat(price.replace(",", ".").replace(" €", ""));

        amount = $(this).find(".Amount div.itemAmount").text();
        amount = parseInt(amount.replace("x", ""));

        var finalPrice = price + ((((price * amount) / sumCost) * shippingCost)) / amount;

        if (parseFloat(price) <= bulkThreshold) {
            if (foil) {
                bulkFoil += 1 * amount;
                bulkFoilCost += finalPrice;
            } else {
                bulkRare += 1 * amount;
                bulkRareCost += finalPrice;
            }
        } else {
            if (makeLinks == 1) {
                parseData += amount + "\t" + '=HYPERLINK("' + link + '", "' + name + '")' + "\t" + condition
                    + "\t" + finalPrice + "\r\n";
            } else {
                parseData += amount + "\t" + name + "\t" + "\t" + finalPrice * amount + "\r\n";
            }
        }
    });

    if (bulkFoil > 0) {
        parseData += bulkFoil + "\t" + "Bulk Foils" + "\t" + bulkFoilCost + "\r\n";
    }

    if (bulkRare > 0) {
        parseData += bulkRare + "\t" + "Bulk Rares" + "\t" + bulkRareCost + "\r\n";
    }

    copyTextToClipboard(parseData);
    return parseData;
}
function parseCartDatat(orderData, makeLinks) {
    // workaround to have default parameter value 1
    makeLinks = (typeof makeLinks !== 'undefined') ? makeLinks : 1;
    var parseData = '';
    var shippingCost = $(".summary").data("total-price")-$(".summary").data("item-value");
    shippingCost = parseFloat(shippingCost);
    
    var numberOfCards = $(".summary").data("article-count");
    var bulkRareCost = 0, bulkFoilCost = 0, bulkRare = 0, bulkFoil = 0;
    var sumCost = $(".summary").data("total-price");

    
    $(orderData).find("tr").each(function () {
        var name = $(this).data("name");
        
        // MKM link
        //var link = $(this).find(".name").find("a").attr("href");
        
        var price, amount;
        var condition = 1;
        
        var foil, nonfoil;
        if ($(this).find("span[data-original-title='Foil']").data("original-title") === 'Foil') {
            foil = "&filter%5Bfoil%5D=1";
            nonfoil = "";
        } else {
        	foil = "";
        	nonfoil = "&filter%5Bnonfoil%5D=1";
        }
        
        // try guessing the set
        
        
        // try CK link generation
        var link = "https://www.cardkingdom.com/purchasing/mtg_singles/?filter%5Bsort%5D=price_desc&filter%5Bsearch%5D=mtg_advanced&filter%5Bname%5D="+name+"&filter%5Bcategory_id%5D=0"+foil+nonfoil+"&filter%5Bprice_op%5D=&filter%5Bprice%5D=";
        
        
        var conditionText = $(this).find("a.grade").data("original-title");

        if (conditionText !== undefined) {
            if (conditionText.indexOf("Near Mint") > -1) {
                condition = 1;
            } else if (conditionText.indexOf("Excellent") > -1) {
                condition = 0.8;
            } else if (conditionText.indexOf("Good") > -1) {
                condition = 0.6;
            }
        }
        price = $(this).find(".price").text();
        price = parseFloat(price.replace(",", ".").replace(" €", ""));

        amount = $(this).find(".amount").data("amount");

        var finalPrice = price + ((((price * amount) / sumCost) * shippingCost)) / amount;

        if (parseFloat(price) <= bulkThreshold) {
            if (foil) {
                bulkFoil += 1 * amount;
                bulkFoilCost += finalPrice;
            } else {
                bulkRare += 1 * amount;
                bulkRareCost += finalPrice;
            }
        } else {
            if (makeLinks == 1) {
                parseData += amount + "\t" + '=HYPERLINK("' + link + '", "' + name + '")' + "\t" + condition
                    + "\t" + finalPrice + "\r\n";
            } else {
                parseData += amount + "\t" + name + "\t" + "\t" + finalPrice * amount + "\r\n";
            }
        }
    });

    if (bulkFoil > 0) {
        parseData += bulkFoil + "\t" + "Bulk Foils" + "\t" + bulkFoilCost + "\r\n";
    }

    if (bulkRare > 0) {
        parseData += bulkRare + "\t" + "Bulk Rares" + "\t" + bulkRareCost + "\r\n";
    }

    copyTextToClipboard(parseData);
    return parseData;
}
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}

function getPrices() {
    var returnVal = [];

    $(".price-card-sidebar .price-card-buy-prices a[class*='btn-paper']").each(function () {
        var vendor;
        var price;

        vendor = $(this).find(".btn-shop-label").text();
        vendor = vendor.replace(" ", "").trim();

        price = $(this).find(".btn-shop-price").text();
        price = price.replace(/[^\d.-]/g, '');

        returnVal[vendor] = price;
    });

    return returnVal;
}

function getPricesQS() {
    var returnVal = [];
    returnVal["abu"] = 0;
    returnVal["ck"] = 0;
    returnVal["cfb"] = 0;

    $("table#thisEditionPrices tr").each(function () {
        // Check for ABU
        if ($(this).find("span.label-buylist").text().indexOf("abugames") > -1) {
            var abuPrice = $(this).find("td.sorting_1").text();
            returnVal["abu"] = abuPrice;
        }

        // Check for CK
        if ($(this).find("span.label-buylist").text().indexOf("cardkingdom") > -1) {
            var ckPrice = $(this).find("td.sorting_1").text();
            returnVal["ck"] = ckPrice;
        }

        // Check for CFB
        if ($(this).find("span.label-buylist").text().indexOf("channelfireball") > -1) {
            var cfbPrice = $(this).find("td.sorting_1").text();
            returnVal["cfb"] = cfbPrice;
        }
    });

    return returnVal;
}

function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }
