var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

window.Backbone = Backbone;
window.$ = $;

var Init = React.createClass({
    displayName: 'Init',

    render: function() {
        return (
            <div>Hello World</div>
        );
    }
});

React.render(<Init />, document.getElementById('content'));
