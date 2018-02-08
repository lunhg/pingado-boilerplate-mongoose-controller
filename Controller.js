let Model = require(path.join(__dirname), '..', '..', 'Model', 'model.js'))

// Use GET
exports.all = function(req, res){
    Model.find({}).then(function(err, models){
	if(err) res.json(err)
	res.json(models)
    })
}

// Use POST
exports.create = function(req, res){
    let o = {}
    foreach(req.query, function(v,k,o){
	o[k] = v
    })
    let model = new Model(o)
    model.save(function(err,m){
	if(err) res.json(err)
	res.status(201)
	res.send(m._id)
    })
}

// Use GET
exports.read = function(req, res){
    Model.findOne({id:req.params.id}).then(function(err, model){
	if(err) res.json(err)
	res.json(model)
    })
}

// Use PUT
exports.update = function(req, res){
    Model.findOne({id:req.params.id}).then(function(err, model){
	if(err) res.json(err)
	let o = {}
	foreach(req.query, function(v,k,o){
	    model[k] = v
	})
	model.save(function(err, m){
	    if(err) res.json(err)
	    res.status(201)
	    res.send(m._id)
	})
    })
}

// Use DELETE
exports.delete = function(req, res){
    Model.findOne({id:req.params.id}).remove().exec().then(function(){
	res.status(201)
	res.send('Deleted')
    })
}
