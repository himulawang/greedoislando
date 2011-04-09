function getWaterFall() {
    $.post('getwaterfall.php'
        ,{}
        ,function(data) {
            var j = JSON.parse(data);
            var html = '';
            var row;

            html += '<table>';
            html += '<tr>';
            html += '<td>Date</td>';
            html += '<td>bb</td>';
            html += '<td>Dya</td>';
            html += '<td>ila</td>';
            html += '<td>Joseph</td>';
            html += '</tr>';

            for (var i = 0; i < j.length; ++i) {
                row = j[i];
                html += '<tr>';
                html += '<td>' + row.date + '</td>';
                html += '<td class="content" ondblclick="edit(\'bb\',' + row.id + ', this);">' + enter(row.bb) + '</td>';
                html += '<td class="content" ondblclick="edit(\'dya\',' + row.id + ', this);">' + enter(row.dya) + '</td>';
                html += '<td class="content" ondblclick="edit(\'ila\',' + row.id + ', this);">' + enter(row.ila) + '</td>';
                html += '<td class="content" ondblclick="edit(\'joseph\',' + row.id + ', this);">' + enter(row.joseph) + '</td>';
                html += '</tr>';
            }

            html += '</table>';

            $("#waterfall").html(html);
            
        }
    );
}

function enter(text) {
    return text.split("\n").join('<br>');
}

function noEnter(text) {
    return text.split('<br>').join("\n");
}

function add() {
    var html = '';
    html += '<tr>';
    html += '<td><input type="button" value="OK" onclick="addNewWater();"></td>';
    html += '<td><textarea id="textarea-bb"></textarea></td>';
    html += '<td><textarea id="textarea-dya"></textarea></td>';
    html += '<td><textarea id="textarea-ila"></textarea></td>';
    html += '<td><textarea id="textarea-joseph"></textarea></td>';
    html += '</tr>';
    
    $("table").append(html);
}

function addNewWater() {
    var bb = $('#textarea-bb').val();
    var dya = $('#textarea-dya').val();
    var ila = $('#textarea-ila').val();
    var joseph = $('#textarea-joseph').val();
    $.post('addwater.php'
        ,{bb: bb, dya: dya, ila: ila, joseph: joseph}
        ,function(data) {
            getWaterFall();
        }
    );
}

function edit(who, id, el) {
    el = $(el);
    var text = el.html();
    var html = '';

    html += '<textarea>' + noEnter(text) + '</textarea>';
    html += '<input type="button" value="OK" onclick="upgrade(\'' + who + '\',' + id + ', this);">';
    el[0].ondblclick = null;
    el.html(html);
}

function upgrade(who, id, el) {
    el = $(el);
    var text = el.siblings('textarea').val();
    $.post('upgradewater.php'
        ,{who: who, id: id, text: text}
        ,function(data) {
            getWaterFall();
        }
    );
}

$(document).ready(function(){
    getWaterFall();
});
