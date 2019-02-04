const http = require('http');
const fs = require('fs');
const tasksDB = require('./api/models/index.js');
require('dotenv').config();


//---------working with mock files:-------------

// login = (user, pass) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile('./mocks/authentication.json', 'utf8', function (err, data) {
//             if (err) throw err;
//             const userObj = JSON.parse(data);
//             if(user == userObj.user && pass == userObj.pass) {
//                 resolve(userObj.id);
//             } else {
//                 reject("user not found!");
//             }
//         });
//     })
// }

// getUser = (userId) => {
//     return new Promise((resolve, reject) => {
//         let user;
//         fs.readFile(`./mocks/user${userId}.json`, 'utf8', function (err, data) {
//             if (err) throw err;
//             user = JSON.parse(data);
//             if(user) {
//                 resolve(user);
//             } else {
//                 reject("no boards for user {userId}");
//             }
//         });
//     });
    
// }

// getBoards = (boardsIds) => {
//     return new Promise((resolve, reject) => {
//         let cards;
//         fs.readFile(`./mocks/boards.json`, 'utf8', function (err, data) {
//             if (err) throw err;
//             boards = JSON.parse(data);
//             if(boards) {
//                 resolve(boards);
//             } else {
//                 reject("no boards found!");
//             }
//         });
//     });
// }

// getCards = (cardsIds) => {
//     return new Promise((resolve, reject) => {
//         let cards;
//         fs.readFile(`./mocks/cards.json`, 'utf8', function (err, data) {
//             if (err) throw err;
//             cards = JSON.parse(data);
//             if(data) {
//                 resolve(cards);
//             } else {
//                 reject("no boards for user {userId}");
//             }
//         });
//     });
// }




// const email = "ortal@tikalk.com";
// const pass = "pass1234";

// login(email, pass)
//     .then((userId) => {
//         console.log(`user Id: ${userId}`);
//         return getUser(userId);
//     })
//     .then(user => user.boards)
//     .then((boardsList) => {
//         console.log(`boardsList: ${JSON.stringify(boardsList)}`);
//         return getBoards(boardsList);
//     }).then(boards => {
//         const lists = boards.reduce((acc, board) => {
//             acc = [
//                 ...acc,
//                 ...board.lists,
//             ];
//             return acc;
//         }, []);
//         console.log(`lists: ${JSON.stringify(lists)}`);
//         const cardsIds = lists.reduce((acc, list) => {
//             acc = [
//                 ...acc,
//                 ...list.cards,
//             ];
//             return acc;
//         }, []);
//         console.log(`card ids: ${JSON.stringify(cardsIds)}`);
//         return getCards(cardsIds);
//     }).then(cards => console.log(`cards: ${JSON.stringify(cards)}`));


//---------------end mocks---------------


const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tasks');
mongoose.connect(process.env.DB_HOST);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // Authenticate user 
    tasksDB.Users.authUser('ortal@tikalk.com', 'pass1234').then(function(user){
        console.log("USER: " +JSON.stringify(user));
        if(user.length){
            Promise.all(user[0].boards.reduce((acc, boardId) => {
                // get user boards
                const board = tasksDB.Boards.getBoard(boardId);
                acc = [...acc, board];
                return acc;
            },[])).then((boards)=> {
                console.log("BOARDS: " +JSON.stringify(boards));
                // get the lists for the first board (user'll choose one)
                if(boards[0]){
                    const selectedBoardId = boards[0];
                    tasksDB.Lists.getListsByBoardId(selectedBoardId).then((lists) =>{
                        console.log("LISTS: " + JSON.stringify(lists));
                        //get the cards for the lists
                        console.log("----------------------------");
                        for (let i=0; i<lists.length; i++){
                            const list = lists[i];
                            const listId = list._id;
                            tasksDB.Cards.getCardsByListId(listId).then(((listTitle, cards) => {
                                console.log("List " + listTitle + " with CARDS: " + JSON.stringify(cards));
                            }).bind(null, list.title))
                        }
                    })
                }
                

            });
        }
    })
});

