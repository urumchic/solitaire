function SolitaireBoardConstructor(stage, gameData) {
    var self = this;
    var layer = new Kinetic.Layer();
    var boardColor = "#4AADE8";
    layer.add(new Kinetic.Circle({
        x: 300,
        y: 300,
        radius: 300,
        fill: boardColor,
        stroke: '#4A3DE8'
    }));

    var cellRadius = 35;
    var xOffset = 60;
    var cellColor = "#BCE8BF";

    var lastState = gameData.States[gameData.States.length - 1];
    //console.log('lastState: ', lastState);
    var selectedCell = null;
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
            var circleColor = lastState[i][j] == 0 ? cellColor : "black";
            var cellCircle = new Kinetic.Circle({
                x: x,
                y: y,
                radius: cellRadius,
                fill: circleColor,
                col: j,
                row: i
            });

            cellCircle.on('click', function () {
                if (lastState[this.attrs.row][this.attrs.col] !== 1 && selectedCell === null) {
                    console.log('empty cell cannot be selected');
                } else if (selectedCell === null) {
                    selectedCell = {
                        col: this.attrs.col,
                        row: this.attrs.row
                    };
                    console.log('cell ', selectedCell.col, selectedCell.row, 'was selected');
                } else if (lastState[this.attrs.row][this.attrs.col] === 1) {
                    console.log('cannot move to ocupied cell');
                    selectedCell = null;x
                } else {
                    console.log('move from: ', selectedCell.col, selectedCell.row, 'to: ', this.attrs.col, this.attrs.row);
                    selectedCell = null;
                }
            });
            layer.add(cellCircle);
            
        }
        xOffset += 10;
    }


    stage.add(layer);
};