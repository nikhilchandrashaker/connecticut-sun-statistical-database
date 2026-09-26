import React, { useState, useMemo } from "react";

/* =========================================================================
   DATA
   Sourced from the Connecticut Sun tribute stat database (2003-2026):
   official Sun team pages, WNBA.com, Basketball-Reference.
   ========================================================================= */
const DATA = {"season_records":[{"Season":2003,"Team":"Connecticut Sun","Conference":"East","Wins":18,"Losses":16,"Win %":0.529,"Conference Finish":2,"Playoff Result":"Lost Eastern Conference Finals (Detroit, 0-2)","Head Coach":"Mike Thibault","Record":"18-16"},{"Season":2004,"Team":"Connecticut Sun","Conference":"East","Wins":18,"Losses":16,"Win %":0.529,"Conference Finish":1,"Playoff Result":"Lost WNBA Finals (Seattle, 1-2)","Head Coach":"Mike Thibault","Record":"18-16"},{"Season":2005,"Team":"Connecticut Sun","Conference":"East","Wins":26,"Losses":8,"Win %":0.765,"Conference Finish":1,"Playoff Result":"Lost WNBA Finals (Sacramento, 1-3)","Head Coach":"Mike Thibault","Record":"26-8"},{"Season":2006,"Team":"Connecticut Sun","Conference":"East","Wins":26,"Losses":8,"Win %":0.765,"Conference Finish":1,"Playoff Result":"Lost Eastern Conference Finals (Detroit, 1-2)","Head Coach":"Mike Thibault","Record":"26-8"},{"Season":2007,"Team":"Connecticut Sun","Conference":"East","Wins":18,"Losses":16,"Win %":0.529,"Conference Finish":3,"Playoff Result":"Lost Eastern Conference Semifinals (Indiana, 1-2)","Head Coach":"Mike Thibault","Record":"18-16"},{"Season":2008,"Team":"Connecticut Sun","Conference":"East","Wins":21,"Losses":13,"Win %":0.618,"Conference Finish":2,"Playoff Result":"Lost Eastern Conference Semifinals (New York, 1-2)","Head Coach":"Mike Thibault","Record":"21-13"},{"Season":2009,"Team":"Connecticut Sun","Conference":"East","Wins":16,"Losses":18,"Win %":0.471,"Conference Finish":6,"Playoff Result":"Did not qualify","Head Coach":"Mike Thibault","Record":"16-18"},{"Season":2010,"Team":"Connecticut Sun","Conference":"East","Wins":17,"Losses":17,"Win %":0.5,"Conference Finish":5,"Playoff Result":"Did not qualify","Head Coach":"Mike Thibault","Record":"17-17"},{"Season":2011,"Team":"Connecticut Sun","Conference":"East","Wins":21,"Losses":13,"Win %":0.618,"Conference Finish":2,"Playoff Result":"Lost Eastern Conference Semifinals (Atlanta, 0-2)","Head Coach":"Mike Thibault","Record":"21-13"},{"Season":2012,"Team":"Connecticut Sun","Conference":"East","Wins":25,"Losses":9,"Win %":0.735,"Conference Finish":1,"Playoff Result":"Lost Eastern Conference Finals (Indiana, 1-2)","Head Coach":"Mike Thibault","Record":"25-9"},{"Season":2013,"Team":"Connecticut Sun","Conference":"East","Wins":10,"Losses":24,"Win %":0.294,"Conference Finish":6,"Playoff Result":"Did not qualify","Head Coach":"Anne Donovan","Record":"10-24"},{"Season":2014,"Team":"Connecticut Sun","Conference":"East","Wins":13,"Losses":21,"Win %":0.382,"Conference Finish":6,"Playoff Result":"Did not qualify","Head Coach":"Anne Donovan","Record":"13-21"},{"Season":2015,"Team":"Connecticut Sun","Conference":"East","Wins":15,"Losses":19,"Win %":0.441,"Conference Finish":6,"Playoff Result":"Did not qualify","Head Coach":"Anne Donovan","Record":"15-19"},{"Season":2016,"Team":"Connecticut Sun","Conference":"East","Wins":14,"Losses":20,"Win %":0.412,"Conference Finish":5,"Playoff Result":"Did not qualify","Head Coach":"Curt Miller","Record":"14-20"},{"Season":2017,"Team":"Connecticut Sun","Conference":"East","Wins":21,"Losses":13,"Win %":0.656,"Conference Finish":2,"Playoff Result":"Lost Second Round (Phoenix, 0-1)","Head Coach":"Curt Miller","Record":"21-13"},{"Season":2018,"Team":"Connecticut Sun","Conference":"East","Wins":21,"Losses":13,"Win %":0.618,"Conference Finish":3,"Playoff Result":"Lost Second Round (Phoenix, 0-1)","Head Coach":"Curt Miller","Record":"21-13"},{"Season":2019,"Team":"Connecticut Sun","Conference":"East","Wins":23,"Losses":11,"Win %":0.676,"Conference Finish":2,"Playoff Result":"Lost WNBA Finals (Washington, 2-3)","Head Coach":"Curt Miller","Record":"23-11"},{"Season":2020,"Team":"Connecticut Sun","Conference":"East","Wins":10,"Losses":12,"Win %":0.455,"Conference Finish":2,"Playoff Result":"Lost Semifinals (Las Vegas, 2-3)","Head Coach":"Curt Miller","Record":"10-12"},{"Season":2021,"Team":"Connecticut Sun","Conference":"East","Wins":26,"Losses":6,"Win %":0.813,"Conference Finish":1,"Playoff Result":"Lost Semifinals (Chicago, 1-3)","Head Coach":"Curt Miller","Record":"26-6"},{"Season":2022,"Team":"Connecticut Sun","Conference":"East","Wins":25,"Losses":11,"Win %":0.694,"Conference Finish":2,"Playoff Result":"Lost WNBA Finals (Las Vegas, 1-3)","Head Coach":"Curt Miller","Record":"25-11"},{"Season":2023,"Team":"Connecticut Sun","Conference":"East","Wins":27,"Losses":13,"Win %":0.675,"Conference Finish":2,"Playoff Result":"Lost Second Round (New York, 1-3)","Head Coach":"Stephanie White","Record":"27-13"},{"Season":2024,"Team":"Connecticut Sun","Conference":"East","Wins":28,"Losses":12,"Win %":0.7,"Conference Finish":2,"Playoff Result":"Lost Semifinals (Minnesota, 2-3)","Head Coach":"Stephanie White","Record":"28-12"},{"Season":2025,"Team":"Connecticut Sun","Conference":"East","Wins":11,"Losses":33,"Win %":0.25,"Conference Finish":5,"Playoff Result":"Did not qualify","Head Coach":"Rachid Meziane","Record":"11-33"},{"Season":"2026 status note","Team":"Official WNBA source snapshot showed Connecticut at 10-33 with a final regular-season game pending; this row should be updated after the final game if you want a fully closed dataset.","Conference":"East","Wins":10,"Losses":33,"Win %":0.233,"Conference Finish":7,"Playoff Result":"Season status: in progress / final game pending in source snapshot","Head Coach":"Rachid Meziane","Record":"10-33"}],"all_stars":[{"Season":2003,"Player":"Nykesha Sales","All-Star Selection":1},{"Season":2005,"Player":"Taj McWilliams-Franklin","All-Star Selection":1},{"Season":2005,"Player":"Nykesha Sales","All-Star Selection":1},{"Season":2006,"Player":"Nykesha Sales","All-Star Selection":1},{"Season":2006,"Player":"Margo Dydek","All-Star Selection":1},{"Season":2006,"Player":"Lindsay Whalen","All-Star Selection":1},{"Season":2006,"Player":"Katie Douglas","All-Star Selection":1},{"Season":2006,"Player":"Taj McWilliams-Franklin","All-Star Selection":1},{"Season":2007,"Player":"Katie Douglas","All-Star Selection":1},{"Season":2007,"Player":"Asjha Jones","All-Star Selection":1},{"Season":2008,"Player":"Lindsay Whalen","All-Star Selection":1},{"Season":2008,"Player":"Asjha Jones","All-Star Selection":1},{"Season":2009,"Player":"Asjha Jones","All-Star Selection":1},{"Season":2011,"Player":"Tina Charles","All-Star Selection":1},{"Season":2011,"Player":"Renee Montgomery","All-Star Selection":1},{"Season":2013,"Player":"Allison Hightower","All-Star Selection":1},{"Season":2013,"Player":"Tina Charles","All-Star Selection":1},{"Season":2014,"Player":"Katie Douglas","All-Star Selection":1},{"Season":2014,"Player":"Chiney Ogwumike","All-Star Selection":1},{"Season":2015,"Player":"Alex Bentley","All-Star Selection":1},{"Season":2015,"Player":"Kelsey Bone","All-Star Selection":1},{"Season":2017,"Player":"Jasmine Thomas","All-Star Selection":1},{"Season":2017,"Player":"Jonquel Jones","All-Star Selection":1},{"Season":2017,"Player":"Alyssa Thomas","All-Star Selection":1},{"Season":2018,"Player":"Chiney Ogwumike","All-Star Selection":1},{"Season":2019,"Player":"Jonquel Jones","All-Star Selection":1},{"Season":2019,"Player":"Alyssa Thomas","All-Star Selection":1},{"Season":2021,"Player":"DeWanna Bonner","All-Star Selection":1},{"Season":2021,"Player":"Brionna Jones","All-Star Selection":1},{"Season":2021,"Player":"Jonquel Jones","All-Star Selection":1},{"Season":2022,"Player":"Brionna Jones","All-Star Selection":1},{"Season":2022,"Player":"Jonquel Jones","All-Star Selection":1},{"Season":2022,"Player":"Alyssa Thomas","All-Star Selection":1},{"Season":2023,"Player":"DeWanna Bonner","All-Star Selection":1},{"Season":2023,"Player":"Alyssa Thomas","All-Star Selection":1},{"Season":2024,"Player":"DeWanna Bonner","All-Star Selection":1},{"Season":2024,"Player":"Brionna Jones","All-Star Selection":1},{"Season":2024,"Player":"Alyssa Thomas","All-Star Selection":1}],"all_star_summary":[{"Player":"Alyssa Thomas","Selections":5,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Jonquel Jones","Selections":4,"Notes":"Selections while representing Connecticut Sun"},{"Player":"DeWanna Bonner","Selections":3,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Brionna Jones","Selections":3,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Asjha Jones","Selections":3,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Nykesha Sales","Selections":3,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Katie Douglas","Selections":3,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Tina Charles","Selections":2,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Chiney Ogwumike","Selections":2,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Taj McWilliams-Franklin","Selections":2,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Lindsay Whalen","Selections":2,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Alex Bentley","Selections":1,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Allison Hightower","Selections":1,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Jasmine Thomas","Selections":1,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Kelsey Bone","Selections":1,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Margo Dydek","Selections":1,"Notes":"Selections while representing Connecticut Sun"},{"Player":"Renee Montgomery","Selections":1,"Notes":"Selections while representing Connecticut Sun"}],"major_awards":[{"Year":2006,"Recipient":"Mike Thibault","Award":"Coach of the Year","League":"WNBA","Team":"Connecticut Sun"},{"Year":2008,"Recipient":"Mike Thibault","Award":"Coach of the Year","League":"WNBA","Team":"Connecticut Sun"},{"Year":2012,"Recipient":"Tina Charles","Award":"Most Valuable Player","League":"WNBA","Team":"Connecticut Sun"},{"Year":2012,"Recipient":"Renee Montgomery","Award":"Sixth Woman of the Year","League":"WNBA","Team":"Connecticut Sun"},{"Year":2014,"Recipient":"Chiney Ogwumike","Award":"Rookie of the Year","League":"WNBA","Team":"Connecticut Sun"},{"Year":2017,"Recipient":"Curt Miller","Award":"Coach of the Year","League":"WNBA","Team":"Connecticut Sun"},{"Year":2017,"Recipient":"Jonquel Jones","Award":"Most Improved Player","League":"WNBA","Team":"Connecticut Sun"},{"Year":2018,"Recipient":"Jonquel Jones","Award":"Sixth Woman of the Year","League":"WNBA","Team":"Connecticut Sun"},{"Year":2021,"Recipient":"Jonquel Jones","Award":"Most Valuable Player","League":"WNBA","Team":"Connecticut Sun"},{"Year":2022,"Recipient":"Brionna Jones","Award":"Sixth Woman of the Year","League":"WNBA","Team":"Connecticut Sun"},{"Year":2024,"Recipient":"DiJonai Carrington","Award":"Most Improved Player","League":"WNBA","Team":"Connecticut Sun"}],"franchise_records":[{"Scope":"Career","Category":"Points","Player":"Nykesha Sales","Value":3955,"Record / Context":"Franchise record holder","Source":"Official Sun site / 2026 team page"},{"Scope":"Career","Category":"Rebounds","Player":"Alyssa Thomas","Value":2396,"Record / Context":"Franchise record holder","Source":"Official Sun site / 2025 game notes"},{"Scope":"Career","Category":"Assists","Player":"Alyssa Thomas","Value":1463,"Record / Context":"Franchise record holder","Source":"Official Sun site / 2026 team page"},{"Scope":"Career","Category":"Steals","Player":"Alyssa Thomas","Value":494,"Record / Context":"Franchise record holder","Source":"Official Sun site / 2026 team page; record established by 2024"},{"Scope":"Career","Category":"Blocks","Player":"Jonquel Jones","Value":270,"Record / Context":"Franchise record holder","Source":"Official Sun 2025 game notes"},{"Scope":"Single Season","Category":"Points","Player":"Tina Charles","Value":700,"Record / Context":"Franchise single-season scoring record (2025)","Source":"Official Sun 2025 season recap"},{"Scope":"Single Season","Category":"Points","Player":"DeWanna Bonner","Value":697,"Record / Context":"Previous franchise single-season scoring record (2023)","Source":"Official Sun 2024 media guide"},{"Scope":"Single Game","Category":"Points","Player":"DeWanna Bonner","Value":41,"Record / Context":"Franchise single-game scoring record (2023)","Source":"Official Sun 2024 media guide"},{"Scope":"Career","Category":"Double-doubles","Player":"Alyssa Thomas","Value":82,"Record / Context":"Franchise record at end of 2024","Source":"Official Sun 2024 release"},{"Scope":"Career","Category":"Triple-doubles","Player":"Alyssa Thomas","Value":11,"Record / Context":"WNBA record noted by Sun at end of 2024 (regular season)","Source":"Official Sun 2024 release"},{"Scope":"Rookie Single Game","Category":"Assists","Player":"Leila Lacan","Value":14,"Record / Context":"Franchise rookie single-game record (2025)","Source":"Official Sun 2025 game notes"}],"coaches":[{"Coach":"Mike Thibault","From":2003,"To":2012,"Years":10,"Regular Season W":206,"Regular Season L":134,"Reg W%":0.606,"Playoff Appearances":8,"Playoff W":20,"Playoff L":18,"Conference Titles":2,"WNBA Titles":0,"Notes":"WNBA Coach of the Year: 2006, 2008"},{"Coach":"Anne Donovan","From":2013,"To":2015,"Years":3,"Regular Season W":38,"Regular Season L":64,"Reg W%":0.373,"Playoff Appearances":0,"Playoff W":0,"Playoff L":0,"Conference Titles":0,"WNBA Titles":0,"Notes":null},{"Coach":"Curt Miller","From":2016,"To":2022,"Years":7,"Regular Season W":140,"Regular Season L":86,"Reg W%":0.619,"Playoff Appearances":6,"Playoff W":16,"Playoff L":17,"Conference Titles":2,"WNBA Titles":0,"Notes":"WNBA Coach of the Year: 2017"},{"Coach":"Stephanie White","From":2023,"To":2024,"Years":2,"Regular Season W":55,"Regular Season L":25,"Reg W%":0.688,"Playoff Appearances":2,"Playoff W":7,"Playoff L":7,"Conference Titles":0,"WNBA Titles":0,"Notes":null},{"Coach":"Rachid Meziane","From":2025,"To":2026,"Years":2,"Regular Season W":21,"Regular Season L":63,"Reg W%":0.25,"Playoff Appearances":0,"Playoff W":0,"Playoff L":0,"Conference Titles":0,"WNBA Titles":0,"Notes":"2026 season not yet complete in source snapshot"}],"milestones":[{"Year":2003,"Type":"Franchise","Milestone":"Orlando Miracle relocated to Connecticut and became the Connecticut Sun","Details":"Connecticut joined the WNBA as the first independently owned/operated franchise under the Mohegan Tribe."},{"Year":2004,"Type":"Finals","Milestone":"First WNBA Finals appearance","Details":"Seattle defeated Connecticut 2-1 in the Finals."},{"Year":2005,"Type":"Finals","Milestone":"Second straight WNBA Finals appearance","Details":"Sacramento defeated Connecticut 3-1."},{"Year":2006,"Type":"All-Star","Milestone":"Katie Douglas named All-Star Game MVP","Details":"East defeated West 98-82; Douglas was MVP."},{"Year":2006,"Type":"Award","Milestone":"Mike Thibault wins WNBA Coach of the Year","Details":"First of his two Sun Coach of the Year awards."},{"Year":2008,"Type":"Award","Milestone":"Mike Thibault wins WNBA Coach of the Year","Details":"Second Sun Coach of the Year award for Thibault."},{"Year":2012,"Type":"Award","Milestone":"Tina Charles wins WNBA MVP","Details":"Charles led Connecticut to the league's best regular-season record at 25-9."},{"Year":2014,"Type":"Award","Milestone":"Chiney Ogwumike wins WNBA Rookie of the Year","Details":"First Sun player to win the award."},{"Year":2017,"Type":"Award","Milestone":"Curt Miller wins WNBA Coach of the Year; Jonquel Jones wins Most Improved Player","Details":"Two major league awards for the Sun in 2017."},{"Year":2019,"Type":"Finals","Milestone":"Third WNBA Finals appearance","Details":"Washington defeated Connecticut 3-2."},{"Year":2021,"Type":"Award","Milestone":"Jonquel Jones wins WNBA MVP","Details":"Jones also made All-WNBA First Team and All-Defensive First Team."},{"Year":2022,"Type":"Finals","Milestone":"Fourth WNBA Finals appearance","Details":"Las Vegas defeated Connecticut 3-1."},{"Year":2023,"Type":"Record","Milestone":"DeWanna Bonner scores 41 points","Details":"New franchise single-game scoring record; she also set the then-single-season scoring record with 697 points."},{"Year":2024,"Type":"Record","Milestone":"Connecticut wins 28 regular-season games","Details":"Franchise record for most wins in a single regular season."},{"Year":2024,"Type":"Award","Milestone":"DiJonai Carrington wins Most Improved Player","Details":"Alyssa Thomas named All-WNBA First Team."},{"Year":2025,"Type":"Record","Milestone":"Tina Charles sets new franchise single-season scoring record","Details":"700 points in her return season with Connecticut."},{"Year":2026,"Type":"Transition","Milestone":"Connecticut Sun final season in Connecticut under current franchise identity","Details":"Official team history describes 2026 as the 'sunset season' following the announced sale to Houston."}],"record_holders":[{"Stat":"Points","Player":"Nykesha Sales","Total":3955},{"Stat":"Rebounds","Player":"Alyssa Thomas","Total":2396},{"Stat":"Assists","Player":"Alyssa Thomas","Total":1463},{"Stat":"Steals","Player":"Alyssa Thomas","Total":494},{"Stat":"Blocks","Player":"Jonquel Jones","Total":270}],"career_totals":[{"Player":"Svetlana Abrosimova","From":2008,"To":2008,"Sun seasons in BRef":1,"G":6,"MP":107,"FG":11,"FGA":36,"3P":2,"3PA":12,"FT":10,"FTA":12,"ORB":3,"TRB":20,"AST":12,"STL":8,"BLK":0,"TOV":11,"PF":13,"PTS":34,"FG%":0.306,"3P%":0.167,"FT%":0.833},{"Player":"Danielle Adams","From":2017,"To":2017,"Sun seasons in BRef":1,"G":19,"MP":83,"FG":16,"FGA":45,"3P":12,"3PA":31,"FT":5,"FTA":5,"ORB":7,"TRB":11,"AST":4,"STL":4,"BLK":4,"TOV":7,"PF":24,"PTS":49,"FG%":0.356,"3P%":0.387,"FT%":1},{"Player":"Tawona Ahaleem","From":2001,"To":2001,"Sun seasons in BRef":1,"G":26,"MP":252,"FG":19,"FGA":58,"3P":4,"3PA":11,"FT":7,"FTA":14,"ORB":15,"TRB":38,"AST":14,"STL":11,"BLK":0,"TOV":28,"PF":20,"PTS":49,"FG%":0.328,"3P%":0.364,"FT%":0.5},{"Player":"Lindsay Allen","From":2025,"To":2025,"Sun seasons in BRef":1,"G":31,"MP":450,"FG":26,"FGA":65,"3P":3,"3PA":18,"FT":19,"FTA":23,"ORB":9,"TRB":32,"AST":61,"STL":10,"BLK":6,"TOV":31,"PF":37,"PTS":74,"FG%":0.4,"3P%":0.167,"FT%":0.826},{"Player":"Rebecca Allen","From":2023,"To":2023,"Sun seasons in BRef":1,"G":40,"MP":858,"FG":98,"FGA":240,"3P":40,"3PA":115,"FT":19,"FTA":27,"ORB":28,"TRB":113,"AST":37,"STL":37,"BLK":50,"TOV":34,"PF":77,"PTS":255,"FG%":0.408,"3P%":0.348,"FT%":0.704},{"Player":"Jolene Anderson","From":2008,"To":2008,"Sun seasons in BRef":1,"G":24,"MP":367,"FG":35,"FGA":126,"3P":16,"3PA":69,"FT":11,"FTA":15,"ORB":11,"TRB":58,"AST":26,"STL":7,"BLK":1,"TOV":16,"PF":17,"PTS":97,"FG%":0.278,"3P%":0.232,"FT%":0.733},{"Player":"Yvonne Anderson","From":2022,"To":2022,"Sun seasons in BRef":1,"G":11,"MP":101,"FG":12,"FGA":26,"3P":4,"3PA":10,"FT":7,"FTA":7,"ORB":3,"TRB":9,"AST":12,"STL":3,"BLK":2,"TOV":11,"PF":14,"PTS":35,"FG%":0.462,"3P%":0.4,"FT%":1},{"Player":"Rachel Banham","From":2016,"To":2024,"Sun seasons in BRef":5,"G":128,"MP":1494,"FG":179,"FGA":493,"3P":104,"3PA":313,"FT":69,"FTA":84,"ORB":13,"TRB":129,"AST":124,"STL":43,"BLK":11,"TOV":75,"PF":167,"PTS":531,"FG%":0.363,"3P%":0.332,"FT%":0.821},{"Player":"Mistie Bass","From":2012,"To":2013,"Sun seasons in BRef":2,"G":65,"MP":1191,"FG":193,"FGA":358,"3P":0,"3PA":1,"FT":99,"FTA":149,"ORB":107,"TRB":287,"AST":65,"STL":46,"BLK":42,"TOV":88,"PF":119,"PTS":485,"FG%":0.539,"3P%":0,"FT%":0.664},{"Player":"Alex Bentley","From":2014,"To":2018,"Sun seasons in BRef":5,"G":143,"MP":3748,"FG":657,"FGA":1633,"3P":161,"3PA":528,"FT":195,"FTA":244,"ORB":32,"TRB":242,"AST":410,"STL":174,"BLK":17,"TOV":204,"PF":351,"PTS":1670,"FG%":0.402,"3P%":0.305,"FT%":0.799},{"Player":"Caitlin Bickle","From":2024,"To":2024,"Sun seasons in BRef":1,"G":8,"MP":15,"FG":0,"FGA":3,"3P":0,"3PA":3,"FT":0,"FTA":0,"ORB":0,"TRB":0,"AST":0,"STL":0,"BLK":0,"TOV":0,"PF":1,"PTS":0,"FG%":0,"3P%":0,"FT%":null},{"Player":"DiJonai Carrington","From":2021,"To":2024,"Sun seasons in BRef":4,"G":131,"MP":2556,"FG":377,"FGA":937,"3P":71,"3PA":249,"FT":248,"FTA":322,"ORB":133,"TRB":447,"AST":152,"STL":123,"BLK":27,"TOV":191,"PF":275,"PTS":1073,"FG%":0.402,"3P%":0.285,"FT%":0.77},{"Player":"Essence Carson","From":2020,"To":2020,"Sun seasons in BRef":1,"G":11,"MP":123,"FG":13,"FGA":40,"3P":6,"3PA":21,"FT":3,"FTA":4,"ORB":1,"TRB":17,"AST":7,"STL":4,"BLK":1,"TOV":6,"PF":12,"PTS":35,"FG%":0.325,"3P%":0.286,"FT%":0.75},{"Player":"Sydney Carter","From":2013,"To":2013,"Sun seasons in BRef":1,"G":15,"MP":259,"FG":21,"FGA":60,"3P":4,"3PA":19,"FT":16,"FTA":20,"ORB":5,"TRB":22,"AST":27,"STL":7,"BLK":4,"TOV":25,"PF":17,"PTS":62,"FG%":0.35,"3P%":0.211,"FT%":0.8},{"Player":"Iziane Castro Marques","From":2013,"To":2013,"Sun seasons in BRef":1,"G":28,"MP":441,"FG":58,"FGA":165,"3P":15,"3PA":46,"FT":37,"FTA":51,"ORB":13,"TRB":47,"AST":29,"STL":13,"BLK":4,"TOV":37,"PF":35,"PTS":168,"FG%":0.352,"3P%":0.326,"FT%":0.725},{"Player":"Tina Charles","From":2010,"To":2025,"Sun seasons in BRef":5,"G":173,"MP":5459,"FG":1188,"FGA":2605,"3P":13,"3PA":58,"FT":554,"FTA":711,"ORB":538,"TRB":1658,"AST":287,"STL":128,"BLK":211,"TOV":366,"PF":371,"PTS":2943,"FG%":0.456,"3P%":0.224,"FT%":0.779},{"Player":"Kristi Cirone","From":2009,"To":2009,"Sun seasons in BRef":1,"G":4,"MP":23,"FG":2,"FGA":5,"3P":1,"3PA":3,"FT":2,"FTA":3,"ORB":0,"TRB":5,"AST":4,"STL":2,"BLK":0,"TOV":0,"PF":3,"PTS":7,"FG%":0.4,"3P%":0.333,"FT%":0.667},{"Player":"Layshia Clarendon","From":2018,"To":2019,"Sun seasons in BRef":2,"G":24,"MP":376,"FG":49,"FGA":106,"3P":2,"3PA":8,"FT":37,"FTA":44,"ORB":14,"TRB":46,"AST":60,"STL":11,"BLK":0,"TOV":22,"PF":24,"PTS":137,"FG%":0.462,"3P%":0.25,"FT%":0.841},{"Player":"Nia Clouden","From":2022,"To":2022,"Sun seasons in BRef":1,"G":28,"MP":250,"FG":18,"FGA":53,"3P":12,"3PA":29,"FT":10,"FTA":17,"ORB":2,"TRB":23,"AST":21,"STL":6,"BLK":1,"TOV":12,"PF":26,"PTS":58,"FG%":0.34,"3P%":0.414,"FT%":0.588},{"Player":"Courtney Coleman","From":2003,"To":2003,"Sun seasons in BRef":1,"G":20,"MP":141,"FG":11,"FGA":20,"3P":0,"3PA":0,"FT":14,"FTA":30,"ORB":8,"TRB":22,"AST":1,"STL":8,"BLK":2,"TOV":13,"PF":18,"PTS":36,"FG%":0.55,"3P%":null,"FT%":0.467},{"Player":"Lauren Cox","From":2023,"To":2023,"Sun seasons in BRef":1,"G":1,"MP":0,"FG":0,"FGA":0,"3P":0,"3PA":0,"FT":0,"FTA":0,"ORB":0,"TRB":0,"AST":0,"STL":0,"BLK":0,"TOV":0,"PF":0,"PTS":0,"FG%":null,"3P%":null,"FT%":null},{"Player":"Davalyn Cunningham","From":2002,"To":2002,"Sun seasons in BRef":1,"G":6,"MP":21,"FG":0,"FGA":5,"3P":0,"3PA":0,"FT":0,"FTA":0,"ORB":1,"TRB":2,"AST":0,"STL":2,"BLK":0,"TOV":1,"PF":5,"PTS":0,"FG%":0,"3P%":null,"FT%":null},{"Player":"Jennifer Derevjanik","From":2004,"To":2005,"Sun seasons in BRef":2,"G":57,"MP":499,"FG":15,"FGA":48,"3P":4,"3PA":19,"FT":9,"FTA":18,"ORB":11,"TRB":39,"AST":54,"STL":19,"BLK":2,"TOV":36,"PF":67,"PTS":43,"FG%":0.313,"3P%":0.211,"FT%":0.5},{"Player":"Erika de Souza","From":2007,"To":2007,"Sun seasons in BRef":1,"G":32,"MP":391,"FG":63,"FGA":118,"3P":0,"3PA":0,"FT":10,"FTA":21,"ORB":37,"TRB":97,"AST":14,"STL":7,"BLK":29,"TOV":35,"PF":55,"PTS":136,"FG%":0.534,"3P%":null,"FT%":0.476},{"Player":"Kelly Faris","From":2013,"To":2016,"Sun seasons in BRef":4,"G":112,"MP":1312,"FG":79,"FGA":219,"3P":25,"3PA":89,"FT":50,"FTA":61,"ORB":45,"TRB":175,"AST":78,"STL":44,"BLK":14,"TOV":66,"PF":146,"PTS":233,"FG%":0.361,"3P%":0.281,"FT%":0.82},{"Player":"Feyonda Fitzgerald","From":2017,"To":2017,"Sun seasons in BRef":1,"G":2,"MP":8,"FG":0,"FGA":2,"3P":0,"3PA":0,"FT":0,"FTA":0,"ORB":2,"TRB":4,"AST":1,"STL":0,"BLK":0,"TOV":1,"PF":0,"PTS":0,"FG%":0,"3P%":null,"FT%":null},{"Player":"Kerri Gardin","From":2008,"To":2010,"Sun seasons in BRef":3,"G":92,"MP":1342,"FG":115,"FGA":329,"3P":32,"3PA":106,"FT":84,"FTA":142,"ORB":103,"TRB":283,"AST":96,"STL":63,"BLK":34,"TOV":92,"PF":129,"PTS":346,"FG%":0.35,"3P%":0.302,"FT%":0.592},{"Player":"Allison Hightower","From":2010,"To":2014,"Sun seasons in BRef":5,"G":114,"MP":2272,"FG":277,"FGA":731,"3P":55,"3PA":205,"FT":102,"FTA":125,"ORB":54,"TRB":216,"AST":189,"STL":110,"BLK":19,"TOV":108,"PF":214,"PTS":711,"FG%":0.379,"3P%":0.268,"FT%":0.816},{"Player":"Ebony Hoffman","From":2014,"To":2014,"Sun seasons in BRef":1,"G":8,"MP":68,"FG":6,"FGA":18,"3P":0,"3PA":1,"FT":0,"FTA":0,"ORB":6,"TRB":14,"AST":4,"STL":5,"BLK":0,"TOV":6,"PF":12,"PTS":12,"FG%":0.333,"3P%":0,"FT%":null},{"Player":"Bria Holmes","From":2019,"To":2020,"Sun seasons in BRef":2,"G":52,"MP":820,"FG":112,"FGA":291,"3P":30,"3PA":93,"FT":47,"FTA":70,"ORB":23,"TRB":82,"AST":51,"STL":29,"BLK":12,"TOV":48,"PF":53,"PTS":301,"FG%":0.385,"3P%":0.323,"FT%":0.671},{"Player":"Joyner Holmes","From":2022,"To":2022,"Sun seasons in BRef":1,"G":26,"MP":205,"FG":19,"FGA":61,"3P":5,"3PA":22,"FT":10,"FTA":13,"ORB":6,"TRB":35,"AST":12,"STL":8,"BLK":2,"TOV":19,"PF":20,"PTS":53,"FG%":0.311,"3P%":0.227,"FT%":0.769},{"Player":"Amber Holt","From":2008,"To":2009,"Sun seasons in BRef":2,"G":57,"MP":1094,"FG":121,"FGA":322,"3P":38,"3PA":126,"FT":79,"FTA":98,"ORB":50,"TRB":179,"AST":109,"STL":24,"BLK":7,"TOV":45,"PF":106,"PTS":359,"FG%":0.376,"3P%":0.302,"FT%":0.806},{"Player":"Jordan Hooper","From":2017,"To":2017,"Sun seasons in BRef":1,"G":3,"MP":11,"FG":0,"FGA":2,"3P":0,"3PA":1,"FT":0,"FTA":0,"ORB":0,"TRB":1,"AST":0,"STL":0,"BLK":0,"TOV":0,"PF":1,"PTS":0,"FG%":0,"3P%":0,"FT%":null},{"Player":"Ashlon Jackson","From":2026,"To":2026,"Sun seasons in BRef":1,"G":15,"MP":171,"FG":13,"FGA":46,"3P":5,"3PA":32,"FT":0,"FTA":2,"ORB":1,"TRB":14,"AST":9,"STL":8,"BLK":1,"TOV":4,"PF":11,"PTS":31,"FG%":0.283,"3P%":0.156,"FT%":0},{"Player":"Briann January","From":2020,"To":2021,"Sun seasons in BRef":2,"G":42,"MP":1180,"FG":93,"FGA":242,"3P":38,"3PA":102,"FT":43,"FTA":50,"ORB":13,"TRB":58,"AST":133,"STL":33,"BLK":6,"TOV":67,"PF":83,"PTS":267,"FG%":0.384,"3P%":0.373,"FT%":0.86},{"Player":"Moriah Jefferson","From":2024,"To":2024,"Sun seasons in BRef":1,"G":9,"MP":61,"FG":6,"FGA":16,"3P":3,"3PA":9,"FT":4,"FTA":4,"ORB":0,"TRB":2,"AST":6,"STL":6,"BLK":0,"TOV":2,"PF":8,"PTS":19,"FG%":0.375,"3P%":0.333,"FT%":1},{"Player":"Anete Jekabsone-Zogota","From":2009,"To":2010,"Sun seasons in BRef":2,"G":46,"MP":996,"FG":148,"FGA":365,"3P":66,"3PA":176,"FT":37,"FTA":43,"ORB":16,"TRB":118,"AST":92,"STL":18,"BLK":5,"TOV":71,"PF":103,"PTS":399,"FG%":0.405,"3P%":0.375,"FT%":0.86},{"Player":"Adrienne Johnson","From":1999,"To":2003,"Sun seasons in BRef":4,"G":127,"MP":2510,"FG":337,"FGA":831,"3P":88,"3PA":266,"FT":70,"FTA":88,"ORB":79,"TRB":222,"AST":108,"STL":61,"BLK":8,"TOV":117,"PF":156,"PTS":832,"FG%":0.406,"3P%":0.331,"FT%":0.795},{"Player":"Jaclyn Johnson","From":2001,"To":2001,"Sun seasons in BRef":1,"G":17,"MP":139,"FG":14,"FGA":25,"3P":3,"3PA":7,"FT":4,"FTA":5,"ORB":10,"TRB":23,"AST":9,"STL":4,"BLK":3,"TOV":17,"PF":21,"PTS":35,"FG%":0.56,"3P%":0.429,"FT%":0.8},{"Player":"Shannon Johnson","From":1999,"To":2003,"Sun seasons in BRef":5,"G":155,"MP":5275,"FG":658,"FGA":1600,"3P":148,"3PA":454,"FT":585,"FTA":793,"ORB":200,"TRB":645,"AST":737,"STL":241,"BLK":35,"TOV":482,"PF":383,"PTS":2049,"FG%":0.411,"3P%":0.326,"FT%":0.738},{"Player":"Asjha Jones","From":2004,"To":2012,"Sun seasons in BRef":9,"G":271,"MP":7116,"FG":1398,"FGA":3063,"3P":33,"3PA":123,"FT":507,"FTA":657,"ORB":506,"TRB":1447,"AST":506,"STL":171,"BLK":147,"TOV":547,"PF":709,"PTS":3336,"FG%":0.456,"3P%":0.268,"FT%":0.772},{"Player":"Brionna Jones","From":2017,"To":2024,"Sun seasons in BRef":8,"G":219,"MP":4549,"FG":866,"FGA":1557,"3P":5,"3PA":29,"FT":464,"FTA":601,"ORB":459,"TRB":1013,"AST":230,"STL":217,"BLK":89,"TOV":282,"PF":516,"PTS":2201,"FG%":0.556,"3P%":0.172,"FT%":0.772},{"Player":"Jazmine Jones","From":2022,"To":2022,"Sun seasons in BRef":1,"G":7,"MP":44,"FG":2,"FGA":7,"3P":0,"3PA":2,"FT":2,"FTA":5,"ORB":0,"TRB":1,"AST":1,"STL":2,"BLK":0,"TOV":3,"PF":5,"PTS":6,"FG%":0.286,"3P%":0,"FT%":0.4},{"Player":"Ashley Walker","From":2013,"To":2013,"Sun seasons in BRef":1,"G":7,"MP":55,"FG":5,"FGA":17,"3P":2,"3PA":8,"FT":1,"FTA":1,"ORB":9,"TRB":16,"AST":2,"STL":2,"BLK":3,"TOV":6,"PF":4,"PTS":13,"FG%":0.294,"3P%":0.25,"FT%":1},{"Player":"DeMya Walker","From":2010,"To":2011,"Sun seasons in BRef":2,"G":41,"MP":421,"FG":52,"FGA":124,"3P":0,"3PA":3,"FT":46,"FTA":57,"ORB":40,"TRB":80,"AST":25,"STL":16,"BLK":5,"TOV":51,"PF":76,"PTS":150,"FG%":0.419,"3P%":0,"FT%":0.807},{"Player":"Lindsay Whalen","From":2004,"To":2009,"Sun seasons in BRef":6,"G":197,"MP":5802,"FG":744,"FGA":1666,"3P":111,"3PA":414,"FT":691,"FTA":846,"ORB":173,"TRB":832,"AST":964,"STL":276,"BLK":13,"TOV":458,"PF":477,"PTS":2290,"FG%":0.447,"3P%":0.268,"FT%":0.817},{"Player":"Tan White","From":2009,"To":2013,"Sun seasons in BRef":5,"G":151,"MP":3308,"FG":427,"FGA":1125,"3P":163,"3PA":489,"FT":171,"FTA":210,"ORB":72,"TRB":381,"AST":290,"STL":194,"BLK":31,"TOV":220,"PF":338,"PTS":1188,"FG%":0.38,"3P%":0.333,"FT%":0.814},{"Player":"Tamika Whitmore","From":2008,"To":2009,"Sun seasons in BRef":2,"G":58,"MP":1287,"FG":197,"FGA":519,"3P":41,"3PA":131,"FT":99,"FTA":129,"ORB":61,"TRB":213,"AST":72,"STL":29,"BLK":16,"TOV":88,"PF":129,"PTS":534,"FG%":0.38,"3P%":0.313,"FT%":0.767},{"Player":"Courtney Williams","From":2016,"To":2022,"Sun seasons in BRef":5,"G":151,"MP":3960,"FG":775,"FGA":1740,"3P":78,"3PA":216,"FT":151,"FTA":196,"ORB":197,"TRB":735,"AST":429,"STL":132,"BLK":40,"TOV":232,"PF":232,"PTS":1779,"FG%":0.445,"3P%":0.361,"FT%":0.77},{"Player":"Elizabeth Williams","From":2015,"To":2015,"Sun seasons in BRef":1,"G":21,"MP":246,"FG":28,"FGA":53,"3P":0,"3PA":0,"FT":14,"FTA":25,"ORB":22,"TRB":68,"AST":8,"STL":6,"BLK":19,"TOV":11,"PF":20,"PTS":70,"FG%":0.528,"3P%":null,"FT%":0.56},{"Player":"Kiana Williams","From":2022,"To":2022,"Sun seasons in BRef":1,"G":1,"MP":3,"FG":0,"FGA":0,"3P":0,"3PA":0,"FT":0,"FTA":0,"ORB":0,"TRB":0,"AST":0,"STL":0,"BLK":0,"TOV":0,"PF":0,"PTS":0,"FG%":null,"3P%":null,"FT%":null},{"Player":"Le\u2019coe Willingham","From":2004,"To":2007,"Sun seasons in BRef":4,"G":98,"MP":795,"FG":76,"FGA":160,"3P":6,"3PA":15,"FT":55,"FTA":84,"ORB":79,"TRB":192,"AST":38,"STL":23,"BLK":8,"TOV":60,"PF":99,"PTS":213,"FG%":0.475,"3P%":0.4,"FT%":0.655},{"Player":"Tamika Williams","From":2008,"To":2008,"Sun seasons in BRef":1,"G":34,"MP":374,"FG":30,"FGA":72,"3P":0,"3PA":2,"FT":24,"FTA":41,"ORB":48,"TRB":99,"AST":13,"STL":10,"BLK":1,"TOV":26,"PF":40,"PTS":84,"FG%":0.417,"3P%":0,"FT%":0.585},{"Player":"Brooke Wyckoff","From":2001,"To":2005,"Sun seasons in BRef":4,"G":132,"MP":2513,"FG":162,"FGA":450,"3P":62,"3PA":209,"FT":64,"FTA":91,"ORB":149,"TRB":453,"AST":139,"STL":91,"BLK":61,"TOV":147,"PF":353,"PTS":450,"FG%":0.36,"3P%":0.297,"FT%":0.703}],"recent_player_data":[{"Season":2025,"Player":"Tina Charles","G":43,"GS":42,"MP":1222,"FG":260,"FGA":593,"FG%":0.438,"3P":12,"3PA":46,"3P%":0.261,"FT":168,"FTA":196,"FT%":0.857,"ORB":62,"DRB":186,"TRB":248,"AST":74,"STL":33,"BLK":19,"TOV":82,"PF":89,"PTS":700,"Source note":"BRef; official Sun 2025 recap"},{"Season":2025,"Player":"Marina Mabrey","G":35,"GS":34,"MP":1103,"FG":179,"FGA":488,"FG%":0.367,"3P":66,"3PA":244,"3P%":0.27,"FT":80,"FTA":92,"FT%":0.87,"ORB":17,"DRB":129,"TRB":146,"AST":141,"STL":24,"BLK":10,"TOV":98,"PF":100,"PTS":504,"Source note":"BRef; official Sun 2025 recap"},{"Season":2025,"Player":"Saniya Rivers","G":42,"GS":25,"MP":1097,"FG":142,"FGA":349,"FG%":0.407,"3P":43,"3PA":126,"3P%":0.341,"FT":44,"FTA":59,"FT%":0.746,"ORB":29,"DRB":89,"TRB":118,"AST":113,"STL":62,"BLK":38,"TOV":62,"PF":70,"PTS":371,"Source note":"BRef"},{"Season":2025,"Player":"Bria Hartley","G":38,"GS":32,"MP":867,"FG":106,"FGA":293,"FG%":0.362,"3P":54,"3PA":147,"3P%":0.367,"FT":71,"FTA":92,"FT%":0.772,"ORB":11,"DRB":64,"TRB":75,"AST":117,"STL":29,"BLK":0,"TOV":69,"PF":95,"PTS":337,"Source note":"BRef"},{"Season":2025,"Player":"Olivia Nelson-Ododa","G":37,"GS":21,"MP":800,"FG":113,"FGA":215,"FG%":0.526,"3P":1,"3PA":2,"3P%":0.5,"FT":78,"FTA":111,"FT%":0.703,"ORB":60,"DRB":124,"TRB":184,"AST":34,"STL":27,"BLK":43,"TOV":40,"PF":89,"PTS":305,"Source note":"BRef"},{"Season":2026,"Player":"Kennedy Burke","G":37,"GS":14,"MP":881,"FG":112,"FGA":279,"FG%":0.401,"3P":44,"3PA":136,"3P%":0.324,"FT":57,"FTA":80,"FT%":0.713,"ORB":38,"DRB":81,"TRB":119,"AST":53,"STL":46,"BLK":30,"TOV":55,"PF":55,"PTS":325,"Source note":"BRef indexed season data; crawl may predate final game"},{"Season":2026,"Player":"Saniya Rivers","G":36,"GS":16,"MP":817,"FG":100,"FGA":286,"FG%":0.35,"3P":13,"3PA":72,"3P%":0.181,"FT":42,"FTA":71,"FT%":0.592,"ORB":17,"DRB":70,"TRB":87,"AST":114,"STL":40,"BLK":22,"TOV":49,"PF":66,"PTS":255,"Source note":"BRef indexed season data; crawl may predate final game"},{"Season":2026,"Player":"Diamond Miller","G":40,"GS":40,"MP":903,"FG":125,"FGA":348,"FG%":0.359,"3P":46,"3PA":145,"3P%":0.317,"FT":87,"FTA":109,"FT%":0.798,"ORB":15,"DRB":91,"TRB":106,"AST":57,"STL":27,"BLK":8,"TOV":58,"PF":128,"PTS":386,"Source note":"BRef indexed season data; crawl may predate final game"},{"Season":2026,"Player":"Charlisse Leger-Walker","G":40,"GS":28,"MP":944,"FG":102,"FGA":270,"FG%":0.378,"3P":40,"3PA":117,"3P%":0.342,"FT":45,"FTA":58,"FT%":0.776,"ORB":13,"DRB":83,"TRB":96,"AST":146,"STL":32,"BLK":9,"TOV":72,"PF":91,"PTS":289,"Source note":"BRef indexed season data; crawl may predate final game"},{"Season":2026,"Player":"Raegan Beers","G":34,"GS":null,"MP":396,"FG":44,"FGA":93,"FG%":0.473,"3P":2,"3PA":5,"3P%":0.4,"FT":35,"FTA":53,"FT%":0.66,"ORB":42,"DRB":63,"TRB":105,"AST":27,"STL":15,"BLK":7,"TOV":29,"PF":89,"PTS":125,"Source note":"BRef indexed season data; crawl may predate final game"},{"Season":2026,"Player":"Ashlon Jackson","G":15,"GS":null,"MP":171,"FG":13,"FGA":46,"FG%":0.283,"3P":5,"3PA":32,"3P%":0.156,"FT":0,"FTA":2,"FT%":0,"ORB":1,"DRB":14,"TRB":15,"AST":9,"STL":8,"BLK":1,"TOV":4,"PF":11,"PTS":31,"Source note":"BRef indexed season data; crawl may predate final game"},{"Season":2026,"Player":"Nell Angloma","G":36,"GS":null,"MP":418,"FG":52,"FGA":124,"FG%":0.419,"3P":5,"3PA":28,"3P%":0.179,"FT":41,"FTA":62,"FT%":0.661,"ORB":29,"DRB":37,"TRB":66,"AST":28,"STL":20,"BLK":10,"TOV":29,"PF":62,"PTS":150,"Source note":"BRef indexed season data; crawl may predate final game"}],"players":[{"name":"Aaliyah Edwards","position":"F","seasons":"2025-2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Adrienne Johnson","position":"G","seasons":"2003","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":127,"PTS":832,"TRB":222,"AST":108,"STL":61,"BLK":8,"FG%":0.406,"3P%":0.331,"FT%":0.795}},{"name":"Aleah Goodman","position":"G","seasons":"2021","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Alex Bentley","position":"G","seasons":"2014-2018","allStars":1,"allStarSeasons":[2015],"awards":[],"records":[],"career":{"G":143,"PTS":1670,"TRB":242,"AST":410,"STL":174,"BLK":17,"FG%":0.402,"3P%":0.305,"FT%":0.799}},{"name":"Allison Hightower","position":"G","seasons":"2010-2014","allStars":1,"allStarSeasons":[2013],"awards":[],"records":[],"career":{"G":114,"PTS":711,"TRB":216,"AST":189,"STL":110,"BLK":19,"FG%":0.379,"3P%":0.268,"FT%":0.816}},{"name":"Alyssa Thomas","position":"F","seasons":"2014-2025","allStars":5,"allStarSeasons":[2017,2019,2022,2023,2024],"awards":[],"records":[{"scope":"Career","category":"Rebounds","value":2396,"context":"Franchise record holder"},{"scope":"Career","category":"Assists","value":1463,"context":"Franchise record holder"},{"scope":"Career","category":"Steals","value":494,"context":"Franchise record holder"},{"scope":"Career","category":"Double-doubles","value":82,"context":"Franchise record at end of 2024"},{"scope":"Career","category":"Triple-doubles","value":11,"context":"WNBA record noted by Sun at end of 2024 (regular season)"}]},{"name":"Amber Holt","position":"F","seasons":"2008-2009","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":57,"PTS":359,"TRB":179,"AST":109,"STL":24,"BLK":7,"FG%":0.376,"3P%":0.302,"FT%":0.806}},{"name":"Ambrosia Anderson","position":"F","seasons":"2006","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Aneesah Morrow","position":"F","seasons":"2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Aneika Henry-Morello","position":"F-C","seasons":"2016","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Anete Jekabsone-Zogota","position":"G","seasons":"2009-2010","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":46,"PTS":399,"TRB":118,"AST":92,"STL":18,"BLK":5,"FG%":0.405,"3P%":0.375,"FT%":0.86}},{"name":"Ashley Walker","position":"F-C","seasons":"2013","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":7,"PTS":13,"TRB":16,"AST":2,"STL":2,"BLK":3,"FG%":0.294,"3P%":0.25,"FT%":1}},{"name":"Ashlon Jackson","position":"G","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":15,"PTS":31,"TRB":14,"AST":9,"STL":8,"BLK":1,"FG%":0.283,"3P%":0.156,"FT%":0}},{"name":"Asia Taylor","position":"F","seasons":"2016","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Asjha Jones","position":"F","seasons":"2004-2012","allStars":3,"allStarSeasons":[2007,2008,2009],"awards":[],"records":[],"career":{"G":271,"PTS":3336,"TRB":1447,"AST":506,"STL":171,"BLK":147,"FG%":0.456,"3P%":0.268,"FT%":0.772}},{"name":"Barbara Turner","position":"G-F","seasons":"2008-2009","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Beatrice Mompremier","position":"C","seasons":"2020-2021","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Bernadett Hatar","position":"C","seasons":"2023","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Betnijah Laney","position":"G","seasons":"2018","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Bria Hartley","position":"G","seasons":"2022, 2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Bria Holmes","position":"G","seasons":"2019-2020","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":52,"PTS":301,"TRB":82,"AST":51,"STL":29,"BLK":12,"FG%":0.385,"3P%":0.323,"FT%":0.671}},{"name":"Briana Gilbreath-Butler","position":"G","seasons":"2014","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Briann January","position":"G","seasons":"2020-2021","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":42,"PTS":267,"TRB":58,"AST":133,"STL":33,"BLK":6,"FG%":0.384,"3P%":0.373,"FT%":0.86}},{"name":"Bridget Carleton","position":"F","seasons":"2019","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Brionna Jones","position":"C","seasons":"2017-2024","allStars":3,"allStarSeasons":[2021,2022,2024],"awards":[{"year":2022,"award":"Sixth Woman of the Year"}],"records":[],"career":{"G":219,"PTS":2201,"TRB":1013,"AST":230,"STL":217,"BLK":89,"FG%":0.556,"3P%":0.172,"FT%":0.772}},{"name":"Brittney Griner","position":"C","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Brooke Queenan","position":"F","seasons":"2006","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Brooke Wyckoff","position":"F","seasons":"2003, 2005","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":132,"PTS":450,"TRB":453,"AST":139,"STL":91,"BLK":61,"FG%":0.36,"3P%":0.297,"FT%":0.703}},{"name":"Caitlin Bickle","position":"F","seasons":"2024","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":8,"PTS":0,"TRB":0,"AST":0,"STL":0,"BLK":0,"FG%":0,"3P%":0,"FT%":null}},{"name":"Camille Little","position":"F","seasons":"2015-2016","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Candace Futrell","position":"G","seasons":"2004","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Celeste Taylor","position":"G","seasons":"2024","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Chante Black","position":"C","seasons":"2009","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Charlisse Leger-Walker","position":"G","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Chay Shegog","position":"C","seasons":"2012","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Chelsea Gray","position":"G","seasons":"2015","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Chiney Ogwumike","position":"F","seasons":"2014, 2016, 2018","allStars":2,"allStarSeasons":[2014,2018],"awards":[{"year":2014,"award":"Rookie of the Year"}],"records":[]},{"name":"Cori Chambers","position":"G","seasons":"2007","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Courtney Coleman","position":"F","seasons":"2003","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":20,"PTS":36,"TRB":22,"AST":1,"STL":8,"BLK":2,"FG%":0.55,"3P%":null,"FT%":0.467}},{"name":"Courtney Williams","position":"G","seasons":"2016-2019, 2022","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":151,"PTS":1779,"TRB":735,"AST":429,"STL":132,"BLK":40,"FG%":0.445,"3P%":0.361,"FT%":0.77}},{"name":"Danielle Adams","position":"F-C","seasons":"2017","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":19,"PTS":49,"TRB":11,"AST":4,"STL":4,"BLK":4,"FG%":0.356,"3P%":0.387,"FT%":1}},{"name":"Danielle McCray","position":"F","seasons":"2011-2012, 2014","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Danielle Page","position":"F","seasons":"2008","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"DeMya Walker","position":"F","seasons":"2010-2011","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":41,"PTS":150,"TRB":80,"AST":25,"STL":16,"BLK":5,"FG%":0.419,"3P%":0,"FT%":0.807}},{"name":"DeWanna Bonner","position":"F-G","seasons":"2020-2024","allStars":3,"allStarSeasons":[2021,2023,2024],"awards":[],"records":[{"scope":"Single Season","category":"Points","value":697,"context":"Previous franchise single-season scoring record (2023)"},{"scope":"Single Game","category":"Points","value":41,"context":"Franchise single-game scoring record (2023)"}]},{"name":"Debbie Black","position":"G","seasons":"2003-2004","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"DiJonai Carrington","position":"G-F","seasons":"2021-2024","allStars":0,"allStarSeasons":[],"awards":[{"year":2024,"award":"Most Improved Player"}],"records":[],"career":{"G":131,"PTS":1073,"TRB":447,"AST":152,"STL":123,"BLK":27,"FG%":0.402,"3P%":0.285,"FT%":0.77}},{"name":"Diamond Miller","position":"F","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Ebony Hoffman","position":"F","seasons":"2014","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":8,"PTS":12,"TRB":14,"AST":4,"STL":5,"BLK":0,"FG%":0.333,"3P%":0,"FT%":null}},{"name":"Elizabeth Williams","position":"C-F","seasons":"2015","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":21,"PTS":70,"TRB":68,"AST":8,"STL":6,"BLK":19,"FG%":0.528,"3P%":null,"FT%":0.56}},{"name":"Emma Cannon","position":"F","seasons":"2021","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Erika de Souza","position":"F-C","seasons":"2007","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":32,"PTS":136,"TRB":97,"AST":14,"STL":7,"BLK":29,"FG%":0.534,"3P%":null,"FT%":0.476}},{"name":"Erin Phillips","position":"G","seasons":"2006, 2008-2009","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Essence Carson","position":"G","seasons":"2020","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":11,"PTS":35,"TRB":17,"AST":7,"STL":4,"BLK":1,"FG%":0.325,"3P%":0.286,"FT%":0.75}},{"name":"Evanthia Maltsi","position":"G-F","seasons":"2007","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Feyonda Fitzgerald","position":"G","seasons":"2017","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":2,"PTS":0,"TRB":4,"AST":1,"STL":0,"BLK":0,"FG%":0,"3P%":null,"FT%":null}},{"name":"Gianna Kneepkens","position":"G","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Hailey Van Lith","position":"G","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Haley Peters","position":"F-G","seasons":"2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Inga Orekhova","position":"G","seasons":"2015","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Iziane Castro Marques","position":"F-G","seasons":"2013","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":28,"PTS":168,"TRB":47,"AST":29,"STL":13,"BLK":4,"FG%":0.352,"3P%":0.326,"FT%":0.725}},{"name":"Jacki Gemelos","position":"G","seasons":"2020","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Jacy Sheldon","position":"G","seasons":"2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Jaelyn Brown","position":"G-F","seasons":"2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Jamie Carey","position":"G","seasons":"2005-2008","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Jasmine Thomas","position":"G","seasons":"2015-2022","allStars":1,"allStarSeasons":[2017],"awards":[],"records":[]},{"name":"Jazmine Jones","position":"G","seasons":"2022","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":7,"PTS":6,"TRB":1,"AST":1,"STL":2,"BLK":0,"FG%":0.286,"3P%":0,"FT%":0.4}},{"name":"Jennifer Derevjanik","position":"G","seasons":"2004-2005","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":57,"PTS":43,"TRB":39,"AST":54,"STL":19,"BLK":2,"FG%":0.313,"3P%":0.211,"FT%":0.5}},{"name":"Jennifer Lacy","position":"F","seasons":"2015","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Jessica Breland","position":"F","seasons":"2011","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Jessica Brungo","position":"F","seasons":"2004-2006","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Jessica Moore","position":"F-C","seasons":"2011-2012","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Jessie Hicks","position":"C","seasons":"2003","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Jolene Anderson","position":"G","seasons":"2008","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":24,"PTS":97,"TRB":58,"AST":26,"STL":7,"BLK":1,"FG%":0.278,"3P%":0.232,"FT%":0.733}},{"name":"Jonquel Jones","position":"F","seasons":"2016-2022","allStars":4,"allStarSeasons":[2017,2019,2021,2022],"awards":[{"year":2017,"award":"Most Improved Player"},{"year":2018,"award":"Sixth Woman of the Year"},{"year":2021,"award":"Most Valuable Player"}],"records":[{"scope":"Career","category":"Blocks","value":270,"context":"Franchise record holder"}]},{"name":"Jordan Hooper","position":"F","seasons":"2017","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":3,"PTS":0,"TRB":1,"AST":0,"STL":0,"BLK":0,"FG%":0,"3P%":0,"FT%":null}},{"name":"Joyner Holmes","position":"F","seasons":"2022","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":26,"PTS":53,"TRB":35,"AST":12,"STL":8,"BLK":2,"FG%":0.311,"3P%":0.227,"FT%":0.769}},{"name":"Kaila Charles","position":"G","seasons":"2020-2021","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kalana Greene","position":"G","seasons":"2011-2013","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kaleena Mosqueda-Lewis","position":"G","seasons":"2020","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kamesha Hairston","position":"F","seasons":"2007","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kara Lawson","position":"G","seasons":"2010-2013","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kariata Diaby","position":"C","seasons":"2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Katie Douglas","position":"G","seasons":"2003-2007, 2014","allStars":3,"allStarSeasons":[2006,2007,2014],"awards":[],"records":[]},{"name":"Kayla Pedersen","position":"F","seasons":"2013-2015, 2017","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kelley Cain","position":"C","seasons":"2014","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kelly Faris","position":"G","seasons":"2013-2016","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":112,"PTS":233,"TRB":175,"AST":78,"STL":44,"BLK":14,"FG%":0.361,"3P%":0.281,"FT%":0.82}},{"name":"Kelsey Bone","position":"C","seasons":"2014-2016","allStars":1,"allStarSeasons":[2015],"awards":[],"records":[]},{"name":"Kelsey Griffin","position":"F","seasons":"2010-2014","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kennedy Burke","position":"G-F","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kerri Gardin","position":"F","seasons":"2008-2010","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":92,"PTS":346,"TRB":283,"AST":96,"STL":63,"BLK":34,"FG%":0.35,"3P%":0.302,"FT%":0.592}},{"name":"Ketia Swanier","position":"G","seasons":"2008","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kiana Williams","position":"G","seasons":"2022","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":1,"PTS":0,"TRB":0,"AST":0,"STL":0,"BLK":0,"FG%":null,"3P%":null,"FT%":null}},{"name":"Kiesha Brown","position":"G","seasons":"2009","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kristen Rasmussen","position":"F","seasons":"2007","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Kristi Cirone","position":"G","seasons":"2009","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":4,"PTS":7,"TRB":5,"AST":4,"STL":2,"BLK":0,"FG%":0.4,"3P%":0.333,"FT%":0.667}},{"name":"Kristine Anigwe","position":"C","seasons":"2019, 2023","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"LaCharlotte Smith","position":"G","seasons":"2003","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Laura Summerton","position":"C","seasons":"2005-2006","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Lauren Cox","position":"C","seasons":"2023","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":1,"PTS":0,"TRB":0,"AST":0,"STL":0,"BLK":0,"FG%":null,"3P%":null,"FT%":null}},{"name":"Lauren Ervin","position":"F","seasons":"2009","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Layshia Clarendon","position":"G","seasons":"2018-2019","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":24,"PTS":137,"TRB":46,"AST":60,"STL":11,"BLK":0,"FG%":0.462,"3P%":0.25,"FT%":0.841}},{"name":"Leigha Brown","position":"G","seasons":"2023","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Leila Lacan","position":"G","seasons":"2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[{"scope":"Rookie Single Game","category":"Assists","value":14,"context":"Franchise rookie single-game record (2025)"}]},{"name":"Lexie Brown","position":"G","seasons":"2018","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Le\u00efla Lacan","position":"G","seasons":"2025-2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Le\u2019coe Willingham","position":"F","seasons":"2004-2007","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":98,"PTS":213,"TRB":192,"AST":38,"STL":23,"BLK":8,"FG%":0.475,"3P%":0.4,"FT%":0.655}},{"name":"Lindsay Allen","position":"G","seasons":"2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":31,"PTS":74,"TRB":32,"AST":61,"STL":10,"BLK":6,"FG%":0.4,"3P%":0.167,"FT%":0.826}},{"name":"Lindsay Whalen","position":"G","seasons":"2004-2009","allStars":2,"allStarSeasons":[2006,2008],"awards":[],"records":[],"career":{"G":197,"PTS":2290,"TRB":832,"AST":964,"STL":276,"BLK":13,"FG%":0.447,"3P%":0.268,"FT%":0.817}},{"name":"Liz Dixon","position":"F","seasons":"2023","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Lynetta Kizer","position":"F","seasons":"2017","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Mamignan Toure","position":"G","seasons":"2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Margo Dydek","position":"C","seasons":"2005-2007","allStars":1,"allStarSeasons":[2006],"awards":[],"records":[]},{"name":"Marina Mabrey","position":"G","seasons":"2024-2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Megan Mahoney","position":"F","seasons":"2006-2007","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Mistie Bass","position":"F","seasons":"2012-2013","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":65,"PTS":485,"TRB":287,"AST":65,"STL":46,"BLK":42,"FG%":0.539,"3P%":0,"FT%":0.664}},{"name":"Morgan Tuck","position":"F","seasons":"2016-2019","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Moriah Jefferson","position":"G","seasons":"2024","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":9,"PTS":19,"TRB":2,"AST":6,"STL":6,"BLK":0,"FG%":0.375,"3P%":0.333,"FT%":1}},{"name":"Natasha Lacy","position":"G","seasons":"2013","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Natisha Hiedeman","position":"G","seasons":"2019-2023","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Nell Angloma","position":"F","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Nia Clouden","position":"G","seasons":"2022","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":28,"PTS":58,"TRB":23,"AST":21,"STL":6,"BLK":1,"FG%":0.34,"3P%":0.414,"FT%":0.588}},{"name":"Nikki Greene","position":"F-C","seasons":"2015","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Nykesha Sales","position":"G","seasons":"2003-2007","allStars":3,"allStarSeasons":[2003,2005,2006],"awards":[],"records":[{"scope":"Career","category":"Points","value":3955,"context":"Franchise record holder"}]},{"name":"Olivia Nelson-Ododa","position":"C","seasons":"2023-2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Rachel Banham","position":"G","seasons":"2016-2019, 2024","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":128,"PTS":531,"TRB":129,"AST":124,"STL":43,"BLK":11,"FG%":0.363,"3P%":0.332,"FT%":0.821}},{"name":"Raegan Beers","position":"F","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Rayah Marshall","position":"C-F","seasons":"2025-2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Rebecca Allen","position":"G","seasons":"2023","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":40,"PTS":255,"TRB":113,"AST":37,"STL":37,"BLK":50,"FG%":0.408,"3P%":0.348,"FT%":0.704}},{"name":"Rebecca Lobo","position":"C","seasons":"2003","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Renee Montgomery","position":"G","seasons":"2010-2014","allStars":1,"allStarSeasons":[2011],"awards":[{"year":2012,"award":"Sixth Woman of the Year"}],"records":[]},{"name":"Robyn Parks","position":"F","seasons":"2025","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Sandrine Gruda","position":"F-C","seasons":"2008-2010","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Saniya Rivers","position":"G","seasons":"2026","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Shannon Johnson","position":"G","seasons":"2003","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":155,"PTS":2049,"TRB":645,"AST":737,"STL":241,"BLK":35,"FG%":0.411,"3P%":0.326,"FT%":0.738}},{"name":"Shatori Walker-Kimbrough","position":"G","seasons":"2021","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Shekinna Stricklen","position":"F","seasons":"2015-2019","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Sheri Sam","position":"G-F","seasons":"2003","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Stephanie Jones","position":"F","seasons":"2021-2022","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Svetlana Abrosimova","position":"F","seasons":"2008","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":6,"PTS":34,"TRB":20,"AST":12,"STL":8,"BLK":0,"FG%":0.306,"3P%":0.167,"FT%":0.833}},{"name":"Sydney Carter","position":"G","seasons":"2013","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":15,"PTS":62,"TRB":22,"AST":27,"STL":7,"BLK":4,"FG%":0.35,"3P%":0.211,"FT%":0.8}},{"name":"Taj McWilliams-Franklin","position":"F-C","seasons":"2003-2006","allStars":2,"allStarSeasons":[2005,2006],"awards":[],"records":[]},{"name":"Tamika Whitmore","position":"F","seasons":"2008-2009","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":58,"PTS":534,"TRB":213,"AST":72,"STL":29,"BLK":16,"FG%":0.38,"3P%":0.313,"FT%":0.767}},{"name":"Tamika Williams","position":"F","seasons":"2008","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":34,"PTS":84,"TRB":99,"AST":13,"STL":10,"BLK":1,"FG%":0.417,"3P%":0,"FT%":0.585}},{"name":"Tan White","position":"G","seasons":"2009-2013","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":151,"PTS":1188,"TRB":381,"AST":290,"STL":194,"BLK":31,"FG%":0.38,"3P%":0.333,"FT%":0.814}},{"name":"Theresa Plaisance","position":"F","seasons":"2019-2020","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Tiffany Hayes","position":"G","seasons":"2023","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Tiffany Mitchell","position":"G","seasons":"2024","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Tina Charles","position":"C","seasons":"2010-2013, 2025","allStars":2,"allStarSeasons":[2011,2013],"awards":[{"year":2012,"award":"Most Valuable Player"}],"records":[{"scope":"Single Season","category":"Points","value":700,"context":"Franchise single-season scoring record (2025)"}],"career":{"G":173,"PTS":2943,"TRB":1658,"AST":287,"STL":128,"BLK":211,"FG%":0.456,"3P%":0.224,"FT%":0.779}},{"name":"Tora Suber","position":"G","seasons":"2003","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Tyasha Harris","position":"G","seasons":"2023-2024","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Veronica Burton","position":"G","seasons":"2024","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Wendy Palmer","position":"F","seasons":"2003-2004","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Yolanda Moore","position":"F-C","seasons":"2003","allStars":0,"allStarSeasons":[],"awards":[],"records":[]},{"name":"Yvonne Anderson","position":"G","seasons":"2022","allStars":0,"allStarSeasons":[],"awards":[],"records":[],"career":{"G":11,"PTS":35,"TRB":9,"AST":12,"STL":3,"BLK":2,"FG%":0.462,"3P%":0.4,"FT%":1}}]};;

const LEGEND_NAMES = [
  "Alyssa Thomas",
  "Jonquel Jones",
  "DeWanna Bonner",
  "Tina Charles",
  "Asjha Jones",
  "Brionna Jones",
  "Nykesha Sales",
  "Katie Douglas",
  "Chiney Ogwumike",
];

const LEGEND_BLURB = {
  "Alyssa Thomas":
    "The franchise's all-time leader in rebounds, assists and steals. A five-time All-Star across 2017-2024, and the only player in Sun history with 11 career regular-season triple-doubles.",
  "Jonquel Jones":
    "2021 WNBA Most Valuable Player, a four-time All-Star, and the franchise's all-time leader in blocked shots. Also won Most Improved Player (2017) and Sixth Woman of the Year (2018) in Connecticut.",
  "DeWanna Bonner":
    "Set the franchise single-game scoring record with 41 points in 2023, and held the single-season scoring record (697) before Tina Charles broke it in 2025. A three-time Sun All-Star.",
  "Tina Charles":
    "2012 WNBA Most Valuable Player in her first Connecticut stint, then returned in 2025 to set a new franchise single-season scoring record with 700 points.",
  "Asjha Jones":
    "Nine seasons in Connecticut (2004-2012) and a three-time All-Star, Jones is among the franchise's all-time leaders in points, rebounds and assists from the tracked career-totals dataset.",
  "Brionna Jones":
    "Eight seasons at center, a three-time All-Star, and the 2022 Sixth Woman of the Year - one of the most efficient interior scorers in franchise history.",
  "Nykesha Sales":
    "The franchise's all-time leading scorer with 3,955 points, and a three-time All-Star during the Sun's first five seasons (2003-2007).",
  "Katie Douglas":
    "A three-time All-Star and the 2006 All-Star Game MVP, part of the core that carried Connecticut to back-to-back Finals in 2004 and 2005.",
  "Chiney Ogwumike":
    "2014 WNBA Rookie of the Year and a two-time Sun All-Star (2014, 2018), playing three seasons in Connecticut around injury and trade.",
};

const ERA_COPY = {
  "Mike Thibault":
    "Connecticut's first head coach took an expansion-era roster to the postseason in eight of his ten seasons, including back-to-back WNBA Finals runs in 2004 and 2005. Two Coach of the Year awards followed, in 2006 and 2008.",
  "Anne Donovan":
    "A rebuilding stretch. Connecticut missed the playoffs in all three seasons as the roster turned over, finishing with a combined 38-64 record.",
  "Curt Miller":
    "A return to contention. Connecticut reached the playoffs in six of seven seasons under Miller, including a 26-6 regular season in 2021 and a fourth WNBA Finals appearance in 2019. Miller won Coach of the Year in 2017.",
  "Stephanie White":
    "Two of the winningest seasons in franchise history. White's Sun went 55-25 across 2023 and 2024, setting the franchise record for regular-season wins (28) in 2024.",
  "Rachid Meziane":
    "The franchise's final chapter. Connecticut's 2025 and 2026 seasons closed out the Sun era, with 2026 marked in franchise history as the 'sunset season' following the announced sale to Houston.",
};

const NAV_ITEMS = [
  ["story", "Story"],
  ["legends", "Legends"],
  ["numbers", "Numbers"],
  ["seasons", "Seasons"],
  ["allstars", "All-Stars"],
  ["finals", "Finals"],
  ["moments", "Moments"],
  ["players", "Archive"],
];

/* =========================================================================
   HELPERS
   ========================================================================= */
const BADGE_STYLES = [
  "bg-orange-500 text-white",
  "bg-red-700 text-white",
  "bg-amber-400 text-slate-900",
  "bg-slate-600 text-white",
];

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function initials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function badgeClass(name) {
  return BADGE_STYLES[hashStr(name) % BADGE_STYLES.length];
}
function fmt(n) {
  if (n === null || n === undefined) return "";
  return Number(n).toLocaleString("en-US");
}
function findPlayer(name) {
  return DATA.players.find((p) => p.name === name);
}
function ordinal(n) {
  if (n === 1) return "1st";
  if (n === 2) return "2nd";
  if (n === 3) return "3rd";
  return n + "th";
}

function Badge({ name, size = "w-11 h-11 text-xs" }) {
  return (
    <div
      className={`${size} ${badgeClass(
        name
      )} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
      style={{ fontFamily: "Georgia, serif" }}
    >
      {initials(name)}
    </div>
  );
}

function StatPill({ children, dark }) {
  return (
    <span
      className={`font-mono text-[0.7rem] px-2.5 py-1 rounded-full border ${
        dark
          ? "bg-white/5 border-white/15 text-orange-50"
          : "bg-orange-50 border-orange-100 text-slate-800"
      }`}
    >
      {children}
    </span>
  );
}

/* =========================================================================
   SECTIONS
   ========================================================================= */
function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-7 py-3 flex items-center gap-4">
        <a
          href="#top"
          className="flex items-center gap-2 text-orange-50 font-semibold text-base flex-shrink-0"
          style={{ fontFamily: "Georgia, serif" }}
        >
          <span className="w-4 h-4 rounded-full bg-orange-500 inline-block" />
          Connecticut Sun
        </a>
        <nav className="flex gap-1 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-orange-50/70 hover:text-orange-50 hover:bg-white/5 text-sm px-2.5 py-2 rounded-full whitespace-nowrap transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const seasons = DATA.season_records;
  const totalW = seasons.reduce((a, r) => a + (r.Wins || 0), 0);
  const totalL = seasons.reduce((a, r) => a + (r.Losses || 0), 0);
  const finalsCount = seasons.filter((r) =>
    /Lost WNBA Finals/.test(r["Playoff Result"] || "")
  ).length;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-red-950 text-orange-50 pt-28 pb-20 px-5 sm:px-7">
      <div className="absolute right-[-10%] top-[10%] w-96 h-96 rounded-full border border-amber-400/20 pointer-events-none" />
      <div className="absolute right-[2%] top-[18%] w-64 h-64 rounded-full border border-amber-400/30 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="font-mono text-xs text-amber-400 tracking-wide mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
          2003 &ndash; 2026 &middot; Franchise archive
        </p>
        <h1
          className="font-semibold text-4xl sm:text-6xl leading-[1.02] tracking-tight mb-6 max-w-3xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          24 seasons.
          <br />
          One <em className="italic text-orange-500 font-medium">Connecticut Sun.</em>
        </h1>
        <p className="text-lg text-orange-50/80 max-w-lg mb-10 leading-relaxed">
          A record of every player, every season, every All-Star, every
          playoff run and every record that made the Connecticut Sun what it
          became &mdash; from the 2003 relocation from Orlando through the
          2026 sunset season.
        </p>
        <div className="flex flex-wrap gap-8 sm:gap-12 mb-12">
          <div>
            <span
              className="block font-semibold text-3xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {totalW}&ndash;{totalL}
            </span>
            <span className="text-xs text-orange-50/60">
              All-time regular season record
            </span>
          </div>
          <div>
            <span
              className="block font-semibold text-3xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {finalsCount}
            </span>
            <span className="text-xs text-orange-50/60">
              WNBA Finals appearances
            </span>
          </div>
          <div>
            <span
              className="block font-semibold text-3xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {DATA.players.length}
            </span>
            <span className="text-xs text-orange-50/60">
              Players in the archive
            </span>
          </div>
          <div>
            <span
              className="block font-semibold text-3xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              5
            </span>
            <span className="text-xs text-orange-50/60">Head coaches</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#story"
            className="bg-orange-500 text-slate-900 font-semibold text-sm px-5 py-3 rounded-full hover:-translate-y-0.5 transition-transform"
          >
            Read the story
          </a>
          <a
            href="#players"
            className="border border-white/30 text-orange-50 font-semibold text-sm px-5 py-3 rounded-full hover:-translate-y-0.5 transition-transform"
          >
            Search the archive
          </a>
        </div>
      </div>
    </section>
  );
}

function Spark({ seasons }) {
  const w = 170,
    h = 32,
    pad = 3;
  const vals = seasons.map((r) => r["Win %"] || 0);
  const pts = vals
    .map((v, i) => {
      const x = pad + i * ((w - 2 * pad) / Math.max(1, vals.length - 1));
      const y = h - pad - v * (h - 2 * pad);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="flex-shrink-0">
      <line
        x1="0"
        y1={h - pad - 0.5 * (h - 2 * pad)}
        x2={w}
        y2={h - pad - 0.5 * (h - 2 * pad)}
        stroke="#e7ddc9"
        strokeWidth="1"
      />
      <polyline
        points={pts}
        fill="none"
        stroke="#b91c1c"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Story() {
  const eras = DATA.coaches.map((c) => ({
    coach: c.Coach,
    from: c.From,
    to: c.To,
    w: c["Regular Season W"],
    l: c["Regular Season L"],
    notes: c.Notes,
    seasons: DATA.season_records.filter(
      (r) => r.Season >= c.From && r.Season <= c.To
    ),
  }));

  return (
    <section id="story" className="py-16 sm:py-20 px-5 sm:px-7 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-red-700 tracking-wide mb-2">
          The story
        </p>
        <h2
          className="font-semibold text-3xl sm:text-4xl mb-4 text-slate-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Five coaches, one franchise
        </h2>
        <p className="text-slate-600 max-w-xl mb-10">
          Every era of the Connecticut Sun, told through who ran the bench
          and what the roster did with it.
        </p>
        <div>
          {eras.map((e) => (
            <div
              key={e.coach}
              className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-3 sm:gap-7 py-7 border-t border-slate-200 last:border-b"
            >
              <div className="font-mono text-sm text-red-700 pt-1">
                {e.from === e.to ? e.from : `${e.from}\u2013${e.to}`}
              </div>
              <div>
                <h3
                  className="font-semibold text-xl mb-2 text-slate-900"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {e.coach}
                </h3>
                <p className="text-slate-600 max-w-xl mb-3">
                  {ERA_COPY[e.coach] || ""}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <Spark seasons={e.seasons} />
                  <span className="font-mono text-xs bg-stone-100 px-2.5 py-1 rounded">
                    {e.w}&ndash;{e.l} &middot; {e.notes || "Regular season record"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function legendPills(p) {
  const pills = [];
  if (p.career) {
    const c = p.career;
    if (c.PTS != null) pills.push(["PTS", c.PTS]);
    if (c.TRB != null) pills.push(["REB", c.TRB]);
    if (c.AST != null) pills.push(["AST", c.AST]);
    if (c.G != null) pills.push(["GP", c.G]);
  }
  return pills;
}

function Legends({ onSelect }) {
  return (
    <section id="legends" className="py-16 sm:py-20 px-5 sm:px-7 bg-slate-900 text-orange-50">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-amber-400 tracking-wide mb-2">
          The players
        </p>
        <h2
          className="font-semibold text-3xl sm:text-4xl mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Sun legends
        </h2>
        <p className="text-orange-50/70 max-w-xl mb-10">
          Nine careers that defined the Connecticut Sun &mdash; MVPs, Rookies
          of the Year, franchise record holders and the players with the
          most All-Star selections in team history. The full{" "}
          {DATA.players.length}-player archive is searchable further down
          the page.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEGEND_NAMES.map((name, i) => {
            const p = findPlayer(name);
            if (!p) return null;
            const pills = legendPills(p);
            const feature = i < 2;
            return (
              <button
                key={name}
                type="button"
                onClick={() => onSelect(name)}
                className={`text-left bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-orange-500 rounded-2xl p-6 flex flex-col gap-3 transition-colors hover:-translate-y-0.5 ${
                  feature ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Badge
                    name={name}
                    size={feature ? "w-16 h-16 text-lg" : "w-12 h-12 text-sm"}
                  />
                  <div>
                    <p
                      className={`font-semibold ${feature ? "text-2xl" : "text-lg"}`}
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {name}
                    </p>
                    <p className="text-xs text-orange-50/55">
                      {p.position} &middot; {p.seasons}
                    </p>
                  </div>
                </div>
                {p.awards && p.awards.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.awards.slice(0, 2).map((a, idx) => (
                      <span
                        key={idx}
                        className="text-[0.65rem] font-mono uppercase tracking-wide bg-amber-400 text-slate-900 px-2 py-0.5 rounded"
                      >
                        {a.award} &middot; {a.year}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm text-orange-50/80 leading-relaxed">
                  {LEGEND_BLURB[name]}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-1">
                  {pills.map(([label, val]) => (
                    <StatPill dark key={label}>
                      <b className="text-amber-400">{fmt(val)}</b> {label}
                    </StatPill>
                  ))}
                  {(p.records || []).map((r, idx) => (
                    <StatPill dark key={idx}>
                      <b className="text-amber-400">{fmt(r.value)}</b>{" "}
                      {r.category}
                    </StatPill>
                  ))}
                  {p.allStars > 0 && (
                    <StatPill dark>
                      <b className="text-amber-400">{p.allStars}</b>&times;
                      All-Star
                    </StatPill>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  const careerRecords = DATA.franchise_records.filter(
    (r) => r.Scope === "Career"
  );
  const otherRecords = DATA.franchise_records.filter(
    (r) => r.Scope !== "Career"
  );
  const cats = [
    ["PTS", "Points"],
    ["TRB", "Rebounds"],
    ["AST", "Assists"],
  ];

  return (
    <section id="numbers" className="py-16 sm:py-20 px-5 sm:px-7 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-red-700 tracking-wide mb-2">
          The numbers
        </p>
        <h2
          className="font-semibold text-3xl sm:text-4xl mb-4 text-slate-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Franchise records
        </h2>
        <p className="text-slate-600 max-w-xl mb-8">
          The definitive all-time record holders, as tracked by the official
          Sun franchise record book.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          {careerRecords.map((r, i) => (
            <div key={i} className="bg-orange-50 border border-orange-100 rounded-xl p-5">
              <div className="font-mono text-[0.65rem] text-red-700 tracking-wide mb-2">
                {r.Scope} &middot; {r.Category}
              </div>
              <p
                className="font-bold text-3xl mb-1 text-slate-900"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {fmt(r.Value)}
              </p>
              <p className="text-sm text-slate-600">{r.Player}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {otherRecords.map((r, i) => (
            <div key={i} className="bg-orange-50 border border-orange-100 rounded-xl p-5">
              <div className="font-mono text-[0.65rem] text-red-700 tracking-wide mb-2">
                {r.Scope} &middot; {r.Category}
              </div>
              <p
                className="font-bold text-3xl mb-1 text-slate-900"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {fmt(r.Value)}
              </p>
              <p className="text-sm text-slate-600">
                {r.Player} &middot; {r["Record / Context"]}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cats.map(([key, label]) => {
            const sorted = [...DATA.career_totals]
              .sort((a, b) => (b[key] || 0) - (a[key] || 0))
              .slice(0, 8);
            return (
              <div key={key}>
                <h4
                  className="font-semibold text-lg mb-3 pb-2 border-b-2 border-orange-500 text-slate-900"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {label}
                </h4>
                <ol>
                  {sorted.map((r, i) => (
                    <li
                      key={r.Player}
                      className="flex justify-between gap-2 py-1.5 border-b border-slate-100 last:border-none text-sm"
                    >
                      <span className="font-mono text-xs text-slate-400 w-5 flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="flex-1 text-slate-800">{r.Player}</span>
                      <span className="font-mono font-semibold text-red-700">
                        {fmt(r[key])}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-6 max-w-xl">
          Leaderboards above are drawn from the franchise's tracked
          career-totals dataset, which currently covers a verified subset of
          Sun-era players rather than the full {DATA.players.length}-player
          roster &mdash; that's why some all-time record holders above (like
          Nykesha Sales and Alyssa Thomas) lead their categories outright
          without appearing in these particular lists.
        </p>
      </div>
    </section>
  );
}

function Seasons() {
  const [decade, setDecade] = useState("All");
  const decades = ["All", "2003s", "2010s", "2020s"];

  return (
    <section id="seasons" className="py-16 sm:py-20 px-5 sm:px-7 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-red-700 tracking-wide mb-2">
          The teams
        </p>
        <h2
          className="font-semibold text-3xl sm:text-4xl mb-4 text-slate-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Every Connecticut Sun season
        </h2>
        <p className="text-slate-600 max-w-xl mb-6">
          Record, result and roster highlights for all 24 seasons,
          2003&ndash;2026.
        </p>
        <div className="flex flex-wrap gap-2 mb-7">
          {decades.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDecade(d)}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-full border ${
                decade === d
                  ? "bg-slate-900 text-orange-50 border-slate-900"
                  : "bg-white text-slate-600 border-slate-200"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {DATA.season_records
            .filter((r) => {
              const d = r.Season < 2010 ? "2003s" : r.Season < 2020 ? "2010s" : "2020s";
              return decade === "All" || decade === d;
            })
            .map((r) => {
              const seasonAllStars = DATA.all_stars
                .filter((a) => a.Season === r.Season)
                .map((a) => a.Player);
              const seasonAwards = DATA.major_awards.filter(
                (a) => a.Year === r.Season
              );
              const isFinals = /Lost WNBA Finals/.test(r["Playoff Result"] || "");
              return (
                <div
                  key={r.Season}
                  className={`bg-white border rounded-xl p-4 flex flex-col gap-1.5 ${
                    isFinals ? "border-orange-500 ring-1 ring-orange-500" : "border-slate-200"
                  }`}
                >
                  <span
                    className="font-bold text-xl text-slate-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {r.Season}
                  </span>
                  <span className="font-mono text-sm text-red-700">
                    {r.Record} &middot; {ordinal(r["Conference Finish"])} East
                  </span>
                  <span className="text-xs text-slate-500">
                    Head coach: {r["Head Coach"]}
                  </span>
                  <span className="text-sm text-slate-800 leading-snug">
                    {r["Playoff Result"]}
                  </span>
                  {seasonAllStars.length > 0 && (
                    <div className="text-xs text-slate-500 border-t border-slate-100 pt-2 mt-1">
                      All-Star{seasonAllStars.length > 1 ? "s" : ""}:{" "}
                      <b className="text-slate-800 font-semibold">
                        {seasonAllStars.join(", ")}
                      </b>
                    </div>
                  )}
                  {seasonAwards.length > 0 && (
                    <div className="text-xs text-slate-500 border-t border-slate-100 pt-2 mt-1">
                      {seasonAwards.map((a, idx) => (
                        <div key={idx}>
                          <b className="text-slate-800 font-semibold">
                            {a.Recipient}
                          </b>{" "}
                          &middot; {a.Award}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

function AllStarTimeline() {
  const minY = 2003,
    maxY = 2026;
  const years = [];
  for (let y = minY; y <= maxY; y++) years.push(y);

  return (
    <section id="allstars" className="py-16 sm:py-20 px-5 sm:px-7 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-red-700 tracking-wide mb-2">
          The All-Stars
        </p>
        <h2
          className="font-semibold text-3xl sm:text-4xl mb-4 text-slate-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Every All-Star, every season
        </h2>
        <p className="text-slate-600 max-w-xl mb-8">
          2003 through 2026 &mdash; every Connecticut Sun player to be named
          a WNBA All-Star, by year.
        </p>
        <div className="flex overflow-x-auto pb-4 -mx-5 px-5 sm:-mx-7 sm:px-7">
          {years.map((y) => {
            const names = DATA.all_stars
              .filter((a) => a.Season === y)
              .map((a) => a.Player);
            return (
              <div
                key={y}
                className="flex-shrink-0 w-32 border-l first:border-l-0 border-slate-200 px-3.5"
              >
                <div
                  className={`font-mono font-semibold text-sm mb-2.5 pb-2 border-b-2 ${
                    names.length
                      ? "border-orange-500 text-slate-900"
                      : "border-slate-200 text-slate-400"
                  }`}
                >
                  {y}
                </div>
                <div className="flex flex-col gap-1.5">
                  {names.length ? (
                    names.map((n) => (
                      <span key={n} className="text-xs text-slate-600 leading-snug">
                        {n}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-300 italic">&mdash;</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Finals() {
  const finalsRows = DATA.season_records.filter((r) =>
    /Lost WNBA Finals/.test(r["Playoff Result"] || "")
  );
  return (
    <section id="finals" className="py-16 sm:py-20 px-5 sm:px-7 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-red-700 tracking-wide mb-2">
          The Finals runs
        </p>
        <h2
          className="font-semibold text-3xl sm:text-4xl mb-4 text-slate-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Four trips to the WNBA Finals
        </h2>
        <p className="text-slate-600 max-w-xl mb-8">
          Connecticut has reached the WNBA Finals four times without winning
          a title. Every series, documented rather than ranked.
        </p>
        <div>
          {finalsRows.map((r) => {
            const milestone = DATA.milestones.find(
              (m) => m.Year === r.Season && m.Type === "Finals"
            );
            const m = r["Playoff Result"].match(
              /Lost WNBA Finals \(([^,]+), ([\d-]+)\)/
            );
            const opp = m ? m[1] : "";
            const series = m ? m[2] : "";
            return (
              <div
                key={r.Season}
                className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 sm:gap-7 py-8 border-t border-slate-200 last:border-b"
              >
                <div
                  className="font-bold text-4xl text-red-700"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {r.Season}
                </div>
                <div>
                  <h3
                    className="font-semibold text-xl mb-2 text-slate-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Connecticut Sun vs. {opp}
                  </h3>
                  <span className="font-mono text-sm bg-white px-2.5 py-1 rounded inline-block mb-2.5">
                    Sun record: {series}
                  </span>
                  <p className="text-slate-600 max-w-xl">
                    {milestone
                      ? milestone.Details
                      : `Connecticut lost the series to ${opp}.`}{" "}
                    Regular season: {r.Record}, finished{" "}
                    {ordinal(r["Conference Finish"])} in the East under head
                    coach {r["Head Coach"]}.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Moments() {
  const sorted = [...DATA.milestones].sort((a, b) => a.Year - b.Year);
  return (
    <section id="moments" className="py-16 sm:py-20 px-5 sm:px-7 bg-stone-100">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-red-700 tracking-wide mb-2">
          The moments
        </p>
        <h2
          className="font-semibold text-3xl sm:text-4xl mb-4 text-slate-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Sun history, year by year
        </h2>
        <p className="text-slate-600 max-w-xl mb-10">
          A chronological run through the milestones that shaped the
          franchise.
        </p>
        <div className="relative pl-7 border-l-2 border-slate-200">
          {sorted.map((m, i) => (
            <div key={i} className="relative pb-7 pl-5">
              <span className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-stone-100" />
              <div className="font-mono text-xs text-red-700 mb-1">
                {m.Year} &middot; {m.Type}
              </div>
              <h4
                className="font-semibold text-lg mb-1 text-slate-900"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {m.Milestone}
              </h4>
              <p className="text-slate-600 text-sm max-w-lg">{m.Details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Players({ onSelect }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DATA.players;
    return DATA.players.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.position || "").toLowerCase().includes(q) ||
        (p.seasons || "").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section id="players" className="py-16 sm:py-20 px-5 sm:px-7 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-red-700 tracking-wide mb-2">
          The archive
        </p>
        <h2
          className="font-semibold text-3xl sm:text-4xl mb-4 text-slate-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Search every Sun player
        </h2>
        <p className="text-slate-600 max-w-xl mb-7">
          {DATA.players.length} players who wore a Connecticut Sun uniform,
          2003&ndash;2026. Search by name or type a position (G, F, C).
        </p>

        <div className="flex items-center gap-3 bg-white border-2 border-slate-900 rounded-xl pl-4 pr-2 py-1 mb-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-400 flex-shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search players — e.g. "Jones" or "2019"'
            className="flex-1 outline-none border-none py-2.5 text-base bg-transparent"
          />
        </div>
        <p className="text-sm text-slate-500 mb-5">
          {filtered.length}{" "}
          {filtered.length === DATA.players.length
            ? "players in the archive"
            : "matching players"}
        </p>

        {filtered.length === 0 ? (
          <p className="text-slate-500 py-8">No players match that search.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {filtered.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => onSelect(p.name)}
                className="flex items-center gap-2.5 bg-white border border-slate-200 hover:border-orange-500 rounded-lg p-3 text-left hover:-translate-y-0.5 transition-transform"
              >
                <Badge name={p.name} size="w-9 h-9 text-[0.65rem]" />
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {p.name}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {p.position} &middot; {p.seasons}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FinalSection() {
  return (
    <section className="py-24 px-5 sm:px-7 text-center bg-gradient-to-b from-slate-900 via-red-950 to-red-800 text-orange-50">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-sm text-amber-400 tracking-wide mb-5">
          2003 &ndash; 2026
        </p>
        <h2
          className="font-semibold text-3xl sm:text-5xl leading-tight mb-7"
          style={{ fontFamily: "Georgia, serif" }}
        >
          24 seasons.
          <br />
          One <span className="italic text-orange-500 font-medium">Connecticut Sun.</span>
        </h2>
        <p className="max-w-xl mx-auto mb-12 text-orange-50/80 leading-relaxed">
          A record of every player, every season, every All-Star, every
          playoff run and every record that made the franchise what it
          became.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(38px,1fr))] gap-1.5 max-w-3xl mx-auto">
          {DATA.players.map((p) => (
            <div
              key={p.name}
              title={p.name}
              className={`aspect-square rounded-full flex items-center justify-center text-[0.55rem] font-bold opacity-90 ${badgeClass(
                p.name
              )}`}
              style={{ fontFamily: "Georgia, serif" }}
            >
              {initials(p.name)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlayerModal({ name, onClose }) {
  if (!name) return null;
  const p = findPlayer(name);
  if (!p) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-900/60 flex items-start justify-center px-5 overflow-y-auto"
      style={{ paddingTop: "8vh", paddingBottom: "20px" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-orange-50 rounded-2xl max-w-lg w-full p-8 relative shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-500 flex items-center justify-center"
        >
          &times;
        </button>
        <Badge name={p.name} size="w-16 h-16 text-lg" />
        <h3
          className="font-semibold text-2xl mt-4 mb-1 text-slate-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {p.name}
        </h3>
        <p className="text-slate-500 text-sm mb-5">
          {p.position} &middot; Connecticut Sun {p.seasons}
        </p>

        {p.career && (
          <div className="mb-5">
            <h5 className="font-mono text-[0.65rem] uppercase tracking-wide text-red-700 mb-2">
              Career with Connecticut (tracked totals)
            </h5>
            <div className="flex flex-wrap gap-2">
              {[
                ["G", "GP"],
                ["PTS", "PTS"],
                ["TRB", "REB"],
                ["AST", "AST"],
                ["STL", "STL"],
                ["BLK", "BLK"],
              ]
                .filter(([k]) => p.career[k] != null)
                .map(([k, label]) => (
                  <StatPill key={k}>
                    <b className="text-red-700">{fmt(p.career[k])}</b> {label}
                  </StatPill>
                ))}
            </div>
          </div>
        )}

        {p.records && p.records.length > 0 && (
          <div className="mb-5">
            <h5 className="font-mono text-[0.65rem] uppercase tracking-wide text-red-700 mb-2">
              Franchise records held
            </h5>
            <ul>
              {p.records.map((r, i) => (
                <li
                  key={i}
                  className="text-sm py-1.5 border-b border-slate-200 last:border-none text-slate-800"
                >
                  {r.category} &mdash; {fmt(r.value)} ({r.scope})
                </li>
              ))}
            </ul>
          </div>
        )}

        {p.awards && p.awards.length > 0 && (
          <div className="mb-5">
            <h5 className="font-mono text-[0.65rem] uppercase tracking-wide text-red-700 mb-2">
              Awards
            </h5>
            <ul>
              {p.awards.map((a, i) => (
                <li
                  key={i}
                  className="text-sm py-1.5 border-b border-slate-200 last:border-none text-slate-800"
                >
                  {a.year} &mdash; {a.award}
                </li>
              ))}
            </ul>
          </div>
        )}

        {p.allStars > 0 && (
          <div className="mb-1">
            <h5 className="font-mono text-[0.65rem] uppercase tracking-wide text-red-700 mb-2">
              All-Star selections
            </h5>
            <p className="text-sm text-slate-800">
              {p.allStars}&times; &mdash; {p.allStarSeasons.join(", ")}
            </p>
          </div>
        )}

        {!p.career &&
          !(p.records && p.records.length) &&
          !(p.awards && p.awards.length) &&
          !p.allStars && (
            <p className="text-sm text-slate-500">
              Full statistical detail for this player's Sun tenure is not
              yet part of the tracked dataset.
            </p>
          )}
      </div>
    </div>
  );
}

/* =========================================================================
   APP
   ========================================================================= */
export default function ConnecticutSunTribute() {
  const [selected, setSelected] = useState(null);

  return (
    <div id="top" className="bg-orange-50 text-slate-900" style={{ fontFamily: "system-ui, sans-serif" }}>
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none} .no-scrollbar{scrollbar-width:none}`}</style>
      <Nav />
      <Hero />
      <Story />
      <Legends onSelect={setSelected} />
      <Numbers />
      <Seasons />
      <AllStarTimeline />
      <Finals />
      <Moments />
      <Players onSelect={setSelected} />
      <FinalSection />
      <footer className="bg-slate-900 text-orange-50/50 text-center py-7 text-xs">
        Built from the Connecticut Sun tribute stat database, 2003&ndash;2026
        &middot; Sources: official Sun team pages, WNBA.com,
        Basketball-Reference
      </footer>
      <PlayerModal name={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
