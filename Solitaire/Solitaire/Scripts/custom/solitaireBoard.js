function SolitaireBoardConstructor(stage, gameData) {
    var self = this;
    var cellsLayer = new Kinetic.Layer();
    var piecesLayer = new Kinetic.Layer();
    var boardColor = "#4AADE8";
    cellsLayer.add(new Kinetic.Circle({
        x: 300,
        y: 300,
        radius: 300,
        fill: boardColor,
        stroke: '#4A3DE8',
        name: 'boardCircle'
    }));

    var cellRadius = 35;
    var xOffset = 60;
    var cellBackColor = "#BCE8BF";

    var lastState = gameData.States[gameData.States.length - 1];
    //console.log('lastState: ', lastState);
    for (var i = 0; i < lastState.length - 1 ; i++) {
        var yOffset = 60;
        for (var j = 0; j < lastState.length - 1; j++) {
            //console.log(i,j);
            var x = xOffset + i * (2 * cellRadius);
            var y = yOffset + j * (2 * cellRadius);
            yOffset += 10;
            if (lastState[i][j] < 0) {
                continue;
            }
            cellsLayer.add(new Kinetic.Circle({
                x: x,
                y: y,
                radius: cellRadius,
                fill: cellBackColor,
                col: j,
                row: i,
                name: 'cellCircle'
            }));

            if (lastState[i][j] == 1) {
                var pieceCircle = new Kinetic.Circle({
                    x: x,
                    y: y,
                    radius: cellRadius,
                    fill: 'black',
                    stroke: '',
                    draggable: true,
                    col: j,
                    row: i
                });
                pieceCircle.on('dragstart', function() {
                    console.log('drag start');
                });
                pieceCircle.on('dragmove', function () {
                    console.log('drag mooving...');
                });
                pieceCircle.on('dragend', function() {
                    var draggedPiece = this;
                    var moreCoveredCell = null;
                    var minDistance = Number.MAX_VALUE;
                    for (var index = 0; index < cellsLayer.children.length; index++) {
                        var cellShape = cellsLayer.children[index];
                        if (cellShape.attrs.name !== 'cellCircle') continue;

                        var distance = Math.sqrt(Math.pow(draggedPiece.attrs.x - cellShape.attrs.x, 2) + Math.pow(draggedPiece.attrs.y - cellShape.attrs.y, 2));
                        if (distance <= (cellShape.attrs.radius + draggedPiece.attrs.radius)) {
                            if (distance < minDistance) {
                                minDistance = distance;
                                moreCoveredCell = cellShape;
                            }
                        }
                    }
                    console.log(draggedPiece.setX);
                    if (moreCoveredCell !== null) {
                        draggedPiece.setX(moreCoveredCell.attrs.x);
                        draggedPiece.setY(moreCoveredCell.attrs.y);
                        piecesLayer.draw();
                    }
                });

                piecesLayer.add(pieceCircle);
            }
                        
        }
        xOffset += 10;
    }

   

    stage.add(cellsLayer);
    stage.add(piecesLayer);
};