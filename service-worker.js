if(!self.define){let e,s={};const i=(i,d)=>(i=new URL(i+".js",d).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(d,a)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let b={};const n=e=>i(e,r),c={module:{uri:r},exports:b,require:n};s[r]=Promise.all(d.map((e=>c[e]||n(e)))).then((e=>(a(...e),b)))}}define(["./workbox-873c5e43"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"../dist/assets/index.d.ts",revision:"4a6cf22bcd1e4aacadf19211f971e293"},{url:"../dist/game-inputs/constants.d.ts",revision:"851de82b37fda96d3cb592bec0207543"},{url:"../dist/game-inputs/game-inputs.d.ts",revision:"f908ec1749dc055899145392e8dc89b2"},{url:"../dist/game-inputs/gamepad.d.ts",revision:"bdd78e33ffdf124122d2a41a570a5310"},{url:"../dist/game-inputs/index.d.ts",revision:"1809243a23a7d7084e2699ad1830480e"},{url:"../dist/game-inputs/keyboard.d.ts",revision:"27f2aa2f46d4b4e9470dce621c5352bd"},{url:"../dist/index.d.ts",revision:"0884b76b9b8bd3d2776e1840cd54d79b"},{url:"../dist/level/base-level-painter.d.ts",revision:"072ad9f26cb0998ace492a41429bde3d"},{url:"../dist/level/level-logic.d.ts",revision:"cb6231f2e213941e056c29982b1bc116"},{url:"../dist/level/level-painter.d.ts",revision:"4aeac421387f48b4911a4de9da79ed4d"},{url:"../dist/level/level.d.ts",revision:"3fb898b9a2d5f26a4d3f434adbf5ba1a"},{url:"../dist/level/levels.d.ts",revision:"933985b86498e7ddd710cb1e3317a4ef"},{url:"../dist/main.d.ts",revision:"e47c59580ff277e3b26c9d9987f151dd"},{url:"../dist/painters/painter.d.ts",revision:"dff3b215a489d156976d297042a4a82b"},{url:"../dist/painters/rain/base-rain-painter.d.ts",revision:"1b9ae54681884f00c1c09f2d6cff3ba5"},{url:"../dist/painters/rain/index.d.ts",revision:"30ee15b5f0c4cc4653879abea5400991"},{url:"../dist/painters/rain/rain-painter.d.ts",revision:"5c0c76bd539a0b6e1d2abdf0df229c9a"},{url:"../dist/validator.d.ts",revision:"69178e125423ede0e4ad6760f88e7a90"},{url:"../dist/webgl/_old_/index.d.ts",revision:"bacb08218eef5aa1f9c2aee2fd0951fd"},{url:"../dist/webgl/_old_/program.d.ts",revision:"ff6e7ab359f665115d1acb477c661b02"},{url:"../dist/webgl/_old_/webgl.d.ts",revision:"30f367d63822d561c62f146153e64aab"},{url:"../dist/webgl/buffer/buffer.d.ts",revision:"4d0e820a548a801e3ded7db09a641ba5"},{url:"../dist/webgl/buffer/index.d.ts",revision:"d136c6b07844ed683a945b4651f529e4"},{url:"../dist/webgl/program/index.d.ts",revision:"217d67c9721ae790f6253be10e9af3a2"},{url:"../dist/webgl/program/parse-includes.d.ts",revision:"e910e3c4380f3a7f6c50f409035134bc"},{url:"../dist/webgl/program/program.d.ts",revision:"8577c329a3d66aa006d8b08807f3b4bc"},{url:"../dist/webgl/program/shader.d.ts",revision:"9c26e98f1b59de533a3390733c2a8ef8"},{url:"../dist/webgl/ref-counter.d.ts",revision:"400642da37c19a03b349c345167694cc"},{url:"../dist/webgl/scene/index.d.ts",revision:"2be21875ffe22c3e7e348626febdc965"},{url:"../dist/webgl/scene/scene.d.ts",revision:"9b3398f460d5cbe783157c6e07beb4be"},{url:"../dist/webgl/texture/index.d.ts",revision:"d58a6a72802df1786bd0ac1decc6b77c"},{url:"../dist/webgl/texture/texture.d.ts",revision:"d77993153e584db9939dc414bd338304"},{url:"../dist/webgl/types.d.ts",revision:"967aa13341861360e84a5e8385d95d2f"},{url:"assets/img/background.jpg",revision:"2b481ee3114400af8fc954cdcab31954"},{url:"assets/img/boulder0000.png",revision:"ced2e3b6eafabdbe60afe9584f634bf5"},{url:"assets/img/boulder0001.png",revision:"2917af6b2d6bd007a35f1b4378a7c927"},{url:"assets/img/boulder0002.png",revision:"11564fdd951e5b5767a93001102b1ba8"},{url:"assets/img/boulder0003.png",revision:"228da29f47c46e2adfe41a6a2aed572e"},{url:"assets/img/boulder0004.png",revision:"8377e4dd6247555202980e168f3e94a0"},{url:"assets/img/boulder0005.png",revision:"8d85254b02b9cec8d7e23f8ac06cf390"},{url:"assets/img/boulder0006.png",revision:"f3864144366ef435422edef2da2e1ff0"},{url:"assets/img/boulder0007.png",revision:"d8a8c6e9812d8517263268211ce8cf24"},{url:"assets/img/boulder0008.png",revision:"fe4e767ee7085c1c8e64aa97fd4b2b96"},{url:"assets/img/boulder0009.png",revision:"e3f74eb226b71d8e40465340a2cc4a7f"},{url:"assets/img/boulder0010.png",revision:"06b406e271179a8f025238a73e4d8e2e"},{url:"assets/img/boulder0011.png",revision:"9be4a3853ccd19fc064d1598b2753c5d"},{url:"assets/img/boulder0012.png",revision:"040bdade3ba17a7a29f627b8e45cbc95"},{url:"assets/img/boulder0013.png",revision:"749a019efe493c0f9362663ac4acab0d"},{url:"assets/img/boulder0014.png",revision:"66979b73594c9906ad1015d08ea841a4"},{url:"assets/img/boulder0015.png",revision:"4b378ce3824cd06516efcb04bdf0db96"},{url:"assets/img/diam.blend",revision:"ce1f0377965e89862a59daf31569d111"},{url:"assets/img/exit.png",revision:"2e47f96897cc72cd85a37bcc71f406c5"},{url:"assets/img/explo-01.png",revision:"20cabbcdc0d48c0637c73d657947439a"},{url:"assets/img/explo-02.png",revision:"03213dfa929d58ce2a42072a2920067a"},{url:"assets/img/explo-03.png",revision:"8f8c1a8e2fc88bd3f51181bc6e04b5b7"},{url:"assets/img/explo-04.png",revision:"2e90a76822597a8167266acc8916fcc5"},{url:"assets/img/explo-05.png",revision:"4e98eada6533e129c525dd1191a5319a"},{url:"assets/img/explo-06.png",revision:"259e7fc668b6f016b2a338a6fb6c898c"},{url:"assets/img/explo-07.png",revision:"f02f11b4c39e618b5f668e33f2832b3b"},{url:"assets/img/explo-08.png",revision:"14072e65386835912a6173f41ccfe811"},{url:"assets/img/ground.png",revision:"0a555d7a6a9645ad4cf829111f8f8fb6"},{url:"assets/img/mole.png",revision:"d12b5fb393d91e3729e91ce6f8d85772"},{url:"assets/img/rock-texture.jpg",revision:"e2f796f826fbe5e027b52b1f413c92c7"},{url:"assets/img/row-boulder - Copy.png",revision:"69e3d1d58bcd3f98a4584ca2c940f546"},{url:"assets/img/row-boulder.png",revision:"4b96085270630ea07aa9338ec977ee76"},{url:"assets/img/row-diam.png",revision:"fbed7ca614af81825b52520d060cf7bf"},{url:"assets/img/row-explo.png",revision:"992fe60c845367d9c40145c60b1957b4"},{url:"assets/img/row-monster.png",revision:"79be3ac153a41e8cd2bee781b14da572"},{url:"assets/img/row-walk.png",revision:"c6a0075db0cc40684b8a5209effcfc54"},{url:"assets/img/stone.blend",revision:"86f51266a71cd725504fdb97821e605e"},{url:"assets/img/stone.blend1",revision:"77645c35aa5c6b7174b12c4bc216fcf1"},{url:"assets/img/wall.jpg",revision:"bc9ac80319608cc0e491c41342a349bf"},{url:"assets/snd/diam.mp3",revision:"22b663f11c85a928643df428c0b78bb9"},{url:"assets/snd/exit.mp3",revision:"8e36160e4180eb7e4365caa7fde24c1d"},{url:"assets/snd/expl.mp3",revision:"7dc2d8e924f1bb3a37cad79655899bbe"},{url:"assets/snd/rock.mp3",revision:"9dfde545e390e1d007af41ac0d7562c8"},{url:"favicon.ico",revision:"7a92d6a67d81716d2343b349053617f4"},{url:"index.html",revision:"c3b1e12c119bd5c51af6782b449b1722"},{url:"logo192.png",revision:"dc8634198e7bc3ff23c28b8e605ecfd9"},{url:"logo512.png",revision:"4346c6021d31aca602634b8a765150f9"},{url:"manifest.json",revision:"1f21afa714380aaa235062ee743489f2"},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"scr/app.4e27ddc216a6eda2c8f7.js",revision:null},{url:"scr/runtime.af095e26e607f556dab0.js",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
