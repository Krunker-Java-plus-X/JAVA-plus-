// ==UserScript==
// @name         JAVA plus 𝓧
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       JAVA plus 𝓧
// @match        https://shellshock.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    window.hack_dev_credits = "JAVA-Plus 𝓧"

    window.Utils = {

        selfDestructed:false,

        selfdestruct: ()=>{
            if(!Utils.selfDestructed){

                try{
                    document.getElementsByClassName('guify-container_be6yU')[0].remove()
                    Utils.WireFrame = true;
                    Utils.Aimbot= true;
                    Utils.EggSize = 1;
                    Utils.ESP = true;
                    Utils.BndingBox = true;
                    Utils.AimbotKey = null;
                    Utils.ESPKey = null;
                }catch(e){}

            }
        },

        entities: new Map(),
        myPlayer:null,

        settings: {
            blueTeam: "#4254f5",
            redTeam: "#eb3326",
            orangeTeam: "#fca503",
            ESP: false,
            Aimbot: true,
            EggSize: 1,
            WireFrame: false,
            FOV:1.25,
            Lag:0,
            BoundingBox: true,
            AimbotDistance: 4,
            AimbotSmoothness:1,
            AimbotMode: 0,
            hasHooked: false,
            type: 0,
            recoilCompensate: false,
            AimbotKey: "KeyF",
            ESPKey: "KeyT",
            displayText: "Cryo#6969",

            PanicKey: "Equal",

        },

        ping: document.getElementById('ping'),

        setKeyBind: (callback)=>{
            Utils.settings[callback] = "Press any key";
            let click = 0;
            document.addEventListener('keydown', function abc(event) {
                click++;
                if (click >= 1) {
                    Utils.settings[callback] = event.code;
                    document.removeEventListener('keydown', abc);
                }
            });
        },

        getPing: ()=>{
            try{return parseInt(Utils.ping.innerText.toLowerCase().replace('ms', ''))}catch(e){
                Utils.ping=document.getElementById('ping');
                return 40}},

        initUI: ()=>{
            let container = document.body;
            let gui = new guify({
                title: 'JAVA',
                theme: 'dark', // dark, light, yorha, or theme object
                align: 'right', // left, right
                width: 300,
                barMode: 'none', // none, overlay, above, offset
                panelMode: 'none',
                opacity: 0.95,
                root: window.container,
                open: true
            });

            gui.Register({
                type: 'folder',
                label: 'Utilities',
                open: false
            });

            // Add to the folder example
            gui.Register([

                {
                    type: 'title',
                    label: 'Toggles'
                },
                {
                    type: 'checkbox',
                    label: 'ESP',
                    object: Utils.settings,
                    property: 'ESP',
                    onChange: (data) => {
                        Utils.settings.ESP = data;
                    }
                },
                {
                    type: 'checkbox',
                    label: 'Aimbot',
                    object: Utils.settings,
                    property: 'Aimbot',
                    onChange: (data) => {
                        Utils.settings.Aimbot = data;
                    }
                },

                {
                    type: 'checkbox',
                    label: 'Recoil',
                    object: Utils.settings,
                    property: 'recoilCompensate',
                    onChange: (data) => {
                        Utils.settings.recoilCompensate = data;
                    }
                },

                {
                    type: 'checkbox',
                    label: 'WireFrame',
                    object: Utils.settings,
                    property: 'WireFrame',
                    onChange: (data) => {
                        Utils.settings.WireFrame = data;
                    }
                },
                {
                    type: 'title',
                    label: 'Quick Settings'
                },
                {
                    type: 'range',
                    label: 'Aimbot Distance',
                    min: 0, max: 1000,
                    object: Utils.settings, property: "AimbotDistance",
                    onChange: (data) => {
                        Utils.settings.AimbotDistance = data;
                    }
                },

                {
                    type: 'range',
                    label: 'Aim Type',
                    min: 0, max: 1,step:1,
                    object: Utils.settings, property: "type",
                    onChange: (data) => {
                        Utils.settings.type = data;
                    }
                },

                {
                    type: 'range',
                    label: 'Lag',
                    min: 0, max: 5000,
                    object: Utils.settings, property: "Lag",
                    onChange: (data) => {
                        Utils.settings.Lag = data;
                    }
                },
                {
                    type: 'range',
                    label: 'Aimbot Smoothness',
                    min: 0, max: 1000, step: 10,
                    object: Utils.settings, property: "AimbotSmoothness",
                    onChange: (data) => {
                        Utils.settings.AimbotSmoothness = data;
                    }
                },

                {
                    type: 'range',
                    label: 'Aimbot Mode',
                    min: 0, max: 0, step: 10,
                    object: Utils.settings, property: "AimbotMode",
                    onChange: (data) => {
                        Utils.settings.AimbotMode = data;
                    }
                },

                { type: 'button', label: 'Set Aimbot Key',  action: (data) => {
                    Utils.setKeyBind('AimbotKey');
                }},

                { type: 'button', label: 'Set ESP Key',  action: (data) => {
                    Utils.setKeyBind('ESPKey');
                }},


                { type: 'button', label: 'Set Panic Key',  action: (data) => {
                    Utils.setKeyBind('PanicKey');
                }},

                { type: 'text', label: 'AimbotKey', object: Utils.settings, property: "AimbotKey",
                 onChange: (data) => {
                     Utils.settings.AimbotKey = data;
                 } },

                { type: 'text', label: 'ESPKey', object: Utils.settings, property: "ESPKey",
                 onChange: (data) => {
                     Utils.settings.ESPKey = data;
                 } },

                { type: 'text', label: 'PanicKey', object: Utils.settings, property: "PanicKey",
                 onChange: (data) => {
                     Utils.settings.PanicKey = data;
                 } },

                {
                    type: 'title',
                    label: 'Credits / Help'
                },

                {
                    type: 'display',
                    label: 'Developer',
                    object: Utils.settings,
                    property: 'displayText'
                },

                {
                    type: 'button',
                    label: 'My Discord',
                    action: () => {
                        console.log('Clicked');
                    }
                },

            ], {
                folder: 'Utilities'
            });

            gui.Register({
                type: 'folder',
                label: 'Visuals',
                open: false
            });

            // Add to the folder example
            gui.Register([

                {
                    type: 'title',
                    label: 'Toggles'
                },

                {
                    type: 'range',
                    label: 'EggSize',
                    min: .1, max: 10,
                    object: Utils.settings, property: "EggSize",
                    onChange: (data) => {
                        Utils.settings.EggSize = data;
                    }
                },

                {
                    type: 'checkbox',
                    label: 'BoundingBox',
                    object: Utils.settings,
                    property: 'BoundingBox',
                    onChange: (data) => {
                        Utils.settings.BoundingBox = data;
                    }
                },

                {
                    type: 'range',
                    label: 'FOV',
                    min: 1.25, max: 3.14,
                    object: Utils.settings, property: "FOV",
                    onChange: (data) => {
                        Utils.settings.FOV = data;
                    }
                },


            ], {
                folder: 'Visuals'
            });


        },

        controller: class{

            constructor(){

                document.addEventListener('keydown', (e)=>{
                    if(e.code===Utils.settings.AimbotKey) Utils.settings.Aimbot=true;
                    if(e.code===Utils.settings.PanicKey) Utils.selfdestruct();
                })

                document.addEventListener('keyup', (e)=>{
                    if(e.code===Utils.settings.AimbotKey) Utils.settings.Aimbot=false;
                })

            }

        },

        hookWS: ()=>{

            window.WebSocket = new Proxy(window.WebSocket, {
                construct: function(target, args) {
                    const ws = window.ws = new target(...args);

                    // WebSocket "onopen"
                    const openHandler = (event) => {
                        console.log('Open', event);
                    };

                    // WebSocket "onmessage"
                    const messageHandler = (event) => {
                        //got a message
                    };

                    // WebSocket "onclose"
                    const closeHandler = (event) => {
                        console.log('Close', event);
                        // remove event listeners
                        ws.removeEventListener('open', openHandler);
                        ws.removeEventListener('message', messageHandler);
                        ws.removeEventListener('close', closeHandler);
                    };

                    // add event listeners
                    ws.addEventListener('open', openHandler);
                    ws.addEventListener('message', messageHandler);
                    ws.addEventListener('close', closeHandler);

                    ws.send = new Proxy(ws.send, {
                        apply: function(target, that, [args]) {
                            // do shit

                            target.apply(that, [args.buffer]);
                        }
                    });

                    return ws;
                }
            })

        },

        hookArray: ()=>{
            return;
            const push = Array.prototype.push;
            Array.prototype.push = function(data) {


                try{

                    if(arguments[0].player && typeof arguments[0].player.id !== 'undefined'){
                        arguments[0].player.timeStamp = performance.now();
                        let oldUpdate = arguments[0].player.update;
                        arguments[0].player.update = function(){
                            if(this.ws){
                                Utils.myPlayer = this;
                                return oldUpdate.apply(this,arguments);
                            }
                            this.timeStamp = performance.now();
                            return oldUpdate.apply(this,arguments);
                        }
                        Utils.entities.set(arguments[0].player.id, arguments[0].player);
                    }
                }catch(e){}
                return push.apply(this, arguments);
            }
        },


        calcDist2d: (p1,p2) => {
            return Math.sqrt(  (p1.x-p2.x)**2 + (p1.y-p2.y)**2 + (p1.z-p2.z)**2);
        },


        getTargetAngle: (angle)=>{
            if (angle < 0) angle += Math.PI * 2;
            if (angle < 0) angle += Math.PI * 2;
            if (angle < 0) angle += Math.PI * 2;
            if (angle - Math.PI * 2 > 0) angle -= Math.PI * 2;
            if (angle - Math.PI * 2 > 0) angle -= Math.PI * 2;
            if (angle - Math.PI * 2 > 0) angle -= Math.PI * 2;
            return angle;
        },

        getAngle: (us, them)=>{
            let delta = {x: them.x - us.x ,
                         y: them.y-us.y - 0.072,
                         z: them.z - us.z
                        };


            delta = new BABYLON.Vector3(delta.x, delta.y, delta.z).normalize();
            const newYaw = Math.radRange(-Math.atan2(delta.z, delta.x) + Math.PI / 2)
            const newPitch = Math.clamp(-Math.asin(delta.y), -1.5, 1.5);

            return {pitch: newPitch || 0, yaw: newYaw || 0};
        },

        angleDistance: (player1, player2)=>{


            let angle = Utils.getAngle(player1, player2);
            const angleDist = Math.sqrt((player1.yaw - angle.yaw)**2 + (player1.pitch - angle.pitch)**2);
            return angleDist*Utils.calcDist2d(player1, player2);

        },

        getTargetDelta: (them, us, dist)=>{
            return {x: them.x - us.x,
                    y: them.y-us.y - 0.072,
                    z: them.z - us.z,
                   };

        },

        getNearest: (myPlayer, them) => {
            let nearest = {object:null,dist:Number.MAX_SAFE_INTEGER};
            them.forEach((obj, ts) =>{
                if(obj){

                    if(!obj.derp && obj.actor){
                        Object.defineProperty(obj.actor.bodyMesh, 'renderingGroupId',  {
                            get: () => {
                                return 3;
                            }
                        });

                        Object.defineProperty(obj.actor.bodyMesh, 'scaling',  {
                            get: () => {
                                return {x:Utils.settings.EggSize, y:Utils.settings.EggSize, z:Utils.settings.EggSize};
                            }
                        });

                        const setvisible = obj.actor.bodyMesh.setVisible;
                        obj.actor.bodyMesh.setVisible = function(){
                            if(Utils.settings.ESP){
                                return setvisible.apply(this,[true])
                            }
                            return setvisible.apply(this,arguments)
                        }

                        obj.derp =true;

                    }



                    if(obj.actor){
                        obj.actor.bodyMesh.showBoundingBox = Utils.settings.BoundingBox;
                    }

                    if(performance.now()-obj.timeStamp > 2000){
                        Utils.entities.delete(ts);
                    }

                    if(obj && obj.playing && obj.id != myPlayer.id && obj.hp > 0 && (obj.team == 0 || (obj.team != myPlayer.team))){

                        let dist = null;

                        if(Utils.settings.type === 0){
                            dist = Utils.calcDist2d(myPlayer, obj)
                        }
                        else{
                            dist = Utils.angleDistance(myPlayer, obj)
                        }

                        if(dist){
                            if(dist < nearest.dist){
                                nearest.dist=dist;
                                nearest.object=obj;
                            }
                        }
                    }else{};

                }
            })
            return nearest;
        },

        hexToRgb: (hex)=>{
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16)/255,
                g: parseInt(result[2], 16)/255,
                b: parseInt(result[3], 16)/255,
                a: 1,
            } : null;
        },

        applyESP: function(that){
            if(that.player.team==1){
                that.bodyMesh.overlayColor = Utils.hexToRgb(Utils.settings.blueTeam);
            }else if(that.player.team==2){
                that.bodyMesh.overlayColor = Utils.hexToRgb(Utils.settings.redTeam);
            }else{
                that.bodyMesh.overlayColor = Utils.hexToRgb(Utils.settings.orangeTeam);
            }
            that.bodyMesh.setRenderingGroupId(1);
        },

        SeededRandom: class{
            constructor(){};

            setSeed(e) {
                this.seed = e
            }
            getFloat(e, t) {
                return e = e || 0,
                    t = t || 1,
                    this.seed = (9301 * this.seed + 49297) % 233280,
                    e + this.seed / 233280 * (t - e)
            }

            getInt(e, t) {
                return Math.floor(this.seededRandom(e, t))
            }

        },

        request: url => fetch(url).then(res => res.text()),
        injectInline: (data) => {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.innerText = data;
            document.getElementsByTagName('head')[0].appendChild(s);
        },

        adjustedTarget: (delta, us, Dss, Dt)=>{
            delta = new BABYLON.Vector3(delta.x, delta.y, delta.z).normalize();
            return delta;
            const desiredMat = BABYLON.Matrix.Translation(delta.x, delta.y, delta.z);

            let shotSpread_per_MS = Dss / Dt;

            let spread = us.shotSpread + us.weapon.inaccuracy;
            //var spread = 0;
            if(spread < 0.1){return delta};
            if (isNaN(spread)) {
                spread = 0;
            }

            const rgenCopy = new Utils.SeededRandom();
            rgenCopy.setSeed(us.randomGen.seed);

            const spreadInverseMat = BABYLON.Matrix.RotationYawPitchRoll(
                (rgenCopy.getFloat() - 0.5) * spread,
                (rgenCopy.getFloat() - 0.5) * spread,
                (rgenCopy.getFloat() - 0.5) * spread).invert();

            const newAimVector = desiredMat.multiply(spreadInverseMat).getTranslation();
            return newAimVector;
        },

        lookAtHead: (us, target, dist, Dss, Dt)=>{
            const delta = Utils.getTargetDelta(target, us, dist);

            let newAimVector = Utils.adjustedTarget(delta, us, Dss, Dt);

            const newYaw = Math.radRange(-Math.atan2(newAimVector.z, newAimVector.x) + Math.PI / 2)

            const newPitch = Math.clamp(-Math.asin(newAimVector.y), -1.5, 1.5);


            //let dif_pitch = Math.atan2(newAimVector.y, Math.sqrt(newAimVector.x * newAimVector.x + newAimVector.z * newAimVector.z));
            //let dif_yaw =  .getTargetAngle(-Math.PI/2 - Math.atan2(newAimVector.z, newAimVector.x));

            us.pitch = newPitch;
            us.yaw = newYaw;

        },

        hookCRect: ()=>{

            const clearRect =requestAnimationFrame;
            let update = performance.now();
            let lastShotSpread = 0;
            requestAnimationFrame = function(){


                if(performance.now() - update < 1000/30){return clearRect.apply(this,arguments);};
                update = performance.now();
                if(Utils.myPlayer){

                    const deltaShotSpread = Utils.myPlayer.shotSpread - lastShotSpread;
                    const deltaTime = performance.now() - update;

                    update = performance.now();
                    lastShotSpread = Utils.myPlayer.shotSpread;


                    if(!Utils.settings.hasHooked){



                        Object.defineProperty(Utils.myPlayer.scene.cameras[0], 'fov',  {
                            get: () => {
                                return Utils.settings.FOV;
                            }
                        });
                        window.settings.hasPwned=true;

                        Object.defineProperty(Utils.myPlayer.scene, 'forceWireframe',  {
                            get: () => {
                                return Utils.settings.WireFrame;
                            }
                        });

                        Utils.settings.hasHooked=true;
                    }


                    if(Utils.settings.Aimbot){
                        let ret = Utils.getNearest(Utils.myPlayer, Utils.entities);
                        if(ret.object){
                            Utils.lookAtHead(Utils.myPlayer, ret.object, ret.dist, deltaShotSpread, deltaTime);
                        }else{
                        }
                    }
                }
                return clearRect.apply(this,arguments);
            }

        },

        LoadHack: ()=>{

            //Utils.hookWS();
            setTimeout(function(){
                document.title = atob('Q3J5bw==');
            Object.defineProperty(document, atob('dGl0bGU='), {get:()=>{return atob('Q3J5bw==')}})
            },5000)


            Utils.hookArray();
            Utils.hookCRect();
            new Utils.controller();
            document.addEventListener("DOMContentLoaded", function(){
                let script = document.createElement('script');
                script.onload = function () {
                    Utils.initUI();
                };
                script.src = "https://unpkg.com/guify@0.12.0/lib/guify.min.js";

                document.body.appendChild(script);
            });

        },


    }

    Utils.LoadHack();


    WebSocket = class extends WebSocket{
        constructor(a){
            super(...arguments);
        }
        send(){
            let a = arguments;
            let that = this;
            setTimeout(function(){
                // this.super.send(...a)
            }.bind(this),Utils.settings.Lag/2);
            super.send(...a);
        }

        set onmessage(callback){
            const oldHook = callback;
            callback = function(e){
                let that = this;
                let a = arguments;
                setTimeout(function(){
                    return oldHook.apply(that, a);
                }, Utils.settings.Lag/2)

            }
            super.onmessage = callback;
        }
    }

    window.doAimbot = (us,them)=>{
        Utils.myPlayer = us;

        them.forEach(player=>{
            if(player){
                Utils.entities.set(player.id, player)
            }
        })
    }

    window.setVisiblePlayer = (us,them)=>{

    }

    window.setColourSettings = (that)=>{

        Utils.applyESP(that)

    }


    const attemptPatch = (source) => {
        const patches = new Map()


        //we get a copy of theg games code, and search for specific location. We found our player stuff and then call our external function where we can run our aimbot logic!
        .set("RENDERHOOK", [/var (\w+)=([a-zA-Z$]+)\(this\.mesh,\.(\d+)\);/, "rep = `var ${match[1]} = ${match[2]}(this.mesh,.31);window.setVisiblePlayer[this.player.id]=${match[1]};${match[1]}=true;this.bodyMesh.renderOverlay = !0;window.setColourSettings(this);`", true])
        .set("PLAYERHOOK", [/if\([^(\/.,)]+\)([^(\/.,)]+)\.actor\.update\([^(\/.,)]+\);/, false])
        .set("ENEMYHOOK", [/var [^(\/.,=]+\=([^(\/.,\[\]]+)\[[^(\/.,\[\]]\];[^(\/.,=&]+\&\&\([^(\/.,=]+\.chatLineCap/, false])
        .set("AIMBOTHOOK", [/[^(\/.,]+\([^(\/.,]+,[^(\/.,]+\/\d+\),[^(\/.,]+\.runRenderLoop\(\(function\(\)\{/, "rep = `${match[0]}window.doAimbot(${variables.PLAYERHOOK[1]}, ${variables.ENEMYHOOK[1]});`", true])

        let variables = {};

        for (const [name, item] of patches) {
            let match = source.match(item[0]);

            if(!item[1]){
                if(match){
                    variables[name] = match;
                }else{
                    alert(`Failed to variable ${name}`);
                    continue;
                }
            }else{
                let rep;
                try{
                    eval(item[1]);
                }catch(e){
                    alert(`Failed to patch ${name}`);
                    continue;
                }

                const patched = source.replace(item[0], rep);
                if (source === patched) {
                    alert(`Failed to patch ${name}`);
                    continue;
                } else console.log("Successfully patched ", name);
                source = patched;
            }
        }

        return source;
    }



    (async function() {
        let script = await Utils.request(`https://shellshock.io/src/shellshock.min.js`);
        Utils.injectInline(attemptPatch(script)) //modify the games code and then apply it :))
    })();



    //using a mutation observer oooohhh fancy ik! we can detect scripts before they run and patch them.
    let observer = new MutationObserver(mutations => {

        for (const mutation of mutations) {

            for (let node of mutation.addedNodes) {

                if (node.tagName == 'HEAD') {
                } else if (node.tagName == 'SCRIPT' && node.src.includes("shellshock.min.js")) {
                    node.outerHTML = ``
                    //or we can make it point towards our own custom JS file...
                    //node.src = "https://ourFileLocation/code.js"
                }
            }
        }
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    })

    Object.defineProperty(window, 'hack_dev_credits', {get:()=>{return 'JAVA plus 𝓧'}})
    Object.defineProperty(window, "uuid", {get: ()=>{return 0}});
})();
