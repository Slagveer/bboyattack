"use strict";

function BBoy () {

}

function BBoyBad () {
    this.type = "bad";
}
BBoyBad.prototype = new BBoy();

function BBoyGood () {
    this.type = "good";
}
BBoyGood.prototype = new BBoy();

if (Meteor.isClient) {

    Meteor.subscribe("bboyz");

    this.bboyattack = this.bboyattack || (function(){
        var stage, _bboyz = new Meteor.Collection("bboyz"), circle, circle2, circle3, tw, bboyzArr = [];
        function _init () {
            var bboy = new BBoyBad();var slf = this;

            var width = $(".gamescreen").width(),height = 450;
            $("#gamecanvas").attr({width:width,height:height});
            this.stagecanvasWidth = width;
            this.stagecanvasHeight = height;
            var canvas = document.getElementById("gamecanvas");
            stage = new createjs.Stage(canvas);

            //Create a Shape DisplayObject.
            circle = new createjs.Shape();
            circle.graphics.beginFill("red").drawCircle(0, 0, 40);
            circle.x = circle.y = 50;circle.id = 0;
            circle.onClick = (function(evt){
                var bboy;
                for(var i = 0,l=bboyzArr.length;i<l;i++){

                    if(bboyzArr[i].shape.id === evt.target.id){
                        console.log("Found.");
                        bboy = bboyzArr[i];
                    }

                }
                if(typeof bboy !== "undefined"){
                    slf.bboyz.remove({_id:bboy.id});
                }

            });
            bboyzArr.push({shape:circle,id:"",ready:true});
            stage.addChild(circle);

            circle2 = new createjs.Shape();
            circle2.graphics.beginFill("red").drawCircle(0, 0, 40);
            circle2.x = 0;circle2.y = 150;circle2.id = 1;
            circle2.onClick = (function(evt){
                var bboy;
                for(var i = 0,l=bboyzArr.length;i<l;i++){
                    if(bboyzArr[i].shape.id === evt.target.id){
                        console.log("Found.");
                        bboy = bboyzArr[i];
                    }
                }
                if(typeof bboy !== "undefined"){
                    slf.bboyz.remove({_id:bboy.id});
                }
            });
            bboyzArr.push({shape:circle2,id:"",ready:true});
            stage.addChild(circle2);

            circle3 = new createjs.Shape();
            circle3.graphics.beginFill("red").drawCircle(0, 0, 40);
            circle3.x = 0;circle3.y = 250;circle3.id = 2;
            circle3.onClick = (function(evt){
                var bboy;
                for(var i = 0,l=bboyzArr.length;i<l;i++){
                    if(bboyzArr[i].shape.id === evt.target.id){
                        console.log("Found.");
                        bboy = bboyzArr[i];
                    }
                }
                if(typeof bboy !== "undefined"){
                    slf.bboyz.remove({_id:bboy.id});
                }
            });
            bboyzArr.push({shape:circle3,id:"",ready:true});
            stage.addChild(circle3);

            stage.update();
            var slf = this;
            var count = 0;
            var query = this.bboyz.find({});
            var handle = query.observeChanges({
                added: function (id) {
                    var bboy;
                    var bboyz = bboyzArr;//Session.get("bboyz"), bboy = {};

                    for(var i = 0,l=bboyz.length;i<l;i++){
                        console.log(bboyz[i].ready === true && bboyz[i].shape.id === slf.bboyz.findOne({_id:id}).bboy);
                        if(bboyz[i].ready === true && bboyz[i].shape.id === slf.bboyz.findOne({_id:id}).bboy){
                            bboyz[i].ready = false;
                            bboyz[i].id = id;
                            bboy = bboyz[i];
                            i = l;

                        }
                    }
                    if(typeof bboy === "undefined"){
                        slf.bboyz.remove({_id:id});
                    }else{
                        //Session.set("bboyz",bboyz);
                        //console.info("ADDED: " + id);
                        count++;
                        //console.log("bboy brings the total to " + count + " bboyz.");

                        slf.start(bboy);
                    }
                },
                removed: function (id) {
                    var bboyz = bboyzArr, bboy;
                    //console.info("REMOVED");
                    count--;
                    //console.log(bboyz);
                    for(var i = 0,l=bboyz.length;i<l;i++){
                        if(bboyz[i].id === id){
                            bboyz[i].ready = false;
                            bboyz[i].id = id;
                            bboy = bboyz[i];
                            i = l;

                        }
                    }
                    if(typeof bboy === "undefined"){

                    }else{
                        createjs.Tween.get(bboy.shape,{override:true,loop: false}).to({x: 0},2000, createjs.Ease.easeInOut).call(function(){
                            console.log("REMOVED: " + id);
                            var bboyz = bboyzArr;
                            for(var j=0,l=bboyz.length;j<l;j++){console.log(bboyz[j].id);
                                if(bboyz[j].id === id){
                                    bboyz[j].ready = true;
                                    bboyz[j].id = "";
                                    j = l;

                                }
                            }
                            //Session.set("bboyz",bboyz);
                        });
                        //console.log("Lost one. We're now down to " + count + " bboyz.");
                    }

                }
            });


            //return stage;

            createjs.Ticker.setFPS(24);
            createjs.Ticker.addListener(window);
        }

        function _start (bboy) {
            var slf = this;console.log(bboy.shape);
            createjs.Tween.get(bboy.shape,{override:true,loop: false}).to({x: 660},5000, createjs.Ease.easeInOut).call(function(){
                //console.log("ANIMATION ENDED");
                //circle.x = 0;
                slf.bboyz.remove({_id:bboy.id});
                //var arr = _.without(Session.get("bboyz"),circle.id);
                //Session.set("bboyz",arr);
            });
//            /console.log(tw);
            //tw.onChange = (function(){
            //console.log(circle.x);
            //});

        }

        return {
            init : _init,
            start : _start,
            bboyz : _bboyz,
            stage: function () {
                return stage;
            }
        }
    })();

    var self = this;

    Meteor.startup(function () {
        self.bboyattack.init();
    });

    Template.hello.greeting = function () {
        return "Welcome to BBoyAttack.";
    };

    Template.hello.events({
        'click input' : function () {
            // template data, if any, is available in 'this'
            if (typeof console !== 'undefined')
                console.log("You pressed the button");
        }
    });

    Template.game.events({
        'click' : function () {
            // template data, if any, is available in 'this'
            if (typeof console !== 'undefined')
                console.log("You pressed the button");
        }
    });


}

this.tick = function tick(){
    //console.log(22);
    this.bboyattack.stage().update();
}

if (Meteor.isServer) {

    "use strict";



    var bboyattack = bboyattack || (function(){
        var _bboyz = new Meteor.Collection("bboyz");
        return {
            bboyz : _bboyz
        }
    })();

    Meteor.publish('bboyz', function () {
        bboyattack.bboyz.remove({});
        return bboyattack.bboyz.find();
    });

    Meteor.startup(function () {
        // code to run on server at startup
        Meteor.setInterval(function(){
            bboyattack.bboyz.insert({"bboy":_.random(0,2)});
        }, 1000);

        Meteor.publish("show-bboy", function (roomId) {
            var self = this;
            var count = 0;
            var initializing = true;
            var handle = bboyattack.bboyz.find({}).observeChanges({
                added: function (id) {
                    count++;
                    if (!initializing)
                        self.changed("counts", roomId, {count: count});
                },
                removed: function (id) {
                    count--;
                    self.changed("counts", roomId, {count: count});
                }
                // don't care about moved or changed
            });

            // Observe only returns after the initial added callbacks have
            // run.  Now return an initial value and mark the subscription
            // as ready.
            initializing = false;
            self.added("counts", roomId, {count: count});
            self.ready();

            // Stop observing the cursor when client unsubs.
            // Stopping a subscription automatically takes
            // care of sending the client any removed messages.
            self.onStop(function () {
                handle.stop();
            });
        });
    });
}
