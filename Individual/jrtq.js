const cityId = $argument; 
const apiUrl = `http://t.weather.sojson.com/api/weather/city/${cityId}`;

$httpClient.get(apiUrl, (error, response, data) => {
  if (error) {
    console.log(error);
    $notification.post('获取天气失败', '', '请检查网络连接或稍后重试');
    $done();
    return;
  }

  const weatherData = JSON.parse(data);
  if (weatherData.status !== 200) {
    console.log(`请求失败，状态码：${weatherData.status}`);
    $notification.post('获取天气失败', '', '请填写正确的cityId');
    $done();
    return;
  }

  const cityInfo = weatherData.cityInfo;
  const currentWeather = weatherData.data.forecast[0];
    const message = `📍城市：${cityInfo.city}\n🕰︎更新时间：${cityInfo.updateTime} \n🌤︎天气：${currentWeather.type}\n🌡︎温度：${currentWeather.low}  ${currentWeather.high}\n💧湿度：${weatherData.data.shidu}\n💨空气质量：${weatherData.data.quality}\n☁️PM2.5：${weatherData.data.pm25}\n☁️PM10：${weatherData.data.pm10}\n🪁风向：${currentWeather.fx}\n🌪️风力：${currentWeather.fl}\n🌅日出时间：${currentWeather.sunrise}\n🌇日落时间：${currentWeather.sunset}\n🏷︎Tips：${currentWeather.notice}`;


  $notification.post('天气通知', '', message);
  $done();
});

//cityid列表 ： 北京:101010100 上海:101020100 天津:101030100 重庆:101040100 香港:101320101 澳门:101330101 安庆:101220601 蚌埠:101220201 巢湖市:101220105 池州:101221701 滁州:101221101 阜阳:101220801 淮北:101221201 淮南:101220401 黄山市:101221001 六安:101221501 马鞍山:101220501 宿州:101220701 铜陵:101221301 芜湖市:101220301 宣城:101221401 亳州:101220901 福州:101230101 龙岩:101230701 南平:101230901 宁德:101230301 莆田:101230401 泉州:101230501 三明:101230801 厦门:101230201 漳州:101230601 兰州:101160101 白银市:101161301 定西:101160201 嘉峪关:101161401 金昌:101160601 酒泉:101160801 临夏市:101161101 陇南市:101161010 平凉:101160301 庆阳:101160401 天水:101160901 武威:101160501 张掖:101160701 广州:101280101 深圳:101280601 潮州:101281501 东莞:101281601 佛山:101280800 河源:101281201 惠州:101280301 江门:101281101 揭阳:101281901 茂名:101282001 梅州:101280401 清远:101281301 汕头:101280501 汕尾:101282101 韶关:101280201 阳江:101281801 云浮:101281401 湛江:101281001 肇庆:101280901 中山市:101281701 珠海:101280701 南宁:101300101 桂林:101300501 百色:101301001 北海:101301301 崇左:101300201 防城港:101301401 贵港:101300801 河池:101301201 贺州:101300701 来宾:101300401 柳州:101300301 钦州:101301101 梧州:101300601 玉林:101300901 贵阳:101260101 安顺:101260301 毕节:101260701 六盘水:101260803 黔东南:101260506 黔南:101260413 黔西南:101260906 铜仁市:101260601 遵义:101260201 海口:101310101 三亚:101310201 白沙县:101310207 保亭县:101310214 昌江县:101310206 澄迈县:101310204 定安县:101310209 东方:101310202 乐东县:101310221 临高县:101310203 陵水县:101310216 琼海:101310211 琼中:101310208 屯昌县:101310210 万宁:101310215 文昌:101310212 五指山:101310222 儋州:101310205 石家庄:101090101 保定:101090201 沧州:101090701 承德市:101090402 邯郸市:101091001 衡水:101090801 廊坊:101090601 秦皇岛:101091101 唐山:101090501 邢台市:101090901 张家口:101090301 郑州:101180101 洛阳:101180901 开封市:101180801 安阳市:101180201 鹤壁:101181201 济源市:101181801 焦作:101181101 南阳:101180701 平顶山:101180501 三门峡:101181701 商丘:101181001 新乡市:101180301 信阳:101180601 许昌市:101180401 周口:101181401 驻马店:101181601 漯河:101181501 濮阳市:101181301 哈尔滨:101050101 大庆:101050901 大兴安岭:101050701 鹤岗:101051201 黑河:101050601 鸡西:101051101 佳木斯:101050401 牡丹江:101050301 七台河:101051002 齐齐哈尔:101050201 双鸭山:101051301 绥化:101050501 伊春市:101050801 武汉:101200101 仙桃:101201601 鄂州:101200301 黄冈:101200501 黄石:101200601 荆门:101201401 荆州市:101200801 潜江市:101201701 神农架:101201201 十堰:101201101 随州:101201301 天门市:101201501 咸宁:101200701 襄阳:101200201 孝感:101200401 宜昌:101200901 恩施市:101201001 长沙市:101250101 张家界:101251101 常德:101250601 郴州:101250501 衡阳市:101250401 怀化:101251201 娄底:101250801 邵阳市:101250901 湘潭市:101250201 湘西:101251509 益阳:101250700 永州:101251401 岳阳市:101251001 株洲:101250301 长春:101060101 吉林市:101060201 白城:101060601 白山:101060901 辽源:101060701 四平:101060401 松原:101060801 通化市:101060501 延边:101060306 南京:101190101 苏州:101190401 无锡:101190201 常州:101191101 淮安市:101190901 连云港:101191001 南通:101190501 宿迁:101191301 泰州:101191201 徐州:101190801 盐城:101190701 扬州:101190601 镇江:101190301 南昌市:101240101 抚州:101240401 赣州:101240701 吉安市:101240601 景德镇:101240801 九江市:101240201 萍乡:101240901 上饶市:101240301 新余:101241001 宜春:101240501 鹰潭:101241101 沈阳:101070101 大连市:101070201 鞍山市:101070301 本溪市:101070501 朝阳市:101071201 丹东:101070601 抚顺市:101070401 阜新:101070901 葫芦岛:101071401 锦州:101070701 辽阳市:101071001 盘锦:101071301 铁岭市:101071101 营口:101070801 呼和浩特:101080101 阿拉善盟:101081213 巴彦淖尔:101080811 包头:101080201 赤峰:101080601 鄂尔多斯:101080701 呼伦贝尔市:101081001 通辽:101080501 乌海:101080301 乌兰察布:101080405 锡林郭勒:101080902 兴安盟:101081108 银川:101170101 固原:101170401 石嘴山:101170201 吴忠:101170301 中卫:101170501 西宁:101150101 果洛:101150507 海北:101150804 海东:101150207 共和县:101150401 德令哈市:101150701 黄南:101150305 玉树:101150601 济南:101120101 青岛:101120201 滨州:101121101 德州:101120401 东营区:101121201 菏泽:101121001 济宁:101120701 莱芜:101121601 聊城:101121701 临沂:101120901 日照:101121501 泰安:101120801 威海:101121301 潍坊:101120601 烟台:101120501 枣庄:101121401 淄博:101120301 太原:101100101 长治市:101100501 大同市:101100201 晋城:101100601 晋中:101100401 临汾:101100701 吕梁:101101100 朔州:101100901 忻州:101101001 阳泉:101100301 运城:101100801 西安市:101110101 安康市:101110701 宝鸡:101110901 汉中:101110801 商洛:101110601 铜川:101111001 渭南:101110501 咸阳:101110200 延安:101110300 榆林:101110401 成都:101270101 绵阳:101270401 阿坝:101271901 巴中:101270901 达州:101270601 德阳:101272001 甘孜:101271801 广安市:101270801 广元:101272101 乐山:101271401 凉山:101271601 眉山市:101271501 南充:101270501 内江:101271201 攀枝花:101270201 遂宁:101270701 雅安:101271701 宜宾:101271101 资阳市:101271301 自贡:101270301 泸州:101271001 拉萨:101140101 阿里:101140701 昌都市:101140501 林芝市:101140401 那曲:101140601 日喀则市:101140201 山南:101140301 乌鲁木齐市:101130101 阿克苏市:101130801 阿拉尔市:101130701 巴音郭楞:101130609 博尔塔拉:101131604 昌吉市:101130401 哈密市:101131201 和田市:101131301 喀什市:101130901 克拉玛依市:101130201 石河子市:101130301 吐鲁番市:101130501 伊犁:101131012 昆明:101290101 怒江:101291201 普洱:101290901 丽江:101291401 保山:101290501 楚雄市:101290801 大理市:101290201 德宏:101291501 迪庆:101291305 红河县:101290301 临沧:101291101 曲靖:101290401 文山市:101290601 西双版纳:101291602 玉溪:101290701 昭通:101291001 杭州:101210101 湖州:101210201 嘉兴:101210301 金华:101210901 丽水:101210801 宁波:101210401 绍兴:101210507 台州:101210601 温州:101210701 舟山:101211101 衢州:101211001 桐城市:101220609 怀宁县:101220605 枞阳县:101221305 潜山县:101220604 太湖县:101220603 宿松县:101220606 望江县:101220607 岳西县:101220608 怀远县:101220202 五河县:101220204 固镇县:101220203 庐江县:101220106 无为县:101220305 含山县:101220503 和县:101220504 东至县:101221702 石台县:101221705 青阳县:101221703 天长市:101221107 明光市:101221103 来安县:101221106 全椒县:101221105 定远县:101221104 凤阳县:101221102 界首市:101220805 临泉县:101220804 太和县:101220806 阜南县:101220802 颍上县:101220803 濉溪县:101221202 潘集区:101220403 凤台县:101220402 屯溪区:101221003 黄山区:101221002 歙县:101221006 休宁县:101221007 黟县:101221005 祁门县:101221004 寿县:101220408 霍邱县:101221502 舒城县:101221507 金寨县:101221505 霍山县:101221506 当涂县:101220502 砀山县:101220702 萧县:101220705 灵璧县:101220703 泗县:101220704 义安区:101221303 芜湖县:101220303 繁昌县:101220302 南陵县:101220304 宁国市:101221404 郎溪县:101221407 广德县:101221406 泾县:101221402 绩溪县:101221405 旌德县:101221403 涡阳县:101220902 蒙城县:101220904 利辛县:101220903 海淀区:101010200 朝阳区:101010300 丰台区:101010900 石景山区:101011000 房山区:101011200 门头沟区:101011400 通州区:101010600 顺义区:101010400 昌平区:101010700 怀柔区:101010500 平谷区:101011500 大兴区:101011100 密云区:101011300 延庆区:101010800 福清市:101230111 长乐市:101230110 闽侯县:101230103 连江县:101230105 罗源县:101230104 闽清县:101230102 永泰县:101230107 平潭县:101230108 漳平市:101230707 长汀县:101230702 永定区:101230706 上杭县:101230705 武平县:101230704 连城县:101230703 邵武市:101230904 武夷山市:101230905 建瓯市:101230910 建阳市:101230907 顺昌县:101230902 浦城县:101230906 光泽县:101230903 松溪县:101230908 政和县:101230909 福安市:101230306 福鼎市:101230308 霞浦县:101230303 古田县:101230302 屏南县:101230309 寿宁县:101230304 周宁县:101230305 柘荣县:101230307 城厢区:101230407 涵江区:101230404 荔城区:101230406 秀屿区:101230405 仙游县:101230402 石狮市:101230510 晋江市:101230509 南安市:101230506 惠安县:101230508 安溪县:101230502 永春县:101230504 德化县:101230505 永安市:101230810 明溪县:101230807 清流县:101230803 宁化县:101230802 大田县:101230811 尤溪县:101230809 沙县:101230808 将乐县:101230805 泰宁县:101230804 建宁县:101230806 同安区:101230202 龙海市:101230605 云霄县:101230609 漳浦县:101230606 诏安县:101230607 长泰县:101230602 东山县:101230608 南靖县:101230603 平和县:101230604 华安县:101230610 皋兰县:101160102 永登县:101160103 榆中县:101160104 平川区:101161304 会宁县:101161303 景泰县:101161305 靖远县:101161302 临洮县:101160205 陇西县:101160203 通渭县:101160202 渭源县:101160204 漳县:101160206 岷县:101160207 合作市:101161201 临潭县:101161202 卓尼县:101161203 舟曲县:101161204 迭部县:101161205 玛曲县:101161206 碌曲县:101161207 夏河县:101161208 永昌县:101160602 玉门市:101160807 敦煌市:101160808 金塔县:101160803 瓜州县:101160805 肃北县:101160806 阿克塞:101160804 康乐县:101161102 永靖县:101161103 广河县:101161104 和政县:101161105 东乡族自治县:101161106 积石山:101161107 成县:101161002 徽县:101161008 康县:101161005 礼县:101161007 两当县:101161009 文县:101161003 西和县:101161006 宕昌县:101161004 武都区:101161001 崇信县:101160304 华亭县:101160305 静宁县:101160307 灵台县:101160303 崆峒区:101160308 庄浪县:101160306 泾川县:101160302 合水县:101160405 华池县:101160404 环县:101160403 宁县:101160407 庆城县:101160409 西峰区:101160402 镇原县:101160408 正宁县:101160406 甘谷县:101160905 秦安县:101160904 清水县:101160903 麦积区:101160908 武山县:101160906 张家川:101160907 古浪县:101160503 民勤县:101160502 天祝县:101160505 高台县:101160705 临泽县:101160704 民乐县:101160703 山丹县:101160706 肃南县:101160702 从化区:101280103 天河区:101280109 番禺区:101280102 花都区:101280105 增城区:101280104 南山区:101280604 潮安区:101281503 饶平县:101281502 南海区:101280803 顺德区:101280801 三水区:101280802 高明区:101280804 东源县:101281206 和平县:101281204 连平县:101281203 龙川县:101281205 紫金县:101281202 惠阳区:101280303 博罗县:101280302 惠东县:101280304 龙门县:101280305 江海区:101281109 蓬江区:101281107 新会区:101281104 台山市:101281106 开平市:101281103 鹤山市:101281108 恩平市:101281105 普宁市:101281903 揭东区:101281905 揭西县:101281902 惠来县:101281904 茂港:101282006 高州市:101282002 化州市:101282003 信宜市:101282005 电白区:101282004 梅县区:101280409 兴宁市:101280402 大埔县:101280404 丰顺县:101280406 五华县:101280408 平远县:101280407 蕉岭县:101280403 英德市:101281307 连州市:101281303 佛冈县:101281306 阳山县:101281305 清新区:101281308 连山县:101281304 连南县:101281302 南澳县:101280504 潮阳区:101280502 澄海区:101280503 陆丰市:101282103 海丰县:101282102 陆河县:101282104 曲江区:101280209 浈江区:101280210 武江区:101280211 乐昌市:101280205 南雄市:101280207 始兴县:101280203 仁化县:101280206 翁源县:101280204 新丰县:101280208 乳源县:101280202 阳春市:101281802 阳西县:101281804 阳东区:101281803 罗定市:101281402 新兴县:101281403 郁南县:101281404 云安区:101281406 赤坎区:101281006 霞山区:101281009 坡头区:101281008 麻章区:101281010 廉江市:101281005 雷州市:101281003 吴川市:101281002 遂溪县:101281007 徐闻县:101281004 高要区:101280908 四会市:101280903 广宁县:101280902 怀集县:101280906 封开县:101280907 德庆县:101280905 斗门区:101280702 金湾区:101280703 邕宁区:101300103 武鸣区:101300108 隆安县:101300105 马山县:101300106 上林县:101300107 宾阳县:101300109 横县:101300104 阳朔县:101300510 临桂区:101300505 灵川县:101300507 全州县:101300508 平乐县:101300512 兴安县:101300506 灌阳县:101300509 荔浦县:101300513 资源县:101300514 永福县:101300504 龙胜县:101300503 恭城县:101300511 凌云县:101301011 平果县:101301007 西林县:101301009 乐业县:101301010 德保县:101301004 田林县:101301012 田阳县:101301003 靖西市:101301005 田东县:101301006 那坡县:101301002 隆林县:101301008 合浦县:101301302 凭祥市:101300204 宁明县:101300207 扶绥县:101300206 龙州县:101300203 大新县:101300205 天等县:101300202 防城区:101301405 东兴市:101301403 上思县:101301402 桂平市:101300802 平南县:101300803 宜州市:101301207 天峨县:101301202 凤山县:101301208 南丹县:101301209 东兰县:101301203 都安县:101301210 罗城县:101301206 巴马县:101301204 环江县:101301205 大化县:101301211 钟山县:101300704 昭平县:101300702 富川县:101300703 合山市:101300406 象州县:101300404 武宣县:101300405 忻城县:101300402 金秀县:101300403 柳江区:101300305 柳城县:101300302 鹿寨县:101300304 融安县:101300306 融水县:101300307 三江县:101300308 灵山县:101301103 浦北县:101301102 长洲区:101300607 岑溪市:101300606 苍梧县:101300604 藤县:101300602 蒙山县:101300605 北流市:101300903 容县:101300904 陆川县:101300905 博白县:101300902 兴业县:101300906 南明区:101260111 云岩区:101260110 花溪区:101260103 乌当区:101260104 白云区:101280110 小河:101260109 清镇市:101260108 开阳县:101260106 修文县:101260107 息烽县:101260105 关岭县:101260306 紫云县:101260305 平坝区:101260304 普定县:101260302 大方县:101260705 黔西县:101260708 金沙县:101260703 织金县:101260707 纳雍县:101260706 赫章县:101260702 威宁县:101260704 水城县:101260801 盘县:101260804 凯里市:101260501 黄平县:101260505 施秉县:101260503 三穗县:101260509 镇远县:101260504 岑巩县:101260502 天柱县:101260514 锦屏县:101260515 剑河县:101260511 台江县:101260510 黎平县:101260513 榕江县:101260516 从江县:101260517 雷山县:101260512 麻江县:101260507 丹寨县:101260508 都匀市:101260401 福泉市:101260405 荔波县:101260412 贵定县:101260402 瓮安县:101260403 独山县:101260410 平塘县:101260409 罗甸县:101260408 长顺县:101260404 龙里县:101260407 惠水县:101260406 三都县:101260411 兴义市:101260901 兴仁县:101260903 普安县:101260909 晴隆县:101260902 贞丰县:101260904 望谟县:101260905 册亨县:101260908 安龙县:101260907 江口县:101260602 石阡县:101260608 思南县:101260605 德江县:101260610 玉屏县:101260603 印江县:101260607 沿河县:101260609 松桃县:101260611 红花岗区:101260215 务川县:101260212 道真县:101260210 汇川区:101260214 赤水市:101260208 仁怀市:101260203 遵义县:101260202 桐梓县:101260207 绥阳县:101260204 正安县:101260211 凤冈县:101260206 湄潭县:101260205 余庆县:101260213 习水县:101260209 琼山区:101310104 井陉矿区:101090122 辛集市:101090114 藁城市:101090115 晋州市:101090116 新乐市:101090117 鹿泉区:101090118 井陉县:101090102 正定县:101090103 行唐县:101090104 灵寿县:101090106 高邑县:101090107 深泽县:101090108 赞皇县:101090109 无极县:101090110 平山县:101090111 元氏县:101090112 赵县:101090113 涿州市:101090218 定州市:101090219 安国市:101090220 高碑店市:101090221 满城区:101090202 清苑区:101090224 涞水县:101090222 阜平县:101090203 徐水区:101090204 定兴县:101090223 唐县:101090205 高阳县:101090206 容城县:101090207 涞源县:101090209 望都县:101090210 安新县:101090211 易县:101090212 曲阳县:101090214 蠡县:101090215 顺平县:101090216 博野县:101090225 雄县:101090217 泊头市:101090711 任丘市:101090712 黄骅市:101090713 河间市:101090714 沧县:101090716 青县:101090702 东光县:101090703 海兴县:101090704 盐山县:101090705 肃宁县:101090706 南皮县:101090707 吴桥县:101090708 献县:101090709 孟村县:101090710 承德县:101090403 兴隆县:101090404 平泉市:101090405 滦平县:101090406 隆化县:101090407 丰宁县:101090408 宽城县:101090409 围场县:101090410 峰峰矿区:101091002 武安市:101091016 临漳县:101091003 成安县:101091004 大名县:101091005 涉县:101091006 磁县:101091007 肥乡县:101091008 永年县:101091009 邱县:101091010 鸡泽县:101091011 广平县:101091012 馆陶县:101091013 魏县:101091014 曲周县:101091015 冀州市:101090810 深州市:101090811 枣强县:101090802 武邑县:101090803 武强县:101090804 饶阳县:101090805 安平县:101090806 故城县:101090807 景县:101090808 阜城县:101090809 霸州市:101090608 三河市:101090609 固安县:101090602 永清县:101090603 香河县:101090604 大城县:101090605 文安县:101090606 大厂县:101090607 北戴河区:101091106 昌黎县:101091103 抚宁区:101091104 卢龙县:101091105 青龙县:101091102 丰南区:101090502 丰润区:101090503 遵化市:101090510 迁安市:101090511 滦县:101090504 滦南县:101090505 乐亭县:101090506 迁西县:101090507 玉田县:101090508 曹妃甸区:101090509 南宫市:101090916 沙河市:101090917 临城县:101090902 内丘县:101090904 柏乡县:101090905 隆尧县:101090906 任县:101090918 南和县:101090907 宁晋县:101090908 巨鹿县:101090909 新河县:101090910 广宗县:101090911 平乡县:101090912 威县:101090913 清河县:101090914 临西县:101090915 宣化区:101090302 张北县:101090303 康保县:101090304 沽源县:101090305 尚义县:101090306 蔚县:101090307 阳原县:101090308 怀安县:101090309 万全区:101090310 怀来县:101090311 涿鹿县:101090312 赤城县:101090313 崇礼区:101090314 上街区:101180108 巩义市:101180102 荥阳市:101180103 新密市:101180105 新郑市:101180106 登封市:101180104 中牟县:101180107 吉利区:101180911 偃师市:101180908 孟津县:101180903 新安县:101180902 栾川县:101180909 嵩县:101180907 汝阳县:101180910 宜阳县:101180904 洛宁县:101180905 伊川县:101180906 杞县:101180802 通许县:101180804 尉氏县:101180803 兰考县:101180805 林州市:101180205 汤阴县:101180202 滑县:101180203 内黄县:101180204 浚县:101181202 淇县:101181203 沁阳市:101181104 孟州市:101181108 修武县:101181102 博爱县:101181106 武陟县:101181103 温县:101181107 邓州市:101180711 南召县:101180702 方城县:101180703 西峡县:101180705 镇平县:101180707 内乡县:101180706 淅川县:101180708 社旗县:101180704 唐河县:101180710 新野县:101180709 桐柏县:101180712 石龙区:101180508 舞钢市:101180506 汝州市:101180504 宝丰县:101180503 叶县:101180505 鲁山县:101180507 郏县:101180502 义马市:101181705 灵宝市:101181702 渑池县:101181703 陕州区:101181708 卢氏县:101181704 睢阳区:101181010 永城市:101181009 民权县:101181004 睢县:101181003 宁陵县:101181007 虞城县:101181005 柘城县:101181006 夏邑县:101181008 卫辉市:101180305 辉县市:101180304 获嘉县:101180302 原阳县:101180303 延津县:101180306 封丘县:101180307 长垣县:101180308 罗山县:101180603 光山县:101180604 新县:101180605 商城县:101180609 固始县:101180608 潢川县:101180607 淮滨县:101180606 息县:101180602 禹州市:101180405 长葛市:101180404 鄢陵县:101180402 襄城县:101180403 项城市:101181407 扶沟县:101181402 西华县:101181405 商水县:101181406 沈丘县:101181410 郸城县:101181408 淮阳县:101181404 太康县:101181403 鹿邑县:101181409 西平县:101181602 上蔡县:101181604 平舆县:101181607 正阳县:101181610 确山县:101181609 泌阳县:101181606 汝南县:101181605 遂平县:101181603 新蔡县:101181608 舞阳县:101181503 临颍县:101181502 清丰县:101181304 南乐县:101181303 范县:101181305 台前县:101181302 阿城区:101050104 呼兰区:101050103 尚志市:101050111 双城市:101050102 五常市:101050112 方正县:101050109 宾县:101050105 依兰县:101050106 巴彦县:101050107 通河县:101050108 木兰县:101050113 延寿县:101050110 肇州县:101050903 肇源县:101050904 林甸县:101050902 杜尔伯特:101050905 呼玛县:101050704 漠河县:101050703 塔河县:101050702 南山区:101051206 萝北县:101051203 绥滨县:101051202 五大连池市:101050605 北安市:101050606 嫩江县:101050602 逊克县:101050604 孙吴县:101050603 虎林市:101051102 密山市:101051103 鸡东县:101051104 同江市:101050406 富锦市:101050407 桦南县:101050405 桦川县:101050404 汤原县:101050402 抚远市:101050403 绥芬河市:101050305 海林市:101050302 宁安市:101050306 穆棱市:101050303 东宁市:101050307 林口县:101050304 勃利县:101051003 讷河市:101050202 龙江县:101050203 依安县:101050206 泰来县:101050210 甘南县:101050204 富裕县:101050205 克山县:101050208 克东县:101050209 拜泉县:101050207 集贤县:101051302 友谊县:101051305 宝清县:101051303 饶河县:101051304 安达市:101050503 肇东市:101050502 海伦市:101050504 望奎县:101050506 兰西县:101050507 青冈县:101050508 庆安县:101050509 明水县:101050505 绥棱县:101050510 五营区:101050803 乌伊岭区:101050802 铁力市:101050804 嘉荫县:101050805 东西湖区:101200106 蔡甸区:101200102 江夏区:101200105 黄陂区:101200103 新洲区:101200104 梁子湖区:101200302 麻城市:101200503 武穴市:101200509 团风县:101200510 红安县:101200502 罗田县:101200504 英山县:101200505 浠水县:101200506 蕲春县:101200507 黄梅县:101200508 西塞山区:101200606 下陆区:101200605 铁山区:101200604 大冶市:101200602 阳新县:101200603 掇刀区:101201404 钟祥市:101201402 京山县:101201403 沙洋县:101201405 石首市:101200804 洪湖市:101200806 松滋市:101200807 公安县:101200803 监利县:101200805 江陵县:101200802 张湾区:101201109 茅箭区:101201108 丹江口市:101201107 郧阳区:101201104 郧西县:101201103 竹山县:101201105 竹溪县:101201102 房县:101201106 广水市:101201302 赤壁市:101200702 嘉鱼县:101200703 通城县:101200705 崇阳县:101200704 通山县:101200706 襄州区:101200202 老河口市:101200206 枣阳市:101200208 宜城市:101200205 南漳县:101200204 谷城县:101200207 保康县:101200203 应城市:101200405 安陆市:101200402 汉川市:101200406 孝昌县:101200407 大悟县:101200404 云梦县:101200403 长阳县:101200908 五峰县:101200906 夷陵区:101200912 宜都市:101200909 当阳市:101200907 枝江市:101200910 远安县:101200902 兴山县:101200904 秭归县:101200903 利川市:101201002 建始县:101201003 巴东县:101201008 宣恩县:101201005 咸丰县:101201004 来凤县:101201007 鹤峰县:101201006 浏阳市:101250103 长沙县:101250106 望城区:101250105 宁乡县:101250102 武陵源区:101251104 慈利县:101251103 桑植县:101251102 津市市:101250608 安乡县:101250602 汉寿县:101250604 澧县:101250605 临澧县:101250606 桃源县:101250603 石门县:101250607 苏仙区:101250512 资兴市:101250507 桂阳县:101250502 宜章县:101250504 永兴县:101250510 嘉禾县:101250503 临武县:101250505 汝城县:101250508 桂东县:101250511 安仁县:101250509 南岳区:101250409 耒阳市:101250408 常宁市:101250406 衡阳县:101250405 衡南县:101250407 衡山县:101250402 衡东县:101250403 祁东县:101250404 鹤城区:101251202 靖州县:101251205 麻阳县:101251208 通道县:101251207 新晃县:101251209 芷江治县:101251210 沅陵县:101251203 辰溪县:101251204 溆浦县:101251211 中方县:101251212 会同县:101251206 洪江市:101251213 冷水江市:101250803 涟源市:101250806 双峰县:101250802 新化县:101250805 城步县:101250909 武冈市:101250908 邵东县:101250905 新邵县:101250904 邵阳县:101250910 隆回县:101250902 洞口县:101250903 绥宁县:101250906 新宁县:101250907 湘乡市:101250203 韶山市:101250202 吉首市:101251501 泸溪县:101251506 凤凰县:101251505 花垣县:101251508 保靖县:101251502 古丈县:101251504 永顺县:101251503 龙山县:101251507 赫山区:101250701 沅江市:101250705 南县:101250702 桃江县:101250703 安化县:101250704 江华瑶族自治县:101251410 祁阳县:101251402 东安县:101251403 双牌县:101251404 道县:101251405 江永县:101251407 宁远县:101251406 蓝山县:101251408 新田县:101251409 汨罗市:101251004 临湘市:101251006 华容县:101251002 湘阴县:101251003 平江县:101251005 醴陵市:101250303 荷塘区:101250304 攸县:101250302 茶陵县:101250305 炎陵县:101250306 双阳区:101060106 德惠市:101060103 九台市:101060104 榆树市:101060105 农安县:101060102 蛟河市:101060204 桦甸市:101060206 舒兰市:101060202 磐石市:101060205 永吉县:101060203 洮南市:101060602 大安市:101060603 镇赉县:101060604 通榆县:101060605 江源区:101060907 长白县:101060905 临江市:101060903 抚松县:101060906 靖宇县:101060902 东丰县:101060702 东辽县:101060703 伊通满族自治县:101060405 公主岭市:101060404 双辽市:101060402 梨树县:101060403 前郭县:101060803 长岭县:101060804 乾安县:101060802 扶余市:101060805 梅河口市:101060502 集安市:101060505 通化县:101060506 辉南县:101060504 柳河县:101060503 延吉市:101060301 图们市:101060309 敦化市:101060302 珲春市:101060308 龙井市:101060307 和龙市:101060305 安图县:101060303 汪清县:101060304 浦口区:101190107 江宁区:101190104 六合区:101190105 溧水区:101190102 高淳区:101190103 吴中区:101190405 昆山市:101190404 常熟市:101190402 张家港市:101190403 塔城市:101131101 吴江区:101190407 太仓市:101190408 锡山区:101190204 江阴市:101190202 宜兴市:101190203 武进区:101191104 溧阳市:101191102 金坛区:101191103 淮安区:101190908 淮阴区:101190906 涟水县:101190905 洪泽区:101190904 盱眙县:101190903 金湖县:101190902 赣榆区:101191003 东海县:101191002 灌云县:101191004 灌南县:101191005 启东市:101190507 如皋市:101190503 通州区:101190509 海门市:101190508 海安县:101190502 如东县:101190504 宿豫区:101191305 沭阳县:101191302 泗阳县:101191303 泗洪县:101191304 兴化市:101191202 靖江市:101191205 泰兴市:101191203 姜堰区:101191204 新沂市:101190807 邳州市:101190805 丰县:101190803 沛县:101190804 铜山区:101190802 睢宁县:101190806 盐都区:101190709 东台市:101190707 大丰区:101190708 响水县:101190702 滨海县:101190703 阜宁县:101190704 射阳县:101190705 建湖县:101190706 邗江区:101190606 仪征市:101190603 高邮市:101190604 江都市:101190605 宝应县:101190602 丹徒区:101190305 丹阳市:101190302 扬中市:101190303 句容市:101190304 南昌县:101240103 新建区:101240102 安义县:101240104 进贤县:101240105 南城县:101240408 黎川县:101240410 南丰县:101240409 崇仁县:101240404 乐安县:101240403 宜黄县:101240407 金溪县:101240405 资溪县:101240406 东乡县:101240411 广昌县:101240402 于都县:101240710 瑞金市:101240709 南康市:101240704 赣县:101240718 信丰县:101240706 大余县:101240705 上犹县:101240703 崇义县:101240702 安远县:101240712 龙南县:101240714 定南县:101240715 全南县:101240713 宁都县:101240707 兴国县:101240717 会昌县:101240711 寻乌县:101240716 石城县:101240708 安福县:101240612 井冈山市:101240608 吉安县:101240602 吉水县:101240603 峡江县:101240605 新干县:101240604 永丰县:101240606 泰和县:101240611 遂川县:101240610 万安县:101240609 永新县:101240607 乐平市:101240802 浮梁县:101240803 庐山市:101240203 瑞昌市:101240202 武宁县:101240204 修水县:101240212 永修县:101240206 德安县:101240205 星子县:101240209 都昌县:101240210 湖口县:101240207 彭泽县:101240208 安源区:101240904 湘东区:101240906 莲花县:101240902 芦溪县:101240905 上栗县:101240903 德兴市:101240307 上饶县:101240308 广丰区:101240313 玉山县:101240312 铅山县:101240311 横峰县:101240310 弋阳县:101240309 余干县:101240305 鄱阳县:101240302 万年县:101240306 婺源县:101240303 分宜县:101241002 丰城市:101240510 樟树市:101240509 高安市:101240508 奉新县:101240507 万载县:101240504 上高县:101240505 宜丰县:101240503 靖安县:101240506 铜鼓县:101240502 贵溪市:101241103 余江县:101241102 苏家屯区:101070112 于洪区:101070114 新民市:101070106 辽中区:101070103 康平县:101070104 法库县:101070105 旅顺口区:101070205 金州区:101070203 瓦房店市:101070202 普兰店市:101070204 庄河市:101070207 长海县:101070206 岫岩县:101070303 海城市:101070304 台安县:101070302 本溪县:101070502 桓仁县:101070504 喀喇沁左翼蒙古族自治县:101071204 北票市:101071205 凌源市:101071203 建平县:101071207 宽甸县:101070603 东港市:101070604 凤城市:101070602 清原县:101070403 新宾县:101070402 彰武县:101070902 兴城市:101071404 绥中县:101071403 建昌县:101071402 凌海市:101070702 北镇市:101070706 黑山县:101070705 义县:101070704 弓长岭区:101071004 灯塔市:101071003 辽阳县:101071002 大洼区:101071302 盘山县:101071303 调兵山市:101071105 开原市:101071102 西丰县:101071104 昌图县:101071103 盖州市:101070803 大石桥市:101070802 清水河县:101080105 土默特左旗:101080102 托克托县:101080103 和林格尔县:101080104 武川县:101080107 阿拉善左旗:101081201 阿拉善右旗:101081202 额济纳旗:101081203 临河区:101080801 五原县:101080802 磴口县:101080803 乌拉特前旗:101080804 乌拉特中旗:101080806 乌拉特后旗:101080807 杭锦后旗:101080810 石拐区:101080211 白云鄂博:101080202 土默特右旗:101080204 固阳县:101080205 达茂旗:101080206 阿鲁科尔沁旗:101080603 巴林左旗:101080605 巴林右旗:101080606 林西县:101080607 克什克腾旗:101080608 翁牛特旗:101080609 喀喇沁旗:101080611 宁城县:101080613 敖汉旗:101080614 东胜区:101080713 达拉特旗:101080703 准格尔旗:101080704 鄂托克前旗:101080705 鄂托克旗:101080708 杭锦旗:101080709 乌审旗:101080710 伊金霍洛旗:101080711 莫力达瓦:101081004 满洲里市:101081010 牙克石市:101081011 扎兰屯市:101081012 额尔古纳市:101081014 根河市:101081015 阿荣旗:101081003 鄂伦春旗:101081005 鄂温克族旗:101081006 陈巴尔虎旗:101081007 新巴尔虎左旗:101081008 新巴尔虎右旗:101081009 霍林郭勒市:101080512 科尔沁左翼中旗:101080503 科尔沁左翼后旗:101080504 开鲁县:101080506 库伦旗:101080507 奈曼旗:101080508 扎鲁特旗:101080509 化德县:101080403 集宁区:101080401 丰镇市:101080412 卓资县:101080402 商都县:101080404 兴和县:101080406 凉城县:101080407 察哈尔右翼前旗:101080408 察哈尔右翼中旗:101080409 察哈尔右翼后旗:101080410 四子王旗:101080411 二连浩特市:101080903 锡林浩特市:101080901 阿巴嘎旗:101080904 苏尼特左旗:101080906 苏尼特右旗:101080907 东乌珠穆沁旗:101080909 西乌珠穆沁旗:101080910 太仆寺旗:101080911 镶黄旗:101080912 正镶白旗:101080913 多伦县:101080915 乌兰浩特市:101081101 阿尔山市:101081102 科尔沁右翼前旗:101081109 科尔沁右翼中旗:101081103 扎赉特旗:101081105 突泉县:101081107 灵武市:101170103 永宁县:101170102 贺兰县:101170104 西吉县:101170402 隆德县:101170403 泾源县:101170404 彭阳县:101170406 惠农区:101170202 大武口区:101170205 陶乐:101170204 平罗县:101170203 青铜峡市:101170306 盐池县:101170303 同心县:101170302 海原县:101170504 中宁县:101170502 湟中县:101150104 湟源县:101150103 大通县:101150102 玛沁县:101150501 班玛县:101150502 甘德县:101150503 达日县:101150504 久治县:101150505 玛多县:101150506 海晏县:101150801 祁连县:101150803 刚察县:101150806 门源县:101150802 平安县:101150208 乐都区:101150202 民和县:101150203 互助县:101150204 化隆县:101150205 循化县:101150206 同德县:101150408 贵德县:101150404 兴海县:101150406 贵南县:101150407 格尔木市:101150714 乌兰县:101150709 都兰县:101150715 天峻县:101150708 同仁县:101150301 尖扎县:101150302 泽库县:101150303 河南县:101150304 杂多县:101150604 称多县:101150602 治多县:101150603 囊谦县:101150605 曲麻莱县:101150606 长清区:101120102 章丘市:101120104 平阴县:101120105 济阳县:101120106 商河县:101120103 崂山区:101120202 胶州市:101120205 即墨市:101120204 平度市:101120208 黄岛区:101120206 莱西市:101120207 惠民县:101121105 阳信县:101121104 无棣县:101121103 沾化区:101121106 博兴县:101121102 邹平县:101121107 兰陵县:101120404 乐陵市:101120406 禹城市:101120411 宁津县:101120409 庆云县:101120407 临邑县:101120403 齐河县:101120405 平原县:101120408 夏津县:101120410 武城县:101120402 河口区:101121202 垦利区:101121203 利津县:101121204 广饶县:101121205 曹县:101121007 单县:101121009 成武县:101121008 巨野县:101121006 郓城县:101121003 鄄城县:101121002 定陶区:101121005 东明县:101121004 曲阜市:101120710 兖州市:101120705 邹城市:101120711 微山县:101120703 鱼台县:101120704 金乡县:101120706 嘉祥县:101120702 汶上县:101120707 泗水县:101120708 梁山县:101120709 临清市:101121707 阳谷县:101121703 莘县:101121709 茌平县:101121705 东阿县:101121706 冠县:101121702 高唐县:101121704 沂南县:101120903 郯城县:101120906 沂水县:101120910 兰陵县:101120904 费县:101120909 平邑县:101120908 莒南县:101120902 蒙阴县:101120907 临沭县:101120905 五莲县:101121502 莒县:101121503 泰山区:101120803 新泰市:101120802 肥城市:101120804 宁阳县:101120806 东平县:101120805 荣成市:101121303 乳山市:101121304 文登市:101121302 青州市:101120602 诸城市:101120609 寿光市:101120603 安丘市:101120607 高密市:101120608 昌邑市:101120606 临朐县:101120604 昌乐县:101120605 福山区:101120508 牟平区:101120509 龙口市:101120505 莱阳市:101120510 莱州市:101120502 蓬莱市:101120504 招远市:101120506 栖霞市:101120507 海阳市:101120511 长岛县:101120503 峄城区:101121403 台儿庄区:101121404 薛城区:101121402 滕州市:101121405 临淄区:101120308 淄川区:101120302 博山区:101120303 周村区:101120305 桓台县:101120307 高青县:101120304 沂源县:101120306 清徐县:101100102 阳曲县:101100103 娄烦县:101100104 古交市:101100105 沁县:101100508 潞城市:101100504 襄垣县:101100505 屯留县:101100503 平顺县:101100506 黎城县:101100502 壶关县:101100511 长子县:101100509 武乡县:101100507 沁源县:101100510 阳高县:101100202 天镇县:101100204 广灵县:101100205 灵丘县:101100206 浑源县:101100207 左云县:101100208 大同县:101100203 高平市:101100605 沁水县:101100602 阳城县:101100603 陵川县:101100604 泽州县:101100606 榆次区:101100402 介休市:101100412 榆社县:101100403 左权县:101100404 和顺县:101100405 昔阳县:101100406 寿阳县:101100407 太谷县:101100408 祁县:101100409 平遥县:101100410 灵石县:101100411 侯马市:101100714 霍州市:101100711 曲沃县:101100702 翼城县:101100713 襄汾县:101100707 洪洞县:101100710 吉县:101100706 安泽县:101100716 浮山县:101100715 古县:101100717 乡宁县:101100712 大宁县:101100705 隰县:101100704 永和县:101100703 蒲县:101100708 汾西县:101100709 离石区:101101101 孝义市:101101110 汾阳市:101101111 文水县:101101112 交城县:101101113 兴县:101101103 临县:101101102 柳林县:101101105 石楼县:101101106 岚县:101101104 方山县:101101107 中阳县:101101109 交口县:101101108 平鲁区:101100902 山阴县:101100903 应县:101100905 右玉县:101100904 怀仁县:101100906 原平市:101101015 定襄县:101101002 五台县:101101003 代县:101101008 繁峙县:101101009 宁武县:101101007 静乐县:101101012 神池县:101101006 五寨县:101101014 岢岚县:101101013 河曲县:101101004 保德县:101101011 偏关县:101101005 平定县:101100303 盂县:101100302 永济市:101100810 河津市:101100805 临猗县:101100802 万荣县:101100804 闻喜县:101100808 稷山县:101100803 新绛县:101100806 绛县:101100807 垣曲县:101100809 夏县:101100812 平陆县:101100813 芮城县:101100811 临潼区:101110103 长安区:101090119 蓝田县:101110104 周至县:101110105 户县:101110106 高陵区:101110107 汉阴县:101110704 石泉县:101110703 宁陕县:101110710 紫阳县:101110702 岚皋县:101110706 平利县:101110707 镇坪县:101110709 旬阳县:101110705 白河县:101110708 陈仓区:101110912 凤翔县:101110906 岐山县:101110905 扶风县:101110907 眉县:101110908 陇县:101110911 千阳县:101110903 麟游县:101110904 凤县:101110910 太白县:101110909 南郑县:101110810 城固县:101110806 洋县:101110805 西乡县:101110807 勉县:101110803 宁强县:101110809 略阳县:101110802 镇巴县:101110811 留坝县:101110804 佛坪县:101110808 商州区:101110604 洛南县:101110602 丹凤县:101110606 商南县:101110607 山阳县:101110608 镇安县:101110605 柞水县:101110603 耀州区:101111004 宜君县:101111003 韩城市:101110510 华阴市:101110511 华县:101110502 潼关县:101110503 大荔县:101110504 合阳县:101110509 澄城县:101110508 蒲城县:101110507 白水县:101110505 富平县:101110506 兴平市:101110211 三原县:101110201 泾阳县:101110205 乾县:101110207 礼泉县:101110202 永寿县:101110203 彬县:101110208 长武县:101110209 旬邑县:101110210 淳化县:101110204 武功县:101110206 吴起县:101110312 延长县:101110301 延川县:101110302 子长县:101110303 安塞区:101110307 志丹县:101110306 甘泉县:101110308 富县:101110305 洛川县:101110309 宜川县:101110304 黄龙县:101110311 黄陵县:101110310 榆阳区:101110413 神木县:101110403 府谷县:101110402 横山区:101110407 靖边县:101110406 定边县:101110405 绥德县:101110410 米脂县:101110408 佳县:101110404 吴堡县:101110411 清涧县:101110412 子洲县:101110409 闵行区:101020200 浦东新区:101020600 松江区:101020900 嘉定区:101020500 宝山区:101020300 青浦区:101020800 金山区:101020700 奉贤区:101021000 崇明区:101021100 龙泉驿区:101270102 青白江区:101270115 新都区:101270103 温江区:101270104 都江堰市:101270111 彭州市:101270112 邛崃市:101270113 崇州市:101270114 金堂县:101270105 双流区:101270106 郫县:101270107 大邑县:101270108 蒲江县:101270109 新津县:101270110 江油市:101270408 盐亭县:101270403 三台县:101270402 平武县:101270407 安县:101270404 梓潼县:101270405 北川县:101270406 马尔康市:101271910 汶川县:101271902 理县:101271903 茂县:101271904 松潘县:101271905 九寨沟县:101271906 金川县:101271907 小金县:101271908 黑水县:101271909 壤塘县:101271911 若尔盖县:101271912 红原县:101271913 通江县:101270902 南江县:101270903 平昌县:101270904 万源市:101270606 达川区:101270608 宣汉县:101270602 开江县:101270603 大竹县:101270604 渠县:101270605 广汉市:101272003 什邡市:101272004 绵竹市:101272005 罗江区:101272006 中江县:101272002 康定市:101271802 丹巴县:101271804 泸定县:101271803 炉霍县:101271808 九龙县:101271805 雅江县:101271806 新龙县:101271809 道孚县:101271807 白玉县:101271811 理塘县:101271814 德格县:101271810 乡城县:101271816 石渠县:101271812 稻城县:101271817 色达县:101271813 巴塘县:101271815 得荣县:101271818 华蓥市:101270805 岳池县:101270802 武胜县:101270803 邻水县:101270804 旺苍县:101272102 青川县:101272103 剑阁县:101272104 苍溪县:101272105 峨眉山市:101271408 犍为县:101271402 井研县:101271403 夹江县:101271404 沐川县:101271405 峨边县:101271406 马边县:101271407 西昌市:101271610 盐源县:101271604 德昌县:101271605 会理县:101271606 会东县:101271607 宁南县:101271608 普格县:101271609 布拖县:101271619 金阳县:101271611 昭觉县:101271612 喜德县:101271613 冕宁县:101271614 越西县:101271615 甘洛县:101271616 美姑县:101271618 雷波县:101271617 木里县:101271603 仁寿县:101271502 彭山区:101271503 洪雅县:101271504 丹棱县:101271505 青神县:101271506 阆中市:101270507 南部县:101270502 营山县:101270503 蓬安县:101270504 仪陇县:101270505 西充县:101270506 东兴区:101271202 威远县:101271203 资中县:101271204 隆昌县:101271205 仁和区:101270202 米易县:101270203 盐边县:101270204 蓬溪县:101270702 射洪县:101270703 名山区:101271702 荥经县:101271703 汉源县:101271704 石棉县:101271705 天全县:101271706 芦山县:101271707 宝兴县:101271708 叙州区:101271103 南溪区:101271104 江安县:101271105 长宁县:101271106 高县:101271107 珙县:101271108 筠连县:101271109 兴文县:101271110 屏山县:101271111 简阳市:101270121 安岳县:101271302 乐至县:101271303 荣县:101270303 富顺县:101270302 纳溪区:101271007 泸县:101271003 合江县:101271004 叙永县:101271005 古蔺县:101271006 东丽区:101030400 津南区:101031000 西青区:101030500 北辰区:101030600 滨海新区:101031100 和平区:101030800 河东区:101031200 武清区:101030200 宝坻区:101030300 宁河区:101030700 静海区:101030900 蓟州区:101031400 林周县:101140104 当雄县:101140102 尼木县:101140103 曲水县:101140106 堆龙德庆区:101140105 达孜县:101140107 墨竹工卡县:101140108 噶尔县:101140707 普兰县:101140705 札达县:101140706 日土县:101140708 革吉县:101140709 改则县:101140702 措勤县:101140710 江达县:101140509 贡觉县:101140511 类乌齐县:101140507 丁青县:101140502 察雅县:101140510 八宿县:101140508 左贡县:101140505 芒康县:101140506 洛隆县:101140504 边坝县:101140503 工布江达县:101140405 米林县:101140403 墨脱县:101140407 波密县:101140402 察隅县:101140404 朗县:101140406 嘉黎县:101140603 比如县:101140609 聂荣县:101140607 安多县:101140605 申扎县:101140611 索县:101140606 班戈县:101140604 巴青县:101140608 尼玛县:101140602 南木林县:101140203 江孜县:101140206 定日县:101140205 萨迦县:101140213 拉孜县:101140202 昂仁县:101140211 谢通门县:101140214 白朗县:101140217 仁布县:101140220 康马县:101140219 定结县:101140212 仲巴县:101140208 亚东县:101140218 吉隆县:101140210 聂拉木县:101140204 萨嘎县:101140209 岗巴县:101140216 乃东区:101140309 扎囊县:101140303 贡嘎县:101140302 桑日县:101140310 琼结县:101140313 曲松县:101140314 措美县:101140312 洛扎县:101140311 加查县:101140304 隆子县:101140307 错那县:101140306 浪卡子县:101140305 达坂城区:101130105 乌鲁木齐县:101130113 温宿县:101130803 库车县:101130807 沙雅县:101130806 新和县:101130805 拜城县:101130804 乌什县:101130802 阿瓦提县:101130809 柯坪县:101130808 库尔勒:101130601 轮台县:101130602 尉犁县:101130603 若羌县:101130604 且末县:101130605 焉耆县:101130607 和静县:101130606 和硕县:101130608 博湖县:101130612 博乐市:101131601 精河县:101131603 温泉县:101131602 呼图壁县:101130402 米泉:101130403 阜康市:101130404 玛纳斯县:101130407 奇台县:101130406 吉木萨尔县:101130405 木垒县:101130408 伊吾县:101131204 巴里坤:101131203 墨玉县:101131304 皮山县:101131302 洛浦县:101131305 策勒县:101131303 于田县:101131307 民丰县:101131306 疏附县:101130911 疏勒县:101130912 英吉沙县:101130902 泽普县:101130907 莎车县:101130905 叶城县:101130906 麦盖提县:101130904 岳普湖县:101130909 伽师县:101130910 巴楚县:101130908 塔什库尔干:101130903 阿图什市:101131501 阿克陶县:101131503 阿合奇县:101131504 乌恰县:101131502 鄯善县:101130504 托克逊县:101130502 阿勒泰:101131401 和布克赛尔:101131104 伊宁市:101131001 布尔津县:101131406 奎屯市:101131011 乌苏市:101131106 额敏县:101131103 富蕴县:101131408 伊宁县:101131004 福海县:101131407 霍城县:101131009 沙湾县:101131107 巩留县:101131005 哈巴河县:101131402 托里县:101131105 青河县:101131409 新源县:101131006 裕民县:101131102 吉木乃县:101131405 昭苏县:101131007 特克斯县:101131008 尼勒克县:101131003 察布查尔:101131002 东川区:101290103 安宁市:101290112 呈贡区:101290108 晋宁县:101290105 富民县:101290109 宜良县:101290106 嵩明县:101290110 石林县:101290107 禄劝县:101290111 寻甸县:101290104 兰坪县:101291204 泸水市:101291205 福贡县:101291203 贡山县:101291207 宁洱县:101290912 思茅区:101290905 墨江县:101290906 景东县:101290903 景谷县:101290902 镇沅县:101290911 江城县:101290907 孟连县:101290908 澜沧县:101290904 西盟县:101290909 宁蒗县:101291404 永胜县:101291402 华坪县:101291403 施甸县:101290504 腾冲市:101290506 龙陵县:101290503 昌宁县:101290505 双柏县:101290809 牟定县:101290805 南华县:101290806 姚安县:101290804 大姚县:101290802 永仁县:101290810 元谋县:101290803 武定县:101290807 禄丰县:101290808 祥云县:101290207 宾川县:101290205 弥渡县:101290206 永平县:101290204 云龙县:101290202 洱源县:101290210 剑川县:101290209 鹤庆县:101290211 漾濞县:101290203 南涧县:101290212 巍山县:101290208 芒市:101291508 瑞丽市:101291506 梁河县:101291507 盈江县:101291504 陇川县:101291503 香格里拉市:101291301 德钦县:101291302 维西县:101291303 泸西县:101290311 蒙自市:101290309 个旧市:101290308 开远市:101290307 绿春县:101290306 建水县:101290303 石屏县:101290302 弥勒市:101290304 元阳县:101290305 金平县:101290312 河口县:101290313 屏边县:101290310 凤庆县:101291105 云县:101291107 永德县:101291106 镇康县:101291108 双江县:101291104 耿马县:101291103 沧源县:101291102 宣威市:101290409 马龙县:101290405 陆良县:101290403 师宗县:101290406 罗平县:101290407 富源县:101290404 会泽县:101290408 沾益区:101290402 砚山县:101290605 西畴县:101290602 麻栗坡县:101290604 马关县:101290603 丘北县:101290606 广南县:101290607 富宁县:101290608 景洪市:101291601 勐海县:101291603 勐腊县:101291605 江川区:101290703 澄江县:101290702 通海县:101290704 华宁县:101290705 易门县:101290707 峨山县:101290708 新平县:101290706 元江县:101290709 鲁甸县:101291002 巧家县:101291006 盐津县:101291009 大关县:101291010 永善县:101291008 绥江县:101291007 镇雄县:101291004 彝良县:101291003 威信县:101291005 水富县:101291011 萧山区:101210102 余杭区:101210106 建德市:101210105 富阳区:101210108 临安市:101210107 桐庐县:101210103 淳安县:101210104 德清县:101210204 长兴县:101210202 安吉县:101210203 海宁市:101210303 嘉善县:101210302 平湖市:101210305 桐乡市:101210304 海盐县:101210306 兰溪市:101210903 义乌市:101210904 加格达奇:101050708 新林:101050706 呼中:101050705 东阳市:101210905 永康市:101210907 武义县:101210906 浦江县:101210902 磐安县:101210908 龙泉市:101210803 青田县:101210805 缙云县:101210804 遂昌县:101210802 松阳县:101210808 云和县:101210806 庆元县:101210807 景宁县:101210809 镇海区:101210412 北仑区:101210410 鄞州区:101210411 余姚市:101210404 慈溪市:101210403 奉化市:101210405 象山县:101210406 宁海县:101210408 上虞区:101210503 嵊州市:101210505 越城区:101210501 新昌县:101210504 诸暨市:101210502 椒江区:101210611 黄岩区:101210612 路桥区:101210613 温岭市:101210607 临海市:101210610 玉环县:101210603 三门县:101210604 天台县:101210605 仙居县:101210606 瑞安市:101210705 乐清市:101210707 洞头区:101210706 永嘉县:101210708 平阳县:101210704 苍南县:101210709 文成县:101210703 泰顺县:101210702 定海区:101211106 普陀区:101021500 岱山县:101211104 嵊泗县:101211102 衢江区:101211006 江山市:101211005 常山县:101211002 开化县:101211003 龙游县:101211004 合川区:101040300 江津区:101040500 南川区:101040400 永川区:101040200 渝北区:101040700 万盛:101040600 万州区:101041300 北碚区:101040800 沙坪坝区:101043800 巴南区:101040900 涪陵区:101041400 黔江区:101041100 长寿区:101041000 綦江区:101043300 潼南区:101042100 铜梁区:101042800 大足区:101042600 荣昌区:101042700 璧山区:101042900 垫江县:101042200 武隆县:101043100 丰都县:101043000 城口县:101041600 梁平县:101042300 开州区:101044100 巫溪县:101041800 巫山县:101042000 奉节县:101041900 云阳县:101041700 忠县:101042400 石柱县:101042500 彭水县:101043200 酉阳县:101043400 秀山县:101043600 九龙:101320102 台北:101340101 高雄:101340201 台中:101340401 台南:101340203 新竹:101340103 嘉义:101340202 桃园:101340102 苗栗:101340402 彰化:101340403 南投:101340404 云林:101340406 屏东:101340205 台东县:101340204 花莲:101340405 合肥:101220101 长丰县:101220102 肥东县:101220103 肥西县:101220104 
