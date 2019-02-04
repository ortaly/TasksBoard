module.exports = function(app) {
    const tasksBoard = require('../controllers/tasksBoardController');

        // tasksBoard Routes
        app.route('/login')
            .post(tasksBoard.login);

        // app.route('/boards')
        //     .get(tasksBoard.list_all_boards)
        //     .post(tasksBoard.create_a_board);

        // app.route('/board/:boardId')
        //     .get(tasksBoard.read_a_board)
        //     .put(tasksBoard.update_a_board) // name, add members    
        //     .delete(tasksBoard.delete_a_board);

        // app.route('/lists/:boardId')
        //     .get(tasksBoard.read_lists_for_board);

        // app.route('/lists')
        //     .post(tasksBoard.create_a_list);

        // app.route('/list/:listId')
        //     .put(tasksBoard.update_list) // name
        //     .delete(tasksBoard.delete_a_list);

        // app.route('/cards/:listId')
        //     .get(tasksBoard.read_cards);

        // app.route('/card')
        //     .post(tasksBoard.create_a_card);

        // app.route('/card/:cardId')
        //     .put(tasksBoard.update_a_card)
        //     .delete(tasksBoard.delete_a_card);

    }
