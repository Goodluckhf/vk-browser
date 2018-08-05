import StdoutStream from 'bunyan-stdout-stream';
import bunyan       from 'bunyan';

export default bunyan.createLogger({
	name   : 'exampleLogger',
	streams: [{
		level : 'trace',
		type  : 'raw',
		stream: new StdoutStream(),
	}]
});
