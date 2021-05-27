const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')

require('dotenv').config()


beforeEach(async () => {
    const URL_DATA = process.env.DATABASE
    await mongoose.connect(URL_DATA)
   
})


// Vérfier que le participant été connecter ou registrer ou déconnecter
//  ++++++++++++++++++++ Signin +++++++++++++++++
it("Vérfier que le participant est connecter", async () => {
    const login = {
        email : "imran@gmmail.com",
        password : "imran123"
    }
     await request(app).post("/login")
              .send(login);
    
})


// ++++++++++++++++ Signup ++++++++++++++++++++

it("Vérfier que le participant est regitre", async () => {
    const register = {
        first_Name: "ayoub",
        last_Name: "elbouinany",
        email :  "amine@gmail.com",
        password: "12345",
       
  }
  
    await request(app).post('/register')
              .send(register).
              expect(404);
})

// ++++++++++++++++ Signout ++++++++++++++++++++

// it("Vérfier que le participant est déconnecter", async done => {  
//     const response = await supertest(app).get("/api/signup")
//        done()
// })


//  =========================== Question CRUD ===========================
// ======================================================================
// ++++++++++++++++++++ Create Question =======================
// it("Vérfier creation question avec accée admin", async done => {
//     const createQuestion = {
//       quest: " Ayoub's roar can be heard up to eight kilometres away",
//       answer: "true",
//       false_choices: ["false", "true"],
//       points: 10
//   }
//     const response = await supertest(app).get("/api/question/create")
//               .send(createQuestion);
//               expect(response.status).toBe(404);
//        done()
// })

// ++++++++++++++++++++ Select All Question ++++++++++++++++++++++
// it("Vérfier selectionner tous les questions avec l'accée admin", async done => {
  
//     const response = await supertest(app).get("/api/question/");
//        done()
// })

//  =========================== Question Token CRUD ===========================
// ======================================================================
// ++++++++++++++++++++ Create Question Token =======================
// it("Vérfier creation question Token avec l'accée admin", async done => {
//     const createQuestionToken = {
//         question: "60317b23c04605a298efb6f0",
//         participantanswer: "False" ,
//         participant: "6031837cf2859d5b644a523e"
//     }
//     const response = await supertest(app).get("/api/questionToken/create/6031837cf2859d5b644a523e")
//               .send(createQuestionToken);
//               expect(response.status).toBe(404);
//        done()
// })

// ++++++++++++++++++++ Select All Question Token ++++++++++++++++++++++
// it("Vérfier selectionner tous les questions Tokens avec l'accée admin", async done => {
  
//     const response = await supertest(app).get("/api/questionToken/");
//        done()
// })


//  =========================== Groupe Member CRUD ===========================
// ======================================================================
// ++++++++++++++++++++ Create Group Member by id participant (admin groupe) =======================
// it("Vérfier creation groupe member d'un participant", async done => {
//     const createQuestionToken = {
//         participant: ["6031837cf2859d5b644a523e"],
//         code : "6033cc0d355e5530092c3936"
//       }
//     const response = await supertest(app).get("/api/groupMember/6033cc0d355e5530092c3936/6031837cf2859d5b644a523e")
//               .send(createQuestionToken);
//               expect(response.status).toBe(404);
//        done()
// })

// ++++++++++++++++++++ Rejoindre notre participant dans is groupe ++++++++++++++++++++++
// it("Vérfier rejoindre le groupe sur le lien groupe ", async done => {
//     const rejoindre = {
//         participant: ["6031837cf2859d5b644a523e", "6032775b70fcc51d04fcb2c2", "603277a470fcc51d04fcb2c3", "6030da4c422252a23c8606cc"],
//         code : "6033cc0d355e5530092c3936"
//       }
//     const response = await supertest(app).get("/api/groupMember/rejoindre/60364d074a68576e84e5e26c/6033cc0d355e5530092c3936/")
//         .send(rejoindre);
//          expect(response.status).toBe(404);
//        done()
// })


//  =========================== Gift CRUD ===========================
// ======================================================================
// ++++++++++++++++++++ Create gift id Admin =======================

// it("Vérfier creation gift sur l'accée d'admin", async done => {
//     const createGift = {
        
//         photo: {
//         data: {

//             $type: "0"
//         },
//         contentType: "image/png"
//         },
//         name: "pizza",
//     }
     
//     const response = await supertest(app).get("/api/groupMember/6033cc0d355e5530092c3936/6031837cf2859d5b644a523e")
//               .send(createGift);
//             //   expect(response.status).toBe(404);
//        done()
// })

// // ++++++++++++++++++++ Select All Gift  ++++++++++++++++++++++
// it("Vérfier la selectionner sur tous les gifts ", async done => {
//     const response = await supertest(app).get("/api/gift/")
//        done()
// })


// // ==================== Code Groupe Member CRUD =========================
// // ======================================================================

// // ++++++++++++++++++++ Create Code Group Member ++++++++++++++++
// it("Vérfier creation code de chaque groupe member", async done => {
//     const createCode = {
//         code: 123456
//       }
//     const response = await supertest(app).get("/api/code/create/6031837cf2859d5b644a523e")
//               .send(createCode);
//               expect(response.status).toBe(404);
//        done()
// })

// //  ++++++++++++++++++ Select All Code Group Member +++++++++++++++++++++
// it("Vérfier selectionnement de tout les codes des groupes members", async done => {
//     const response = await supertest(app).get("/api/code/6031837cf2859d5b644a523e")
//        done()
// })