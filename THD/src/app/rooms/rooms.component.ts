
import { Component, OnInit } from '@angular/core';
// import { DataSource } from "@angular/cdk/collections";
import { HttpService } from '../service/http.service';
import { Room } from '../models/room';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  events: Event[]; // empty list of events that will be filled with AJAX call
  roomId = null;
  roomDescription = "";
  now: string;
  displayedColumns: string[] = ['id', 'description', 'organizer', 'participants'];
  rooms3: Room[];
  selectedRoom: Room;

  constructor(private httpService: HttpService,) {
    let rooms2 = this.rooms; // array defined below
    this.rooms3 = [];
    rooms2.forEach(lineString => {
      let lineA = lineString.split(";");
      let id = lineA[0];
      let desc = lineA[1];
      // lineString looks like '1;C009'
      this.rooms3.push({ id: id, description: desc });

    });
    console.log(this.rooms3);

  }

  ngOnInit(): void {
    this.roomId = "";
  };

  changeRoom(rid: string) {

    //console.log("changeRoom: " + rid);
    let selectedRoom = this.rooms3.find(room => room.id == rid);

    // new Date().toISOString()
    // 2020-11-25T14:34:22.374Z
    // let urlDateArray = new Date().toISOString().substring(0,9);
    let urlDateTime = new Date().toISOString();
    // Wed Nov 25 2020 15:24:26 GMT+0100 (Mitteleuropäische Normalzeit)
    // this.now = new Date().toString().split(' ')[4];
    this.now = urlDateTime.substring(0, 10) + " " + urlDateTime.substring(11, 16);
    //console.log(this.rooms3.find(room => room.id == rid));
    this.roomId = selectedRoom.id;
    this.roomDescription = selectedRoom.description;
    //this.roomDescription = this.rooms3[this.roomId];
    let myUrl = `https://thabella.th-deg.de/thabella/opn/period/findByRoom/${this.roomId}/${this.now}`;

    this.httpService.sendGetRequest(myUrl).subscribe(
      (responseBody) => {
    
        if(responseBody[0]){
        this.events = []; // Init events
        this.events.push(responseBody[0]); // set Events as array
        console.log(responseBody);
        //console.log(typeof responseBody);
        }
        else{
          this.events = []
          console.log('no items')
        }
      });
  }


  rooms = `
1;A008
2;A009 - Besprechungsraum (Buchung ü. Dekanat)
3;A012
4;A110
5;A111
6;A114
7;A115
8;A210
9;A213
10;A214
11;A215 - Besprechungsraum
12;B004 (S)
16;C001
17;C101
18;C102
19;C103
20;C104
21;C106
22;C109 (Labor)
23;C201
24;C211 - EDV
25;C212 - EDV
26;C213 - EDV
27;C214 - EDV
28;C215 - Besprechungsraum
29;C232
31;D021 (S)
32;D110 - EDV (S)
33;D111 - EDV
34;D113 (K)
35;D114 (S)
36;D115 (K)
37;D116 (S)
39;D120 (K)
41;D223
42;D224 - EDV
43;D225
44;E001 (K)
45;E006 (K)
46;E101 (K)
47;E102
48;E103 (S)
49;E104 (S)
50;E201 (K)
51;E203
53;E212 - EDV (K)
54;E214 - EDV (S)
55;Cafeteria
56;Mensa
57;Galerie
65;HS 2 (S)
77;Schwimmbad Elypso
78;DEGG's (S)
79;Turnhalle Schulzentrum
81;K210 - EDV
82;I001
83;I002
84;I009
85;I006 (K)
86;I005
87;I008
88;K106/107 - EDV (S)
90;I105 (K)
91;I104
92;I107 (S)
93;I106 (K)
94;I108 (S)
95;I101 (S)
96;D119 - Sprachenzentrum
99;Eingangsbereich Geb. A
100;Eingangsbereich Geb. B
101;Eingangsbereich Geb. C
102;Eingangsbereich Geb. D
103;Eingangsbereich Geb. E
104;Eingangsbereich Geb. F
105;Eingangsbereich Geb. G
106;Multimediaraum
107;BMW (TC-Freyung)
111;TÜV
112;Holzdeck
113;Freifläche
114;Foyer
115;106 Besprechung
119;Glashaus (Buchung über Frau Netzer)
121;K209 - Netzwerktechniklabor
122;Hörsaal Sparkasse
123;Hörsaal Zollner
124;Hörsaal Rädlinger
125;Hörsaal Ensinger
126;Foyer
127;Besprechungsraum TC Cham
128;Labor 6
129;002 Besprechung Foyer
131;sem(1)
132;sem(2)
133;sem(3)
134;sem(4)
135;D212 - Physiklabor
136;iMiev (TC-Freyung)
137;D011 - Wasserbaulabor
138;K105 - Besprechungsraum (ü. Dekanat AI)
139;B004 - Foyer
142;VW Bus T5 (DEG - Buchung über die Information)
143;Raum der Stille
144;J212 - 3D Studio
145;J002 - Besprechungsraum
146;J008 - EDV
147;J007 - Fernsehstudio (Buchung über O. Bauer)
148;J009
149;J001
150;J101
151;J102 - EDV
152;J103 (buchbar in Absprache mit Prof. Garmann)
153;J211
154;J210
155;J217
156;L108 - EDV
168;D109
171;C006 (Labor)
178;C108 (Labor)
210;Turnhalle Comenius Untere
211;EC 1.04 - 1.06
212;EC 1.07 - 1.10 (S)
213;EC 1.11 - 1.12
214;EC 1.13 - 1.14 (S)
215;EC 1.15 - 1.16
216;EC 1.17 - 1.20 (S)
217;EC 2.10 (Besprechungsraum 1)
218;Nissan Leaf (EC Rottal-Inn)
226;E105
227;E109
237;EC 0.13 - 0.16 (S)
240;E213
680;E110
681;L106 (S) (buchbar über NuW)
684;L103 (Labor)
687;L105 (Labor)
688;Glühweinhütte (Buchung über die Information)
689;Seminarraum 1
690;Seminarraum 2
691;LA 27-0.03
693;LA 27-2.05 (K)
694;LA 27-2.06 (Bewegungsraum)
697;LA 27-2.13 (EDV)
698;LA 27-2.02 (Buchung über Dekanat AGW)
699;LA 27-2.09 (S)
700;E108
703;H003 Senatssaal (Buchung über Frau Netzer)
704;H U101 EDV
709;DEGG's Labor
710;Turnhalle Comenius dreifach
712;C011 (Getriebelabor)
713;EC 2.11 (Besprechungsraum 2)
714;Kulturraum (Buchung über Frau Seitzl)
715;Eingangsbereich Geb. H
716;Eingangsbereich Geb. I
717;Eingangsbereich Geb. J
718;Eingangsbereich Geb. K
719;Eingangsbereich Geb. L
720;C007 (Labor)
722;J004 - Schnittraum
723;2.45 Besprechungsraum 
724;EC.B 0.01
725;EC.B 0.07 (S)
726;EC.B 0.10 (S)
727;EC.B 0.13 (Chemielabor)
728;EC.B 1.01 (EDV)
729;EC.B 1.06 (S)
730;EC.B 1.07 (Tourismus-/e-Health-Labor)
731;EC.B 1.09 (EcoLab)
732;EC.B 1.12 (E-Technik-Labor)
734;Stadthalle Pfarrkirchen
735;Extern
736;Fitnessstudio Tycoon
738;Turnhalle Förderschule
739;Stadion
740;E107
741;Teams AI
742;Stadthalle 1
743;Stadthalle 2
744;L001
745;E008 (Labor)
746;E102a (Labor)
747;Asklepiosklinik
748;Schwimmbad Osterhofen
749;Turnhalle Gym Metten
750;Schwimmbad Hengersberg
751;LA 27-0.01`.split("\n");

}

