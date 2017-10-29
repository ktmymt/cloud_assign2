var socket = io.connect('http://localhost:3000');
function draw_graph(data) {
    $('#container').html('<canvas id="chart" height="500" width="960"></canvas>');
    console.log(data);
    var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d");
    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;
    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];
    var outerRadius = radius - 10,
        cornerRadius = 12;
    var arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(0)
        .cornerRadius(cornerRadius)
        .context(context);
    var pie = d3.pie();
    var arcs = pie(data);
    context.translate(width / 2, height / 2);
    context.globalAlpha = 0.5;
    arcs.forEach(function(d, i) {
        context.beginPath();
        arc(d);
        context.fillStyle = colors[i];
        context.fill();
    });
    context.globalAlpha = 1;
    context.beginPath();
    arcs.forEach(arc);
    context.lineWidth = 1.5;
    context.strokeStyle = "#fff";
    context.stroke();
    context.beginPath();
    context.strokeStyle = "#000";
    context.stroke();
}
socket.on('msg_from_back', function (msg) {
    $('#container').html('');
    console.log(msg.data);
    draw_graph(JSON.parse(msg.data));
    socket.emit('msg_from_front', { msg: 'from front.' });
});
