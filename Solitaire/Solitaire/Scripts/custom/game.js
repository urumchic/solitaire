(function() {
    solitaireApp.controller('gameController', [
        '$http', function($http) {
            var self = this;

            self.initController = function (game) {
                var stage = new Kinetic.Stage({
                    container: 'game-board',
                    width: 600,
                    height: 600
                });

                var gameBoard = new SolitaireBoardConstructor(stage, game);
            }


        }
    ]);
})();