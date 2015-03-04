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

            var cellCircle = new Kinetic.Circle({
                x: x,
                y: y,
                radius: cellRadius,
                fill: cellBackColor,
                col: j,
                row: i,
                name: 'cellCircle'
            });
            cellsLayer.add(cellCircle);

            if (lastState[i][j] == 1) {
                var pieceCircle = new Kinetic.Circle({
                    x: x,
                    y: y,                    
                    radius: cellRadius,
                    fill: 'black',
                    stroke: '',
                    draggable: true,
                    col: j,
                    row: i,
                    initCoords: { x: x, y: y },
                    parkingCell: cellCircle,
                    moveToCell: function(targetCell) {
                        this.x = targetCell.attrs.x;
                        this.y = targetCell.attrs.y;
                        this.initCoords.x = targetCell.attrs.x;
                        this.initCoords.y = targetCell.attrs.y;
                        this.parkingCell = targetCell;
                    }
                });
                pieceCircle.on('dragstart', function() {
                    console.log('drag start');
                });
                pieceCircle.on('dragmove', function () {
                    console.log('drag mooving...');
                });
                pieceCircle.on('dragend', function() {
                    var draggedPiece = this;
                    var targetCell = null;
                    var minDistance = Number.MAX_VALUE;
                    var cellShapes = cellsLayer.children.filter(function(arrItem) {
                         return arrItem.attrs.name === 'cellCircle';
                    });
                    cellShapes.forEach(function(cellShape) {
                        var distance = Math.sqrt(Math.pow(draggedPiece.attrs.x - cellShape.attrs.x, 2) + Math.pow(draggedPiece.attrs.y - cellShape.attrs.y, 2));
                        if (distance <= (cellShape.attrs.radius + draggedPiece.attrs.radius)) {
                            if (distance < minDistance) {
                                minDistance = distance;
                                targetCell = cellShape;
                            }
                        }
                    });

                    if (isMoveValid(draggedPiece.attrs.parkingCell, targetCell)) {
                        draggedPiece.attrs.moveToCell(targetCell);                        
                        piecesLayer.draw();
                    } else {
                        draggedPiece.setX(draggedPiece.attrs.initCoords.x);                        
                        draggedPiece.setY(draggedPiece.attrs.initCoords.y);
                        piecesLayer.draw();
                    }
                });

                piecesLayer.add(pieceCircle);
            }
                        
        }
        xOffset += 10;
    }

    var isMoveValid = function (startCell, endCell) {
        if (!startCell || !endCell) return false;
        var distance = Math.sqrt(Math.pow(startCell.attrs.col - endCell.attrs.col, 2) + Math.pow(startCell.attrs.row - endCell.attrs.row, 2));
        return !lastState[endCell.attrs.row][endCell.attrs.col] && distance == 2;
    };

    stage.add(cellsLayer);
    stage.add(piecesLayer);
};