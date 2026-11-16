var j0=Object.defineProperty;var dd=(n,e)=>{for(var t in e)j0(n,t,{get:e[t],enumerable:!0})};var Qe={version:"0.0.0",date:"2026-11-16",commit:"d34efed",dirty:!1,dev:!1};var lr={};dd(lr,{KINDS:()=>qf,ORBIT_GROW:()=>Qf,ORBIT_SAG_FRAC:()=>Zf,ORBIT_STALE_STEPS:()=>vd,SCHEMA:()=>pd,SCHEMA_VERSION:()=>Ga,SECONDS_PER_DAY:()=>Xf,blendPosition:()=>as,chunkFor:()=>xd,decodeBinary:()=>Rs,eclLonLat:()=>q0,eraFromDu:()=>fp,formatTDB:()=>Al,formatUTC:()=>Gi,galToEcl:()=>_d,inertialToRot:()=>fd,instantLagrange:()=>yd,lab:()=>lo,littleEndian:()=>Yf,makeContext:()=>Vr,makeHermiteGroup:()=>ja,makeOrient:()=>fo,makePlanetOrient:()=>Br,makeSolarEphem:()=>Xa,makeUnits:()=>hd,mul:()=>ri,nowNodeTdb:()=>Ha,orbitGrid:()=>bd,osculatingPoints:()=>qa,planetAngles:()=>gp,pulsatingAxes:()=>ls,rotAngle:()=>ho,rotToInertial:()=>Va,rotateMany:()=>nr,rotationAngle:()=>ir,runGolden:()=>xp,segmentIndex:()=>As,starAt:()=>gd,tdbToUnix:()=>bn,toPulsatingMany:()=>md,toPulsatingPos:()=>sr,transpose:()=>uo,unixToTdb:()=>Hi,validateDataset:()=>os,validateManifest:()=>Wa});var Xf=86400;function hd({length_km:n,time_days:e}){let t=e*86400,i=n/t*1e3;return{length_km:n,time_days:e,time_s:t,velocity_m_s:i,nd_to_km:s=>s*n,km_to_nd:s=>s/n,nd_to_days:s=>s*e,days_to_nd:s=>s/e,nd_to_m_s:s=>s*i,m_s_to_nd:s=>s/i}}function Va(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),d=r-i,h=a+t;return[l*t-c*i,c*t+l*i,s,l*d-c*h,c*d+l*h,o]}function fd(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),d=l*t+c*i,h=-c*t+l*i,u=l*r+c*a,f=-c*r+l*a;return[d,h,s,u+h,f-d,o]}function as(n,e,t){let[i,s,r]=n,a=t*e,o=Math.cos(a),l=Math.sin(a);return[o*i-l*s,l*i+o*s,r]}function nr(n,e,t){let i=Math.cos(e),s=Math.sin(e);for(let r=0;r<n.length;r+=3){let a=n[r],o=n[r+1];t[r]=i*a-s*o,t[r+1]=s*a+i*o,t[r+2]=n[r+2]}return t}function ir(n,e){return n/e}function As(n,e){let t=0,i=n.length;for(;t<i;){let s=t+i>>1;n[s]<=e?t=s+1:i=s}return Math.min(Math.max(t-1,0),n.length-2)}function bn(n,e){let t=e.t,i=e.u;if(!(n>=t[0]&&n<=t[t.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=As(t,n);return i[s]+(n-t[s])/(t[s+1]-t[s])*(i[s+1]-i[s])}function Ha(n,e){let t=n.u;return e<t[0]?n.t[0]:e>=t[t.length-1]?n.t[t.length-1]:n.t[As(t,e)]}function Hi(n,e){let t=e.t,i=e.u;if(!(n>=i[0]&&n<=i[i.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=As(i,n);return t[s]+(n-i[s])/(i[s+1]-i[s])*(t[s+1]-t[s])}function Gi(n){return new Date(Math.floor(n/60)*6e4).toISOString().slice(0,16).replace("T"," ")}function Al(n){let e=Date.UTC(2e3,0,1,12,0,0);return new Date(e+Math.round(n)*1e3).toISOString().slice(0,19).replace("T"," ")}var pd="lagrange-web",Ga="1.0.0",qf=["points","vectors","trajectory","ensemble","ephemeris","grid2d","scalars","stars","image","model"],Cs=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),Cl=n=>parseInt(String(n).split(".")[0],10),$f=n=>typeof n=="string"&&n.split(".").length===3;function Wa(n){let e=[];if(!Cs(n))return["manifest \uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"];n.schema!==pd&&e.push(`schema \uAC00 ${pd} \uAC00 \uC544\uB2D8`);let t=n.schema_version;$f(t)?Cl(t)!==Cl(Ga)&&e.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${t}, \uC77D\uB294 \uCABD ${Ga})`):e.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8");let i=n.constants;if(!Cs(i))e.push("constants \uC5C6\uC74C");else for(let r of["mu","length_unit_km","time_unit_days"])typeof i[r]=="number"&&i[r]>0||e.push(`constants.${r} \uAC00 \uC591\uC218\uAC00 \uC544\uB2D8`);let s=n.datasets;if(!Array.isArray(s))e.push("datasets \uAC00 \uBAA9\uB85D\uC774 \uC544\uB2D8");else{let r=s.map(a=>Cs(a)?a.id:null);new Set(r).size!==r.length&&e.push("datasets id \uC911\uBCF5");for(let a of s)(!Cs(a)||typeof a.id!="string"||typeof a.file!="string")&&e.push("datasets \uD56D\uBAA9\uC5D0 id\xB7file \uC5C6\uC74C")}return e}function os(n,e){let t=[],i=[];if(!Cs(n))return{errors:["\uC790\uB8CC\uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"],warnings:i};let s=n.schema_version;$f(s)?Cl(s)!==Cl(Ga)&&t.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${s}, \uC77D\uB294 \uCABD ${Ga})`):t.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8"),typeof n.id!="string"&&t.push("id \uC5C6\uC74C"),qf.includes(n.kind)||i.push(`\uBAA8\uB974\uB294 kind: ${JSON.stringify(n.kind)}`);let r=n.provenance;if(!Cs(r))t.push("provenance \uC5C6\uC74C");else{let a=r.verification;(!Cs(a)||!Object.prototype.hasOwnProperty.call(e,a.detail)||e[a.detail].tag!==a.tag)&&t.push("provenance.verification \uC758 tag\xB7detail \uC774 \uAF2C\uB9AC\uD45C \uD45C\uC640 \uB9DE\uC9C0 \uC54A\uC74C"),(!Array.isArray(r.source)||r.source.length===0)&&t.push("provenance.source \uC5C6\uC74C")}if(n.kind==="scalars"){let a=Array.isArray(n.items)?n.items:[null];for(let o of a)(!Cs(o)||typeof o.text!="string"||!("provenance"in o))&&t.push("scalars \uD56D\uBAA9\uC5D0 text\xB7provenance \uC5C6\uC74C")}return{errors:t,warnings:i}}function Yf(){return new Uint8Array(new Float64Array([1]).buffer)[7]===63}function Rs(n,e){if(!Yf())throw new Error("\uBE45\uC5D4\uB514\uC5B8 \uAE30\uACC4\uB294 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC74C (\uC790\uB8CC\uB294 float64 \uB9AC\uD2C0\uC5D4\uB514\uC5B8)");let t=n.byteOffset%8===0?n.buffer:n.slice().buffer,i=n.byteOffset%8===0?n.byteOffset:0,s={};for(let[r,{offset:a,shape:o}]of Object.entries(e)){let l=o.reduce((c,d)=>c*d,1);s[r]={data:new Float64Array(t,i+a*8,l),shape:o}}return s}function ja(n,e,t,i){let s=n.length;function r(a){if(!(a>=n[0]&&a<=n[s-1]))throw new RangeError(`\uBCF4\uAC04 \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01 ${a}`);let o=As(n,a),l=n[o+1]-n[o],c=(a-n[o])/l,d=c*c,h=c*c*c,u=2*h-3*d+1,f=h-2*d+c,m=-2*h+3*d,y=h-d,p=6*d-6*c,g=3*d-4*c+1,C=-6*d+6*c,I=3*d-2*c,v=[],M=[];for(let w=0;w<i;w++){let N=[0,0,0],b=[0,0,0];for(let R=0;R<3;R++){let B=(o*i+w)*3+R,$=((o+1)*i+w)*3+R,D=e[B],O=e[$],U=t[B]*l,W=t[$]*l;N[R]=u*D+f*U+m*O+y*W,b[R]=(p*D+g*U+C*O+I*W)/l}v.push(N),M.push(b)}return{pos:v,vel:M}}return{evaluate:r,tMin:n[0],tMax:n[s-1],k:i}}var Jf=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Kf=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);function ls(n,e,t,i){let s=[t[0]-n[0],t[1]-n[1],t[2]-n[2]],r=[i[0]-e[0],i[1]-e[1],i[2]-e[2]],a=Kf(s),o=[s[0]/a,s[1]/a,s[2]/a],l=Jf(s,r),c=Kf(l),d=[l[0]/c,l[1]/c,l[2]/c],h=Jf(d,o);return{x:o,y:h,z:d,d:a,origin:t}}function sr(n,e){let t=[n[0]-e.origin[0],n[1]-e.origin[1],n[2]-e.origin[2]],i=s=>s[0]*t[0]+s[1]*t[1]+s[2]*t[2];return[i(e.x)/e.d,i(e.y)/e.d,i(e.z)/e.d]}function md(n,e,t,i){let[s,r,a]=[e[0]-t.origin[0],e[1]-t.origin[1],e[2]-t.origin[2]],{x:o,y:l,z:c,d}=t;for(let h=0;h<n.length;h+=3){let u=n[h]+s,f=n[h+1]+r,m=n[h+2]+a;i[h]=(o[0]*u+o[1]*f+o[2]*m)/d,i[h+1]=(l[0]*u+l[1]*f+l[2]*m)/d,i[h+2]=(c[0]*u+c[1]*f+c[2]*m)/d}return i}function gd(n,e){let t=n.dir.data;return{dir:[t[3*e],t[3*e+1],t[3*e+2]],mag:n.mag.data[e],ci:n.ci.data[e],hyg_id:n.hyg_id.data[e]}}function _d(n,e){return[0,1,2].map(t=>n[t][0]*e[0]+n[t][1]*e[1]+n[t][2]*e[2])}function q0(n){let e=Math.atan2(n[1],n[0])*180/Math.PI;return[e<0?e+360:e,Math.asin(n[2])*180/Math.PI]}function xd(n,e){let t=n.chunks;if(e<t[0].t_from_tdb_s)return t[0];for(let i of t)if(e<=i.t_to_tdb_s)return i;return t[t.length-1]}function Xa(n,e={}){let t={};function i(s,r){let a=n.chunks.find(l=>l.year===s);if(!a)throw new Error(`\uC870\uAC01 ${s} \uC5C6\uC74C`);let o={};for(let l of n.bodies){let[c,d]=a.index[l.name],h=new Float64Array(d-c+1);for(let u=c;u<=d;u++)h[u-c]=l.t0_tdb_s+u*l.step_s;o[l.name]=ja(h,r["R_"+l.name].data,r["V_"+l.name].data,1)}t[s]=o}for(let[s,r]of Object.entries(e))i(Number(s),r);return{bodies:n.bodies,range:n.range_tdb_s,chunks:n.chunks,addChunk:i,hasChunk:s=>!!t[s],chunkFor:s=>xd(n,s),evaluate(s,r,a){let o=a??xd(n,r).year;if(!t[o])throw new Error(`\uC870\uAC01 ${o} \uB97C \uC544\uC9C1 \uBD88\uB7EC\uC624\uC9C0 \uC54A\uC558\uB2E4`);let l=t[o][s].evaluate(r);return{pos:l.pos[0],vel:l.vel[0]}}}}function yd(n,e,t,i,s,r){let a=ls(n,e,t,i),o=[r[0]-(1-s),r[1],0];return[0,1,2].map(l=>t[l]+a.d*(a.x[l]*o[0]+a.y[l]*o[1]+a.z[l]*o[2]))}function qa(n,e,t,i,s,r,a){let o=n[0]-t[0],l=n[1]-t[1],c=n[2]-t[2],d=e[0]-i[0],h=e[1]-i[1],u=e[2]-i[2],f=Math.sqrt(o*o+l*l+c*c),m=d*d+h*h+u*u,y=2/f-m/s;if(!(y>0))return null;let p=1/y,g=Math.sqrt(s),C=Math.sqrt(p),I=(o*d+l*h+c*u)/g,v=r.length;for(let M=0;M<v;M++){let w=1-Math.cos(r[M]),N=Math.sin(r[M]),b=1-p/f*w,R=(p*I*w+f*C*N)/g;a[3*M]=b*o+R*d,a[3*M+1]=b*l+R*h,a[3*M+2]=b*c+R*u}return a[3*v-3]=a[0],a[3*v-2]=a[1],a[3*v-1]=a[2],{a:p,speed:Math.sqrt(m)}}var Zf=.0025,Qf=1.2,vd=5;function bd(n,e,t,i=1){let s=Math.sqrt(8*Zf*t*n*(1-e*e)),r=i*Math.PI/180,a=[],o=0,l=s/n;for(;l<r&&o+l<Math.PI;)o+=l,a.push(o),l*=Qf;let c=Math.ceil((Math.PI-o)/r);for(let h=1;h<c;h++)a.push(o+(Math.PI-o)*h/c);a.push(Math.PI);let d=new Float64Array(2*a.length+1);return a.forEach((h,u)=>{d[a.length+1+u]=h,d[a.length-1-u]=-h}),{dE:d,stepKm:s}}var lo={};dd(lo,{Dop853:()=>ro,GELU_C:()=>Za,brentq:()=>Nl,clampToRange:()=>to,components:()=>rr,correctedEu:()=>$a,createRun:()=>ao,efoldState:()=>kl,escapeRun:()=>Id,fromSliders:()=>Ll,inTrainingRange:()=>ar,integrateOne:()=>Ul,integrateTo:()=>Dl,jacobi:()=>or,labFlags:()=>Ur,lnT3:()=>Ya,makeLab:()=>oo,nextUp:()=>Ld,omega:()=>Ed,positionBound:()=>Ja,predict:()=>Or,predictD24:()=>Ka,predictMLP:()=>eo,predictMLPSeeds:()=>Qa,predictState:()=>Nd,readForest:()=>Md,rhs:()=>no,rhsDelta:()=>io,roomFor:()=>wd,stateOf:()=>Rl,toSliders:()=>Il});function rr(n,e){let t=new Array(6);for(let s=0;s<6;s++)t[s]=e[s]-n.s_ref[s];let i=new Array(6);for(let s=0;s<6;s++){let r=0;for(let a=0;a<6;a++)r+=t[a]*n.P_inv[6*s+a];i[s]=r}return i}function Rl(n,e){let t=new Array(6);for(let i=0;i<6;i++){let s=0;for(let r=0;r<6;r++)s+=e[r]*n.P[6*i+r];t[i]=n.s_ref[i]+s}return t}function $a(n,e){let t=n.frame.gamma,i=[e[1]/t,e[2]/t,e[3]/t,e[4]/t,e[5]/t],s=0;for(let r=0;r<5;r++)for(let a=0;a<5;a++)s+=i[r]*n.M[5*r+a]*i[a];return e[0]+t*s}function Sd(n,e,t,i){let{lam:s,w_p:r,w_z:a}=n.frame,o=Math.cos(r*t),l=Math.sin(r*t),c=Math.cos(a*t),d=Math.sin(a*t),h=[e[0]*Math.exp(s*t),e[1]*Math.exp(-s*t),e[2]*o+e[3]*l,-e[2]*l+e[3]*o,e[4]*c+e[5]*d,-e[4]*d+e[5]*c],u=0;for(let f=0;f<3;f++){let m=0;for(let y=0;y<6;y++)m+=h[y]*n.P[6*f+y];u+=m*m}return Math.sqrt(u)-i}function $0(n,e,t,i=60){let s=n.frame.lam,r=Math.log(t/Math.abs(e[0]))/s,a=Math.max(r-.25/s,0),o=r+.25/s,l=Sd(n,e,a,t)<0&&Sd(n,e,o,t)>0;for(let c=0;c<i;c++){let d=.5*(a+o);Sd(n,e,d,t)>0?o=d:a=d}return l?.5*(a+o)*n.frame.time_unit_days:NaN}function Ya(n,e,t){let i=[t,e[1],e[2],e[3],e[4],e[5]];return n.R.map(s=>Math.log($0(n,i,s)))}function Ja(n,e){let{env_p:t,env_z:i}=n.frame;return Math.abs(e[0])+Math.abs(e[1])+t*Math.hypot(e[2],e[3])+i*Math.hypot(e[4],e[5])}function ar(n,e){let t=n.frame.gamma,i=n.range,s=Math.abs(e[0])/t;return s>=i.eu_gamma[0]*(1-i.rtol)&&s<=i.eu_gamma[1]*(1+i.rtol)&&Ja(n,e)/t<=i.disp_max_gamma*(1+i.rtol)}var Y0=new TextDecoder("utf-8");function Md(n){let e=n.indexOf(10),t=JSON.parse(Y0.decode(n.subarray(0,e)));if(t.\uD615\uC2DD!=="lagrange-forest"||t.\uD310!==1||t.\uC885\uB958!=="RF"||t.\uC232_\uC218!==1)throw new Error("\uBAA8\uB974\uB294 \uC232 \uD615\uC2DD");let i=t.\uCD9C\uB825_\uC218,s=e+1,r=(l,c,d)=>{let h=new d(n.slice(s,s+l*c).buffer);return s+=l*c,h},a=new DataView(n.buffer,n.byteOffset,n.byteLength),o=[];for(let l=0;l<t.\uB098\uBB34_\uC218[0];l++){let c=a.getInt32(s,!0);s+=4;let d=r(c,1,Int8Array),h=r(c,8,Float64Array),u=r(c,4,Int32Array),f=r(c,4,Int32Array),m=0;for(let p=0;p<c;p++)d[p]<0&&m++;let y=r(m*i,8,Float64Array);o.push({F:d,T:h,L:u,R:f,V:y})}if(s!==n.length)throw new Error(`\uC232 \uBC14\uC774\uD2B8\uAC00 ${n.length-s} \uB0A8\uC74C`);return{head:t,trees:o,nOut:i,mean:t.\uD45C\uC900\uD654_\uD3C9\uADE0,std:t.\uD45C\uC900\uD654_\uD45C\uC900\uD3B8\uCC28,residual:!!t.\uC794\uCC28}}function Pl(n,e,t={}){let i=t.float32!==!1,s=new Array(e.length);for(let a=0;a<e.length;a++)s[a]=i?Math.fround(e[a]):e[a];let r=new Array(n.nOut).fill(0);for(let a of n.trees){let o=0;for(;a.F[o]>=0;)o=s[a.F[o]]<=a.T[o]?a.L[o]:a.R[o];let l=a.L[o]*n.nOut;for(let c=0;c<n.nOut;c++)r[c]+=a.V[l+c]}for(let a=0;a<n.nOut;a++)r[a]/=n.trees.length;return r}function J0(n,e){return e.map((t,i)=>(t-n.mean[i])/n.std[i])}function Ka(n,e,t){let i=Pl(n,J0(n,e));return n.residual?i.map((s,r)=>t[r]+s):i}var Za=.7071067690849304,K0=1.1283791670955126,Z0=.5641895835477563;function Q0(n){let e=n*n,t=n,i=n;for(let s=1;s<200&&(t*=2*e/(2*s+1),i+=t,!(Math.abs(t)<1e-17*Math.abs(i)));s++);return K0*Math.exp(-e)*i}function e_(n){let t=n,i=n,s=0;for(let r=1;r<500;r++){let a=r/2;s=n+a*s,s===0&&(s=1e-300),s=1/s,i=n+a/i,i===0&&(i=1e-300);let o=i*s;if(t*=o,Math.abs(o-1)<1e-17)break}return Z0*Math.exp(-n*n)/t}function t_(n){if(Number.isNaN(n))return NaN;let e=Math.abs(n),t;return e<3?t=1-Q0(e):t=e_(e),n<0?2-t:t}function n_(n,e,t){let i=e.map((o,l)=>(o-n.x_mean[l])/n.x_std[l]);for(let o=0;o<n.W.length;o++){let[l,c]=n.dims[o],d=n.W[o],h=n.b[o],u=new Array(c);for(let f=0;f<c;f++){let m=0;for(let y=0;y<l;y++)m+=i[y]*d[y*c+f];u[f]=m+h[f]}i=u.map(f=>.5*f*t_(-f*t))}let s=i.length,r=n.bo.length,a=new Array(r);for(let o=0;o<r;o++){let l=0;for(let c=0;c<s;c++)l+=i[c]*n.Wo[c*r+o];a[o]=(l+n.bo[o])*n.y_std[o]+n.y_mean[o]}return a}function Qa(n,e){let t=e[0],i=[Math.sign(t),Math.log(Math.abs(t)),...e.slice(1)];return n.seeds.map(s=>n_(s,i,Za))}function eo(n,e){let t=Qa(n,e);return t[0].map((i,s)=>{let r=0;for(let a of t)r+=a[s];return r/t.length})}function Ll(n,e){let t=n.frame.gamma;return[e.sign*e.eu*t,e.es*t,e.ap*t*Math.cos(e.phip),e.ap*t*Math.sin(e.phip),e.az*t*Math.cos(e.phiz),e.az*t*Math.sin(e.phiz)]}function Il(n,e){let t=n.frame.gamma,i=s=>{let r=Math.atan2(s[1],s[0]);return r<0?r+2*Math.PI:r};return{sign:e[0]<0?-1:1,eu:Math.abs(e[0])/t,es:e[1]/t,ap:Math.hypot(e[2],e[3])/t,phip:i([e[2],e[3]]),az:Math.hypot(e[4],e[5])/t,phiz:i([e[4],e[5]])}}function wd(n,e,t){let{env_p:i,env_z:s}=n.frame,r=n.range.disp_max_gamma,a={eu:e.eu,es:Math.abs(e.es),ap:i*e.ap,az:s*e.az},o=r;for(let[c,d]of Object.entries(a))c!==t&&(o-=d);let l={eu:1,es:1,ap:i,az:s}[t];return Math.max(0,o)/l}function to(n,e,t){let i={...e},s=wd(n,e,t);return t==="eu"?i.eu=Math.min(Math.max(e.eu,n.range.eu_gamma[0]),Math.min(n.range.eu_gamma[1],s)):t==="es"?i.es=Math.sign(e.es)*Math.min(Math.abs(e.es),s):(t==="ap"||t==="az")&&(i[t]=Math.min(e[t],s)),i}function Ur(n,e){let t=n.uncertain,i=Qa(n.mlp,e.x),s=i.length,r=e.MLP.map((l,c)=>{let d=0;for(let h of i)d+=(h[c]-l)**2;return Math.sqrt(d/(s-1))}),a=e.MLP.map((l,c)=>Math.abs(l-e.T3[c])>t.factor*t.rmse_log_mlp[c]),o=r.map((l,c)=>l>t.factor*t.spread_median[c]);return{inRange:ar(n,e.x.slice(0,6)),mismatch:a,spread:o,uncertain:a.map((l,c)=>l||o[c]),seedStd:r,positionBound:Ja(n,e.x.slice(0,6))}}function ep(n,e,t,i){let s=Math.sqrt((n+i)**2+e**2+t**2),r=Math.sqrt((n-1+i)**2+e**2+t**2);return[s,r]}function Ed(n,e){let[t,i,s]=n,[r,a]=ep(t,i,s,e);return .5*(t**2+i**2)+(1-e)/r+e/a}function no(n,e){let[t,i,s,r,a,o]=n,[l,c]=ep(t,i,s,e),d=l**3,h=c**3,u=t-(1-e)*(t+e)/d-e*(t-1+e)/h,f=i-(1-e)*i/d-e*i/h,m=-(1-e)*s/d-e*s/h;return[r,a,o,2*a+u,-2*r+f,m]}function or(n,e){return 2*Ed(n,e)-(n[3]**2+n[4]**2+n[5]**2)}function io(n,e,t){let i=new Array(6);for(let s=0;s<6;s++)i[s]=t[s]+n[s];return no(i,e)}var Td=[0,.05260015195876773,.0789002279381516,.1183503419072274,.2816496580927726,.3333333333333333,.25,.3076923076923077,.6512820512820513,.6,.8571428571428571,1,1,.1,.2,.7777777777777778],tp=[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259],np=[-.18980075407240762,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,-.4226823213237919,-.1521609496625161,.20136540080403034,.02265179219836082,0],ip=[.01312004499419488,0,0,0,0,-1.2251564463762044,-.4957589496572502,1.6643771824549864,-.35032884874997366,.3341791187130175,.08192320648511571,-.022355307863886294,0],Ad=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.05260015195876773,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.0197250569845379,.0591751709536137,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.02958758547680685,0,.08876275643042054,0,0,0,0,0,0,0,0,0,0,0,0,0],[.2413651341592667,0,-.8845494793282861,.924834003261792,0,0,0,0,0,0,0,0,0,0,0,0],[.037037037037037035,0,0,.17082860872947386,.12546768756682242,0,0,0,0,0,0,0,0,0,0,0],[.037109375,0,0,.17025221101954405,.06021653898045596,-.017578125,0,0,0,0,0,0,0,0,0,0],[.03709200011850479,0,0,.17038392571223998,.10726203044637328,-.015319437748624402,.008273789163814023,0,0,0,0,0,0,0,0,0],[.6241109587160757,0,0,-3.3608926294469414,-.868219346841726,27.59209969944671,20.154067550477894,-43.48988418106996,0,0,0,0,0,0,0,0],[.47766253643826434,0,0,-2.4881146199716677,-.590290826836843,21.230051448181193,15.279233632882423,-33.28821096898486,-.020331201708508627,0,0,0,0,0,0,0],[-.9371424300859873,0,0,5.186372428844064,1.0914373489967295,-8.149787010746927,-18.52006565999696,22.739487099350505,2.4936055526796523,-3.0467644718982196,0,0,0,0,0,0],[2.273310147516538,0,0,-10.53449546673725,-2.0008720582248625,-17.9589318631188,27.94888452941996,-2.8589982771350235,-8.87285693353063,12.360567175794303,.6433927460157636,0,0,0,0,0],[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259,0,0,0,0],[.056167502283047954,0,0,0,0,0,.25350021021662483,-.2462390374708025,-.12419142326381637,.15329179827876568,.00820105229563469,.007567897660545699,-.008298,0,0,0],[.03183464816350214,0,0,0,0,.028300909672366776,.053541988307438566,-.05492374857139099,0,0,-.00010834732869724932,.0003825710908356584,-.00034046500868740456,.1413124436746325,0,0],[-.42889630158379194,0,0,0,0,-4.697621415361164,7.683421196062599,4.06898981839711,.3567271874552811,0,0,0,-.0013990241651590145,2.9475147891527724,-9.15095847217987,0]],sp=[[-8.428938276109013,0,0,0,0,.5667149535193777,-3.0689499459498917,2.38466765651207,2.117034582445028,-.871391583777973,2.2404374302607883,.6315787787694688,-.08899033645133331,18.148505520854727,-9.194632392478356,-4.436036387594894],[10.427508642579134,0,0,0,0,242.28349177525817,165.20045171727028,-374.5467547226902,-22.113666853125306,7.733432668472264,-30.674084731089398,-9.332130526430229,15.697238121770845,-31.139403219565178,-9.35292435884448,35.81684148639408],[19.985053242002433,0,0,0,0,-387.0373087493518,-189.17813819516758,527.8081592054236,-11.57390253995963,6.8812326946963,-1.0006050966910838,.7777137798053443,-2.778205752353508,-60.19669523126412,84.32040550667716,11.99229113618279],[-25.69393346270375,0,0,0,0,-154.18974869023643,-231.5293791760455,357.6391179106141,93.40532418362432,-37.45832313645163,104.0996495089623,29.8402934266605,-43.53345659001114,96.32455395918828,-39.17726167561544,-149.72683625798564]];function Nl(n,e,t,i,s,r=100){let a=e,o=t,l=0,c=0,d=0,h=0,u=n(a),f=n(o);if(u===0)return a;if(f===0)return o;let m=y=>y<0||Object.is(y,-0);if(m(u)===m(f))throw new Error("brentq: \uAD6C\uAC04 \uB05D\uC758 \uBD80\uD638\uAC00 \uAC19\uB2E4");for(let y=0;y<r;y++){u!==0&&f!==0&&m(u)!==m(f)&&(l=a,c=u,d=h=o-a),Math.abs(c)<Math.abs(f)&&(a=o,o=l,l=a,u=f,f=c,c=u);let p=(i+s*Math.abs(o))/2,g=(l-o)/2;if(f===0||Math.abs(g)<p)return o;if(Math.abs(d)>p&&Math.abs(f)<Math.abs(u)){let C;if(a===l)C=-f*(o-a)/(f-u);else{let I=(u-f)/(a-o),v=(c-f)/(l-o);C=-f*(c*v-u*I)/(v*I*(c-u))}2*Math.abs(C)<Math.min(Math.abs(d),3*Math.abs(g)-p)?(d=h,h=C):(d=g,h=g)}else d=g,h=g;a=o,u=f,Math.abs(h)>p?o+=h:o+=g>0?p:-p,f=n(o)}throw new Error("brentq: \uC218\uB834 \uC548 \uD568")}var ap=.9,r_=.2,op=10,lp=2220446049250313e-31,so=12,cp=-1/8;function Ld(n){if(Number.isNaN(n)||n===1/0)return n;if(n===0)return Number.MIN_VALUE;let e=new DataView(new ArrayBuffer(8));e.setFloat64(0,n);let t=e.getUint32(0),i=e.getUint32(4);return n>0?i===4294967295?(e.setUint32(0,t+1),e.setUint32(4,0)):e.setUint32(4,i+1):i===0?(e.setUint32(0,t-1),e.setUint32(4,4294967295)):e.setUint32(4,i-1),e.getFloat64(0)}var Pd=n=>{let e=0;for(let t of n)e+=t*t;return Math.sqrt(e)},Rd=n=>Pd(n)/n.length**.5;function a_(n,e,t,i,s,r,a,o,l){let c=t.length,d=Math.abs(i-e);if(d===0)return 0;let h=t.map(I=>l+Math.abs(I)*o),u=Rd(t.map((I,v)=>I/h[v])),f=Rd(r.map((I,v)=>I/h[v])),m=u<1e-5||f<1e-5?1e-6:.01*u/f;m=Math.min(m,d);let y=new Array(c);for(let I=0;I<c;I++)y[I]=t[I]+m*1*r[I];let p=n(e+m*1,y),g=Rd(p.map((I,v)=>(I-r[v])/h[v]))/m,C=f<=1e-15&&g<=1e-15?Math.max(1e-6,m*.001):(.01/Math.max(f,g))**(1/(a+1));return Math.min(100*m,C,d,s)}var ro=class{constructor(e,t,i,s,r,a,o=1/0){this.nfev=0,this.fun=(l,c)=>(this.nfev++,e(l,c)),this.t=t,this.y=i.slice(),this.tBound=s,this.rtol=r,this.atol=a,this.maxStep=o,this.n=i.length,this.status="running",this.tOld=null,this.yOld=null,this.hPrevious=null,this.f=this.fun(this.t,this.y),this.hAbs=a_(this.fun,this.t,this.y,s,o,this.f,7,r,a),this.Kx=Array.from({length:16},()=>new Array(this.n).fill(0))}_rkStep(e,t,i,s){let r=this.n,a=this.Kx,o=Ad,l=Td,c=tp;a[0]=i.slice();for(let u=1;u<so;u++){let f=new Array(r);for(let m=0;m<r;m++){let y=0;for(let p=0;p<u;p++)y+=a[p][m]*o[u][p];f[m]=t[m]+y*s}a[u]=this.fun(e+l[u]*s,f)}let d=new Array(r);for(let u=0;u<r;u++){let f=0;for(let m=0;m<so;m++)f+=a[m][u]*c[m];d[u]=t[u]+s*f}let h=this.fun(e+s,d);return a[so]=h,[d,h]}_errorNorm(e,t){let i=this.n,s=this.Kx,r=new Array(i),a=new Array(i);for(let d=0;d<i;d++){let h=0,u=0;for(let f=0;f<=so;f++)h+=s[f][d]*ip[f],u+=s[f][d]*np[f];r[d]=h/t[d],a[d]=u/t[d]}let o=Pd(r)**2,l=Pd(a)**2;if(o===0&&l===0)return 0;let c=o+.01*l;return Math.abs(e)*o/Math.sqrt(c*i)}step(){if(this.status!=="running")throw new Error("\uB05D\uB09C \uD480\uC774\uAE30");if(this.t===this.tBound)return this.tOld=this.t,this.status="finished",this.status;let e=this.t,t=this.y,i=10*Math.abs(Ld(e)-e),s=this.hAbs>this.maxStep?this.maxStep:this.hAbs<i?i:this.hAbs,r=!1,a=!1,o,l,c,d;for(;!r;){if(s<i)return this.status="failed",this.message="\uAC78\uC74C\uC774 \uB108\uBB34 \uC791\uC74C",this.status;d=s,c=e+d,c-this.tBound>0&&(c=this.tBound),d=c-e,s=Math.abs(d),[o,l]=this._rkStep(e,t,this.f,d);let h=new Array(this.n);for(let f=0;f<this.n;f++)h[f]=this.atol+Math.max(Math.abs(t[f]),Math.abs(o[f]))*this.rtol;let u=this._errorNorm(d,h);if(u<1){let f=u===0?op:Math.min(op,ap*u**cp);a&&(f=Math.min(1,f)),s*=f,r=!0}else s*=Math.max(r_,ap*u**cp),a=!0}return this.hPrevious=d,this.yOld=t,this.t=c,this.y=o,this.hAbs=s,this.f=l,this.tOld=e,this.t-this.tBound>=0&&(this.status="finished"),this.status}dense(){let e=this.n,t=this.Kx,i=Ad,s=Td,r=this.hPrevious,a=this.tOld,o=this.yOld;for(let d=so+1;d<16;d++){let h=new Array(e);for(let u=0;u<e;u++){let f=0;for(let m=0;m<d;m++)f+=t[m][u]*i[d][m];h[u]=o[u]+f*r}t[d]=this.fun(a+s[d]*r,h)}let l=Array.from({length:7},()=>new Array(e)),c=t[0];for(let d=0;d<e;d++){let h=this.y[d]-o[d];l[0][d]=h,l[1][d]=r*c[d]-h,l[2][d]=2*h-r*(this.f[d]+c[d])}for(let d=0;d<4;d++)for(let h=0;h<e;h++){let u=0;for(let f=0;f<16;f++)u+=sp[d][f]*t[f][h];l[3+d][h]=r*u}return o_(a,this.t,o,l)}};function o_(n,e,t,i){let s=e-n,r=t.length;return a=>{let o=(a-n)/s,l=new Array(r).fill(0);for(let c=0;c<i.length;c++){let d=i[i.length-1-c],h=c%2===0?o:1-o;for(let u=0;u<r;u++)l[u]=(l[u]+d[u])*h}for(let c=0;c<r;c++)l[c]+=t[c];return l}}function ao(n,e,t,i,s,r,a=[],o=null){let l=new ro(n,e,t,i,s,r),c=a.map(y=>y.terminal?1:1/0),d=a.map(()=>0),h=a.map(()=>[]),u=a.map(()=>[]),f=a.map(y=>y.g(e,t)),m={solver:l,tEvents:h,yEvents:u,status:"running",t:e,y:t.slice(),nsteps:0};return m.advance=(y=1/0)=>{for(let p=0;p<y&&m.status==="running";p++){if(l.step(),m.nsteps++,l.status==="failed"){m.status="failed",m.message=l.message;break}let g=l.t,C=l.y,I=l.tOld;if(a.length){let v=a.map(w=>w.g(g,C)),M=[];for(let w=0;w<a.length;w++){let N=f[w]<=0&&v[w]>=0,b=f[w]>=0&&v[w]<=0,R=a[w].direction;(N&&R>0||b&&R<0||(N||b)&&R===0)&&M.push(w)}if(M.length){let w=l.dense();for(let B of M)d[B]++;let N=M.slice(),b=N.map(B=>Nl($=>a[B].g($,w($)),I,g,4*lp,4*lp)),R=!1;if(N.some(B=>d[B]>=c[B])){let B=b.map((D,O)=>O).sort((D,O)=>b[D]-b[O]);N=B.map(D=>N[D]),b=B.map(D=>b[D]);let $=N.findIndex(D=>d[D]>=c[D]);N=N.slice(0,$+1),b=b.slice(0,$+1),R=!0}N.forEach((B,$)=>{h[B].push(b[$]),u[B].push(w(b[$]))}),R&&(m.status="event",g=b[b.length-1],C=w(g))}f=v}if(o){let v=l.nfev,M=l.dense();l.nfev=v,o(M,I,g)}m.t=g,m.y=C,m.status==="running"&&l.status==="finished"&&(m.status="finished")}return m.nfev=l.nfev,m.status},m}function Dl(n,e,t,i,s,r){let a=ao(n,e,t,i,s,r);if(a.advance(),a.status!=="finished")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+a.message);return{y:a.y,nfev:a.nfev,nsteps:a.nsteps}}var l_=1,c_=-1;function u_(n,e,t=2e4,i=12){let s=[n[0],n[1],n[2]],r=0,a=(l,c,d)=>{let h=[c[0]-l[0],c[1]-l[1],c[2]-l[2]],u=[d[0]-l[0],d[1]-l[1],d[2]-l[2]],f=h[0]*h[0]+h[1]*h[1]+h[2]*h[2],m=f>0?Math.min(1,Math.max(0,(u[0]*h[0]+u[1]*h[1]+u[2]*h[2])/f)):0;return Math.hypot(u[0]-m*h[0],u[1]-m*h[1],u[2]-m*h[2])},o=(l,c,d,h,u,f)=>{let m=[.25,.5,.75].some(y=>a(d,u,l(c+y*(h-c)))>e/2);if(m&&f<i){let y=.5*(c+h),p=l(y);o(l,c,d,y,p,f+1),o(l,y,p,h,u,f+1)}else m&&r++,s.push(u[0],u[1],u[2])};return{add(l,c,d){d>c&&o(l,c,l(c),d,l(d),0)},finish(){let l=s.length/3,c=new Uint8Array(l);c[0]=1,c[l-1]=1;let d=p=>[s[3*p],s[3*p+1],s[3*p+2]],h=[[0,l-1]];for(;h.length;){let[p,g]=h.pop(),C=-1,I=0,v=d(p),M=d(g);for(let w=p+1;w<g;w++){let N=a(v,M,d(w));N>I&&(I=N,C=w)}C>=0&&I>e/2&&(c[C]=1,h.push([p,C],[C,g]))}let u=0;for(let p=0;p<l;p++)u+=c[p];let f=u>t?Math.ceil(u/t):1,m=[],y=0;for(let p=0;p<l;p++)c[p]&&((y%f===0||p===l-1)&&m.push(s[3*p],s[3*p+1],s[3*p+2]),y++);return{points:Float64Array.from(m),n_raw:l,n_kept:u,n:m.length/3,capped:f>1,depth_capped:r,tol:e}}}}function Id(n,e,t={}){let i=[n.x_L2,0,0,0,0,0],s=n.R_over_gamma.map(d=>d*n.gamma),r=s.map((d,h)=>({g:(u,f)=>Math.sqrt(f[0]**2+f[1]**2+f[2]**2)-d,terminal:h===s.length-1,direction:1})),a=e.map((d,h)=>d-i[h]),o=n.t_max_days/n.time_unit_days,l=t.trajTol?u_(a,t.trajTol,t.trajMax):null,c=ao((d,h)=>io(h,n.mu,i),0,a,o,n.rtol,n.atol,r,l?(d,h,u)=>l.add(d,h,u):null);return c.tEndNd=o,c.result=()=>{let d=s.map((f,m)=>c.tEvents[m].length?c.tEvents[m][0]*n.time_unit_days:NaN),h=s.map((f,m)=>c.tEvents[m].length?c.yEvents[m][0][0]>0?l_:c_:0),u={t_days:d,dir:h,nfev:c.solver.nfev,status:c.status,t_reached_days:c.t*n.time_unit_days};return l&&(u.traj=l.finish()),u},c}function Ul(n,e){let t=Id(n,e);if(t.advance(),t.status==="failed")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+t.message);return t.result()}function kl(n,e,t,i){let s=e.map((o,l)=>o-t[l]),{y:r}=Dl((o,l)=>io(l,n.mu,t),0,s,i,n.rtol,n.atol),a=r.map((o,l)=>t[l]+o);return{delta:r,jacobi_drift:or(a,n.mu)-or(e,n.mu)}}var kr=(n,e)=>{if(!n[e])throw new Error(`\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 ${e} \uC5C6\uC74C`);return n[e].data};function oo(n,e,t=null){if(n.mlp.gelu_c!==Za)throw new Error(`gelu \uC0C1\uC218\uAC00 \uB2E4\uB974\uB2E4: \uC790\uB8CC ${n.mlp.gelu_c} \uB300 JS ${Za}`);let i=n.frame_l2,s={frame:i,P:kr(e,"P"),P_inv:kr(e,"P_inv"),s_ref:Array.from(kr(e,"s_ref")),M:kr(e,"M"),R_over_gamma:n.criteria.R_over_gamma,R:n.criteria.R_over_gamma.map(r=>r*i.gamma),labels:n.criteria.labels,range:n.range,uncertain:n.uncertain||null,examples:n.examples||[],sliders:n.sliders||null};return s.mlp={seeds:n.mlp.seeds.map(r=>{let a=[],o=[],l=[];for(let d=0;d<n.mlp.layers;d++){let h=e[`s${r}_W${d}`];a.push(h.data),o.push(kr(e,`s${r}_b${d}`)),l.push(h.shape)}let c=d=>kr(e,`s${r}_${d}`);return{W:a,b:o,dims:l,Wo:c("Wo"),bo:c("bo"),x_mean:c("x_mean"),x_std:c("x_std"),y_mean:c("y_mean"),y_std:c("y_std")}})},s.forest=t?Md(t):null,s.escapeParams=(r={})=>({mu:i.mu,x_L2:i.x,gamma:i.gamma,R_over_gamma:s.R_over_gamma,time_unit_days:i.time_unit_days,t_max_days:r.t_max_days??n.integrate.t_max_days,rtol:r.rtol??n.integrate.rtol,atol:r.atol??n.integrate.atol}),s}function Or(n,e){let t=$a(n,e),i=Ya(n,e,t),s=[...e,t];return{eus:t,x:s,inRange:ar(n,e),T3:i,MLP:eo(n.mlp,s),D24:n.forest?Ka(n.forest,s,i):null,dirT3:Math.sign(t)}}function Nd(n,e){return Or(n,rr(n,e))}var up=n=>n===null?NaN:n,Dd=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),Fr={max_err:NaN,failures:[{reason:"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC (m3.lab) \uC5C6\uC74C"}]};function Ud(n,e,t){let i=0,s=!1;for(let r=0;r<e.length;r++){let a=n[r],o=up(e[r]);if(Number.isNaN(a)||Number.isNaN(o)){Number.isNaN(a)!==Number.isNaN(o)&&(s=!0);continue}i=Math.max(i,Math.abs(a-o))}return{err:i,bad:s||!(i<=t)}}var dp={m3_eigen(n,e){if(!e.lab)return Fr;let t=0,i=0,s=[];for(let r of n.cases){let a=rr(e.lab,r.state),o=$a(e.lab,a),l=Math.max(...a.map((c,d)=>Math.abs(c-r.E[d])),Math.abs(o-r.eus));t=Math.max(t,l),i=Math.max(i,l/r.tol),l<=r.tol||s.push({state:r.state,err:l,tol:r.tol})}return{max_err:t,max_ratio_to_tol:i,failures:s,measure:"abs (\uC131\uBD84\uB9C8\uB2E4 100 \u03B5 \u2016\u03B4\u2016)"}},m3_t3(n,e){if(!e.lab)return Fr;let t=0,i=0,s=[];for(let r of n.cases){let a=Ya(e.lab,r.E,r.eus),o=Ud(a,r.lt3,n.tolerance.abs);i+=r.lt3.filter(l=>l===null).length,t=Math.max(t,o.err),o.bad&&s.push({E:r.E,js:a,py:r.lt3})}return{max_err:t,n_nan_expected:i,failures:s,measure:"abs ln \uC77C"}},m3_uncertain(n,e){if(!e.lab)return Fr;let t=[],i=0,s=0;for(let r of n.cases){let a=Ur(e.lab,Or(e.lab,r.E)),o=Math.max(...a.seedStd.map((c,d)=>Math.abs(c-r.seed_std[d])));i=Math.max(i,o),a.uncertain.some(Boolean)&&s++,(!(a.mismatch.every((c,d)=>c===r.mismatch[d])&&a.spread.every((c,d)=>c===r.spread[d]))||!(o<=n.tolerance.seed_std_abs))&&t.push({E:r.E,js:{mismatch:a.mismatch,spread:a.spread},py:{mismatch:r.mismatch,spread:r.spread},std_err:o})}return{max_err:t.length,max_err_std:i,n_uncertain:s,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_range(n,e){if(!e.lab)return Fr;let t=[],i=0;for(let s of n.cases){let r=ar(e.lab,s.E);s.in&&i++,r!==s.in&&t.push({E:s.E,js:r,py:s.in})}return{max_err:t.length,n_in:i,n_out:n.cases.length-i,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_d24(n,e){if(!e.lab||!e.lab.forest)return Fr;let t=n.tolerance.abs,i=e.lab.forest,s=0,r=0,a=0,o=0,l=0,c=[];for(let d of n.cases)if(d.what==="predict"){let h=Ud(Ka(i,d.X,d.lt3),d.lnt,t);s=Math.max(s,h.err),h.bad&&c.push({what:d.what,X:d.X,err:h.err})}else{l++;let h=Pl(i,d.z),u=Pl(i,d.z,{float32:!1}),f=Math.max(...h.map((y,p)=>Math.abs(y-d.out_f32[p])),...u.map((y,p)=>Math.abs(y-d.out_f64[p])));r=Math.max(r,f);let m=h.some((y,p)=>y!==u[p]);m&&a++,d.differs&&o++,(!(f<=t)||m!==d.differs)&&c.push({what:d.what,err:f,js_differs:m,py_differs:d.differs})}return(o===0||a===0)&&c.push({reason:"\uB300\uC870\uAD70\uC774 \uD558\uB098\uB3C4 \uAC08\uB9AC\uC9C0 \uC54A\uC74C \u2014 \uBB38\uD131 \uC704 \uC785\uB825 \uC2DC\uD5D8\uC774 \uBB34\uB825",jsDiffers:a,pyDiffers:o}),{max_err:Math.max(s,r),max_err_predict:s,max_err_probe:r,control:{probes:l,py_differs:o,js_differs:a},failures:c,measure:"abs ln \uC77C"}},m3_mlp(n,e){if(!e.lab)return Fr;let t=0,i=[];for(let s of n.cases){let r=Ud(eo(e.lab.mlp,s.X),s.lnt,n.tolerance.abs);t=Math.max(t,r.err),r.bad&&i.push({X:s.X,err:r.err})}return{max_err:t,failures:i,measure:"abs ln \uC77C (\uC2DC\uB4DC 3 \uD3C9\uADE0)"}},m3_cr3bp(n){let e=0,t=[];for(let i of n.cases){let s=no(i.state,n.mu),r=or(i.state,n.mu),a=Math.max(Dd(s.map((o,l)=>o-i.rhs[l]))/Dd(i.rhs),Math.abs(r-i.jacobi)/Math.abs(i.jacobi));e=Math.max(e,a),a<=n.tolerance.rel||t.push({state:i.state,err:a})}return{max_err:e,failures:t,measure:"rel (\uC6B0\uBCC0 \uBCA1\uD130 \uD06C\uAE30 \uB300\uBE44, \uC57C\uCF54\uBE44)"}},m3_dop853(n){let e={mu:n.mu,x_L2:n.x_L2,gamma:n.gamma,R_over_gamma:n.R_over_gamma,time_unit_days:n.time_unit_days,t_max_days:n.t_max_days,rtol:n.rtol,atol:n.atol},t=0,i=0,s=0,r=0,a=0,o=0,l=0,c=[];for(let d of n.cases){let h=Ul(e,d.state),u=kl(e,d.state,n.s_ref,n.efold_nd),f=Dd(u.delta.map((p,g)=>p-d.delta_efold[g]));r=Math.max(r,f),t=Math.max(t,f/d.L_delta);let m=!(f<=d.L_delta);for(let p=0;p<d.t_days.length;p++){let g=up(d.t_days[p]),C=h.t_days[p];if(Number.isNaN(g)&&l++,Number.isNaN(g)||Number.isNaN(C)){Number.isNaN(g)!==Number.isNaN(C)&&(m=!0);continue}let I=Math.abs(C-g);a=Math.max(a,I),i=Math.max(i,I/d.L_t_days[p]),I<=d.L_t_days[p]||(m=!0),h.dir[p]!==d.dir[p]&&(m=!0,o++)}let y=10*Math.max(Math.abs(d.jacobi_drift),d.jacobi_drift_jit_rms);s=Math.max(s,y>0?Math.abs(u.jacobi_drift)/y:u.jacobi_drift===0?0:1/0),Math.abs(u.jacobi_drift)<=y||(m=!0),m&&c.push({eu_gamma:d.eu_gamma,eD:f,L_delta:d.L_delta,t_js:h.t_days,t_py:d.t_days,L_t:d.L_t_days,dir_js:h.dir,dir_py:d.dir,cj_js:u.jacobi_drift,cj_lim:y})}return{max_err:Math.max(t,i,s),ratio_to_line:{delta_efold:t,escape_time:i,jacobi:s},max_abs:{delta_efold:r,escape_time_days:a},direction_mismatch:o,no_escape_entries:l,failures:c,measure:"8-1 \uD310\uC815\uC120 \uB300\uBE44 \uBE44 (\u2264 1 \uC774\uBA74 \uD1B5\uACFC)"}}};var co=Math.PI/180,hp=n=>{let e=Math.cos(n),t=Math.sin(n);return[[1,0,0],[0,e,t],[0,-t,e]]},kd=n=>{let e=Math.cos(n),t=Math.sin(n);return[[e,t,0],[-t,e,0],[0,0,1]]};function ri(n,e){let t=[[0,0,0],[0,0,0],[0,0,0]];for(let i=0;i<3;i++)for(let s=0;s<3;s++)t[i][s]=n[i][0]*e[0][s]+n[i][1]*e[1][s]+n[i][2]*e[2][s];return t}var uo=n=>[[n[0][0],n[1][0],n[2][0]],[n[0][1],n[1][1],n[2][1]],[n[0][2],n[1][2],n[2][2]]];function fp(n){let e=n-Math.floor(n),t=2*Math.PI*(e+.779057273264+.00273781191135448*n);return t=t%(2*Math.PI),t<0?t+2*Math.PI:t}function ho(n,e){let t=0;for(let i=0;i<3;i++)for(let s=0;s<3;s++)t+=(n[i][s]-e[i][s])**2;return Math.sqrt(t/2)}function fo(n){let e=n._arrays,t=e.t.data,i=e.du.data,s=e.q.data,r=n.orient.earth.eps_arcsec/3600*co,a=hp(r),o=n.orient.moon.coef;function l(h){if(!(h>=t[0]&&h<=t[t.length-1]))throw new RangeError("\uC9C0\uAD6C \uC790\uC138 \uD45C \uBC94\uC704 \uBC16");let u=As(t,h),f=(h-t[u])/(t[u+1]-t[u]),m=[[0,0,0],[0,0,0],[0,0,0]];for(let p=0;p<3;p++)for(let g=0;g<3;g++){let C=s[9*u+3*p+g],I=s[9*(u+1)+3*p+g];m[p][g]=C+f*(I-C)}let y=i[u]+f*(i[u+1]-i[u]);return ri(ri(a,uo(m)),kd(-fp(y)))}function c(h){let u=h/86400,f=u/36525,m=o.pole_ra[0]+o.pole_ra[1]*f+o.pole_ra[2]*f*f,y=o.pole_dec[0]+o.pole_dec[1]*f+o.pole_dec[2]*f*f,p=o.pm[0]+o.pm[1]*u+o.pm[2]*u*u;return o.angles.forEach(([g,C],I)=>{let v=(g+C*f)*co;m+=o.ra[I]*Math.sin(v),y+=o.dec[I]*Math.cos(v),p+=o.pmt[I]*Math.sin(v)}),[m,y,p]}function d(h){let[u,f,m]=c(h),y=ri(ri(kd(m*co),hp((90-f)*co)),kd((90+u)*co));return ri(a,uo(y))}return{earth:l,moon:d,moonAngles:c,range:[t[0],t[t.length-1]]}}var po=Math.PI/180,pp=n=>{let e=Math.cos(n),t=Math.sin(n);return[[1,0,0],[0,e,t],[0,-t,e]]},mp=n=>{let e=Math.cos(n),t=Math.sin(n);return[[e,t,0],[-t,e,0],[0,0,1]]};function gp(n,e){let t=e/86400,i=t/36525,s=n.pole_ra[0]+n.pole_ra[1]*i+n.pole_ra[2]*i*i,r=n.pole_dec[0]+n.pole_dec[1]*i+n.pole_dec[2]*i*i,a=n.pm[0]+n.pm[1]*t+n.pm[2]*t*t;return n.angles.forEach((o,l)=>{let c=0,d=1;for(let h of o)c+=h*d,d*=i;c*=po,s+=n.ra[l]*Math.sin(c),r+=n.dec[l]*Math.cos(c),a+=n.pmt[l]*Math.sin(c)}),[s,r,a]}function Br(n,e){let t=pp(e/3600*po);return i=>{let[s,r,a]=gp(n,i),o=ri(ri(mp(a*po),pp((90-r)*po)),mp((90+s)*po));return ri(t,uo(o))}}var _p=(n,e)=>e===0?Math.abs(n-e):Math.abs(n-e)/Math.abs(e),Ol=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),zn=(n,e)=>Ol(n.map((t,i)=>t-e[i]));function Vr(n){let e={},t=n["ephem.earth_moon"];t&&t._arrays&&(e.ephem=ja(t._arrays.t.data,t._arrays.R.data,t._arrays.V.data,t.bodies.length));let i=n["time.utc"];i&&i._arrays&&(e.utc={t:i._arrays.t_tdb_s.data,u:i._arrays.unix_utc_s.data});let s=n["m3.lab"];s&&s._arrays&&(e.lab=oo(s,s._arrays,s._forest||null));let r=n["m4.ephem"];r&&r._chunks&&(e.solar=Xa(r,r._chunks)),n["m5.stars"]&&n["m5.milkyway"]&&(e.sky={stars:n["m5.stars"],milkyway:n["m5.milkyway"]});let a=n["m4.textures"];return a&&a.planets&&a.orient&&(e.planetOrient=Object.fromEntries(Object.entries(a.planets).map(([o,l])=>[o,Br(l.coef,a.orient.earth.eps_arcsec)]))),a&&a._arrays&&a.orient&&(e.orient=fo(a)),e}function zr(n,e,t){let i=0,s=[];for(let r of n){let{err:a,js:o}=e(r);i=Math.max(i,a),a<=t||s.push({...r,js:o,err:a})}return{max_err:i,failures:s}}var d_={units(n){let e=hd(n.units);return{...zr(n.cases,t=>({err:_p(e[t.fn](t.in),t.out),js:e[t.fn](t.in)}),n.tolerance.rel),measure:"rel"}},timeline(n){return{...zr(n.cases,e=>{let t=ir(e.t_days,n.time_unit_days);return{err:Math.abs(t-e.theta),js:t}},n.tolerance.abs),measure:"abs rad"}},schema(n){let e=[],t=n.cases.find(i=>i.what==="manifest").obj.verification.details;for(let i of n.cases){let s,r;if(i.what==="manifest")s=Wa(i.obj).length,r=0;else{let a=os(i.obj,t);s=a.errors.length,r=a.warnings.length}(s!==i.errors||r!==i.warnings)&&e.push({name:i.name,py:[i.errors,i.warnings],js:[s,r]})}return{max_err:e.length,failures:e,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},frames(n){return{...zr(n.cases,e=>{let t=Va(e.state,e.theta),i=fd(e.state,e.theta),s=as(e.state.slice(0,3),e.theta,e.s),r=Ol(e.state);return{err:Math.max(zn(t,e.to_inertial),zn(i,e.to_rot),zn(s,e.blend))/r,js:{a:t,b:i,p:s}}},n.tolerance.rel),measure:"rel (\uC0C1\uD0DC \uD06C\uAE30 \uB300\uBE44)"}},interp(n,e){if(!e.ephem)return{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.ephem.evaluate(r.t);for(let o=0;o<r.pos.length;o++){let l=zn(a.pos[o],r.pos[o]),c=zn(a.vel[o],r.vel[o]);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({t:r.t,body:o,ep:l,ev:c})}}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},pulsating(n,e){return e.ephem?{...zr(n.cases,t=>{let i=e.ephem.evaluate(t.t),s=ls(i.pos[0],i.vel[0],i.pos[3],i.vel[3]),r=sr(i.pos[1],s),a=sr(i.pos[2],s);return{err:Math.max(zn(r,t.earth)/Ol(t.earth),zn(a,t.moon)/Ol(t.moon),_p(s.d,t.d_km)),js:{e:r,m:a,d:s.d}}},n.tolerance.rel),measure:"rel"}:{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]}},utc(n,e){return e.utc?{...zr(n.cases,t=>{let i=bn(t.t,e.utc);return{err:Math.abs(i-t.unix),js:i}},n.tolerance.abs_s),measure:"abs s"}:{max_err:NaN,failures:[{reason:"UTC \uD45C \uC5C6\uC74C"}]}},m4_interp(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.solar.evaluate(r.body,r.t),o=zn(a.pos,r.pos),l=zn(a.vel,r.vel);t=Math.max(t,o),i=Math.max(i,l),o<=n.tolerance.pos_km&&l<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,ep:o,ev:l})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_chunks(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases)for(let a of r.years){let o=e.solar.evaluate(r.body,r.t,a),l=zn(o.pos,r.pos),c=zn(o.vel,r.vel);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,year:a,ep:l,ev:c})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_lpoints(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=[];for(let s of n.cases){let r=e.solar.evaluate("sun",s.t),a=e.solar.evaluate("emb",s.t);for(let[o,l]of Object.entries(n.points)){let c=zn(yd(r.pos,r.vel,a.pos,a.vel,n.mu,l),s.L[o]);t=Math.max(t,c),c<=n.tolerance.pos_km||i.push({t:s.t,point:o,err:c})}}return{max_err:t,failures:i,measure:"pos km"}},m4_osculating(n){let e=0,t=[];for(let i of n.cases){let s=new Float64Array(i.points.length);qa(i.r,i.v,i.r_sun,i.v_sun,i.mu,i.dE,s);let r=0;for(let a=0;a<s.length;a+=3)r=Math.max(r,Math.hypot(s[a]-i.points[a],s[a+1]-i.points[a+1],s[a+2]-i.points[a+2]));e=Math.max(e,r),r<=n.tolerance.pos_km||t.push({body:i.body,t:i.t,err:r})}return{max_err:e,failures:t,measure:"pos km"}},m4_orient(n,e){if(!e.orient)return{max_err:NaN,failures:[{reason:"\uC790\uC138 \uC790\uB8CC (m4.textures) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=ho(e.orient.earth(r.t),r.earth),o=ho(e.orient.moon(r.t),r.moon);t=Math.max(t,a),i=Math.max(i,o),a<=n.tolerance.earth_rad&&o<=n.tolerance.moon_rad||s.push({t:r.t,ee:a,em:o})}return{max_err:t,max_err_moon:i,failures:s,measure:"rad (\uC9C0\uAD6C; \uB2EC\uC740 max_err_moon)"}},m4_planet_orient(n,e){if(!e.planetOrient)return{max_err:NaN,failures:[{reason:"\uD589\uC131 \uC790\uC138 \uC790\uB8CC (m4.textures planets) \uC5C6\uC74C"}]};let t=0,i=[];for(let s of n.cases){let r=ho(e.planetOrient[s.body](s.t),s.matrix);t=Math.max(t,r),r<=n.tolerance.rad||i.push({body:s.body,t:s.t,e:r})}return{max_err:t,failures:i,measure:"rad"}},m5_sky(n,e){if(!e.sky||!e.sky.stars._arrays)return{max_err:NaN,failures:[{reason:"\uD558\uB298 \uC790\uB8CC (m5.stars\xB7m5.milkyway) \uC5C6\uC74C"}]};let t=e.sky.stars._arrays,i=e.sky.milkyway.gal_to_ecl,s=new Map;for(let l=0;l<t.hyg_id.data.length;l++)s.set(t.hyg_id.data[l],l);let r=0,a=0,o=[];for(let l of n.cases)if(l.what==="star"){let c=s.get(l.hyg_id);if(c===void 0){o.push({name:l.name,reason:"\uC790\uB8CC\uC5D0 \uC5C6\uC74C"});continue}let d=gd(t,c),h=Math.max(zn(d.dir,l.dir),Math.abs(d.mag-l.mag));r=Math.max(r,h),h<=n.tolerance.star_abs||o.push({name:l.name,err:h})}else{let c=zn(_d(i,l.gal),l.ecl);a=Math.max(a,c),c<=n.tolerance.rot_abs||o.push({gal:l.gal,err:c})}return{max_err:Math.max(r,a),max_err_star:r,max_err_rot:a,failures:o,measure:"abs (\uB2E8\uC704 \uBCA1\uD130)"}},revolution(n){return{...zr(n.cases,e=>{let t=n.time_unit_days,i=ir(e.t0_days,t),s=ir(e.t1_days,t),r=Va([...n.emb,0,0,0],i),a=Va([...n.emb,0,0,0],s),o=Math.atan2(a[1],a[0])-Math.atan2(r[1],r[0]);return{err:Math.abs(Math.atan2(Math.sin(o),Math.cos(o))),js:{a0:i,a1:s}}},n.tolerance.abs_rad),measure:"abs rad"}}};function xp(n,e={}){return n.map(t=>{let i=d_[t.id]||dp[t.id];if(!i)return{id:t.id,n:0,failures:[{reason:"JS \uCABD \uB300\uC870 \uD568\uC218 \uC5C6\uC74C"}],max_err:NaN,ok:!1};let s=i(t,e);return{id:t.id,n:t.cases.length,tolerance:t.tolerance,...s,ok:s.failures.length===0}})}var cr="fetch";async function yp(n){let e=`data/${n}`;if(typeof navigator<"u"&&navigator.onLine===!1&&typeof caches<"u"){let i=await caches.match(new URL(e,location.href).href);if(!i)throw new Error(`\uC624\uD504\uB77C\uC778 \u2014 \uB2F4\uC544 \uB454 \uD30C\uC77C\uC774 \uC544\uB2D8: ${n}`);return i}let t=await fetch(e);if(!t.ok)throw new Error(`\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD568: ${n} (${t.status})`);return t}async function Ps(n){return(await yp(n)).json()}async function ai(n){return new Uint8Array(await(await yp(n)).arrayBuffer())}var Bd={};dd(Bd,{APP_NAME:()=>Hr,DICTS:()=>ur,apply:()=>yt,getLang:()=>Vn,has:()=>_o,init:()=>Od,initialLang:()=>wp,onChange:()=>dr,pick:()=>Tt,setGeneralLabels:()=>Fd,setLang:()=>go,t:()=>me});var vp={"app.subtitle":"7\uB2E8\uACC4 3D \uC2DC\uAC01\uD654 \xB7 M2 JWST \uCE35","lang.switch":"English","lang.switch_title":"\uC5B8\uC5B4 \uBC14\uAFB8\uAE30","version.commit":"\uCEE4\uBC0B","version.dirty":"\uC218\uC815 \uC911","version.title":"\uBC84\uC804 \xB7 \uBE4C\uB4DC \uB0A0\uC9DC (\uD55C\uAD6D \uC2DC\uAC04) \xB7 \uCEE4\uBC0B","panel.samples":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790","panel.samples_note":"\uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D\uC774 \uC5F4\uB9B0\uB2E4. \uAF2C\uB9AC\uD45C\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB9AC\uBA74 \uC138\uBD80 \uBD84\uB958\uAC00 \uBCF4\uC778\uB2E4.","tag.weak":"\uC57D\uD568","tag.display_approx":"\uD45C\uC2DC\uC6A9 \uADFC\uC0AC","source.title":"\uCD9C\uCC98","source.value":"\uAC12","source.unit":"\uB2E8\uC704","source.file":"\uD30C\uC77C","source.key":"\uD0A4","source.commit":"\uACC4\uC0B0","source.source_hash":"\uC18C\uC2A4 \uD574\uC2DC (\uC55E 12 \uC790\uB9AC)","source.ref_commit":"\uCC38\uACE0 \uCEE4\uBC0B","source.build":"\uD654\uBA74 \uD310","source.stage":"\uB2E8\uACC4","source.model":"\uBAA8\uB378","source.verification":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","source.note":"\uC124\uBA85","source.close":"\uB2EB\uAE30","source.browser_calc":"\uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uD14C\uC2A4\uD2B8 \uD1B5\uACFC, \uD5C8\uC6A9 \uC624\uCC28 {tol})","source.time_scale":"\uC2DC\uAC04 \uCCB4\uACC4","pwa.update":"\uC0C8 \uBC84\uC804 \uC788\uC74C \u2014 \uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30","pwa.offline_ready":"\uC624\uD504\uB77C\uC778 \uC900\uBE44\uB428","error.load":"\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD588\uB2E4: {msg}","error.schema":"\uC790\uB8CC \uD615\uC2DD \uC624\uB958: {msg}","body.sun":"\uD0DC\uC591","body.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","body.earth":"\uC9C0\uAD6C","body.moon":"\uB2EC","l2.panel":"L2 \uC7A5\uBA74","l2.mode":"\uC88C\uD45C\uACC4","l2.mode_rot":"\uD68C\uC804 \uC88C\uD45C","l2.mode_inertial":"\uAD00\uC131 \uC88C\uD45C","l2.view":"\uBCF4\uAE30","l2.view_all":"\uC804\uCCB4","l2.view_emb":"\uC9C0\uAD6C\u2013\uB2EC\u2013L1\xB7L2","l2.view_l2":"L2 \uADFC\uCC98","l2.view_l2zoom":"L2 \uD655\uB300","l2.time":"\uC2DC\uAC01","l2.play":"\uC7AC\uC0DD","l2.pause":"\uBA48\uCDA4","l2.speed":"{n} \uC77C/\uCD08","l2.layer_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810","l2.layer_bodies":"\uD0DC\uC591\xB7EMB","l2.layer_dirs":"L2 \uBD88\uC548\uC815\xB7\uC548\uC815 \uBC29\uD5A5","l2.layer_earthmoon":"\uC9C0\uAD6C\xB7\uB2EC (\uC2E4\uC81C \uCC9C\uCCB4\uB825)","l2.layer_halo":"3-C \uD5E4\uC77C\uB85C \uC871","l2.layer_escape":"3-B \uC774\uD0C8 \uADA4\uC801","l2.layer_burns":"\uC218\uC815 \uC704\uCE58 (3-A\xB73-C\xB74-C)","l2.layer_ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","l2.unstable":"\uBD88\uC548\uC815","l2.stable":"\uC548\uC815","l2.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","l2.g_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810 (1\uB2E8\uACC4)","l2.g_dirs":"L2 \uBC29\uD5A5 (2\uB2E8\uACC4)","l2.g_halo":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4 (3-C)","l2.g_annual":"\uC5F0\uAC04 \u0394v (3-A\xB73-C\xB74-C)","l2.g_ref":"\uAE30\uC900 \uADA4\uB3C4\uC640 \uD5E4\uC77C\uB85C (4-C\xB74-D)","l2.g_escape":"\uC774\uD0C8 \uC2DC\uAC01 (3-B)","l2.g_interp":"\uCC9C\uCCB4\uB825 \uBCF4\uAC04 \uC790\uCCB4 \uC624\uCC28 (4-A)","l2.g_m0":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790 (M0)","l2.legend_markers":"\uD45C\uC9C0 \uD06C\uAE30\xB7\uD654\uC0B4 \uAE38\uC774\uB294 \uC2E4\uC81C \uD06C\uAE30\uAC00 \uC544\uB2D8 (\uD45C\uC2DC\uC6A9). \uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D.","l2.legend_pulsating":"\uC9C0\uAD6C\xB7\uB2EC: \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C \u2014 \uAE38\uC774 \uB2E8\uC704 = \uADF8 \uC21C\uAC04\uC758 \uD0DC\uC591\u2013EMB \uAC70\uB9AC. 4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4\uB3C4 \uAC19\uC740 \uC88C\uD45C.","l2.legend_inertial":"\uAD00\uC131 \uC88C\uD45C: x \uCD95 = \uD669\uB3C4 J2000 X, z \uCD95 = \uADA4\uB3C4\uBA74 \uBC95\uC120 (\u2248 \uD669\uB3C4 \uBD81\uADF9). CR3BP \uD68C\uC804\uC88C\uD45C\uB97C \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/\uC2DC\uAC04 \uB2E8\uC704 \uB9CC\uD07C \uB3CC\uB9B0 \uAC83 (\u03B8\u2080 = \uADF8\uB0A0 EMB \uC758 \uD669\uACBD).","source.browser":"\uACC4\uC0B0 \uC704\uCE58","l2.escape_rule":"\uD45C\uC2DC\uC6A9\uC73C\uB85C \uACE0\uB978 \uC608 (\uADDC\uCE59: e_u* \uBD80\uD638\uB9C8\uB2E4 |e_u*|/\u03B3 \uAC00 1e-9\xB71e-7\xB71e-5 \uC5D0 \uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC8FC \uD45C\uBCF8 \uD558\uB098\uC529, 0.316\u03B3 \uC774\uD0C8\xB7\uC7A1\uC74C \uC9C0\uBC30 \uD45C\uBCF8 \uC81C\uC678)","panel.open":"\uD328\uB110 \uD3B4\uAE30","panel.close":"\uD328\uB110 \uC811\uAE30","ui.layers":"\uB808\uC774\uC5B4","ui.legend":"\uBC94\uB840","ui.numbers":"\uBAA8\uB4E0 \uC22B\uC790","ui.menu":"\uBA54\uB274","card.sphere_note":"\uAD6C\uB294 \uBCF4\uC774\uAC8C \uD0A4\uC6CC \uADF8\uB838\uB2E4 (\uC2E4\uC81C \uBC18\uC9C0\uB984: Horizons \uBA38\uB9AC\uB9D0)","card.no_numbers":"\uC774 \uCC9C\uCCB4\uC5D0 \uB538\uB9B0 \uACB0\uACFC \uC22B\uC790\uB294 \uC544\uC9C1 \uC5C6\uB2E4","l2.family_all":"\uD5E4\uC77C\uB85C \uC871 \uC804\uCCB4 \uBCF4\uAE30 (\uAE30\uBCF8\uC740 \uC77C\uBD80\uB9CC)","l2.legend_spheres":"\uD0DC\uC591\xB7\uC9C0\uAD6C\xB7\uB2EC\uC740 \uD06C\uAE30 \uC788\uB294 \uAD6C \u2014 \uC791\uC73C\uBA74 \uBCF4\uC774\uAC8C \uD0A4\uC6B4\uB2E4","tag.short_impl":"\uAD6C\uD604","tag.short_external":"\uC678\uBD80","tag.short_physical":"\uBB3C\uB9AC","preset.clean":"\uAE54\uB054","preset.explore":"\uD0D0\uC0C9","preset.research":"\uC5F0\uAD6C","preset.custom":"\uC0AC\uC6A9\uC790 \uC124\uC815","preset.zooming":"\uD655\uB300 \uC911","layer.g_bodies":"\uCC9C\uCCB4\xB7\uC810","layer.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801","layer.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C","layer.g_aux":"\uBCF4\uC870","layer.sun":"\uD0DC\uC591","layer.earth":"\uC9C0\uAD6C","layer.moon":"\uB2EC","layer.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","layer.lpoints":"L1 ~ L5","layer.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","layer.halo_family":"\uD5E4\uC77C\uB85C \uC871","layer.escape":"3-B \uC774\uD0C8 \uADA4\uC801","layer.ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","layer.burns":"\uC218\uC815 (\u0394v) \uC704\uCE58","layer.moon_orbit":"\uB2EC \uADA4\uB3C4 (\uC9C0\uB09C 30 \uC77C \uC790\uCDE8)","layer.planet_orbits":"\uACF5\uC804 \uADA4\uB3C4","layer.dirs":"L2 \uBC29\uD5A5\uC120 (\uBD88\uC548\uC815\xB7\uC548\uC815)","layer.n_distance":"\uAC70\uB9AC","layer.n_period":"\uC8FC\uAE30","layer.n_angle":"\uBC29\uD5A5 \uAC01\uB3C4","layer.n_annual":"\uC5F0\uAC04 \u0394v","layer.n_escape":"\uC774\uD0C8 \uC2DC\uAC01","layer.n_tags":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","layer.labels":"\uC774\uB984\uD45C","layer.scale":"\uAC70\uB9AC \uB208\uAE08","layer.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790 (\uADA4\uB3C4\uBA74)","layer.axes":"\uC88C\uD45C\uCD95","layer.tags_note":"\uAF2C\uB9AC\uD45C\uB97C \uB044\uBA74 \uC22B\uC790\uB3C4 \uBAA8\uB450 \uC228\uB294\uB2E4 \u2014 \uC22B\uC790\uB294 \uC5B8\uC81C\uB098 \uAF2C\uB9AC\uD45C\uC640 \uD568\uAED8","key.labels":"\uC774\uB984\uD45C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_bodies":"\uCC9C\uCCB4\xB7\uC810 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790","key.p_clean":"\uD504\uB9AC\uC14B: \uAE54\uB054","key.p_explore":"\uD504\uB9AC\uC14B: \uD0D0\uC0C9","key.p_research":"\uD504\uB9AC\uC14B: \uC5F0\uAD6C","key.help":"\uC774 \uB3C4\uC6C0\uB9D0","help.title":"\uB2E8\uCD95\uD0A4","help.button":"\uB2E8\uCD95\uD0A4 (?)","help.note":"\uB808\uC774\uC5B4 \uB2E8\uCD95\uD0A4\uB294 \uB9C9\uB300\uB97C \uAEBC\uB0B4\uC9C0 \uC54A\uB294\uB2E4. Esc = \uB9C9\uB300 \uC228\uAE30\uAE30. \uCF20 \uC0C1\uD0DC\uB294 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uAE30\uC5B5\uB41C\uB2E4.","help.keys_line":"L \uC774\uB984\uD45C \xB7 O \uADA4\uB3C4 \xB7 N \uC218\uCE58 \xB7 1 2 3 \uD504\uB9AC\uC14B","time.jwst_band":"\uC2E4\uC81C \uBE44\uD589 \uAE30\uB85D ~{rec} / JPL \uC608\uCE21 ~{pred}","time.jwst_band_rec":"\uC2E4\uC81C \uBE44\uD589 \uAE30\uB85D ~{rec}","time.start":"\uCC98\uC74C\uC73C\uB85C","time.now":"\uD604\uC7AC","card.numbers_off":"\uCF1C\uC9C4 \uC218\uCE58 \uB808\uC774\uC5B4\uAC00 \uC5C6\uC5B4 \uC22B\uC790\uB97C \uC228\uACBC\uB2E4 (\uB808\uC774\uC5B4 \u2192 \uBB3C\uB9AC \uC218\uCE58)","desc.Sun":"\uD0DC\uC591. CR3BP \uC758 \uD070 \uC9C8\uB7C9 (\uCCAB\uC9F8 \uCC9C\uCCB4).","desc.EMB":"\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC. CR3BP \uC758 \uB458\uC9F8 \uCC9C\uCCB4 (\uC9C0\uAD6C\uC640 \uB2EC\uC744 \uD55C \uC810\uC73C\uB85C \uBCF8 \uAC83).","desc.Earth":"\uC9C0\uAD6C. \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC704\uCE58\uB97C \uB9E5\uB3D9 \uC88C\uD45C\uB85C \uADF8\uB838\uB2E4. \uB0AE\xB7\uBC24 \uACBD\uACC4\uB294 \uD587\uBE5B \uBC29\uD5A5.","desc.Moon":`\uB2EC. \uC2E4\uC81C \uCC9C\uCCB4\uB825 \uC704\uCE58. \uB4A4\uC758 \uAF2C\uB9AC\uB294 \uC9C0\uB09C \uC790\uCDE8 (\uB4A4\uB85C \uAC08\uC218\uB85D \uD750\uB9BC). \uD45C\uBA74 \uADF8\uB9BC: NASA SVS CGI Moon Kit (LRO LROC, \uACF5\uACF5 \uC601\uC5ED \u2014 \uCD9C\uCC98 "NASA's Scientific Visualization Studio"). \uADF8\uB9BC \uBC29\uD5A5\uC740 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC (\uD3C9\uADE0 \uC9C0\uAD6C \uCABD \uBA74\uC744 \uC9C0\uAD6C \uCABD\uC73C\uB85C, \uCE6D\uB3D9 \uC5C6\uC74C).`,"desc.L1":"\uD0DC\uC591 \uCABD \uB77C\uADF8\uB791\uC8FC \uC810 (CR3BP \uD3C9\uD615\uC810, 1\uB2E8\uACC4). \uBD88\uC548\uC815 \u2014 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uC9C1\uC811 \uACC4\uC0B0\uD558\uC9C0\uB294 \uC54A\uC558\uB2E4 (\uACF5\uC120 \uD3C9\uD615\uC810\uC774 \uBD88\uC548\uC815\uD558\uB2E4\uB294 \uC11C\uC220\uC758 \uCABD\uC218\uB294 \uD655\uC778 \uD544\uC694).","desc.L2":"\uC774 \uC5F0\uAD6C\uC758 \uB300\uC0C1. \uD0DC\uC591 \uBC18\uB300\uCABD \uD3C9\uD615\uC810 \u2014 \uBD88\uC548\uC815\uD574\uC11C \uADA4\uB3C4 \uC720\uC9C0 (\u0394v) \uAC00 \uD544\uC694\uD558\uB2E4.","desc.L3":"\uD0DC\uC591 \uB108\uBA38 \uBC18\uB300\uD3B8\uC758 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC548\uC815\uC131\uC740 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uACC4\uC0B0\uD558\uC9C0 \uC54A\uC558\uB2E4 (\uD655\uC778 \uD544\uC694).","desc.L4":"\uC55E\uC11C\uAC00\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (\u03BC \uAC00 \uC784\uACC4 \uC9C8\uB7C9\uBE44 (Sicardy 2010) \uBCF4\uB2E4 \uD6E8\uC52C \uC791\uC74C, \uAD6C\uD604 \uAC80\uC99D \u2014 \uBB38\uD5CC \uB300\uC870).","desc.L5":"\uB4A4\uB530\uB974\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (L4 \uC640 \uAC19\uC74C).","desc.halo_main":"3-C \uC5D0\uC11C \uB9CC\uB4E0 \uD5E4\uC77C\uB85C \uADA4\uB3C4 \uC871\uC758 \uC8FC \uADA4\uB3C4 \u2014 \uADA4\uB3C4 \uC720\uC9C0 \uACC4\uC0B0\uC758 \uAE30\uC900.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","l2.layer_jwst_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","l2.layer_jwst_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","l2.legend_jwst":"JWST (\uAE08\uBE5B): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uADF8 \uC0AC\uC774 \uBCF4\uAC04 (4-A \uC5D0\uB974\uBBF8\uD2B8), \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uC608\uCE21: \uC8FC\uD669 = JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870), \uCD08\uB85D = \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D), \uC9C4\uD55C \uC120 = \uBE44\uAD50 \uB300\uC0C1, \uC605\uC740 \uC120 = \uB0B4 \uBAA8\uD615","layer.jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","layer.jwst_ext":"\uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870)","layer.jwst_phys":"\uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D)","layer.n_jwst":"\uC608\uCE21 \uC624\uCC28","body.jwst":"JWST","desc.JWST":"\uC81C\uC784\uC2A4 \uC6F9 \uC6B0\uC8FC\uB9DD\uC6D0\uACBD. \uAE08\uBE5B \uC120 = \uC7AC\uAD6C\uC131\uD55C \uC2E4\uC81C \uBE44\uD589 \uADA4\uC801 (Horizons, 4-A \uC790\uB8CC): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uD558\uB8E8 \uB9C8\uB514 \uC0AC\uC774 \uBCF4\uAC04, \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uD45C\uC9C0 = \uC7AC\uAD6C\uC131 \uB05D. \uC544\uB798\uB294 5\uB2E8\uACC4 \uC608\uCE21\uC758 \uB450 \uBE44\uAD50 \u2014 \uAF2C\uB9AC\uD45C\uAC00 \uB2E4\uB974\uB2E4.","desc.jwst_period":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801\uC758 \uD55C \uBC14\uD034 \uAE38\uC774\uB97C NASA \uC6D0\uBB38, \uAC19\uC740 \uD06C\uAE30\uC758 CR3BP \uD5E4\uC77C\uB85C\uC640 \uBE44\uAD50\uD55C\uB2E4.","jwst.orbit_label":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","jwst.layer_ext_short":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","jwst.layer_phys_short":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","jwst.layer_ext":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50","jwst.layer_phys":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50","jwst.rep_5d":"5 \uC77C","jwst.axis_note":"\uC138\uB85C = \uC704\uCE58 \uCC28 (km, \uB85C\uADF8), \uAC00\uB85C = \uC2DC\uC791 \uB4A4 (\uC77C). \uC810 = results/stage5.json \uC5D0 \uC801\uD78C \uAC12","jwst.period_button":"\uC8FC\uAE30 \uC124\uBA85 \uCE74\uB4DC \uC5F4\uAE30","jwst.period_title":"JWST \uC8FC\uAE30 \u2014 \uC7AC\uAD6C\uC131 \uB300 NASA\xB7\uD5E4\uC77C\uB85C","jwst.period_class":"\uBD84\uB958","jwst.no_predictions":"\uC608\uCE21 \uC790\uB8CC\uAC00 \uC5C6\uB2E4","jwst.g_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_period":"JWST \uC8FC\uAE30 (4-A)","l2.view_jwstzoom":"JWST \uD655\uB300","l2.legend_jwstzoom":"JWST \uD655\uB300 (\uC608\uCE21 \uB05D \uB458\uB808 \uC218\uC2ED km): \uD070 \uC810 = \uAC19\uC740 \uC2DC\uAC01\uC758 \uC810, \uD770 \uC120\uBD84 = \uADF8 \uB458 \uC0AC\uC774 \uC704\uCE58 \uCC28 (\uC22B\uC790\uB294 Python \uAC12\uACFC \uAF2C\uB9AC\uD45C). \uC120\uC740 \uC800\uC7A5\uD55C \uC810 (1 \uC2DC\uAC04 \uAC04\uACA9, JPL 01U \uB294 \uD558\uB8E8 \uAC04\uACA9) \uC744 \uACE7\uAC8C \uC774\uC74C. \uADF8\uB9AC\uB294 \uC704\uCE58\uB294 \uB9E5\uB3D9 \uC88C\uD45C\uB77C \uC2E4\uC81C \uAC70\uB9AC\uC640 1 % \uC548\uC5D0\uC11C \uB2E4\uB974\uB2E4","jwst.marker_at":"{date} TDB \uC790\uB8CC \uC810","jwst.marker_pred":"{date} TDB JPL \uC608\uCE21 ({sol})","jwst.no_data":"\uC774 \uB0A0\uC9DC\uC5D0\uB294 JWST \uADA4\uC801 \uC790\uB8CC\uAC00 \uC5C6\uC74C ({from} ~ {to})","jwst.data_range":"JWST \uADA4\uC801 \uC790\uB8CC \uAE30\uAC04 {from} ~ {to} (TDB). \uADF8 \uC0AC\uC774 \uC810\uC740 \uBC1B\uC740 \uC790\uB8CC \uC810 \uADF8\uB300\uB85C \u2014 \uBCF4\uAC04\uD558\uC9C0 \uC54A\uC74C","jwst.no_data_short":"\uC790\uB8CC \uC5C6\uB294 \uB0A0\uC9DC","jwst.pred_ahead":"JPL \uC608\uCE21 ({sol}) \u2014 \uC544\uC9C1 \uC624\uC9C0 \uC54A\uC740 \uAE38","jwst.zoom_phys":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uB300\uD45C 5 \uC77C \uC9C0\uC810 (\uC138 \uC120)","jwst.zoom_ext":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uCC3D \uB05D:","jwst.zoom_focus_R5":"JWST \uD655\uB300 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50, \uB300\uD45C 5 \uC77C \uC9C0\uC810","jwst.zoom_focus_A":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D A \uB05D","jwst.zoom_focus_B":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D B \uB05D","jwst.zoom_focus_C":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D C \uB05D","jwst.zoom_norecon":"\uC2E4\uC81C \uADA4\uC801 \uC790\uB8CC \uC5C6\uC74C (2026-10-05 \uC774\uD6C4)","jwst.zl_recon":"\uC7AC\uAD6C\uC131 \uADA4\uC801 (03U)","jwst.zl_mine_kB":"\uB0B4 \uBAA8\uD615 (k_B)","jwst.zl_jpl01U":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21 (01U)","jwst.zl_jpl":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21","jwst.gap_mine_recon":"\uB0B4 \uBAA8\uD615 \u2194 \uC7AC\uAD6C\uC131","jwst.gap_jpl_recon":"JPL \u2194 \uC7AC\uAD6C\uC131","jwst.gap_mine_jpl":"\uB0B4 \uBAA8\uD615 \u2194 JPL","source.join":"\uC7AC\uAD6C\uC131 \uADA4\uC801 \uC774\uC74C","l2.view_lab":"\uC2E4\uD5D8\uC2E4","lab.title":"\uC2E4\uD5D8\uC2E4 \u2014 L2 \uADFC\uCC98 \uCD08\uAE30 \uC0C1\uD0DC\uC758 \uC774\uD0C8","lab.scope":"CR3BP \uBAA8\uD615 \uC548\uC758 \uACB0\uACFC (\uAD6C\uD604 \uAC80\uC99D \uC131\uACA9 \u2014 \uBB3C\uB9AC \uAC80\uC99D \uC544\uB2D8). \uC22B\uC790\uB294 \uBAA8\uB450 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uC2DC\uD5D8 \uD1B5\uACFC)","lab.fold":"\uC811\uAE30","lab.unfold":"\uD3BC\uCE58\uAE30","lab.loading":"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC \uBD88\uB7EC\uC624\uB294 \uC911\u2026 (\uCC98\uC74C \uD55C \uBC88, \uC57D 17 MB)","lab.examples":"\uC608\uC2DC","lab.ex_q10":"\uBE60\uB978 \uC774\uD0C8 (10 %)","lab.ex_q50":"\uC911\uAC04 (50 %)","lab.ex_q90":"\uB290\uB9B0 \uC774\uD0C8 (90 %)","lab.ex_out":"\uBC94\uC704 \uBC16 \uC2DC\uC5F0","lab.ex_noise":"\uC7A1\uC74C \uBC14\uB2E5 \uADFC\uCC98","lab.ex_src":"\uC608\uC2DC \uCD9C\uCC98: {src} (3-B \uD45C\uBCF8 \uBC88\uD638 {no})","lab.s_sign":"e_u \uBD80\uD638","lab.s_eu":"|e_u| (\uBD88\uC548\uC815)","lab.s_es":"e_s (\uC548\uC815)","lab.s_ap":"\uBA74\uB0B4 \uC9C4\uD3ED A_p","lab.s_phip":"\uBA74\uB0B4 \uC704\uC0C1","lab.s_az":"\uBA74\uC678 \uC9C4\uD3ED A_z","lab.s_phiz":"\uBA74\uC678 \uC704\uC0C1","lab.sign_out":"+ \uBC14\uAE65\uCABD","lab.sign_in":"\u2212 \uC9C0\uAD6C \uCABD","lab.outside":"\uBC94\uC704 \uBC16 \uD5C8\uC6A9 (\uC678\uC0BD \u2014 \uC5F0\uAD6C \uD504\uB9AC\uC14B\uB9CC)","lab.col_r":"\uAE30\uC900 R","lab.col_truth":"\uC815\uB2F5 [\uC77C]","lab.col_t3":"T3 [\uC77C]","lab.col_d24":"D24 [\uC77C]","lab.col_mlp":"MLP-C_ln [\uC77C]","lab.col_hybrid":"\uD558\uC774\uBE0C\uB9AC\uB4DC [\uC77C] \u2014 \uD310\uC815: \uAE30\uAC01","lab.col_dt3":"T3 \uCC28 \u0394ln t","lab.col_dd24":"D24 \uCC28 \u0394ln t","lab.col_dmlp":"MLP \uCC28 \u0394ln t","lab.col_dir":"\uBC29\uD5A5 (e_u*)","lab.col_flag":"\uC2E0\uB8B0\uB3C4","lab.flag_extrap":"\uC678\uC0BD","lab.flag_unc":"\uBD88\uD655\uC2E4","lab.flag_unc_mismatch":"MLP-C_ln \uACFC T3 \uC758 \uCC28\uAC00 \uAC80\uC99D RMSE_log \uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.flag_unc_spread":"MLP \uC2DC\uB4DC 3 \uAC1C\uC758 \uD37C\uC9D0\uC774 \uAC80\uC99D \uC911\uC559\uAC12\uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.extrap_long":"\uC678\uC0BD \u2014 \uC2E0\uB8B0\uD558\uC9C0 \uC54A\uC74C (\uD559\uC2B5 \uBC94\uC704 \uBC16)","lab.no_escape":"\uBBF8\uC774\uD0C8","lab.dir_hit":"\uB9DE\uC74C","lab.dir_miss":"\uD2C0\uB9BC","lab.waiting":"\uC190\uC744 \uB193\uC73C\uBA74 \uC815\uB2F5 \uC801\uBD84 \uC2DC\uC791","lab.integrating":"\uC815\uB2F5 \uC801\uBD84 \uC911 (Worker)\u2026","lab.integrating_days":"\uC815\uB2F5 \uC801\uBD84 \uC911 \u2014 {d} \uC77C","lab.done":"\uC815\uB2F5 \uC801\uBD84 \uB05D ({ms} ms, \uADA4\uC801 \uC810 {n} \uAC1C)","lab.error":"\uC624\uB958: {msg}","lab.hybrid_note":"\uD558\uC774\uBE0C\uB9AC\uB4DC = T3\xB7D24 \uB97C R \uB9C8\uB2E4 \uC774\uC5B4 \uBD99\uC778 \uAC83 \u2014 \uBB34\uAC8C w_R 6 \uAC1C\uAC00 \uBAA8\uB450 0 \uC774\uB77C D24 \uC640 \uAC19\uB2E4. \uC0AC\uC804 \uB4F1\uB85D \uD310\uC815 (H): \uAE30\uAC01 (\uAD6C\uC870\uC801), \uC794\uCC28 \uBAA8\uB378 \uD310\uC815 (R): \uC9C0\uC9C0. ","lab.foot":"T3 = \uC120\uD615 \uC774\uB860 + 2\uCC28 \uBCF4\uC815 e_u*, D24 = T3 + RF \uC794\uCC28 (50 \uADF8\uB8E8), MLP-C_ln = \uC2E0\uACBD\uB9DD \uC2DC\uB4DC 3 \uD3C9\uADE0. \uC815\uB2F5 = DOP853 \uC801\uBD84 (rtol 1e-12, \uCD5C\uB300 730.5 \uC77C, 0.316\u03B3 \uC5D0\uC11C \uBA48\uCDA4). \u0394ln t = \uC608\uCE21 \u2212 \uC815\uB2F5.","lab.mobile_note":"\uC2E4\uD5D8\uC2E4\uC740 \uCEF4\uD4E8\uD130\uC5D0\uC11C \uC774\uC6A9\uD574 \uC8FC\uC138\uC694. \uD734\uB300\uD3F0 \uD654\uBA74\uC5D0\uC11C\uB294 \uC2AC\uB77C\uC774\uB354\uC640 \uACB0\uACFC \uD45C\uAC00 \uC881\uC544 \uCD08\uAE30 \uC0C1\uD0DC\uB97C \uC815\uD655\uD788 \uB193\uAE30 \uC5B4\uB835\uC2B5\uB2C8\uB2E4. (\uC548\uB0B4 \uBB38\uAD6C \uCD08\uC548 \u2014 \uC0AC\uC6A9\uC790 \uD655\uC778 \uB300\uAE30)","time.go":"\uC774\uB3D9","time.out_of_range":"\uC790\uB8CC \uAE30\uAC04 \uBC16 (2022-01-01 ~ 2049-12-31)","time.loading":"\uCC9C\uCCB4\uB825 \uBD88\uB7EC\uC624\uB294 \uC911\u2026","l2.view_solar":"\uD0DC\uC591\uACC4","body.mercury":"\uC218\uC131\uACC4","body.venus":"\uAE08\uC131\uACC4","body.mars":"\uD654\uC131\uACC4","body.jupiter":"\uBAA9\uC131\uACC4","body.saturn":"\uD1A0\uC131\uACC4","body.uranus":"\uCC9C\uC655\uC131\uACC4","body.neptune":"\uD574\uC655\uC131\uACC4","desc.Mercury":"\uC218\uC131 (\uD589\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC \u2014 \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 12 \uC2DC\uAC04 \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Venus":"\uAE08\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 2 \uC77C \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Mars":"\uD654\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 4 \uC77C \uAC04\uACA9).","desc.Jupiter":"\uBAA9\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 16 \uC77C \uAC04\uACA9).","desc.Saturn":"\uD1A0\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Uranus":"\uCC9C\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Neptune":"\uD574\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","view.true_size":"\uC2E4\uC81C \uD06C\uAE30","view.true_size_title":"\uCC9C\uCCB4 \uD06C\uAE30 \uACFC\uC7A5 (\uD654\uBA74\uC5D0\uC11C \uC791\uC73C\uBA74 \uD0A4\uC6C0 \u2014 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC) \uB044\uAE30","layer.planets":"\uD589\uC131\uACC4","layer.stars":"\uBCC4","layer.milkyway":"\uC740\uD558\uC218","layer.clouds":"\uAD6C\uB984 (\uD45C\uC2DC\uC6A9 \u2014 \uADF8\uB0A0 \uAD6C\uB984 \uC544\uB2D8)","layer.nightlights":"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B","layer.sunglow":"\uD0DC\uC591 \uBE5B \uBC88\uC9D0","sky.credits_stars":"\uBCC4: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"\uC740\uD558\uC218: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"\uB2EC: NASA SVS (\uACF5\uACF5 \uC601\uC5ED)","sky.credits_horizons":"\uADA4\uB3C4: JPL Horizons","sky.credits_earth":"\uC9C0\uAD6C \uD45C\uBA74: NASA Earth Observatory (Blue Marble\xB7Black Marble)","credits.short":"\uCD9C\uCC98","credits.images":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98","credits.open":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98 \uBCF4\uAE30 (\uCD9C\uCC98 \uCC3D)","credits.nasa_rule":"NASA \uD45C\uAE30 \uADFC\uAC70 (\uC6D0\uBB38):","nav.label":"\uD0D0\uC0C9","nav.targets":"\uB300\uC0C1 \uBAA9\uB85D (T)","nav.targets_panel":"\uB300\uC0C1 \uBAA9\uB85D","nav.targets_close":"\uB300\uC0C1 \uBAA9\uB85D \uB2EB\uAE30","nav.search_ph":"\uC774\uB984\uC73C\uB85C \uCC3E\uAE30","tr.label":"\uC804\uC5ED","tr.search":"\uAC80\uC0C9","tr.search_title":"\uAC80\uC0C9 ( / )","tr.settings":"\uC124\uC815","mode.label":"\uD654\uBA74 \uBAA8\uB4DC","mode.general":"\uC77C\uBC18","mode.expert":"\uC804\uBB38\uAC00","layer.view_options":"\uBCF4\uAE30 \uC635\uC158","settings.lang":"\uC5B8\uC5B4","settings.legend":"\uD654\uBA74 \uC77D\uB294 \uBC95","settings.keys":"\uB2E8\uCD95\uD0A4","settings.about":"\uC815\uBCF4","tgt.g_tour":"\uB458\uB7EC\uBCF4\uAE30","tgt.g_views":"\uBCF4\uAE30","tgt.g_points":"\uB77C\uADF8\uB791\uC8FC \uC810","tgt.g_orbits":"\uADA4\uB3C4 \xB7 \uC6B0\uC8FC\uC120","tgt.g_bodies":"\uCC9C\uCCB4","tgt.g_tools":"\uB3C4\uAD6C","tgt.tour":"\uCC98\uC74C\uBD80\uD130 \uB458\uB7EC\uBCF4\uAE30","kind.point":"\uB77C\uADF8\uB791\uC8FC \uC810","kind.orbit":"\uADA4\uB3C4","kind.craft":"\uC6B0\uC8FC\uB9DD\uC6D0\uACBD","kind.period":"\uADA4\uB3C4 \uC8FC\uAE30 \uBE44\uAD50","kind.star":"\uD56D\uC131","kind.planet":"\uD589\uC131","kind.moon":"\uC704\uC131","kind.bary":"\uC9C8\uB7C9\uC911\uC2EC","kind.system":"\uD589\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC","kind.view":"\uBCF4\uAE30","kind.zoom":"\uD655\uB300 \uBCF4\uAE30","kind.numbers":"\uC22B\uC790 \uBAA8\uC74C","desc.v_all":"\uD0DC\uC591 \uC911\uC2EC\uC758 \uB113\uC740 \uBCF4\uAE30 \u2014 \uC9C0\uAD6C \uACF5\uC804 \uADA4\uB3C4\uAC00 \uD55C \uD654\uBA74\uC5D0. \uD720\uB85C \uC904\uC774\uBA74 \uD0DC\uC591\uACC4 \uC804\uCCB4\uAE4C\uC9C0 \uBCFC \uC218 \uC788\uB2E4.","desc.v_emb":"\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC \uB458\uB808 \u2014 \uC9C0\uAD6C\xB7\uB2EC\uACFC L1\xB7L2 \uAC00 \uD55C \uD654\uBA74\uC5D0 (\uC5F0\uAD6C \uC124\uBA85\uC6A9).","desc.v_l2zoom":"L2 \uC810 \uB458\uB808\uB97C \uD655\uB300 \uD558\uD55C (\uC57D 1,000 km) \uAC70\uB9AC\uC5D0\uC11C \uBCF8\uB2E4.","info.label":"\uC815\uBCF4 \uD328\uB110","info.close":"\uC815\uBCF4 \uD328\uB110 \uB2EB\uAE30","info.more":"\uB354 \uBCF4\uAE30","info.expert_hint":"\uBAA8\uB4E0 \uC22B\uC790\xB7\uCD9C\uCC98\uB294 \uC804\uBB38\uAC00 \uBAA8\uB4DC\uC5D0\uC11C","info.focus_only":"\uCD08\uC810\uB9CC","info.fly":"\uB0A0\uC544\uAC00\uAE30","jwst.zoom_title":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30","jwst.zoom_r5":"5 \uC77C \uC9C0\uC810","jwst.zoom_window":"\uCC3D {w} \uB05D","time.group":"\uC2DC\uAC04","time.slider":"\uC2DC\uAC01","time.speed_menu":"\uC7AC\uC0DD \uC18D\uB3C4","time.speed_title":"\uC7AC\uC0DD \uC18D\uB3C4 (\uB204\uB974\uBA74 \uACE0\uB974\uAE30)","time.local":"\uC9C0\uC5ED","time.date_aria":"\uD654\uBA74 \uC2DC\uAC01 {utc} UTC (\uC9C0\uC5ED \uC2DC\uAC01 {local}, {zone}) \u2014 \uB204\uB974\uBA74 \uB0A0\uC9DC \uACE0\uB974\uAE30","time.now_title":"\uAE30\uAE30\uC758 \uC9C0\uAE08 \uC2DC\uAC01\uC73C\uB85C (\uBD84 \uB2E8\uC704)","time.now_out":"\uAE30\uAE30\uC758 \uC9C0\uAE08 \uC2DC\uAC01\uC774 \uC790\uB8CC \uAE30\uAC04 \uBC16\uC774\uB77C \uC4F8 \uC218 \uC5C6\uC74C","time.date_pop":"\uB0A0\uC9DC\uB85C \uC774\uB3D9","time.date_utc_note":"\uACE0\uB978 \uB0A0\uC9DC\uC758 UTC 0 \uC2DC\uB85C \uC774\uB3D9\uD55C\uB2E4","time.date_input":"\uB0A0\uC9DC","credits.long":"\uCD9C\uCC98\xB7\uB77C\uC774\uC120\uC2A4","hint.label":"\uCC98\uC74C \uC548\uB0B4","hint.lead":"\uD0DC\uC591 \uBC18\uB300\uCABD, JWST \uAC00 \uBA38\uBB34\uB294 \uD3C9\uD615\uC810 L2","hint.how":"\uB04C\uC5B4\uC11C \uB3CC\uB9AC\uAE30 \xB7 \uD720\uB85C \uD655\uB300","hint.tour":"\uB458\uB7EC\uBCF4\uAE30","hint.close":"\uC548\uB0B4 \uB2EB\uAE30","tag.open_hint":"\uB20C\uB7EC\uC11C \uCD9C\uCC98 \uBCF4\uAE30","tag.pop_label":"\uAF2C\uB9AC\uD45C\uC640 \uCD9C\uCC98","tag.pop_source":"\uCD9C\uCC98","tag.pop_open":"\uCD9C\uCC98 \uCC3D \uC5F4\uAE30","numg.L1_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.L2_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.L3_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.L4_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.L5_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.annual_3A":"\uC5F0\uAC04 \uADA4\uB3C4 \uC720\uC9C0 \u0394v \u2014 L2 \uC810\uC5D0 \uBA38\uBB3C\uAE30 (\uB2E8\uC21C \uBAA8\uD615)","numg.annual_3C":"\uC5F0\uAC04 \uADA4\uB3C4 \uC720\uC9C0 \u0394v \u2014 \uD5E4\uC77C\uB85C \uADA4\uB3C4 (\uB2E8\uC21C \uBAA8\uD615)","numg.annual_4C":"\uC5F0\uAC04 \uADA4\uB3C4 \uC720\uC9C0 \u0394v \u2014 \uD5E4\uC77C\uB85C \uADA4\uB3C4 (\uC2E4\uC81C \uCC9C\uCCB4 \uC704\uCE58)","numg.halo_period":"\uD55C \uBC14\uD034 \uB3C4\uB294 \uC2DC\uAC04","numg.halo_zmax":"\uD669\uB3C4\uBA74\uC5D0\uC11C \uAC00\uC7A5 \uBA3C \uB192\uC774","numg.unstable_deg":"\uAC00\uC7A5 \uBE68\uB9AC \uBA40\uC5B4\uC9C0\uB294 \uBC29\uD5A5","numg.stable_deg":"\uB418\uB3CC\uC544\uC624\uB294 \uBC29\uD5A5","numg.shift_max":"\uD587\uBE5B \uC555\uB825\uC744 \uB123\uC73C\uBA74 \uAE30\uC900 \uADA4\uB3C4\uAC00 \uC62E\uACA8 \uAC00\uB294 \uAC70\uB9AC (\uCD5C\uB300)","numg.shift_mean":"\uD587\uBE5B \uC555\uB825\uC744 \uB123\uC73C\uBA74 \uAE30\uC900 \uADA4\uB3C4\uAC00 \uC62E\uACA8 \uAC00\uB294 \uAC70\uB9AC (\uD3C9\uADE0)","numg.wrong_ref_4C":"\uC798\uBABB\uB41C \uAE30\uC900\uC744 \uC4F8 \uB54C \uB4DC\uB294 \u0394v \uC758 \uBC30\uC218 \u2014 \uB2E8\uC21C \uBAA8\uD615 \uD5E4\uC77C\uB85C\uB97C \uAE30\uC900\uC73C\uB85C","numg.wrong_ref_4D":"\uC798\uBABB\uB41C \uAE30\uC900\uC744 \uC4F8 \uB54C \uB4DC\uB294 \u0394v \uC758 \uBC30\uC218 \u2014 \uD587\uBE5B \uC555\uB825\uC744 \uBE80 \uAE30\uC900","numg.jwst_err_range":"\uC57D 4 \uC8FC \uB4A4 \uC704\uCE58 \uCC28 \u2014 \uC774 \uC5F0\uAD6C\uC758 \uC608\uCE21 \uB300 NASA JPL \uC608\uCE21 (4 \uAC00\uC9C0)","numg.jwst_err_R5":"5 \uC77C \uB4A4 \uC2E4\uC81C \uADA4\uC801\uACFC\uC758 \uC704\uCE58 \uCC28 \u2014 \uC774 \uC5F0\uAD6C\uC758 \uBAA8\uD615","numg.jwst_err_R5_jpl":"5 \uC77C \uB4A4 \uC2E4\uC81C \uADA4\uC801\uACFC\uC758 \uC704\uCE58 \uCC28 \u2014 NASA JPL \uC608\uCE21","numg.jwst_period_nasa":"NASA \uAC00 \uBC1D\uD78C \uD55C \uBC14\uD034","numg.jwst_period_recon":"\uC2E4\uC81C \uBE44\uD589 \uADA4\uC801\uC5D0\uC11C \uC7B0 \uD55C \uBC14\uD034 (\uC774 \uC5F0\uAD6C\uC758 \uACC4\uC0B0)","numg.jwst_period_halo":"\uAC19\uC740 \uD06C\uAE30 \uD5E4\uC77C\uB85C \uADA4\uB3C4\uC758 \uD55C \uBC14\uD034 (\uB2E8\uC21C \uBAA8\uD615)","tgtg.view-emb":"\uC9C0\uAD6C\xB7\uB2EC \uB458\uB808","tgtg.view-l2zoom":"L2 \uAC00\uAE4C\uC774","tgtg.halo_main":"\uD5E4\uC77C\uB85C \uADA4\uB3C4","tgtg.jwst_period":"JWST \uADA4\uB3C4 \uBE44\uAD50","lblg.body.emb":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC","lblg.l2.unstable":"\uBA40\uC5B4\uC9D0","lblg.l2.stable":"\uB418\uB3CC\uC544\uC634","lblg.l2.halo_main":"\uD5E4\uC77C\uB85C \uADA4\uB3C4","lblg.jwst.orbit_label":"JWST \uC2E4\uC81C \uADA4\uC801","lblg.jwst.layer_ext_short":"NASA JPL \uC608\uCE21\uACFC \uBE44\uAD50","lblg.jwst.layer_phys_short":"\uC2E4\uC81C \uADA4\uC801\uACFC \uBE44\uAD50","lblg.jwst.zl_recon":"\uC2E4\uC81C \uADA4\uC801","lblg.jwst.zl_mine_kB":"\uC774 \uC5F0\uAD6C\uC758 \uBAA8\uD615","lblg.jwst.zl_jpl01U":"NASA JPL \uC608\uCE21","lblg.jwst.zl_jpl":"NASA JPL \uC608\uCE21","lblg.jwst.gap_mine_recon":"\uC774 \uC5F0\uAD6C\uC758 \uBAA8\uD615 \u2194 \uC2E4\uC81C \uADA4\uC801","lblg.jwst.gap_jpl_recon":"NASA JPL \u2194 \uC2E4\uC81C \uADA4\uC801","lblg.jwst.gap_mine_jpl":"\uC774 \uC5F0\uAD6C\uC758 \uBAA8\uD615 \u2194 NASA JPL","tag.easy_impl":"\uCF54\uB4DC\uAC00 \uC758\uB3C4\uD55C \uC2DD\uC744 \uC815\uD655\uD788 \uD478\uB294\uC9C0 \uD655\uC778\uD55C \uAC12","tag.easy_external":"\uB2E4\uB978 \uAE30\uAD00\uC758 \uACC4\uC0B0\xB7\uC790\uB8CC\uC640 \uBE44\uAD50\uD55C \uAC12","tag.easy_physical":"\uC2E4\uC81C \uBE44\uD589 \uADA4\uC801\uACFC \uBE44\uAD50\uD55C \uAC12","tag.easy_more":"\uD30C\uC77C \uACBD\uB85C\xB7\uC138\uBD80 \uBD84\uB958\uB294 \uCD9C\uCC98 \uCC3D\uC5D0","hint.how_touch":"\uB04C\uC5B4\uC11C \uB3CC\uB9AC\uAE30 \xB7 \uB450 \uC190\uAC00\uB77D\uC73C\uB85C \uD655\uB300","info.tabs":"\uC815\uBCF4 \uD328\uB110 \uD0ED","info.tab_summary":"\uC694\uC57D","info.tab_all":"\uBAA8\uB4E0 \uC22B\uC790","info.tab_source":"\uCD9C\uCC98","info.src_none":"\uC774 \uB300\uC0C1\uC5D0\uB294 \uC22B\uC790\uAC00 \uC5C6\uB2E4","info.src_open":"\uCD9C\uCC98 \uCC3D","info.export_this":"\uC774 \uB300\uC0C1 \uB0B4\uBCF4\uB0B4\uAE30","status.label":"\uC0C1\uD0DC","status.tdb":"TDB","status.focus":"\uCD08\uC810 \uAC70\uB9AC","status.focus_title":"\uCE74\uBA54\uB77C\uC5D0\uC11C \uCD08\uC810 \uB300\uC0C1\uAE4C\uC9C0\uC758 \uAC70\uB9AC \u2014 \uADF8\uB9AC\uAE30 \uC0C1\uD0DC (\uD45C\uC2DC\uC6A9 \uADFC\uC0AC, \uAC80\uC99D \uAF2C\uB9AC\uD45C \uC5C6\uC74C)","status.more":"\uC0C1\uD0DC","status.more_title":"TDB \xB7 \uC88C\uD45C\uACC4 \xB7 \uCD08\uC810 \uAC70\uB9AC \uBCF4\uAE30","sheet.expand":"\uD328\uB110 \uD06C\uAC8C \u2014 \uB04C\uC5B4\uC11C \uD06C\uAE30 \uBC14\uAFB8\uAE30, \uC544\uB798\uB85C \uB04C\uBA74 \uB2EB\uD798","sheet.collapse":"\uD328\uB110 \uC791\uAC8C \u2014 \uB04C\uC5B4\uC11C \uD06C\uAE30 \uBC14\uAFB8\uAE30, \uC544\uB798\uB85C \uB04C\uBA74 \uB2EB\uD798","time.speed_unit":"\uC77C/\uCD08","time.speed_group":"\uC7AC\uC0DD \uC18D\uB3C4","export.button":"\uB0B4\uBCF4\uB0B4\uAE30 \xB7 \uACF5\uC720","export.title":"\uB0B4\uBCF4\uB0B4\uAE30 \xB7 \uACF5\uC720 \uC8FC\uC18C","export.csv":"\uC22B\uC790 CSV \uC800\uC7A5","export.json":"\uC22B\uC790 JSON \uC800\uC7A5","export.note":"\uD30C\uC77C \uC800\uC7A5\xB7\uD074\uB9BD\uBCF4\uB4DC\uB9CC \u2014 \uC678\uBD80\uB85C \uBCF4\uB0B4\uC9C0 \uC54A\uB294\uB2E4. \uC22B\uC790\uB294 Python \uACB0\uACFC \uAE00\uC790\uC640 \uCD9C\uCC98\xB7\uAF2C\uB9AC\uD45C \uADF8\uB300\uB85C","export.share":"\uACF5\uC720 \uC8FC\uC18C","export.copy":"\uC8FC\uC18C \uBCF5\uC0AC","export.copied":"\uBCF5\uC0AC\uD568","export.copy_fail":"\uBCF5\uC0AC \uBABB \uD568 \u2014 \uC8FC\uC18C\uB97C \uC9C1\uC811 \uACE0\uB974\uAE30","export.share_note":"\uC8FC\uC18C\uB85C \uC5F0 \uC0C1\uD0DC\uB294 \uC7A0\uC2DC \uC801\uC6A9 (\uC800\uC7A5\uD55C \uC124\uC815\uC740 \uADF8\uB300\uB85C)","export.shared_on":"\uACF5\uC720 \uC8FC\uC18C\uC758 \uC0C1\uD0DC\uB97C \uC7A0\uC2DC \uC801\uC6A9\uD568","layer.mode_default":"\uC774 \uBAA8\uB4DC \uAE30\uBCF8\uAC12\uC73C\uB85C","key.m_general":"\uC77C\uBC18 \uBAA8\uB4DC","key.m_expert":"\uC804\uBB38\uAC00 \uBAA8\uB4DC","key.export":"\uB0B4\uBCF4\uB0B4\uAE30 (\uC804\uBB38\uAC00)","tour.label":"\uB458\uB7EC\uBCF4\uAE30","tour.step":"{i} / {n}","tour.step_aria":"{n} \uACF3 \uAC00\uC6B4\uB370 {i} \uBC88\uC9F8","tour.prev":"\uC774\uC804","tour.next":"\uB2E4\uC74C","tour.finish":"\uB05D\uB0B4\uAE30","tour.end":"\uB458\uB7EC\uBCF4\uAE30 \uB05D\uB0B4\uAE30","tour.paused":"\uC7A5\uBA74\uC744 \uC6C0\uC9C1\uC5EC\uC11C \uC7A0\uC2DC \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.","tour.resume":"\uC774\uC5B4\uC11C \uAC00\uAE30","tour.keys":"\u2190 \u2192 \uB118\uAE30\uAE30 \xB7 Esc \uB05D\uB0B4\uAE30","tour.solar_title":"\uD0DC\uC591\uACC4","tour.solar_text":"\uD0DC\uC591\uACFC \uC5EC\uB35F \uD589\uC131\uC785\uB2C8\uB2E4. \uC774 \uD654\uBA74\uC758 \uC8FC\uC778\uACF5 L2 \uB294 \uC9C0\uAD6C \uBC14\uB85C \uBC14\uAE65, \uD0DC\uC591 \uBC18\uB300\uCABD\uC5D0 \uC788\uB294 \uC810\uC785\uB2C8\uB2E4. \uC9C0\uAD6C \uCABD\uC73C\uB85C \uAC00\uAE4C\uC774 \uAC00 \uBD05\uC2DC\uB2E4.","tour.emb_title":"\uC9C0\uAD6C\xB7\uB2EC \uB458\uB808 \u2014 L1 \uACFC L2","tour.emb_text":"\uC9C0\uAD6C\uC640 \uB2EC\uC744 \uD55C \uBAB8\uC73C\uB85C \uBCF4\uBA74 \uD0DC\uC591 \uCABD\uC5D0 L1, \uBC18\uB300\uCABD\uC5D0 L2 \uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uC774 \uB450 \uC810\uC5D0\uC11C\uB294 \uD0DC\uC591\uACFC \uC9C0\uAD6C\xB7\uB2EC\uC774 \uB044\uB294 \uD798\uC774 \uD568\uAED8 \uB3C4\uB294 \uC6C0\uC9C1\uC784\uACFC \uB9DE\uC544\uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. L2 \uB294 \uC9C0\uAD6C\xB7\uB2EC\uC5D0\uC11C {n0} \uB5A8\uC5B4\uC838 \uC788\uC2B5\uB2C8\uB2E4.","tour.l2_title":"L2 \u2014 \uC65C \uBD88\uC548\uC815\uD55C\uAC00","tour.l2_text":"L2 \uB294 \uB9D0\uC548\uC7A5 \uD55C\uAC00\uC6B4\uB370 \uAC19\uC740 \uACF3\uC785\uB2C8\uB2E4. \uD55C \uBC29\uD5A5\uC73C\uB85C \uBC00\uB9AC\uBA74 \uB418\uB3CC\uC544\uC624\uC9C0\uB9CC, \uB2E4\uB978 \uBC29\uD5A5\uC73C\uB85C\uB294 \uC870\uAE08\uB9CC \uBC00\uB824\uB3C4 \uC810\uC810 \uBE68\uB9AC \uBA40\uC5B4\uC9D1\uB2C8\uB2E4. \uBE68\uAC04 \uC120\uC740 \uAC00\uC7A5 \uBE68\uB9AC \uBA40\uC5B4\uC9C0\uB294 \uBC29\uD5A5, \uCD08\uB85D \uC120\uC740 \uB418\uB3CC\uC544\uC624\uB294 \uBC29\uD5A5\uC785\uB2C8\uB2E4. \uC8FC\uD669\xB7\uCCAD\uB85D \uACE1\uC120\uC740 L2 \uADFC\uCC98\uC5D0\uC11C \uCD9C\uBC1C\uD574 \uBC14\uAE65\uCABD (\uD0DC\uC591 \uBC18\uB300\uCABD)\xB7\uC9C0\uAD6C \uCABD\uC73C\uB85C \uBA40\uC5B4\uC838 \uAC04 \uACC4\uC0B0 \uADA4\uC801\uC785\uB2C8\uB2E4.","tour.halo_title":"\uD5E4\uC77C\uB85C \uADA4\uB3C4","tour.halo_text":"\uADF8\uB798\uC11C \uC6B0\uC8FC\uC120\uC740 L2 \uC810\uC5D0 \uC11C \uC788\uC9C0 \uC54A\uACE0 \uADF8 \uB458\uB808\uB97C \uD06C\uAC8C \uB3C4\uB294 \uD5E4\uC77C\uB85C \uADA4\uB3C4\uC5D0 \uB193\uC785\uB2C8\uB2E4. \uC774 \uADA4\uB3C4\uB294 \uD55C \uBC14\uD034\uC5D0 {n0}, \uD669\uB3C4\uBA74\uC5D0\uC11C \uAC00\uC7A5 \uB192\uC774 {n1} \uAE4C\uC9C0 \uC62C\uB77C\uAC11\uB2C8\uB2E4.","tour.jwst_title":"JWST \uC2E4\uC81C \uADA4\uC801","tour.jwst_text":"\uC81C\uC784\uC2A4 \uC6F9 \uC6B0\uC8FC \uB9DD\uC6D0\uACBD (JWST) \uC740 \uC2E4\uC81C\uB85C L2 \uB458\uB808\uB97C \uB3CC\uACE0 \uC788\uC2B5\uB2C8\uB2E4. \uC120\uC740 NASA JPL \uC774 \uACF5\uAC1C\uD55C \uC2E4\uC81C \uBE44\uD589 \uADA4\uC801\uC785\uB2C8\uB2E4. \uC774 \uC5F0\uAD6C\uAC00 \uC774 \uADA4\uC801\uC73C\uB85C \uACC4\uC0B0\uD55C \uD55C \uBC14\uD034\uB294 {n0} \uC785\uB2C8\uB2E4 (NASA \uAC00 \uBC1D\uD78C \uAC12\uACFC\uB294 \uB2E4\uB974\uBA70, \uAE4C\uB2ED\uC740 \uC544\uC9C1 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4).","tour.dv_title":"\uADA4\uB3C4 \uC720\uC9C0 \u0394v","tour.dv_text":"L2 \uB458\uB808\uB294 \uBD88\uC548\uC815\uD574\uC11C \uAC00\uB054 \uC791\uC740 \uBD84\uC0AC\uB85C \uADA4\uB3C4\uB97C \uBC14\uB85C\uC7A1\uC544\uC57C \uD569\uB2C8\uB2E4. \uD45C\uC2DC\uB294 \uACC4\uC0B0\uC5D0\uC11C \uBD84\uC0AC\uD55C \uC790\uB9AC\uC785\uB2C8\uB2E4. \uC2E4\uC81C \uCC9C\uCCB4 \uC704\uCE58\uB85C \uD55C \uC774 \uC5F0\uAD6C\uC758 \uACC4\uC0B0\uC5D0\uC11C \uD574\uB9C8\uB2E4 \uBC14\uAFB8\uB294 \uC18D\uB3C4\uB294 \uBAA8\uB450 {n0} \uC815\uB3C4\uC785\uB2C8\uB2E4.","tour.expert_title":"\uB354 \uC54C\uACE0 \uC2F6\uB2E4\uBA74 \u2014 \uC804\uBB38\uAC00 \uBAA8\uB4DC","tour.expert_text":"\uC22B\uC790 \uC606\uC758 \uC791\uC740 \uC810\uC740 \uADF8 \uAC12\uC744 \uC5B4\uB5BB\uAC8C \uD655\uC778\uD588\uB294\uC9C0 \uC54C\uB824 \uC90D\uB2C8\uB2E4 (\uB204\uB974\uBA74 \uBCF4\uC784). \uCD9C\uCC98 \uD30C\uC77C\xB7\uACC4\uC0B0 \uBC29\uBC95\xB7\uBAA8\uB4E0 \uC22B\uC790\uB294 \uC804\uBB38\uAC00 \uBAA8\uB4DC\uC5D0\uC11C \uBCFC \uC218 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC624\uB978\uCABD \uC704 [\uC804\uBB38\uAC00], \uB610\uB294 2 \uD0A4.","tour.expert_text_touch":"\uC22B\uC790 \uC606\uC758 \uC791\uC740 \uC810\uC740 \uADF8 \uAC12\uC744 \uC5B4\uB5BB\uAC8C \uD655\uC778\uD588\uB294\uC9C0 \uC54C\uB824 \uC90D\uB2C8\uB2E4 (\uB204\uB974\uBA74 \uBCF4\uC784). \uCD9C\uCC98 \uD30C\uC77C\xB7\uACC4\uC0B0 \uBC29\uBC95\xB7\uBAA8\uB4E0 \uC22B\uC790\uB294 \uC804\uBB38\uAC00 \uBAA8\uB4DC\uC5D0\uC11C \uBCFC \uC218 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC704\uC758 [\uC804\uBB38\uAC00].","preset.touring":"\uB458\uB7EC\uBCF4\uAE30 \uC911","help.note_c":"\uB808\uC774\uC5B4 \uD0A4 (L\xB7O\xB7N\xB7B\xB7G) \uB294 \uC228\uC740 \uB9C9\uB300\uB97C \uAEBC\uB0B4\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uCF20 \uC0C1\uD0DC\uB294 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uAE30\uC5B5\uB429\uB2C8\uB2E4.","help.keys_line_c":"L \uC774\uB984\uD45C \xB7 O \uADA4\uB3C4 \xB7 N \uC22B\uC790 \xB7 ? \uB2E8\uCD95\uD0A4 \uC804\uBD80","keyc.labels":"\uC774\uB984\uD45C \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.g_orbits":"\uADA4\uB3C4 \uC120 \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.g_numbers":"\uC22B\uC790 \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.g_bodies":"\uCC9C\uCCB4\xB7\uC810 \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.grid":"\uBC14\uB2E5 \uACA9\uC790 \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.m_general":"\uC77C\uBC18 \uBAA8\uB4DC","keyc.m_expert":"\uC804\uBB38\uAC00 \uBAA8\uB4DC","keyc.export":"\uC22B\uC790 \uB0B4\uBCF4\uB0B4\uAE30 (\uC804\uBB38\uAC00 \uBAA8\uB4DC)","keyc.search":"\uCC3E\uAE30","keyc.targets":"\uB300\uC0C1 \uBAA9\uB85D \uC5F4\uAE30\xB7\uB2EB\uAE30","keyc.help":"\uC774 \uD45C \uC5F4\uAE30\xB7\uB2EB\uAE30","keyc.esc":"\uC5F4\uB9B0 \uAC83 \uD558\uB098 \uB2EB\uAE30 (\uB2E4 \uB2EB\uD600 \uC788\uC73C\uBA74 \uD654\uBA74 \uC815\uB9AC)","keyc.tour":"\uB458\uB7EC\uBCF4\uAE30\uC5D0\uC11C \uC774\uC804\xB7\uB2E4\uC74C"};var bp={"app.subtitle":"Stage 7 3D visualization \xB7 M2 JWST layer","lang.switch":"\uD55C\uAD6D\uC5B4","lang.switch_title":"Switch language","version.commit":"commit","version.dirty":"uncommitted changes","version.title":"Version \xB7 build date (KST) \xB7 commit","panel.samples":"Tag test numbers","panel.samples_note":"Click a number to open its source window. Hover a tag to see the detailed category.","tag.weak":"weak","tag.display_approx":"display approximation","source.title":"Source","source.value":"Value","source.unit":"Unit","source.file":"File","source.key":"Key","source.commit":"Computed by","source.source_hash":"Source hash (first 12)","source.ref_commit":"Reference commit","source.build":"App build","source.stage":"Stage","source.model":"Model","source.verification":"Verification tag","source.note":"Note","source.close":"Close","source.browser_calc":"Browser calculation (passed the Python match test, tolerance {tol})","source.time_scale":"Time scale","pwa.update":"New version available \u2014 reload","pwa.offline_ready":"Ready offline","error.load":"Could not read data: {msg}","error.schema":"Data format error: {msg}","body.sun":"Sun","body.emb":"EMB (Earth\u2013Moon barycenter)","body.earth":"Earth","body.moon":"Moon","l2.panel":"L2 scene","l2.mode":"Frame","l2.mode_rot":"Rotating","l2.mode_inertial":"Inertial","l2.view":"View","l2.view_all":"Whole","l2.view_emb":"Earth\u2013Moon\u2013L1/L2","l2.view_l2":"Near L2","l2.view_l2zoom":"L2 close-up","l2.time":"Time","l2.play":"Play","l2.pause":"Pause","l2.speed":"{n} d/s","l2.layer_lpoints":"Lagrange points","l2.layer_bodies":"Sun & EMB","l2.layer_dirs":"L2 unstable/stable directions","l2.layer_earthmoon":"Earth & Moon (real ephemeris)","l2.layer_halo":"3-C halo family","l2.layer_escape":"3-B escape trajectories","l2.layer_burns":"Correction maneuvers (3-A, 3-C, 4-C)","l2.layer_ref":"4-C/4-D reference orbits","l2.unstable":"unstable","l2.stable":"stable","l2.halo_main":"Main halo orbit","l2.g_lpoints":"Lagrange points (stage 1)","l2.g_dirs":"L2 directions (stage 2)","l2.g_halo":"Main halo orbit (3-C)","l2.g_annual":"Annual \u0394v (3-A, 3-C, 4-C)","l2.g_ref":"Reference orbits vs halo (4-C, 4-D)","l2.g_escape":"Escape times (3-B)","l2.g_interp":"Ephemeris interpolation error (4-A)","l2.g_m0":"Tag test numbers (M0)","l2.legend_markers":"Marker sizes and arrow lengths are not to scale (display only). Click a number for its source.","l2.legend_pulsating":"Earth & Moon: real ephemeris (DE441) in the pulsating frame \u2014 length unit = instantaneous Sun\u2013EMB distance. The 4-C/4-D reference orbits use the same frame.","l2.legend_inertial":"Inertial frame: x = ecliptic J2000 X, z = orbit normal (\u2248 ecliptic north). The CR3BP rotating frame turned by \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/time unit (\u03B8\u2080 = EMB's ecliptic longitude on that date).","source.browser":"Computed in","l2.escape_rule":"Examples picked for display (rule: for each sign of e_u*, the main sample whose |e_u*|/\u03B3 is closest to 1e-9, 1e-7, 1e-5; escaped past 0.316\u03B3, noise-dominated samples excluded)","panel.open":"Show panel","panel.close":"Hide panel","ui.layers":"Layers","ui.legend":"Legend","ui.numbers":"All numbers","ui.menu":"Menu","card.sphere_note":"Spheres are enlarged to be visible (true radius: Horizons header)","card.no_numbers":"No result numbers for this object yet","l2.family_all":"Show the whole halo family (default: a subset)","l2.legend_spheres":"Sun, Earth and Moon are spheres \u2014 enlarged when too small to see","tag.short_impl":"impl.","tag.short_external":"ext.","tag.short_physical":"phys.","preset.clean":"Clean","preset.explore":"Explore","preset.research":"Research","preset.custom":"Custom","preset.zooming":"Zoomed in","layer.g_bodies":"Bodies & points","layer.g_orbits":"Orbits & paths","layer.g_numbers":"Physical values & tags","layer.g_aux":"Aids","layer.sun":"Sun","layer.earth":"Earth","layer.moon":"Moon","layer.emb":"EMB (Earth\u2013Moon barycentre)","layer.lpoints":"L1 \u2013 L5","layer.halo_main":"Main halo orbit","layer.halo_family":"Halo family","layer.escape":"3-B escape paths","layer.ref":"4-C / 4-D reference orbits","layer.burns":"Correction (\u0394v) points","layer.moon_orbit":"Moon orbit (past 30-day trail)","layer.planet_orbits":"Planet orbits","layer.dirs":"L2 direction lines (unstable / stable)","layer.n_distance":"Distances","layer.n_period":"Periods","layer.n_angle":"Direction angles","layer.n_annual":"Annual \u0394v","layer.n_escape":"Escape times","layer.n_tags":"Verification tags","layer.labels":"Labels","layer.scale":"Distance scale","layer.grid":"Reference-plane grid (orbit plane)","layer.axes":"Coordinate axes","layer.tags_note":"Turning tags off hides every number \u2014 numbers always come with their tag","key.labels":"Labels on / off","key.g_orbits":"Orbits & paths on / off","key.g_numbers":"Physical values & tags on / off","key.g_bodies":"Bodies & points on / off","key.grid":"Reference-plane grid","key.p_clean":"Preset: Clean","key.p_explore":"Preset: Explore","key.p_research":"Preset: Research","key.help":"This help","help.title":"Keyboard shortcuts","help.button":"Shortcuts (?)","help.note":"Layer shortcuts do not bring up the bars. Esc hides the bars. Your layer choice is remembered in this browser.","help.keys_line":"L labels \xB7 O orbits \xB7 N values \xB7 1 2 3 presets","time.jwst_band":"Actual flight record to {rec} / JPL prediction to {pred}","time.jwst_band_rec":"Actual flight record to {rec}","time.start":"To start","time.now":"Now","card.numbers_off":"No value layer is on, so the numbers are hidden (Layers \u2192 Physical values)","desc.Sun":"The Sun \u2014 the larger primary of the CR3BP.","desc.EMB":"The Earth\u2013Moon barycentre \u2014 the CR3BP's second primary (Earth and Moon as one point).","desc.Earth":"Earth, at its real ephemeris (DE441) position in pulsating coordinates. The day\u2013night line follows the sunlight.","desc.Moon":`The Moon. Real ephemeris position. The tail behind is its recent track (fading with age). Surface map: NASA SVS CGI Moon Kit (LRO LROC, public domain \u2014 credit "NASA's Scientific Visualization Studio"). Map orientation is a display approximation (mean Earth-facing side toward Earth, no libration).`,"desc.L1":"Sunward Lagrange point (CR3BP equilibrium, stage 1). Unstable \u2014 not computed directly in this study (page reference for the instability of collinear points still to be confirmed).","desc.L2":"The subject of this study: the anti-sunward equilibrium. It is unstable, so station-keeping (\u0394v) is needed.","desc.L3":"Equilibrium point on the far side of the Sun (CR3BP, stage 1). Its stability was not computed in this study (to be confirmed).","desc.L4":"Leading triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (\u03BC far below the critical mass ratio of Sicardy 2010; implementation verification against literature).","desc.L5":"Trailing triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (same as L4).","desc.halo_main":"The main orbit of the 3-C halo family \u2014 the reference for station-keeping.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST reconstructed trajectory","l2.layer_jwst_ext":"JWST prediction \u2014 vs JPL no-burn prediction","l2.layer_jwst_phys":"JWST prediction \u2014 vs reconstructed trajectory","l2.legend_jwst":"JWST (gold): dots = received points (daily), dashed = interpolation between them (4-A Hermite), solid = received 10-minute points. Predictions: orange = vs JPL's no-burn prediction (external comparison), green = vs the reconstructed trajectory (physical validation); dark = reference, light = my model","layer.jwst":"JWST reconstructed trajectory","layer.jwst_ext":"Prediction \u2014 vs JPL no-burn prediction (external)","layer.jwst_phys":"Prediction \u2014 vs reconstructed trajectory (physical)","layer.n_jwst":"Prediction error","body.jwst":"JWST","desc.JWST":"James Webb Space Telescope. Gold line = reconstructed as-flown trajectory (Horizons, 4-A data): dots = received points (daily), dashed = interpolation between daily nodes, solid = received 10-minute points. Marker = end of the reconstruction. Below: the two comparisons of the stage 5 prediction \u2014 with different tags.","desc.jwst_period":"Compares the length of one circuit of JWST's reconstructed trajectory with NASA's text and with CR3BP halos of the same size.","jwst.orbit_label":"JWST reconstructed","jwst.layer_ext_short":"vs JPL no-burn prediction","jwst.layer_phys_short":"vs reconstructed trajectory","jwst.layer_ext":"Comparison with JPL's no-burn prediction","jwst.layer_phys":"Comparison with the reconstructed trajectory","jwst.rep_5d":"5 d","jwst.axis_note":"Vertical = position difference (km, log), horizontal = days after start. Dots = values written in results/stage5.json","jwst.period_button":"Open the period card","jwst.period_title":"JWST period \u2014 reconstruction vs NASA and halo","jwst.period_class":"Classification","jwst.no_predictions":"No prediction data","jwst.g_ext":"JWST prediction \u2014 vs JPL no-burn prediction (stage 5)","jwst.g_phys":"JWST prediction \u2014 vs reconstructed trajectory (stage 5)","jwst.g_period":"JWST period (4-A)","l2.view_jwstzoom":"JWST zoom","l2.legend_jwstzoom":"JWST zoom (tens of km around a prediction end): big dots = points at the same time, white segments = the position difference between them (numbers are Python values with tags). Lines connect the stored points straight (hourly; JPL 01U daily). Positions are drawn in pulsating coordinates, so drawn distances differ from real ones by under 1 %","jwst.marker_at":"data point {date} TDB","jwst.marker_pred":"JPL prediction ({sol}) {date} TDB","jwst.no_data":"No JWST trajectory data for this date ({from} \u2013 {to})","jwst.data_range":"JWST trajectory data {from} \u2013 {to} (TDB). The dot sits on received data points only \u2014 no interpolation","jwst.no_data_short":"no data on this date","jwst.pred_ahead":"JPL prediction ({sol}) \u2014 path ahead","jwst.zoom_phys":"Zoom in \u2014 representative 5-day point (three lines)","jwst.zoom_ext":"Zoom in \u2014 window end:","jwst.zoom_focus_R5":"JWST zoom \u2014 vs the reconstructed trajectory, representative 5-day point","jwst.zoom_focus_A":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window A","jwst.zoom_focus_B":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window B","jwst.zoom_focus_C":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window C","jwst.zoom_norecon":"No actual-trajectory data (after 2026-10-05)","jwst.zl_recon":"Reconstructed trajectory (03U)","jwst.zl_mine_kB":"My model (k_B)","jwst.zl_jpl01U":"JPL no-burn prediction (01U)","jwst.zl_jpl":"JPL no-burn prediction","jwst.gap_mine_recon":"my model \u2194 reconstruction","jwst.gap_jpl_recon":"JPL \u2194 reconstruction","jwst.gap_mine_jpl":"my model \u2194 JPL","source.join":"Reconstruction join","l2.view_lab":"Lab","lab.title":"Lab \u2014 escape of initial states near L2","lab.scope":"Results inside the CR3BP model (implementation verification \u2014 not physical validation). All numbers are browser calculations (passed Python match tests)","lab.fold":"Fold","lab.unfold":"Unfold","lab.loading":"Loading lab data\u2026 (first time only, about 17 MB)","lab.examples":"Examples","lab.ex_q10":"Fast escape (10 %)","lab.ex_q50":"Middle (50 %)","lab.ex_q90":"Slow escape (90 %)","lab.ex_out":"Out-of-range demo","lab.ex_noise":"Near the noise floor","lab.ex_src":"Example source: {src} (3-B sample no. {no})","lab.s_sign":"Sign of e_u","lab.s_eu":"|e_u| (unstable)","lab.s_es":"e_s (stable)","lab.s_ap":"In-plane amplitude A_p","lab.s_phip":"In-plane phase","lab.s_az":"Out-of-plane amplitude A_z","lab.s_phiz":"Out-of-plane phase","lab.sign_out":"+ outward","lab.sign_in":"\u2212 Earthward","lab.outside":"Allow out of range (extrapolation \u2014 research preset only)","lab.col_r":"Criterion R","lab.col_truth":"Truth [d]","lab.col_t3":"T3 [d]","lab.col_d24":"D24 [d]","lab.col_mlp":"MLP-C_ln [d]","lab.col_hybrid":"Hybrid [d] \u2014 verdict: rejected","lab.col_dt3":"T3 error \u0394ln t","lab.col_dd24":"D24 error \u0394ln t","lab.col_dmlp":"MLP error \u0394ln t","lab.col_dir":"Direction (e_u*)","lab.col_flag":"Confidence","lab.flag_extrap":"extrapolated","lab.flag_unc":"uncertain","lab.flag_unc_mismatch":"MLP-C_ln and T3 differ by more than 3 \xD7 validation RMSE_log (pre-registration \xA75)","lab.flag_unc_spread":"Spread of the 3 MLP seeds exceeds 3 \xD7 the validation median (pre-registration \xA75)","lab.extrap_long":"Extrapolation \u2014 not trusted (outside the training range)","lab.no_escape":"no escape","lab.dir_hit":"correct","lab.dir_miss":"wrong","lab.waiting":"Release to start the truth integration","lab.integrating":"Integrating the truth (Worker)\u2026","lab.integrating_days":"Integrating the truth \u2014 day {d}","lab.done":"Truth integration done ({ms} ms, {n} trajectory points)","lab.error":"Error: {msg}","lab.hybrid_note":"Hybrid = T3 and D24 joined per R \u2014 all six weights w_R are 0, so it equals D24. Pre-registered verdict (H): rejected (structural); residual-model verdict (R): supported. ","lab.foot":"T3 = linear theory + second-order correction e_u*, D24 = T3 + RF residual (50 trees), MLP-C_ln = neural net, mean of 3 seeds. Truth = DOP853 integration (rtol 1e-12, up to 730.5 days, stops at 0.316\u03B3). \u0394ln t = prediction \u2212 truth.","lab.mobile_note":"Please use the lab on a computer. On a phone screen the sliders and result table are too narrow to place an initial state precisely. (Draft notice \u2014 awaiting user confirmation)","time.go":"Go","time.out_of_range":"Outside the data period (2022-01-01 \u2013 2049-12-31)","time.loading":"Loading ephemeris\u2026","l2.view_solar":"Solar system","body.mercury":"Mercury system","body.venus":"Venus system","body.mars":"Mars system","body.jupiter":"Jupiter system","body.saturn":"Saturn system","body.uranus":"Uranus system","body.neptune":"Neptune system","desc.Mercury":"Mercury (system barycenter \u2014 decision \u246E). Position = interpolated M4 ephemeris (DE441, 12 h step) in pulsating coordinates.","desc.Venus":"Venus system barycenter (decision \u246E). Position = interpolated M4 ephemeris (DE441, 2 d step) in pulsating coordinates.","desc.Mars":"Mars system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 4 d step).","desc.Jupiter":"Jupiter system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 16 d step).","desc.Saturn":"Saturn system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Uranus":"Uranus system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Neptune":"Neptune system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","view.true_size":"True size","view.true_size_title":"Turn off size exaggeration (bodies enlarged when small on screen \u2014 display approximation)","layer.planets":"Planet systems","layer.stars":"Stars","layer.milkyway":"Milky Way","layer.clouds":"Clouds (display only \u2014 not that day)","layer.nightlights":"Earth night lights","layer.sunglow":"Sun glow","sky.credits_stars":"Stars: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"Milky Way: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"Moon: NASA SVS (public domain)","sky.credits_horizons":"Orbits: JPL Horizons","sky.credits_earth":"Earth surface: NASA Earth Observatory (Blue Marble, Black Marble)","credits.short":"Sources","credits.images":"Image and data sources","credits.open":"Show image and data sources (source panel)","credits.nasa_rule":"NASA credit rules (verbatim):","nav.label":"Navigation","nav.targets":"Targets (T)","nav.targets_panel":"Targets","nav.targets_close":"Close targets","nav.search_ph":"Find by name","tr.label":"Global","tr.search":"Search","tr.search_title":"Search ( / )","tr.settings":"Settings","mode.label":"Display mode","mode.general":"General","mode.expert":"Expert","layer.view_options":"View options","settings.lang":"Language","settings.legend":"How to read the screen","settings.keys":"Shortcuts","settings.about":"About","tgt.g_tour":"Tour","tgt.g_views":"Views","tgt.g_points":"Lagrange points","tgt.g_orbits":"Orbits \xB7 spacecraft","tgt.g_bodies":"Bodies","tgt.g_tools":"Tools","tgt.tour":"Guided tour","kind.point":"Lagrange point","kind.orbit":"Orbit","kind.craft":"Space telescope","kind.period":"Orbit-period comparison","kind.star":"Star","kind.planet":"Planet","kind.moon":"Moon","kind.bary":"Barycenter","kind.system":"Planetary-system barycenter","kind.view":"View","kind.zoom":"Close-up","kind.numbers":"Number list","desc.v_all":"Wide Sun-centred view \u2014 Earth's orbit fills the screen. Scroll out to see the whole solar system.","desc.v_emb":"Around the Earth\u2013Moon barycenter \u2014 Earth, Moon, L1 and L2 on one screen (for explaining the study).","desc.v_l2zoom":"L2 seen from the zoom limit (about 1,000 km away).","info.label":"Info panel","info.close":"Close info panel","info.more":"More","info.expert_hint":"All numbers and sources are in Expert mode","info.focus_only":"Focus only","info.fly":"Fly to","jwst.zoom_title":"Close-up","jwst.zoom_r5":"5-day point","jwst.zoom_window":"Window {w} end","time.group":"Time","time.slider":"Time","time.speed_menu":"Playback speed","time.speed_title":"Playback speed (press to choose)","time.local":"Local","time.date_aria":"Displayed time {utc} UTC (local {local}, {zone}) \u2014 press to pick a date","time.now_title":"Go to the device's current time (to the minute)","time.now_out":"Unavailable: the device's current time is outside the data period","time.date_pop":"Go to a date","time.date_utc_note":"Moves to 00:00 UTC of the chosen date","time.date_input":"Date","credits.long":"Sources \xB7 licences","hint.label":"Welcome","hint.lead":"L2 \u2014 the balance point beyond Earth, opposite the Sun, where JWST stays","hint.how":"Drag to rotate \xB7 scroll to zoom","hint.tour":"Tour","hint.close":"Close","tag.open_hint":"press to see the source","tag.pop_label":"Tag and source","tag.pop_source":"Source","tag.pop_open":"Open source window","numg.L1_dist":"Distance from the Earth\u2013Moon center of mass","numg.L2_dist":"Distance from the Earth\u2013Moon center of mass","numg.L3_dist":"Distance from the Earth\u2013Moon center of mass","numg.L4_dist":"Distance from the Earth\u2013Moon center of mass","numg.L5_dist":"Distance from the Earth\u2013Moon center of mass","numg.annual_3A":"Station-keeping \u0394v per year \u2014 staying at the L2 point (simple model)","numg.annual_3C":"Station-keeping \u0394v per year \u2014 halo orbit (simple model)","numg.annual_4C":"Station-keeping \u0394v per year \u2014 halo orbit (real Sun, Moon and planet positions)","numg.halo_period":"Time for one loop","numg.halo_zmax":"Greatest height from the ecliptic","numg.unstable_deg":"Direction of fastest drift","numg.stable_deg":"Direction of return","numg.shift_max":"Shift of the reference orbit when sunlight pressure is added (max)","numg.shift_mean":"Shift of the reference orbit when sunlight pressure is added (mean)","numg.wrong_ref_4C":"Times more \u0394v with the wrong reference \u2014 simple-model halo as reference","numg.wrong_ref_4D":"Times more \u0394v with the wrong reference \u2014 reference without sunlight pressure","numg.jwst_err_range":"Position difference after about 4 weeks \u2014 this study's prediction vs NASA JPL's (4 comparisons)","numg.jwst_err_R5":"Position difference from the actual path after 5 days \u2014 this study's model","numg.jwst_err_R5_jpl":"Position difference from the actual path after 5 days \u2014 NASA JPL prediction","numg.jwst_period_nasa":"One loop (NASA)","numg.jwst_period_recon":"One loop measured on the actual flight path (this study's calculation)","numg.jwst_period_halo":"One loop of a same-size halo orbit (simple model)","tgtg.view-emb":"Around Earth and Moon","tgtg.view-l2zoom":"Close to L2","tgtg.halo_main":"Halo orbit","tgtg.jwst_period":"JWST orbit comparison","lblg.body.emb":"Earth\u2013Moon center of mass","lblg.l2.unstable":"drift","lblg.l2.stable":"return","lblg.l2.halo_main":"Halo orbit","lblg.jwst.orbit_label":"JWST actual path","lblg.jwst.layer_ext_short":"vs NASA JPL prediction","lblg.jwst.layer_phys_short":"vs actual path","lblg.jwst.zl_recon":"Actual path","lblg.jwst.zl_mine_kB":"This study's model","lblg.jwst.zl_jpl01U":"NASA JPL prediction","lblg.jwst.zl_jpl":"NASA JPL prediction","lblg.jwst.gap_mine_recon":"this study's model \u2194 actual path","lblg.jwst.gap_jpl_recon":"NASA JPL \u2194 actual path","lblg.jwst.gap_mine_jpl":"this study's model \u2194 NASA JPL","tag.easy_impl":"Checked that the code solves the intended equations","tag.easy_external":"Compared with another institution's calculation or data","tag.easy_physical":"Compared with the actual flight path","tag.easy_more":"File path and detailed class are in the source window","hint.how_touch":"Drag to rotate \xB7 pinch to zoom","info.tabs":"Info panel tabs","info.tab_summary":"Summary","info.tab_all":"All numbers","info.tab_source":"Sources","info.src_none":"No numbers for this object","info.src_open":"Source window","info.export_this":"Export this object","status.label":"Status","status.tdb":"TDB","status.focus":"Focus distance","status.focus_title":"Camera-to-focus distance \u2014 drawing state (display approximation, no verification tag)","status.more":"Status","status.more_title":"Show TDB \xB7 frame \xB7 focus distance","sheet.expand":"Expand panel \u2014 drag to resize, drag down to close","sheet.collapse":"Shrink panel \u2014 drag to resize, drag down to close","time.speed_unit":"d/s","time.speed_group":"Playback speed","export.button":"Export \xB7 share","export.title":"Export \xB7 share link","export.csv":"Save numbers as CSV","export.json":"Save numbers as JSON","export.note":"File save and clipboard only \u2014 nothing is sent anywhere. Numbers are the Python result text with source and tag","export.share":"Share link","export.copy":"Copy link","export.copied":"Copied","export.copy_fail":"Could not copy \u2014 select the link manually","export.share_note":"A state opened from a link is temporary (saved settings stay)","export.shared_on":"Applied the shared link's state temporarily","layer.mode_default":"Reset to this mode's default","key.m_general":"General mode","key.m_expert":"Expert mode","key.export":"Export (expert)","tour.label":"Tour","tour.step":"{i} of {n}","tour.step_aria":"Stop {i} of {n}","tour.prev":"Back","tour.next":"Next","tour.finish":"Finish","tour.end":"End the tour","tour.paused":"Paused because you moved the scene.","tour.resume":"Continue","tour.keys":"\u2190 \u2192 to move \xB7 Esc to end","tour.solar_title":"The solar system","tour.solar_text":"The Sun and the eight planets. The star of this page, L2, is a point just beyond Earth on the side away from the Sun. Let's move in toward Earth.","tour.emb_title":"Around Earth and Moon \u2014 L1 and L2","tour.emb_text":"Treating Earth and Moon as one body, L1 lies toward the Sun and L2 on the far side. At these two points the pulls of the Sun and of Earth\u2013Moon match the turning motion. L2 is {n0} from Earth\u2013Moon.","tour.l2_title":"L2 \u2014 why it is unstable","tour.l2_text":"L2 is like the middle of a saddle. Pushed one way, you come back; pushed the other way even slightly, you drift off faster and faster. The red line is the direction of fastest drift and the green line the direction of return. The orange and teal curves are computed paths that start near L2 and drift away, outward (away from the Sun) and toward Earth.","tour.halo_title":"Halo orbit","tour.halo_text":"So a spacecraft does not sit on L2; it loops around it on a large halo orbit. This one takes {n0} per loop and rises up to {n1} from the ecliptic.","tour.jwst_title":"JWST actual path","tour.jwst_text":"The James Webb Space Telescope (JWST) really does circle L2. The line is its actual flight path published by NASA JPL. By this study's calculation from this path, one loop takes {n0} (this differs from the value NASA gives; the reason has not been found yet).","tour.dv_title":"Keeping the orbit (\u0394v)","tour.dv_text":"Because L2 is unstable, small burns now and then put the orbit back on track. The marks show where burns happen in the calculation. In this study's calculation with real planet positions, the total speed change per year is about {n0}.","tour.expert_title":"Want more? Expert mode","tour.expert_text":"The small dot next to a number tells how that value was checked (tap it to see). Source files, methods and every number are in expert mode: top right [Expert], or key 2.","tour.expert_text_touch":"The small dot next to a number tells how that value was checked (tap it to see). Source files, methods and every number are in expert mode: [Expert] at the top.","preset.touring":"touring","help.note_c":"Layer keys (L\xB7O\xB7N\xB7B\xB7G) do not bring back the hidden bars. What you turn on is remembered in this browser.","help.keys_line_c":"L labels \xB7 O orbits \xB7 N numbers \xB7 ? all keys","keyc.labels":"Show or hide labels","keyc.g_orbits":"Show or hide orbit lines","keyc.g_numbers":"Show or hide numbers","keyc.g_bodies":"Show or hide bodies and points","keyc.grid":"Show or hide the floor grid","keyc.m_general":"General mode","keyc.m_expert":"Expert mode","keyc.export":"Export numbers (expert mode)","keyc.search":"Search","keyc.targets":"Open or close the list","keyc.help":"Open or close this table","keyc.esc":"Close the top open item (if none, tidy the screen)","keyc.tour":"Back / next in the tour"};var ur={ko:vp,en:bp},Hr="Libration",Sp="lagrange.lang",Wi="en",Mp=[];function wp(n,e){return e==="ko"||e==="en"?e:typeof n=="string"&&n.toLowerCase().startsWith("ko")?"ko":"en"}function p_(){try{return localStorage.getItem(Sp)}catch{return null}}function Od(){return Wi=wp(typeof navigator<"u"?navigator.language:"",p_()),document.documentElement.lang=Wi,Wi}function Vn(){return Wi}function go(n,e=!0){if(Wi=n,document.documentElement.lang=n,e)try{localStorage.setItem(Sp,n)}catch{}yt();for(let t of Mp)t(n)}function dr(n){Mp.push(n)}function _o(n){return ur[Wi][n]!==void 0}function me(n,e={}){let t=ur[Wi][n];if(t===void 0)throw new Error(`\uC0AC\uC804\uC5D0 \uC5C6\uB294 \uD0A4: ${n} (${Wi})`);return t.replace(/\{(\w+)\}/g,(i,s)=>String(e[s]))}function Tt(n){return n&&typeof n=="object"?n[Wi]??n.ko??"":String(n??"")}var Ep=!1;function Fd(n){Ep=!!n,yt()}var m_=n=>{let e=n.dataset.i18n;return Ep&&ur[Wi]["lblg."+e]!==void 0&&n.closest("#labels")?me("lblg."+e):me(e)};function yt(n=document){for(let e of n.querySelectorAll("[data-i18n]"))e.textContent=m_(e);for(let e of n.querySelectorAll("[data-i18n-title]"))e.title=me(e.dataset.i18nTitle);for(let e of n.querySelectorAll("[data-i18n-aria]"))e.setAttribute("aria-label",me(e.dataset.i18nAria))}var Fl=new Set,Tp=()=>!0;function g_(n){return/^jwst_err_/.test(n)?"n_jwst":/_dist$|zmax|^shift_|^holdout_|_km$/.test(n)?"n_distance":/period/.test(n)?"n_period":/_deg$/.test(n)?"n_angle":/^annual_|^wrong_ref_|^dv_ratio/.test(n)?"n_annual":/^t316_/.test(n)?"n_escape":"n_other"}function Ls(n,e,t){return n.dataset.cat=g_(e),n.dataset.ctx=t,Fl.add(n),n}function Gr(n){Fl.delete(n)}function Ap(n){Tp=n}function __(n,e){e?n._ph&&n._ph.parentNode&&n._ph.replaceWith(n):n.parentNode&&(n._ph||(n._ph=document.createComment("num-off")),n.replaceWith(n._ph))}function cs(){for(let n of Fl)__(n,Tp(n.dataset.cat,n.dataset.ctx))}function Cp(){let n={};for(let e of Fl){let t=`${e.dataset.ctx}:${e.dataset.cat}`;n[t]=n[t]||{on:0,off:0},e.parentNode&&!(e._ph&&e._ph.parentNode)?n[t].on++:n[t].off++}return n}var Rp=["","\u2460","\u2461","\u2462","\u2463","\u2464","\u2465","\u2466"];function yi(n){return n.source.map(e=>`${e.file}>${e.key}`).join(" | ")}function oi(n,e){let t=document.createElement("span");t.className=`tag tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");s.className="tag-tip",s.setAttribute("role","tooltip");let r=()=>{let a=e.details[n.detail];i.textContent=Tt(e.tags[n.tag])+(n.weak!==void 0?` (${me("tag.weak")})`:""),s.textContent=`${Rp[a.no]} ${Tt(a)}`+(n.weak?` \u2014 ${Tt(n.weak)}`:"")};return r(),t.append(i,s),t._render=r,t}function vi(n,e){let t=document.createElement("span");t.className=`tag mini tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");return s.className="tag-tip",s.setAttribute("role","tooltip"),t._render=()=>{let r=e.details[n.detail];i.textContent=me("tag.short_"+n.tag),s.textContent=`${Tt(e.tags[n.tag])} \u2014 ${Rp[r.no]} ${Tt(r)}`},t._render(),t.append(i,s),t}function qn(){let n=document.createElement("span");return n.className="tag tag-approx",n.dataset.i18n="tag.display_approx",n.textContent=me("tag.display_approx"),n}function bi(n,e,t){let i=document.createElement("div");i.className="num-row";let s=document.createElement("div");s.className="num-label";let r=document.createElement("button");r.type="button",r.className="num",r.dataset.source=yi(n.provenance),r.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`,r.dataset.id=n.id,r.addEventListener("click",()=>t(n)),i.dataset.source=r.dataset.source,i.dataset.verification=r.dataset.verification;let a=oi(n.provenance.verification,e),o=()=>{let l=n.unit&&typeof n.unit=="object"?Tt(n.unit):n.unit;r.textContent=n.text+(l?l==="\xB0"||l==="\xD7"?l:` ${l}`:""),s.textContent=Tt(n.label),a._render()};return o(),i.append(s,r,a),i._render=o,i._item=n,Ls(i,n.id,"row"),i}var In=null,xo=null,zd=null,Lp=()=>"",zl=null;function Ip(n){zl=n||null}function x_(){let n=document.createElement("span");n.className="join-line",n.append(document.createTextNode(Tt(zl.text)+" "));for(let e of zl.items){let t=document.createElement("span");t.className="join-num",t.dataset.source=e.provenance.source.map(r=>`${r.file}>${r.key}`).join(" | "),t.dataset.verification=`${e.provenance.verification.tag}/${e.provenance.verification.detail}`;let i=document.createElement("span");i.dataset.meta="",i.textContent=Tt(e.label)+" ";let s=document.createElement("b");s.textContent=`${e.text} ${e.unit}`,s.title=Tt(e.note),t.append(i,s,document.createTextNode(" "),vi(e.provenance.verification,zd)),n.append(t)}return n}function Hn(n,e){let t=document.createElement("tr"),i=document.createElement("th");i.textContent=me(n);let s=document.createElement("td");return s.append(e),t.append(i,s),t}function us(n){let e=document.createElement("code");return e.dataset.literal="",e.textContent=n,e}function Np(){if(!xo)return;let n=xo,e=n.provenance;In.dataset.source=e.source.map(r=>`${r.file}>${r.key}`).join(" | "),In.dataset.verification=`${e.verification.tag}/${e.verification.detail}`,In.querySelector("h2").textContent=`${me("source.title")} \u2014 ${Tt(n.label)}`;let t=In.querySelector("tbody");t.replaceChildren(),t.append(Hn("source.value",us(String(n.value)))),t.append(Hn("source.unit",document.createTextNode(n.unit||"-")));for(let r of e.source)t.append(Hn("source.file",us(r.file))),t.append(Hn("source.key",us(r.key)));if(t.append(Hn("source.commit",us(e.computed_by))),e.source_hash){let r=us(e.source_hash.slice(0,12));r.title=e.source_hash,t.append(Hn("source.source_hash",r))}e.ref_commit&&t.append(Hn("source.ref_commit",us(e.ref_commit))),t.append(Hn("source.stage",us(e.stage)));let i=document.createElement("span");i.append(us(e.model)),e.model_ko&&e.model_ko!=="-"&&i.append(document.createTextNode(Tt({ko:` \u2014 ${e.model_ko}`,en:""}))),t.append(Hn("source.model",i));let s=oi(e.verification,zd);s.classList.add("tag-open"),t.append(Hn("source.verification",s)),t.append(Hn("source.build",us(Lp()))),n.browser_calc&&t.append(Hn("source.browser",document.createTextNode(me("source.browser_calc",{tol:n.browser_calc.tolerance})))),t.append(Hn("source.note",document.createTextNode(Tt(n.note)))),zl&&/^jwst_/.test(n.id||"")&&t.append(Hn("source.join",x_())),In.querySelector(".close").textContent=me("source.close")}function Dp(n,e){zd=n,e&&(Lp=e),In=document.getElementById("source"),In.querySelector(".close").addEventListener("click",Vl),document.addEventListener("keydown",t=>{t.key==="Escape"&&Vl()})}function Hl(n){xo=n,yo=null,Np(),In.hidden=!1}function Vl(){xo=null,yo=null,In.hidden=!0}function Up(){yo?vo(yo):Np()}var yo=null;function vo(n){yo=n,xo=null,delete In.dataset.source,delete In.dataset.verification,In.querySelector("h2").textContent=`${me("source.title")} \u2014 ${me("credits.images")}`;let e=In.querySelector("tbody");e.replaceChildren(Pp("tr",Pp("td",n()))),e.firstChild.firstChild.colSpan=2,In.querySelector(".close").textContent=me("source.close"),In.hidden=!1}var Pp=(n,...e)=>{let t=document.createElement(n);return t.append(...e),t};var y_=[{what:{ko:"\uC9C0\uAD6C \uB0AE \uD45C\uBA74",en:"Earth day surface"},credit:{ko:"NASA Earth Observatory \u2014 Blue Marble Next Generation (2004\uB144 7\uC6D4 \uC601\uC0C1)",en:"NASA Earth Observatory \u2014 Blue Marble Next Generation (July 2004 imagery)"},approx:{ko:"\uD55C \uB2EC (2004\uB144 7\uC6D4) \uC601\uC0C1 \uACE0\uC815 \u2014 \uACC4\uC808 \uB208\xB7\uC2DD\uC0DD\uC740 \uB0A0\uC9DC\uC640 \uB2E4\uB984",en:"one month (July 2004) fixed \u2014 seasonal snow and vegetation do not follow the date"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map"},{what:{ko:"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B",en:"Earth night lights"},credit:{ko:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)",en:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)"},approx:{ko:"\uBD88\uBE5B \uBC1D\uAE30 \uACE1\uC120\xB7\uB0AE\uBC24 \uACBD\uACC4 \uC11E\uAE30\uB294 \uD45C\uC2DC\uC6A9",en:"light curve and day\u2013night blending are for display"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps"},{what:{ko:"\uC9C0\uAD6C \uAD6C\uB984 \uCE35",en:"Earth cloud layer"},credit:{ko:"Solar System Scope (8K \uAD6C\uB984 \uADF8\uB9BC, NASA \uC790\uB8CC \uAE30\uBC18)",en:"Solar System Scope (8K clouds, based on NASA imagery)"},approx:{ko:"\uD45C\uC2DC\uC6A9 \u2014 \uADF8\uB0A0\uC758 \uAD6C\uB984\uC774 \uC544\uB2D8. \uC9C0\uAD6C\uC640 \uD568\uAED8 \uC790\uC804\uD558\uB294 \uACE0\uC815\uB41C \uADF8\uB9BC",en:"display only \u2014 not the clouds of that day; a fixed map rotating with Earth"},license:{ko:"CC BY 4.0",en:"CC BY 4.0"},url:"https://www.solarsystemscope.com/textures/"},{what:{ko:"\uBC14\uB2E4 \uBC18\uC0AC\uC758 \uC721\uC9C0\xB7\uBC14\uB2E4 \uACBD\uACC4",en:"Land\u2013ocean mask for sun glint"},credit:{ko:"Natural Earth (10m \uC721\uC9C0\xB7\uD638\uC218 \uC724\uACFD\uC744 \uCE78\uB9C8\uB2E4 \uBA74\uC801 \uBE44\uC728\uB85C \uBCC0\uD658)",en:"Natural Earth (10m land and lakes, rasterised as area fraction)"},approx:{ko:"\uBC18\uC0AC \uC138\uAE30\xB7\uBC88\uC9D0\uC740 \uD45C\uC2DC\uC6A9 (\uBE14\uB9B0-\uD401 \uADFC\uC0AC). \uC724\uACFD\uC774 Blue Marble \uD574\uC548\uACFC \uC218 km \uC5B4\uAE0B\uB0A0 \uC218 \uC788\uC74C",en:"glint strength and width are for display (Blinn-Phong); outlines may differ from Blue Marble coasts by a few km"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED",en:"Public domain"},url:"https://www.naturalearthdata.com/about/terms-of-use/"},{what:{ko:"\uB2EC \uD45C\uBA74",en:"Moon surface"},credit:{ko:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC \uC0C9 \uBAA8\uC790\uC774\uD06C)",en:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC color mosaic)"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED (NASA SVS)",en:"Public domain (NASA SVS)"},url:"https://svs.gsfc.nasa.gov/4720/"},{what:{ko:"\uD654\uC131 \uD45C\uBA74",en:"Mars surface"},credit:{ko:"NASA / USGS Astrogeology \u2014 Viking MDIM 2.1 \uC0C9 \uC804\uAD6C \uBAA8\uC790\uC774\uD06C (1 km \uD310)",en:"NASA / USGS Astrogeology \u2014 Viking MDIM 2.1 colorized global mosaic (1 km product)"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED (USGS \uBAA9\uB85D)",en:"Public domain (USGS catalog)"},url:"https://astrogeology.usgs.gov/search/map/mars_viking_colorized_global_mosaic_232m"},{what:{ko:"\uBAA9\uC131 \uD45C\uBA74",en:"Jupiter surface"},credit:{ko:"NASA/JPL/Space Science Institute \u2014 Cassini \uBAA9\uC131 \uC9C0\uB3C4 (PIA07782, 2000\uB144 12\uC6D4 \uCD2C\uC601)",en:"NASA/JPL/Space Science Institute \u2014 Cassini map of Jupiter (PIA07782, taken December 2000)"},approx:{ko:"2000\uB144 12\uC6D4\uC758 \uAD6C\uB984 \uBB34\uB2AC \uACE0\uC815 \u2014 \uBB34\uB2AC\uB294 \uC2E4\uC81C\uB85C \uC6C0\uC9C1\uC784 (\uB300\uC801\uC810 \uC704\uCE58 \uD3EC\uD568)",en:"cloud pattern fixed at December 2000 \u2014 real features move, including the Great Red Spot"},license:{ko:"NASA/JPL \uC774\uBBF8\uC9C0 (JPL Image Use Policy)",en:"NASA/JPL image (JPL Image Use Policy)"},url:"https://science.nasa.gov/photojournal/cassinis-best-maps-of-jupiter-cylindrical-map"},{what:{ko:"\uC218\uC131\xB7\uAE08\uC131\xB7\uD1A0\uC131\xB7\uCC9C\uC655\uC131\xB7\uD574\uC655\uC131 \uD45C\uBA74, \uD1A0\uC131 \uACE0\uB9AC",en:"Mercury, Venus, Saturn, Uranus, Neptune surfaces, Saturn rings"},credit:{ko:"Solar System Scope (NASA \uACE0\uB3C4\xB7\uC601\uC0C1 \uC790\uB8CC \uAE30\uBC18)",en:"Solar System Scope (based on NASA elevation and imagery data)"},approx:{ko:"\uAE08\uC131\uC740 \uAD6C\uB984 \uADF8\uB9BC\uC73C\uB85C \uD2B9\uC815 \uC2DC\uAC01\uC758 \uAD00\uCE21\uC774 \uC544\uB2D8. \uAD6C\uB984\xB7\uB300\uAE30 \uBB34\uB2AC\uB294 \uACE0\uC815",en:"Venus is a cloud texture, not an observation at a given time. Cloud and atmosphere patterns are fixed"},license:{ko:"CC BY 4.0 (\uC904\uC774\uACE0 \uD615\uC2DD\uC744 \uBC14\uAFC8)",en:"CC BY 4.0 (resized and re-encoded)"},url:"https://www.solarsystemscope.com/textures/"},{what:{ko:"\uD0DC\uC591 \uD45C\uBA74",en:"Sun surface"},credit:{ko:"Solar System Scope (NASA \uC601\uC0C1 \uC790\uB8CC \uAE30\uBC18)",en:"Solar System Scope (based on NASA imagery data)"},approx:{ko:"\uD45C\uC2DC\uC6A9 \uADF8\uB9BC \u2014 \uD45C\uC2DC \uC2DC\uAC01\uC758 \uC2E4\uC81C \uAD00\uCE21\uC774 \uC544\uB2D8 (\uD751\uC810\xB7\uBB34\uB2AC \uACE0\uC815). \uBC1D\uAE30 \uBB34\uB2AC\uB9CC \uC4F0\uACE0 \uAC00\uC7A5\uC790\uB9AC \uC5B4\uB450\uC6CC\uC9D0\xB7\uBE5B \uBC88\uC9D0\uC740 \uD45C\uC2DC\uC6A9",en:"display texture \u2014 not an observation at the shown time (spots and patterns fixed). Brightness pattern only; limb darkening and glow are for display"},license:{ko:"CC BY 4.0 (\uD615\uC2DD\uC744 \uBC14\uAFC8)",en:"CC BY 4.0 (re-encoded)"},url:"https://www.solarsystemscope.com/textures/"},{what:{ko:"\uD589\uC131 \uC790\uC804\uCD95\xB7\uC790\uC804\uAC01",en:"Planet rotation axes and angles"},credit:{ko:"IAU WGCCRE 2015 \uBCF4\uACE0\uC11C (Archinal \uC678 2018) \u2014 NAIF pck00011.tpc",en:"IAU WGCCRE 2015 report (Archinal et al. 2018) \u2014 NAIF pck00011.tpc"},license:{ko:"NAIF \uACF5\uAC1C \uC790\uB8CC",en:"NAIF public data"},url:"https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/pck00011.tpc"},{what:{ko:"\uC740\uD558\uC218",en:"Milky Way"},credit:{ko:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. \uAC10\uC0AC: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)",en:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. Acknowledgement: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)"},approx:{ko:"\uBC1D\uAE30 \uBC30\uC728\uC740 \uD45C\uC2DC\uC6A9",en:"brightness gain is for display"},license:{ko:"CC BY-SA 3.0 IGO (\uC904\uC778 \uADF8\uB9BC\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 3.0 IGO (resized copies under the same terms)"},url:"https://sci.esa.int/web/gaia/-/60196-gaia-s-sky-in-colour-equirectangular-projection"},{what:{ko:"\uBCC4",en:"Stars"},credit:{ko:"HYG Database v4.4 \u2014 David Nash (astronexus)",en:"HYG Database v4.4 \u2014 David Nash (astronexus)"},approx:{ko:"\uBCC4 \uD06C\uAE30\xB7\uC0C9\uC740 \uD45C\uC2DC\uC6A9",en:"star size and color are for display"},license:{ko:"CC BY-SA 4.0 (\uACE0\uB978 \uBCC4 \uD30C\uC77C\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 4.0 (derived star file under the same terms)"},url:"https://codeberg.org/astronexus/hyg"},{what:{ko:"\uCC9C\uCCB4 \uC704\uCE58\xB7JWST \uADA4\uC801",en:"Body positions and JWST trajectory"},credit:{ko:"NASA/JPL Horizons System (\uCC9C\uCCB4\uB825 DE441, JWST \uC7AC\uAD6C\uC131\xB7\uBB34\uBD84\uC0AC \uC608\uCE21 \uADA4\uC801)",en:"NASA/JPL Horizons System (DE441 ephemeris, JWST reconstructed and no-burn predicted trajectories)"},license:{ko:"\uBBF8\uB9AC \uBC1B\uC544 \uB454 \uC790\uB8CC \u2014 \uC2E4\uD589 \uC911 Horizons \uB97C \uBD80\uB974\uC9C0 \uC54A\uC74C. \uCD9C\uCC98 \uD45C\uAE30",en:"Retrieved in advance \u2014 Horizons is not called at run time. Credit given"},url:"https://ssd.jpl.nasa.gov/horizons/"},{what:{ko:"\uD589\uC131 \uACF5\uC804 \uADA4\uB3C4\uC120",en:"Planet orbit lines"},credit:{ko:"NASA/JPL Horizons (DE441) \uC0C1\uD0DC \uBCA1\uD130\uB85C \uADF8 \uC2DC\uAC01\uC758 \uC811\uCD09 \uD0C0\uC6D0\uC744 \uADF8\uB9BC. \uD654\uBA74 \uCD95\uC18C \uBC94\uC704 \uACC4\uC0B0\uC5D0 JPL Solar System Dynamics \uC758 \uADFC\uC0AC \uADA4\uB3C4 \uC694\uC18C (E. M. Standish)",en:"Osculating ellipse drawn from NASA/JPL Horizons (DE441) state vectors at the displayed time. Zoom range uses JPL Solar System Dynamics approximate orbital elements (E. M. Standish)"},approx:{ko:"\uADF8 \uC21C\uAC04\uC758 \uADA4\uB3C4 \uBAA8\uC591 \u2014 \uBA3C \uBBF8\uB798\uC758 \uC704\uCE58\uC640\uB294 \uC870\uAE08 \uB2E4\uB97C \uC218 \uC788\uC74C. \uCC9C\uCCB4 \uC704\uCE58 \uACC4\uC0B0\uC5D0 \uC4F0\uC9C0 \uC54A\uC74C",en:"the orbit shape at that moment \u2014 may differ slightly from positions far in the future. Not used to compute positions"},license:{ko:"\uADA4\uB3C4 \uC694\uC18C \uC218\uCE58 \u2014 \uCD9C\uCC98 \uD45C\uAE30",en:"Numerical orbital elements \u2014 credit given"},url:"https://ssd.jpl.nasa.gov/planets/approx_pos.html"}],v_=[{text:"NASA should be acknowledged as the source of the material.",url:"https://www.nasa.gov/nasa-brand-center/images-and-media/"},{text:"We ask that NASA's Earth Observatory be given credit for its original materials; the only mandatory credit is NASA.",url:"https://earthobservatory.nasa.gov/ImageUse"}],li=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},kp=n=>li("code",{"data-literal":""},n);function Gl(n){let e=li("div",{class:"image-credits","data-meta":""}),t=li("tbody");for(let s of y_){let r=li("td",{},Tt(s.credit),li("br"),Tt(s.license),li("br"),kp(s.url));s.approx&&r.append(li("br"),n(),document.createTextNode(" "+Tt(s.approx))),t.append(li("tr",{},li("th",{},Tt(s.what)),r))}e.append(li("table",{class:"src"},t));let i=li("p",{class:"note"},me("credits.nasa_rule")+" ");for(let s of v_)i.append(li("q",{},s.text),document.createTextNode(" "),kp(s.url),document.createTextNode(" "));return e.append(i),e}var hm=0,xh=1,fm=2;var el=1,pm=2,Ma=3,Ws=0,mn=1,di=2,Ji=0,wa=1,Ki=2,yh=3,vh=4,mm=5;var vr=100,gm=101,_m=102,xm=103,ym=104,vm=200,bm=201,Sm=202,Mm=203,bh=204,Sh=205,wm=206,Em=207,Tm=208,Am=209,Cm=210,Rm=211,Pm=212,Lm=213,Im=214,_c=0,xc=1,yc=2,ua=3,vc=4,bc=5,Sc=6,Mc=7,Xc=0,Nm=1,Dm=2,Pi=0,Mh=1,wh=2,Eh=3,Th=4,Ah=5,Ch=6,Rh=7;var Ph=300,js=301,br=302,qc=303,$c=304,tl=306,Os=1e3,Gn=1001,wc=1002,nn=1003,Um=1004;var nl=1005;var Nt=1006,Yc=1007;var Zn=1008;var sn=1009,Lh=1010,Ih=1011,Ea=1012,Jc=1013,Li=1014,Ii=1015,Ni=1016,Kc=1017,Zc=1018,Ta=1020,Nh=35902,Dh=35899,Uh=1021,kh=1022,hn=1023,Xi=1026,Xs=1027,Sr=1028,Qc=1029,qs=1030,eu=1031;var tu=1033,il=33776,sl=33777,rl=33778,al=33779,nu=35840,iu=35841,su=35842,ru=35843,au=36196,ou=37492,lu=37496,cu=37488,uu=37489,ol=37490,du=37491,hu=37808,fu=37809,pu=37810,mu=37811,gu=37812,_u=37813,xu=37814,yu=37815,vu=37816,bu=37817,Su=37818,Mu=37819,wu=37820,Eu=37821,Tu=36492,Au=36494,Cu=36495,Ru=36283,Pu=36284,ll=36285,Lu=36286;var Po=2300,Ec=2301,mc=2302,uh=2303,dh=2400,hh=2401,fh=2402;var km=3200;var Iu=0,Om=1,hi="",zt="srgb",Lo="srgb-linear",Io="linear",At="srgb";var gc=7680;var Fm=519,Bm=512,zm=513,Vm=514,Nu=515,Hm=516,Gm=517,Du=518,Wm=519,Oh=35044;var Fh="300 es",Ai=2e3,da=2001;function b_(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function S_(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function No(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function jm(){let n=No("canvas");return n.style.display="block",n}var Op={},ha=null;function Do(...n){let e="THREE."+n.shift();ha?ha("log",e,...n):console.log(e,...n)}function Xm(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function at(...n){n=Xm(n);let e="THREE."+n.shift();if(ha)ha("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ot(...n){n=Xm(n);let e="THREE."+n.shift();if(ha)ha("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function _r(...n){let e=n.join(" ");e in Op||(Op[e]=!0,at(...n))}function qm(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var $m={[_c]:xc,[yc]:Sc,[vc]:Mc,[ua]:bc,[xc]:_c,[Sc]:yc,[Mc]:vc,[bc]:ua},qi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fp=1234567,Co=Math.PI/180,fa=180/Math.PI;function _s(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Sn[n&255]+Sn[n>>8&255]+Sn[n>>16&255]+Sn[n>>24&255]+"-"+Sn[e&255]+Sn[e>>8&255]+"-"+Sn[e>>16&15|64]+Sn[e>>24&255]+"-"+Sn[t&63|128]+Sn[t>>8&255]+"-"+Sn[t>>16&255]+Sn[t>>24&255]+Sn[i&255]+Sn[i>>8&255]+Sn[i>>16&255]+Sn[i>>24&255]).toLowerCase()}function ht(n,e,t){return Math.max(e,Math.min(t,n))}function Bh(n,e){return(n%e+e)%e}function M_(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function w_(n,e,t){return n!==e?(t-n)/(e-n):0}function Ro(n,e,t){return(1-t)*n+t*e}function E_(n,e,t,i){return Ro(n,e,1-Math.exp(-t*i))}function T_(n,e=1){return e-Math.abs(Bh(n,e*2)-e)}function A_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function C_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function R_(n,e){return n+Math.floor(Math.random()*(e-n+1))}function P_(n,e){return n+Math.random()*(e-n)}function L_(n){return n*(.5-Math.random())}function I_(n){n!==void 0&&(Fp=n);let e=Fp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function N_(n){return n*Co}function D_(n){return n*fa}function U_(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function k_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function O_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function F_(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),d=a((e+i)/2),h=r((e-i)/2),u=a((e-i)/2),f=r((i-e)/2),m=a((i-e)/2);switch(s){case"XYX":n.set(o*d,l*h,l*u,o*c);break;case"YZY":n.set(l*u,o*d,l*h,o*c);break;case"ZXZ":n.set(l*h,l*u,o*d,o*c);break;case"XZX":n.set(o*d,l*m,l*f,o*c);break;case"YXY":n.set(l*f,o*d,l*m,o*c);break;case"ZYZ":n.set(l*m,l*f,o*d,o*c);break;default:at("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ti(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function It(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var zh={DEG2RAD:Co,RAD2DEG:fa,generateUUID:_s,clamp:ht,euclideanModulo:Bh,mapLinear:M_,inverseLerp:w_,lerp:Ro,damp:E_,pingpong:T_,smoothstep:A_,smootherstep:C_,randInt:R_,randFloat:P_,randFloatSpread:L_,seededRandom:I_,degToRad:N_,radToDeg:D_,isPowerOfTwo:U_,ceilPowerOfTwo:k_,floorPowerOfTwo:O_,setQuaternionFromProperEuler:F_,normalize:It,denormalize:Ti},nt=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ui=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],d=i[s+2],h=i[s+3],u=r[a+0],f=r[a+1],m=r[a+2],y=r[a+3];if(h!==y||l!==u||c!==f||d!==m){let p=l*u+c*f+d*m+h*y;p<0&&(u=-u,f=-f,m=-m,y=-y,p=-p);let g=1-o;if(p<.9995){let C=Math.acos(p),I=Math.sin(C);g=Math.sin(g*C)/I,o=Math.sin(o*C)/I,l=l*g+u*o,c=c*g+f*o,d=d*g+m*o,h=h*g+y*o}else{l=l*g+u*o,c=c*g+f*o,d=d*g+m*o,h=h*g+y*o;let C=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=C,c*=C,d*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],h=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+d*h+l*f-c*u,e[t+1]=l*m+d*u+c*h-o*f,e[t+2]=c*m+d*f+o*u-l*h,e[t+3]=d*m-o*h-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),h=o(r/2),u=l(i/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*d*h+c*f*m,this._y=c*f*h-u*d*m,this._z=c*d*m+u*f*h,this._w=c*d*h-u*f*m;break;case"YXZ":this._x=u*d*h+c*f*m,this._y=c*f*h-u*d*m,this._z=c*d*m-u*f*h,this._w=c*d*h+u*f*m;break;case"ZXY":this._x=u*d*h-c*f*m,this._y=c*f*h+u*d*m,this._z=c*d*m+u*f*h,this._w=c*d*h-u*f*m;break;case"ZYX":this._x=u*d*h-c*f*m,this._y=c*f*h+u*d*m,this._z=c*d*m-u*f*h,this._w=c*d*h+u*f*m;break;case"YZX":this._x=u*d*h+c*f*m,this._y=c*f*h+u*d*m,this._z=c*d*m-u*f*h,this._w=c*d*h-u*f*m;break;case"XZY":this._x=u*d*h-c*f*m,this._y=c*f*h-u*d*m,this._z=c*d*m+u*f*h,this._w=c*d*h+u*f*m;break;default:at("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>h){let f=2*Math.sqrt(1+i-o-h);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>h){let f=2*Math.sqrt(1+o-i-h);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{let f=2*Math.sqrt(1+h-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-i*c,this._z=r*d+a*c+i*l-s*o,this._w=a*d-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Q=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),d=2*(o*t-r*s),h=2*(r*i-a*t);return this.x=t+l*c+a*h-o*d,this.y=i+l*d+o*c-r*h,this.z=s+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Vd.copy(this).projectOnVector(e),this.sub(Vd)}reflect(e){return this.sub(Vd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Vd=new Q,Bp=new ui,ct=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],u=i[2],f=i[5],m=i[8],y=s[0],p=s[3],g=s[6],C=s[1],I=s[4],v=s[7],M=s[2],w=s[5],N=s[8];return r[0]=a*y+o*C+l*M,r[3]=a*p+o*I+l*w,r[6]=a*g+o*v+l*N,r[1]=c*y+d*C+h*M,r[4]=c*p+d*I+h*w,r[7]=c*g+d*v+h*N,r[2]=u*y+f*C+m*M,r[5]=u*p+f*I+m*w,r[8]=u*g+f*v+m*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,u=o*l-d*r,f=c*r-a*l,m=t*h+i*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=h*y,e[1]=(s*c-d*i)*y,e[2]=(o*i-s*a)*y,e[3]=u*y,e[4]=(d*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(i*l-c*t)*y,e[8]=(a*t-i*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return _r("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hd.makeScale(e,t)),this}rotate(e){return _r("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hd.makeRotation(-e)),this}translate(e,t){return _r("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Hd=new ct,zp=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vp=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function B_(){let n={enabled:!0,workingColorSpace:Lo,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===At&&(s.r=xs(s.r),s.g=xs(s.g),s.b=xs(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===At&&(s.r=ca(s.r),s.g=ca(s.g),s.b=ca(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===hi?Io:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return _r("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return _r("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Lo]:{primaries:e,whitePoint:i,transfer:Io,toXYZ:zp,fromXYZ:Vp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:i,transfer:At,toXYZ:zp,fromXYZ:Vp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),n}var _t=B_();function xs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ca(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Wr,Tc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Wr===void 0&&(Wr=No("canvas")),Wr.width=e.width,Wr.height=e.height;let s=Wr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Wr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=No("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=xs(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(xs(t[i]/255)*255):t[i]=xs(t[i]);return{data:t,width:e.width,height:e.height}}else return at("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},z_=0,pa=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=_s(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Gd(s[a].image)):r.push(Gd(s[a]))}else r=Gd(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Gd(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Tc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(at("Texture: Unable to serialize Texture."),{})}var V_=0,Wd=new Q,qt=class n extends qi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Gn,s=Gn,r=Nt,a=Zn,o=hn,l=sn,c=n.DEFAULT_ANISOTROPY,d=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:V_++}),this.uuid=_s(),this.name="",this.source=new pa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wd).x}get height(){return this.source.getSize(Wd).y}get depth(){return this.source.getSize(Wd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){at(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){at(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ph)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Os:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case wc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Os:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case wc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=Ph;qt.DEFAULT_ANISOTROPY=1;var mt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],f=l[5],m=l[9],y=l[2],p=l[6],g=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-y)<.01&&Math.abs(m-p)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+y)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let I=(c+1)/2,v=(f+1)/2,M=(g+1)/2,w=(d+u)/4,N=(h+y)/4,b=(m+p)/4;return I>v&&I>M?I<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(I),s=w/i,r=N/i):v>M?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=w/s,r=b/s):M<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),i=N/r,s=b/r),this.set(i,s,r,t),this}let C=Math.sqrt((p-m)*(p-m)+(h-y)*(h-y)+(u-d)*(u-d));return Math.abs(C)<.001&&(C=1),this.x=(p-m)/C,this.y=(h-y)/C,this.z=(u-d)/C,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ac=class extends qi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new qt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new pa(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wn=class extends Ac{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},xr=class extends qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Cc=class extends qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var vt=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,d,h,u,f,m,y,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,d,h,u,f,m,y,p)}set(e,t,i,s,r,a,o,l,c,d,h,u,f,m,y,p){let g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=d,g[10]=h,g[14]=u,g[3]=f,g[7]=m,g[11]=y,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/jr.setFromMatrixColumn(e,0).length(),r=1/jr.setFromMatrixColumn(e,1).length(),a=1/jr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let u=a*d,f=a*h,m=o*d,y=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=u-y*c,t[9]=-o*l,t[2]=y-u*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*d,f=l*h,m=c*d,y=c*h;t[0]=u+y*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=f*o-m,t[6]=y+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*d,f=l*h,m=c*d,y=c*h;t[0]=u-y*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*d,t[9]=y-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*d,f=a*h,m=o*d,y=o*h;t[0]=l*d,t[4]=m*c-f,t[8]=u*c+y,t[1]=l*h,t[5]=y*c+u,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*d,t[4]=y-u*h,t[8]=m*h+f,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*h+m,t[10]=u-y*h}else if(e.order==="XZY"){let u=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+y,t[5]=a*d,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*d,t[10]=y*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(H_,e,G_)}lookAt(e,t,i){let s=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),Is.crossVectors(i,$n),Is.lengthSq()===0&&(Math.abs(i.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),Is.crossVectors(i,$n)),Is.normalize(),Wl.crossVectors($n,Is),s[0]=Is.x,s[4]=Wl.x,s[8]=$n.x,s[1]=Is.y,s[5]=Wl.y,s[9]=$n.y,s[2]=Is.z,s[6]=Wl.z,s[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],u=i[9],f=i[13],m=i[2],y=i[6],p=i[10],g=i[14],C=i[3],I=i[7],v=i[11],M=i[15],w=s[0],N=s[4],b=s[8],R=s[12],B=s[1],$=s[5],D=s[9],O=s[13],U=s[2],W=s[6],K=s[10],H=s[14],ee=s[3],q=s[7],ie=s[11],te=s[15];return r[0]=a*w+o*B+l*U+c*ee,r[4]=a*N+o*$+l*W+c*q,r[8]=a*b+o*D+l*K+c*ie,r[12]=a*R+o*O+l*H+c*te,r[1]=d*w+h*B+u*U+f*ee,r[5]=d*N+h*$+u*W+f*q,r[9]=d*b+h*D+u*K+f*ie,r[13]=d*R+h*O+u*H+f*te,r[2]=m*w+y*B+p*U+g*ee,r[6]=m*N+y*$+p*W+g*q,r[10]=m*b+y*D+p*K+g*ie,r[14]=m*R+y*O+p*H+g*te,r[3]=C*w+I*B+v*U+M*ee,r[7]=C*N+I*$+v*W+M*q,r[11]=C*b+I*D+v*K+M*ie,r[15]=C*R+I*O+v*H+M*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],f=e[14],m=e[3],y=e[7],p=e[11],g=e[15],C=l*f-c*u,I=o*f-c*h,v=o*u-l*h,M=a*f-c*d,w=a*u-l*d,N=a*h-o*d;return t*(y*C-p*I+g*v)-i*(m*C-p*M+g*w)+s*(m*I-y*M+g*N)-r*(m*v-y*w+p*N)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(r*d-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],f=e[11],m=e[12],y=e[13],p=e[14],g=e[15],C=t*o-i*a,I=t*l-s*a,v=t*c-r*a,M=i*l-s*o,w=i*c-r*o,N=s*c-r*l,b=d*y-h*m,R=d*p-u*m,B=d*g-f*m,$=h*p-u*y,D=h*g-f*y,O=u*g-f*p,U=C*O-I*D+v*$+M*B-w*R+N*b;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let W=1/U;return e[0]=(o*O-l*D+c*$)*W,e[1]=(s*D-i*O-r*$)*W,e[2]=(y*N-p*w+g*M)*W,e[3]=(u*w-h*N-f*M)*W,e[4]=(l*B-a*O-c*R)*W,e[5]=(t*O-s*B+r*R)*W,e[6]=(p*v-m*N-g*I)*W,e[7]=(d*N-u*v+f*I)*W,e[8]=(a*D-o*B+c*b)*W,e[9]=(i*B-t*D-r*b)*W,e[10]=(m*w-y*v+g*C)*W,e[11]=(h*v-d*w-f*C)*W,e[12]=(o*R-a*$-l*b)*W,e[13]=(t*$-i*R+s*b)*W,e[14]=(y*I-m*M-p*C)*W,e[15]=(d*M-h*I+u*C)*W,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,u=r*c,f=r*d,m=r*h,y=a*d,p=a*h,g=o*h,C=l*c,I=l*d,v=l*h,M=i.x,w=i.y,N=i.z;return s[0]=(1-(y+g))*M,s[1]=(f+v)*M,s[2]=(m-I)*M,s[3]=0,s[4]=(f-v)*w,s[5]=(1-(u+g))*w,s[6]=(p+C)*w,s[7]=0,s[8]=(m+I)*N,s[9]=(p-C)*N,s[10]=(1-(u+y))*N,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=jr.set(s[0],s[1],s[2]).length(),o=jr.set(s[4],s[5],s[6]).length(),l=jr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Si.copy(this);let c=1/a,d=1/o,h=1/l;return Si.elements[0]*=c,Si.elements[1]*=c,Si.elements[2]*=c,Si.elements[4]*=d,Si.elements[5]*=d,Si.elements[6]*=d,Si.elements[8]*=h,Si.elements[9]*=h,Si.elements[10]*=h,t.setFromRotationMatrix(Si),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=Ai,l=!1){let c=this.elements,d=2*r/(t-e),h=2*r/(i-s),u=(t+e)/(t-e),f=(i+s)/(i-s),m,y;if(l)m=r/(a-r),y=a*r/(a-r);else if(o===Ai)m=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===da)m=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Ai,l=!1){let c=this.elements,d=2/(t-e),h=2/(i-s),u=-(t+e)/(t-e),f=-(i+s)/(i-s),m,y;if(l)m=1/(a-r),y=a/(a-r);else if(o===Ai)m=-2/(a-r),y=-(a+r)/(a-r);else if(o===da)m=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},jr=new Q,Si=new vt,H_=new Q(0,0,0),G_=new Q(1,1,1),Is=new Q,Wl=new Q,$n=new Q,Hp=new vt,Gp=new ui,ys=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],h=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ht(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:at("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Hp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hp,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gp.setFromEuler(this),this.setFromQuaternion(Gp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ys.DEFAULT_ORDER="XYZ";var Uo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},W_=0,Wp=new Q,Xr=new ui,ds=new vt,jl=new Q,bo=new Q,j_=new Q,X_=new ui,jp=new Q(1,0,0),Xp=new Q(0,1,0),qp=new Q(0,0,1),$p={type:"added"},q_={type:"removed"},qr={type:"childadded",child:null},jd={type:"childremoved",child:null},on=class n extends qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:W_++}),this.uuid=_s(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new Q,t=new ys,i=new ui,s=new Q(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new vt},normalMatrix:{value:new ct}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xr.setFromAxisAngle(e,t),this.quaternion.multiply(Xr),this}rotateOnWorldAxis(e,t){return Xr.setFromAxisAngle(e,t),this.quaternion.premultiply(Xr),this}rotateX(e){return this.rotateOnAxis(jp,e)}rotateY(e){return this.rotateOnAxis(Xp,e)}rotateZ(e){return this.rotateOnAxis(qp,e)}translateOnAxis(e,t){return Wp.copy(e).applyQuaternion(this.quaternion),this.position.add(Wp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jp,e)}translateY(e){return this.translateOnAxis(Xp,e)}translateZ(e){return this.translateOnAxis(qp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ds.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?jl.copy(e):jl.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ds.lookAt(bo,jl,this.up):ds.lookAt(jl,bo,this.up),this.quaternion.setFromRotationMatrix(ds),s&&(ds.extractRotation(s.matrixWorld),Xr.setFromRotationMatrix(ds),this.quaternion.premultiply(Xr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ot("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($p),qr.child=e,this.dispatchEvent(qr),qr.child=null):ot("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(q_),jd.child=e,this.dispatchEvent(jd),jd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ds.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ds.multiply(e.parent.matrixWorld)),e.applyMatrix4(ds),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($p),qr.child=e,this.dispatchEvent(qr),qr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bo,e,j_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bo,X_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};on.DEFAULT_UP=new Q(0,1,0);on.DEFAULT_MATRIX_AUTO_UPDATE=!0;on.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gr=class extends on{constructor(){super(),this.isGroup=!0,this.type="Group"}},$_={type:"move"},ma=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let p=t.getJointPose(y,i),g=this._getHandJoint(c,y);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($_)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new gr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Ym={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ns={h:0,s:0,l:0},Xl={h:0,s:0,l:0};function Xd(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var rt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=_t.workingColorSpace){return this.r=e,this.g=t,this.b=i,_t.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=_t.workingColorSpace){if(e=Bh(e,1),t=ht(t,0,1),i=ht(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Xd(a,r,e+1/3),this.g=Xd(a,r,e),this.b=Xd(a,r,e-1/3)}return _t.colorSpaceToWorking(this,s),this}setStyle(e,t=zt){function i(r){r!==void 0&&parseFloat(r)<1&&at("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:at("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);at("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){let i=Ym[e.toLowerCase()];return i!==void 0?this.setHex(i,t):at("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xs(e.r),this.g=xs(e.g),this.b=xs(e.b),this}copyLinearToSRGB(e){return this.r=ca(e.r),this.g=ca(e.g),this.b=ca(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return _t.workingToColorSpace(Mn.copy(this),e),Math.round(ht(Mn.r*255,0,255))*65536+Math.round(ht(Mn.g*255,0,255))*256+Math.round(ht(Mn.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(Mn.copy(this),t);let i=Mn.r,s=Mn.g,r=Mn.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,d=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(Mn.copy(this),t),e.r=Mn.r,e.g=Mn.g,e.b=Mn.b,e}getStyle(e=zt){_t.workingToColorSpace(Mn.copy(this),e);let t=Mn.r,i=Mn.g,s=Mn.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ns),this.setHSL(Ns.h+e,Ns.s+t,Ns.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ns),e.getHSL(Xl);let i=Ro(Ns.h,Xl.h,t),s=Ro(Ns.s,Xl.s,t),r=Ro(Ns.l,Xl.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Mn=new rt;rt.NAMES=Ym;var ga=class extends on{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ys,this.environmentIntensity=1,this.environmentRotation=new ys,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Mi=new Q,hs=new Q,qd=new Q,fs=new Q,$r=new Q,Yr=new Q,Yp=new Q,$d=new Q,Yd=new Q,Jd=new Q,Kd=new mt,Zd=new mt,Qd=new mt,gs=class n{constructor(e=new Q,t=new Q,i=new Q){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Mi.subVectors(e,t),s.cross(Mi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Mi.subVectors(s,t),hs.subVectors(i,t),qd.subVectors(e,t);let a=Mi.dot(Mi),o=Mi.dot(hs),l=Mi.dot(qd),c=hs.dot(hs),d=hs.dot(qd),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let u=1/h,f=(c*l-o*d)*u,m=(a*d-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,fs)===null?!1:fs.x>=0&&fs.y>=0&&fs.x+fs.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,fs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,fs.x),l.addScaledVector(a,fs.y),l.addScaledVector(o,fs.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Kd.setScalar(0),Zd.setScalar(0),Qd.setScalar(0),Kd.fromBufferAttribute(e,t),Zd.fromBufferAttribute(e,i),Qd.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Kd,r.x),a.addScaledVector(Zd,r.y),a.addScaledVector(Qd,r.z),a}static isFrontFacing(e,t,i,s){return Mi.subVectors(i,t),hs.subVectors(e,t),Mi.cross(hs).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mi.subVectors(this.c,this.b),hs.subVectors(this.a,this.b),Mi.cross(hs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;$r.subVectors(s,i),Yr.subVectors(r,i),$d.subVectors(e,i);let l=$r.dot($d),c=Yr.dot($d);if(l<=0&&c<=0)return t.copy(i);Yd.subVectors(e,s);let d=$r.dot(Yd),h=Yr.dot(Yd);if(d>=0&&h<=d)return t.copy(s);let u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector($r,a);Jd.subVectors(e,r);let f=$r.dot(Jd),m=Yr.dot(Jd);if(m>=0&&f<=m)return t.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Yr,o);let p=d*m-f*h;if(p<=0&&h-d>=0&&f-m>=0)return Yp.subVectors(r,s),o=(h-d)/(h-d+(f-m)),t.copy(s).addScaledVector(Yp,o);let g=1/(p+y+u);return a=y*g,o=u*g,t.copy(i).addScaledVector($r,a).addScaledVector(Yr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Jn=class{constructor(e=new Q(1/0,1/0,1/0),t=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(wi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(wi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=wi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,wi):wi.fromBufferAttribute(r,a),wi.applyMatrix4(e.matrixWorld),this.expandByPoint(wi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ql.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ql.copy(i.boundingBox)),ql.applyMatrix4(e.matrixWorld),this.union(ql)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wi),wi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(So),$l.subVectors(this.max,So),Jr.subVectors(e.a,So),Kr.subVectors(e.b,So),Zr.subVectors(e.c,So),Ds.subVectors(Kr,Jr),Us.subVectors(Zr,Kr),hr.subVectors(Jr,Zr);let t=[0,-Ds.z,Ds.y,0,-Us.z,Us.y,0,-hr.z,hr.y,Ds.z,0,-Ds.x,Us.z,0,-Us.x,hr.z,0,-hr.x,-Ds.y,Ds.x,0,-Us.y,Us.x,0,-hr.y,hr.x,0];return!eh(t,Jr,Kr,Zr,$l)||(t=[1,0,0,0,1,0,0,0,1],!eh(t,Jr,Kr,Zr,$l))?!1:(Yl.crossVectors(Ds,Us),t=[Yl.x,Yl.y,Yl.z],eh(t,Jr,Kr,Zr,$l))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ps[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ps[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ps[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ps[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ps[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ps[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ps[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ps[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ps),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ps=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],wi=new Q,ql=new Jn,Jr=new Q,Kr=new Q,Zr=new Q,Ds=new Q,Us=new Q,hr=new Q,So=new Q,$l=new Q,Yl=new Q,fr=new Q;function eh(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){fr.fromArray(n,r);let o=s.x*Math.abs(fr.x)+s.y*Math.abs(fr.y)+s.z*Math.abs(fr.z),l=e.dot(fr),c=t.dot(fr),d=i.dot(fr);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var en=new Q,Jl=new nt,Y_=0,tn=class extends qi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Y_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Oh,this.updateRanges=[],this.gpuType=Ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Jl.fromBufferAttribute(this,t),Jl.applyMatrix3(e),this.setXY(t,Jl.x,Jl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ti(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=It(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),i=It(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),i=It(i,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),i=It(i,this.array),s=It(s,this.array),r=It(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var ko=class extends tn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Oo=class extends tn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Wt=class extends tn{constructor(e,t,i){super(new Float32Array(e),t,i)}},J_=new Jn,Mo=new Q,th=new Q,Ci=class{constructor(e=new Q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):J_.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mo.subVectors(e,this.center);let t=Mo.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Mo,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(th.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mo.copy(e.center).add(th)),this.expandByPoint(Mo.copy(e.center).sub(th))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},K_=0,ci=new vt,nh=new on,Qr=new Q,Yn=new Jn,wo=new Jn,dn=new Q,$t=class n extends qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:K_++}),this.uuid=_s(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(b_(e)?Oo:ko)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ct().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ci.makeRotationFromQuaternion(e),this.applyMatrix4(ci),this}rotateX(e){return ci.makeRotationX(e),this.applyMatrix4(ci),this}rotateY(e){return ci.makeRotationY(e),this.applyMatrix4(ci),this}rotateZ(e){return ci.makeRotationZ(e),this.applyMatrix4(ci),this}translate(e,t,i){return ci.makeTranslation(e,t,i),this.applyMatrix4(ci),this}scale(e,t,i){return ci.makeScale(e,t,i),this.applyMatrix4(ci),this}lookAt(e){return nh.lookAt(e),nh.updateMatrix(),this.applyMatrix4(nh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qr).negate(),this.translate(Qr.x,Qr.y,Qr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Wt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&at("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Yn.setFromBufferAttribute(r),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,Yn.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,Yn.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(Yn.min),this.boundingBox.expandByPoint(Yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ci);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(e){let i=this.boundingSphere.center;if(Yn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];wo.setFromBufferAttribute(o),this.morphTargetsRelative?(dn.addVectors(Yn.min,wo.min),Yn.expandByPoint(dn),dn.addVectors(Yn.max,wo.max),Yn.expandByPoint(dn)):(Yn.expandByPoint(wo.min),Yn.expandByPoint(wo.max))}Yn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)dn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(dn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)dn.fromBufferAttribute(o,c),l&&(Qr.fromBufferAttribute(e,c),dn.add(Qr)),s=Math.max(s,i.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new tn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let b=0;b<i.count;b++)o[b]=new Q,l[b]=new Q;let c=new Q,d=new Q,h=new Q,u=new nt,f=new nt,m=new nt,y=new Q,p=new Q;function g(b,R,B){c.fromBufferAttribute(i,b),d.fromBufferAttribute(i,R),h.fromBufferAttribute(i,B),u.fromBufferAttribute(r,b),f.fromBufferAttribute(r,R),m.fromBufferAttribute(r,B),d.sub(c),h.sub(c),f.sub(u),m.sub(u);let $=1/(f.x*m.y-m.x*f.y);isFinite($)&&(y.copy(d).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar($),p.copy(h).multiplyScalar(f.x).addScaledVector(d,-m.x).multiplyScalar($),o[b].add(y),o[R].add(y),o[B].add(y),l[b].add(p),l[R].add(p),l[B].add(p))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let b=0,R=C.length;b<R;++b){let B=C[b],$=B.start,D=B.count;for(let O=$,U=$+D;O<U;O+=3)g(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let I=new Q,v=new Q,M=new Q,w=new Q;function N(b){M.fromBufferAttribute(s,b),w.copy(M);let R=o[b];I.copy(R),I.sub(M.multiplyScalar(M.dot(R))).normalize(),v.crossVectors(w,R);let $=v.dot(l[b])<0?-1:1;a.setXYZW(b,I.x,I.y,I.z,$)}for(let b=0,R=C.length;b<R;++b){let B=C[b],$=B.start,D=B.count;for(let O=$,U=$+D;O<U;O+=3)N(e.getX(O+0)),N(e.getX(O+1)),N(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new tn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new Q,r=new Q,a=new Q,o=new Q,l=new Q,c=new Q,d=new Q,h=new Q;if(e)for(let u=0,f=e.count;u<f;u+=3){let m=e.getX(u+0),y=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,p),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,p),o.add(d),l.add(d),c.add(d),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)dn.fromBufferAttribute(e,t),dn.normalize(),e.setXYZ(t,dn.x,dn.y,dn.z)}toNonIndexed(){function e(o,l){let c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d),f=0,m=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*d;for(let g=0;g<d;g++)u[m++]=c[f++]}return new tn(u,d,h)}if(this.index===null)return at("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){let u=c[d],f=e(u,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){let f=c[h];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(t))}let r=e.morphAttributes;for(let c in r){let d=[],h=r[c];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,d=a.length;c<d;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Oh,this.updateRanges=[],this.version=0,this.uuid=_s()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_s()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_s()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Nn=new Q,En=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyMatrix4(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyNormalMatrix(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.transformDirection(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ti(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=It(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ti(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),i=It(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),i=It(i,this.array),s=It(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),i=It(i,this.array),s=It(s,this.array),r=It(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Do("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new tn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Do("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ih=new Q,Z_=new Q,Q_=new ct,Ei=class{constructor(e=new Q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=ih.subVectors(i,t).cross(Z_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(ih),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Q_.getNormalMatrix(e),s=this.coplanarPoint(ih).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},ex=0,$i=class extends qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ex++}),this.uuid=_s(),this.name="",this.type="Material",this.blending=wa,this.side=Ws,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bh,this.blendDst=Sh,this.blendEquation=vr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=ua,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gc,this.stencilZFail=gc,this.stencilZPass=gc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){at(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){at(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new rt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Ei().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new nt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new nt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},_a=class extends $i{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ea,Eo=new Q,ta=new Q,na=new Q,ia=new nt,To=new nt,Jm=new vt,Kl=new Q,Ao=new Q,Zl=new Q,Jp=new nt,sh=new nt,Kp=new nt,Bo=class extends on{constructor(e=new _a){if(super(),this.isSprite=!0,this.type="Sprite",ea===void 0){ea=new $t;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Fo(t,5);ea.setIndex([0,1,2,0,2,3]),ea.setAttribute("position",new En(i,3,0,!1)),ea.setAttribute("uv",new En(i,2,3,!1))}this.geometry=ea,this.material=e,this.center=new nt(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&ot('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ta.setFromMatrixScale(this.matrixWorld),Jm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),na.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ta.multiplyScalar(-na.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;Ql(Kl.set(-.5,-.5,0),na,a,ta,s,r),Ql(Ao.set(.5,-.5,0),na,a,ta,s,r),Ql(Zl.set(.5,.5,0),na,a,ta,s,r),Jp.set(0,0),sh.set(1,0),Kp.set(1,1);let o=e.ray.intersectTriangle(Kl,Ao,Zl,!1,Eo);if(o===null&&(Ql(Ao.set(-.5,.5,0),na,a,ta,s,r),sh.set(0,1),o=e.ray.intersectTriangle(Kl,Zl,Ao,!1,Eo),o===null))return;let l=e.ray.origin.distanceTo(Eo);l<e.near||l>e.far||t.push({distance:l,point:Eo.clone(),uv:gs.getInterpolation(Eo,Kl,Ao,Zl,Jp,sh,Kp,new nt),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ql(n,e,t,i,s,r){ia.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(To.x=r*ia.x-s*ia.y,To.y=s*ia.x+r*ia.y):To.copy(ia),n.copy(e),n.x+=To.x,n.y+=To.y,n.applyMatrix4(Jm)}var ms=new Q,rh=new Q,ec=new Q,tc=new Q,zo=class{constructor(e=new Q,t=new Q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ms)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ms.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ms.copy(this.origin).addScaledVector(this.direction,t),ms.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){rh.copy(e).add(t).multiplyScalar(.5),ec.copy(t).sub(e).normalize(),tc.copy(this.origin).sub(rh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(ec),o=tc.dot(this.direction),l=-tc.dot(ec),c=tc.lengthSq(),d=Math.abs(1-a*a),h,u,f,m;if(d>0)if(h=a*l-o,u=a*o-l,m=r*d,h>=0)if(u>=-m)if(u<=m){let y=1/d;h*=y,u*=y,f=h*(h+a*u+2*o)+u*(a*h+u+2*l)+c}else u=r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;else u=-r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;else u<=-m?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+u*(u+2*l)+c):u<=m?(h=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+u*(u+2*l)+c);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(rh).addScaledVector(ec,u),f}intersectSphere(e,t){if(e.radius<0)return null;ms.subVectors(e.center,this.origin);let i=ms.dot(this.direction),s=ms.dot(ms)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ms)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,h=e.x-a.x,u=e.y-a.y,f=e.z-a.z,m=t.x-a.x,y=t.y-a.y,p=t.z-a.z,g=i.x-a.x,C=i.y-a.y,I=i.z-a.z,v=Math.abs(l),M=Math.abs(c),w=Math.abs(d),N,b,R,B,$,D,O,U,W,K,H,ee;if(v>=M&&v>=w?(R=l,D=h,W=m,ee=g,l>=0?(N=c,b=d,B=u,$=f,O=y,U=p,K=C,H=I):(N=d,b=c,B=f,$=u,O=p,U=y,K=I,H=C)):M>=w?(R=c,D=u,W=y,ee=C,c>=0?(N=d,b=l,B=f,$=h,O=p,U=m,K=I,H=g):(N=l,b=d,B=h,$=f,O=m,U=p,K=g,H=I)):(R=d,D=f,W=p,ee=I,d>=0?(N=l,b=c,B=h,$=u,O=m,U=y,K=g,H=C):(N=c,b=l,B=u,$=h,O=y,U=m,K=C,H=g)),R===0)return null;let q=N/R,ie=b/R,te=1/R,se=B-q*D,he=$-ie*D,Ne=O-q*W,Ee=U-ie*W,Ue=K-q*ee,X=H-ie*ee,Z=Ue*Ee-X*Ne,xe=se*X-he*Ue,Se=Ne*he-Ee*se;if(s){if(Z<0||xe<0||Se<0)return null}else if((Z<0||xe<0||Se<0)&&(Z>0||xe>0||Se>0))return null;let ve=Z+xe+Se;if(ve===0)return null;let je=te*(Z*D+xe*W+Se*ee);return(ve>0?je<0:je>0)?null:this.at(je/ve,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fs=class extends $i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ys,this.combine=Xc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Zp=new vt,pr=new zo,nc=new Ci,Qp=new Q,ic=new Q,sc=new Q,rc=new Q,ah=new Q,ac=new Q,em=new Q,oc=new Q,jt=class extends on{constructor(e=new $t,t=new Fs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ac.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let d=o[l],h=r[l];d!==0&&(ah.fromBufferAttribute(h,e),a?ac.addScaledVector(ah,d):ac.addScaledVector(ah.sub(t),d))}t.add(ac)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),nc.copy(i.boundingSphere),nc.applyMatrix4(r),pr.copy(e.ray).recast(e.near),!(nc.containsPoint(pr.origin)===!1&&(pr.intersectSphere(nc,Qp)===null||pr.origin.distanceToSquared(Qp)>(e.far-e.near)**2))&&(Zp.copy(r).invert(),pr.copy(e.ray).applyMatrix4(Zp),!(i.boundingBox!==null&&pr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,pr)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){let p=u[m],g=a[p.materialIndex],C=Math.max(p.start,f.start),I=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let v=C,M=I;v<M;v+=3){let w=o.getX(v),N=o.getX(v+1),b=o.getX(v+2);s=lc(this,g,e,i,c,d,h,w,N,b),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let p=m,g=y;p<g;p+=3){let C=o.getX(p),I=o.getX(p+1),v=o.getX(p+2);s=lc(this,a,e,i,c,d,h,C,I,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){let p=u[m],g=a[p.materialIndex],C=Math.max(p.start,f.start),I=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=C,M=I;v<M;v+=3){let w=v,N=v+1,b=v+2;s=lc(this,g,e,i,c,d,h,w,N,b),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let p=m,g=y;p<g;p+=3){let C=p,I=p+1,v=p+2;s=lc(this,a,e,i,c,d,h,C,I,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function tx(n,e,t,i,s,r,a,o){let l;if(e.side===mn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Ws,o),l===null)return null;oc.copy(o),oc.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(oc);return c<t.near||c>t.far?null:{distance:c,point:oc.clone(),object:n}}function lc(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,ic),n.getVertexPosition(l,sc),n.getVertexPosition(c,rc);let d=tx(n,e,t,i,ic,sc,rc,em);if(d){let h=new Q;gs.getBarycoord(em,ic,sc,rc,h),s&&(d.uv=gs.getInterpolatedAttribute(s,o,l,c,h,new nt)),r&&(d.uv1=gs.getInterpolatedAttribute(r,o,l,c,h,new nt)),a&&(d.normal=gs.getInterpolatedAttribute(a,o,l,c,h,new Q),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new Q,materialIndex:0};gs.getNormal(ic,sc,rc,u.normal),d.face=u,d.barycoord=h}return d}var vs=class extends qt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=nn,d=nn,h,u){super(null,a,o,l,c,d,s,r,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mr=new Ci,nx=new nt(.5,.5),cc=new Q,xa=class{constructor(e=new Ei,t=new Ei,i=new Ei,s=new Ei,r=new Ei,a=new Ei){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ai,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],h=r[5],u=r[6],f=r[7],m=r[8],y=r[9],p=r[10],g=r[11],C=r[12],I=r[13],v=r[14],M=r[15];if(s[0].setComponents(c-a,f-d,g-m,M-C).normalize(),s[1].setComponents(c+a,f+d,g+m,M+C).normalize(),s[2].setComponents(c+o,f+h,g+y,M+I).normalize(),s[3].setComponents(c-o,f-h,g-y,M-I).normalize(),i)s[4].setComponents(l,u,p,v).normalize(),s[5].setComponents(c-l,f-u,g-p,M-v).normalize();else if(s[4].setComponents(c-l,f-u,g-p,M-v).normalize(),t===Ai)s[5].setComponents(c+l,f+u,g+p,M+v).normalize();else if(t===da)s[5].setComponents(l,u,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mr)}intersectsSprite(e){mr.center.set(0,0,0);let t=nx.distanceTo(e.center);return mr.radius=.7071067811865476+t,mr.applyMatrix4(e.matrixWorld),this.intersectsSphere(mr)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(cc.x=s.normal.x>0?e.max.x:e.min.x,cc.y=s.normal.y>0?e.max.y:e.min.y,cc.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(cc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var yr=class extends $i{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},tm=new vt,ph=new zo,uc=new Ci,dc=new Q,Bs=class extends on{constructor(e=new $t,t=new yr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),uc.copy(i.boundingSphere),uc.applyMatrix4(s),uc.radius+=r,e.ray.intersectsSphere(uc)===!1)return;tm.copy(s).invert(),ph.copy(e.ray).applyMatrix4(tm);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,y=f;m<y;m++){let p=c.getX(m);dc.fromBufferAttribute(h,p),nm(dc,p,l,s,e,t,this)}}else{let u=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=u,y=f;m<y;m++)dc.fromBufferAttribute(h,m),nm(dc,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function nm(n,e,t,i,s,r,a){let o=ph.distanceSqToPoint(n);if(o<t){let l=new Q;ph.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Vo=class extends qt{constructor(e=[],t=js,i,s,r,a,o,l,c,d){super(e,t,i,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ya=class extends qt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var zs=class extends qt{constructor(e,t,i=Li,s,r,a,o=nn,l=nn,c,d=Xi,h=1){if(d!==Xi&&d!==Xs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:h};super(u,s,r,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Rc=class extends zs{constructor(e,t=Li,i=js,s,r,a=nn,o=nn,l,c=Xi){let d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,i,s,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ho=class extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},va=class n extends $t{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],d=[],h=[],u=0,f=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(d,3)),this.setAttribute("uv",new Wt(h,2));function m(y,p,g,C,I,v,M,w,N,b,R){let B=v/N,$=M/b,D=v/2,O=M/2,U=w/2,W=N+1,K=b+1,H=0,ee=0,q=new Q;for(let ie=0;ie<K;ie++){let te=ie*$-O;for(let se=0;se<W;se++){let he=se*B-D;q[y]=he*C,q[p]=te*I,q[g]=U,c.push(q.x,q.y,q.z),q[y]=0,q[p]=0,q[g]=w>0?1:-1,d.push(q.x,q.y,q.z),h.push(se/N),h.push(1-ie/b),H+=1}}for(let ie=0;ie<b;ie++)for(let te=0;te<N;te++){let se=u+te+W*ie,he=u+te+W*(ie+1),Ne=u+(te+1)+W*(ie+1),Ee=u+(te+1)+W*ie;l.push(se,he,Ee),l.push(he,Ne,Ee),ee+=6}o.addGroup(f,ee,R),f+=ee,u+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Go=class n extends $t{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,h=e/o,u=t/l,f=[],m=[],y=[],p=[];for(let g=0;g<d;g++){let C=g*u-a;for(let I=0;I<c;I++){let v=I*h-r;m.push(v,-C,0),y.push(0,0,1),p.push(I/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let C=0;C<o;C++){let I=C+c*g,v=C+c*(g+1),M=C+1+c*(g+1),w=C+1+c*g;f.push(I,v,w),f.push(v,M,w)}this.setIndex(f),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(y,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Wo=class n extends $t{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],d=[],h=e,u=(t-e)/s,f=new Q,m=new nt;for(let y=0;y<=s;y++){for(let p=0;p<=i;p++){let g=r+p/i*a;f.x=h*Math.cos(g),f.y=h*Math.sin(g),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,d.push(m.x,m.y)}h+=u}for(let y=0;y<s;y++){let p=y*(i+1);for(let g=0;g<i;g++){let C=g+p,I=C,v=C+i+1,M=C+i+2,w=C+1;o.push(I,v,w),o.push(v,M,w)}}this.setIndex(o),this.setAttribute("position",new Wt(l,3)),this.setAttribute("normal",new Wt(c,3)),this.setAttribute("uv",new Wt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Ri=class n extends $t{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,d=[],h=new Q,u=new Q,f=[],m=[],y=[],p=[];for(let g=0;g<=i;g++){let C=[],I=g/i,v=a+I*o,M=e*Math.cos(v),w=Math.sqrt(e*e-M*M),N=0;g===0&&a===0?N=.5/t:g===i&&l===Math.PI&&(N=-.5/t);for(let b=0;b<=t;b++){let R=b/t,B=s+R*r;h.x=-w*Math.cos(B),h.y=M,h.z=w*Math.sin(B),m.push(h.x,h.y,h.z),u.copy(h).normalize(),y.push(u.x,u.y,u.z),p.push(R+N,1-I),C.push(c++)}d.push(C)}for(let g=0;g<i;g++)for(let C=0;C<t;C++){let I=d[g][C+1],v=d[g][C],M=d[g+1][C],w=d[g+1][C+1];(g!==0||a>0)&&f.push(I,v,w),(g!==i-1||l<Math.PI)&&f.push(v,M,w)}this.setIndex(f),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(y,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var jo=class extends $t{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,s=new Q,r=new Q;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,d=l.length;c<d;++c){let h=l[c],u=h.start,f=h.count;for(let m=u,y=u+f;m<y;m+=3)for(let p=0;p<3;p++){let g=o.getX(m+p),C=o.getX(m+(p+1)%3);s.fromBufferAttribute(a,g),r.fromBufferAttribute(a,C),im(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let d=3*o+c,h=3*o+(c+1)%3;s.fromBufferAttribute(a,d),r.fromBufferAttribute(a,h),im(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Wt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function im(n,e,t){let i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}function Mr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(sm(s))s.isRenderTargetTexture?(at("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(sm(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Tn(n){let e={};for(let t=0;t<n.length;t++){let i=Mr(n[t]);for(let s in i)e[s]=i[s]}return e}function sm(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ix(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Vh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var cl={clone:Mr,merge:Tn},sx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kt=class extends $i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sx,this.fragmentShader=rx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mr(e.uniforms),this.uniformsGroups=ix(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new rt().setHex(s.value);break;case"v2":this.uniforms[i].value=new nt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new Q().fromArray(s.value);break;case"v4":this.uniforms[i].value=new mt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ct().fromArray(s.value);break;case"m4":this.uniforms[i].value=new vt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Pc=class extends kt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Xo=class extends $i{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Iu,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ys,this.combine=Xc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Lc=class extends $i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=km,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ic=class extends $i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function sa(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function oh(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Vs=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Nc=class extends Vs{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:dh,endingEnd:dh}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case hh:r=e,o=2*t-i;break;case fh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case hh:a=e,l=2*i-t;break;case fh:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(i-t)/(s-t),y=m*m,p=y*m,g=-u*p+2*u*y-u*m,C=(1+u)*p+(-1.5-2*u)*y+(-.5+u)*m+1,I=(-1-f)*p+(1.5+f)*y+.5*m,v=f*p-f*y;for(let M=0;M!==o;++M)r[M]=g*a[d+M]+C*a[c+M]+I*a[l+M]+v*a[h+M];return r}},Dc=class extends Vs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(i-t)/(s-t),h=1-d;for(let u=0;u!==o;++u)r[u]=a[c+u]*h+a[l+u]*d;return r}},Uc=class extends Vs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},kc=class extends Vs{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this.inTangents,h=this.outTangents;if(!d||!h){let m=(i-t)/(s-t),y=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*y+a[l+p]*m;return r}let u=o*2,f=e-1;for(let m=0;m!==o;++m){let y=a[c+m],p=a[l+m],g=f*u+m*2,C=h[g],I=h[g+1],v=e*u+m*2,M=d[v],w=d[v+1],N=ox(i,t,C,M,s);r[m]=Km(N,y,I,w,p)}return r}};function Km(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function ax(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function ox(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=Km(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let l=ax(r,e,t,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Kn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=sa(t,this.TimeBufferType),this.values=sa(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:sa(e.times,Array),values:sa(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),oh(e.settings)&&(i.settings={inTangents:sa(e.settings.inTangents,Array),outTangents:sa(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Uc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Dc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Nc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new kc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Po:t=this.InterpolantFactoryMethodDiscrete;break;case Ec:t=this.InterpolantFactoryMethodLinear;break;case mc:t=this.InterpolantFactoryMethodSmooth;break;case uh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return at("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Po;case this.InterpolantFactoryMethodLinear:return Ec;case this.InterpolantFactoryMethodSmooth:return mc;case this.InterpolantFactoryMethodBezier:return uh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;oh(this.settings)&&(rm(this.settings.inTangents,e),rm(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ot("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(ot("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){ot("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){ot("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&S_(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){ot("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===mc,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{let h=o*i,u=h-i,f=h+i;for(let m=0;m!==i;++m){let y=t[h+m];if(y!==t[u+m]||y!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*i,u=a*i;for(let f=0;f!==i;++f)t[u+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,oh(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function rm(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Kn.prototype.ValueTypeName="";Kn.prototype.TimeBufferType=Float32Array;Kn.prototype.ValueBufferType=Float32Array;Kn.prototype.DefaultInterpolation=Ec;var Hs=class extends Kn{constructor(e,t,i){super(e,t,i)}};Hs.prototype.ValueTypeName="bool";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=Po;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;var Oc=class extends Kn{constructor(e,t,i,s){super(e,t,i,s)}};Oc.prototype.ValueTypeName="color";var Fc=class extends Kn{constructor(e,t,i,s){super(e,t,i,s)}};Fc.prototype.ValueTypeName="number";var Bc=class extends Vs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let d=c+o;c!==d;c+=4)ui.slerpFlat(r,0,a,c-o,a,c,l);return r}},qo=class extends Kn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new Bc(this.times,this.values,this.getValueSize(),e)}};qo.prototype.ValueTypeName="quaternion";qo.prototype.InterpolantFactoryMethodSmooth=void 0;var Gs=class extends Kn{constructor(e,t,i){super(e,t,i)}};Gs.prototype.ValueTypeName="string";Gs.prototype.ValueBufferType=Array;Gs.prototype.DefaultInterpolation=Po;Gs.prototype.InterpolantFactoryMethodLinear=void 0;Gs.prototype.InterpolantFactoryMethodSmooth=void 0;var zc=class extends Kn{constructor(e,t,i,s){super(e,t,i,s)}};zc.prototype.ValueTypeName="vector";var Vc=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){let h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=c.length;h<u;h+=2){let f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Zm=new Vc,Hc=class{constructor(e){this.manager=e!==void 0?e:Zm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Hc.DEFAULT_MATERIAL_NAME="__DEFAULT";var $o=class extends on{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new rt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var lh=new vt,am=new Q,om=new Q,Gc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xa,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;am.setFromMatrixPosition(e.matrixWorld),t.position.copy(am),om.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(om),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){lh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(lh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===da||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(lh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},hc=new Q,fc=new ui,ji=new Q,Yo=class extends on{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(hc,fc,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hc,fc,ji.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(hc,fc,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hc,fc,ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ks=new Q,lm=new nt,cm=new nt,wn=class extends Yo{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Co*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fa*2*Math.atan(Math.tan(Co*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ks.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ks.x,ks.y).multiplyScalar(-e/ks.z),ks.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ks.x,ks.y).multiplyScalar(-e/ks.z)}getViewSize(e,t){return this.getViewBounds(e,lm,cm),t.subVectors(cm,lm)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Co*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var ba=class extends Yo{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},mh=class extends Gc{constructor(){super(new ba(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Jo=class extends $o{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(on.DEFAULT_UP),this.updateMatrix(),this.target=new on,this.shadow=new mh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ko=class extends $o{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Zo=class extends $t{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var ra=-90,aa=1,Wc=class extends on{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new wn(ra,aa,e,t);s.layers=this.layers,this.add(s);let r=new wn(ra,aa,e,t);r.layers=this.layers,this.add(r);let a=new wn(ra,aa,e,t);a.layers=this.layers,this.add(a);let o=new wn(ra,aa,e,t);o.layers=this.layers,this.add(o);let l=new wn(ra,aa,e,t);l.layers=this.layers,this.add(l);let c=new wn(ra,aa,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===da)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},jc=class extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Hh="\\[\\]\\.:\\/",lx=new RegExp("["+Hh+"]","g"),Gh="[^"+Hh+"]",cx="[^"+Hh.replace("\\.","")+"]",ux=/((?:WC+[\/:])*)/.source.replace("WC",Gh),dx=/(WCOD+)?/.source.replace("WCOD",cx),hx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gh),fx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gh),px=new RegExp("^"+ux+dx+hx+fx+"$"),mx=["material","materials","bones","map"],gh=class{constructor(e,t,i){let s=i||Ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Ft=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(lx,"")}static parseTrackName(e){let t=px.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);mx.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){at("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;ot("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ft.Composite=gh;Ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ft.prototype.GetterByBindingType=[Ft.prototype._getValue_direct,Ft.prototype._getValue_array,Ft.prototype._getValue_arrayElement,Ft.prototype._getValue_toArray];Ft.prototype.SetterByBindingTypeAndVersioning=[[Ft.prototype._setValue_direct,Ft.prototype._setValue_direct_setNeedsUpdate,Ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_array,Ft.prototype._setValue_array_setNeedsUpdate,Ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_arrayElement,Ft.prototype._setValue_arrayElement_setNeedsUpdate,Ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_fromArray,Ft.prototype._setValue_fromArray_setNeedsUpdate,Ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var nE=new Float32Array(1);var Yi=class extends Fo{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var _h=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}},um=new nt,Sa=class{constructor(e=new nt(1/0,1/0),t=new nt(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=um.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,um).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},dm=new Q,pc=new Q,oa=new Q,la=new Q,ch=new Q,gx=new Q,_x=new Q,Qo=class{constructor(e=new Q,t=new Q){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){dm.subVectors(e,this.start),pc.subVectors(this.end,this.start);let i=pc.dot(pc);if(i===0)return 0;let r=pc.dot(dm)/i;return t&&(r=ht(r,0,1)),r}closestPointToPoint(e,t,i){let s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=gx,i=_x){let s=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,d=e.end;oa.subVectors(c,o),la.subVectors(d,l),ch.subVectors(o,l);let h=oa.dot(oa),u=la.dot(la),f=la.dot(ch);if(h<=s&&u<=s)return t.copy(o),i.copy(l),t.sub(i),t.dot(t);if(h<=s)r=0,a=f/u,a=ht(a,0,1);else{let m=oa.dot(ch);if(u<=s)a=0,r=ht(-m/h,0,1);else{let y=oa.dot(la),p=h*u-y*y;p!==0?r=ht((y*f-m*u)/p,0,1):r=0,a=(y*r+f)/u,a<0?(a=0,r=ht(-m/h,0,1)):a>1&&(a=1,r=ht((y-m)/h,0,1))}}return t.copy(o).addScaledVector(oa,r),i.copy(l).addScaledVector(la,a),t.distanceToSquared(i)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function Wh(n,e,t,i){let s=xx(i);switch(t){case Uh:return n*e;case Sr:return n*e/s.components*s.byteLength;case Qc:return n*e/s.components*s.byteLength;case qs:return n*e*2/s.components*s.byteLength;case eu:return n*e*2/s.components*s.byteLength;case kh:return n*e*3/s.components*s.byteLength;case hn:return n*e*4/s.components*s.byteLength;case tu:return n*e*4/s.components*s.byteLength;case il:case sl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case rl:case al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case iu:case ru:return Math.max(n,16)*Math.max(e,8)/4;case nu:case su:return Math.max(n,8)*Math.max(e,8)/2;case au:case ou:case cu:case uu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case lu:case ol:case du:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case hu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case pu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case mu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case gu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case _u:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case xu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case yu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case vu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case bu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Su:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Mu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case wu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Eu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Tu:case Au:case Cu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ru:case Pu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ll:case Lu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function xx(n){switch(n){case sn:case Lh:return{byteLength:1,components:1};case Ea:case Ih:case Ni:return{byteLength:2,components:1};case Kc:case Zc:return{byteLength:2,components:4};case Li:case Jc:case Ii:return{byteLength:4,components:1};case Nh:case Dh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?at("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function vg(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function vx(n){let e=new WeakMap;function t(o,l){let c=o.array,d=o.usage,h=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){let d=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,d);else{h.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<h.length;f++){let m=h[u],y=h[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++u,h[u]=y)}h.length=u+1;for(let f=0,m=h.length;f<m;f++){let y=h[f];n.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var bx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Mx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ex=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ax=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Cx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Px=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ix=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Dx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ux=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ox=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Wx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Xx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,qx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$x=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ey=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ty=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ny=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ry=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ay=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,oy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ly=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,fy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,py=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,my=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_y=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,yy=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,by=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,My=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,wy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ey=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ty=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ay=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ry=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Py=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ly=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Iy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ny=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Uy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ky=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Oy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,By=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Wy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$y=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Ky=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ev=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,sv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,av=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ov=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Av=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Rv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Lv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Iv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Uv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ov=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$v=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ft={alphahash_fragment:bx,alphahash_pars_fragment:Sx,alphamap_fragment:Mx,alphamap_pars_fragment:wx,alphatest_fragment:Ex,alphatest_pars_fragment:Tx,aomap_fragment:Ax,aomap_pars_fragment:Cx,batching_pars_vertex:Rx,batching_vertex:Px,begin_vertex:Lx,beginnormal_vertex:Ix,bsdfs:Nx,iridescence_fragment:Dx,bumpmap_pars_fragment:Ux,clipping_planes_fragment:kx,clipping_planes_pars_fragment:Ox,clipping_planes_pars_vertex:Fx,clipping_planes_vertex:Bx,color_fragment:zx,color_pars_fragment:Vx,color_pars_vertex:Hx,color_vertex:Gx,common:Wx,cube_uv_reflection_fragment:jx,defaultnormal_vertex:Xx,displacementmap_pars_vertex:qx,displacementmap_vertex:$x,emissivemap_fragment:Yx,emissivemap_pars_fragment:Jx,colorspace_fragment:Kx,colorspace_pars_fragment:Zx,envmap_fragment:Qx,envmap_common_pars_fragment:ey,envmap_pars_fragment:ty,envmap_pars_vertex:ny,envmap_physical_pars_fragment:fy,envmap_vertex:iy,fog_vertex:sy,fog_pars_vertex:ry,fog_fragment:ay,fog_pars_fragment:oy,gradientmap_pars_fragment:ly,lightmap_pars_fragment:cy,lights_lambert_fragment:uy,lights_lambert_pars_fragment:dy,lights_pars_begin:hy,lights_toon_fragment:py,lights_toon_pars_fragment:my,lights_phong_fragment:gy,lights_phong_pars_fragment:_y,lights_physical_fragment:xy,lights_physical_pars_fragment:yy,lights_fragment_begin:vy,lights_fragment_maps:by,lights_fragment_end:Sy,lightprobes_pars_fragment:My,logdepthbuf_fragment:wy,logdepthbuf_pars_fragment:Ey,logdepthbuf_pars_vertex:Ty,logdepthbuf_vertex:Ay,map_fragment:Cy,map_pars_fragment:Ry,map_particle_fragment:Py,map_particle_pars_fragment:Ly,metalnessmap_fragment:Iy,metalnessmap_pars_fragment:Ny,morphinstance_vertex:Dy,morphcolor_vertex:Uy,morphnormal_vertex:ky,morphtarget_pars_vertex:Oy,morphtarget_vertex:Fy,normal_fragment_begin:By,normal_fragment_maps:zy,normal_pars_fragment:Vy,normal_pars_vertex:Hy,normal_vertex:Gy,normalmap_pars_fragment:Wy,clearcoat_normal_fragment_begin:jy,clearcoat_normal_fragment_maps:Xy,clearcoat_pars_fragment:qy,iridescence_pars_fragment:$y,opaque_fragment:Yy,packing:Jy,premultiplied_alpha_fragment:Ky,project_vertex:Zy,dithering_fragment:Qy,dithering_pars_fragment:ev,roughnessmap_fragment:tv,roughnessmap_pars_fragment:nv,shadowmap_pars_fragment:iv,shadowmap_pars_vertex:sv,shadowmap_vertex:rv,shadowmask_pars_fragment:av,skinbase_vertex:ov,skinning_pars_vertex:lv,skinning_vertex:cv,skinnormal_vertex:uv,specularmap_fragment:dv,specularmap_pars_fragment:hv,tonemapping_fragment:fv,tonemapping_pars_fragment:pv,transmission_fragment:mv,transmission_pars_fragment:gv,uv_pars_fragment:_v,uv_pars_vertex:xv,uv_vertex:yv,worldpos_vertex:vv,background_vert:bv,background_frag:Sv,backgroundCube_vert:Mv,backgroundCube_frag:wv,cube_vert:Ev,cube_frag:Tv,depth_vert:Av,depth_frag:Cv,distance_vert:Rv,distance_frag:Pv,equirect_vert:Lv,equirect_frag:Iv,linedashed_vert:Nv,linedashed_frag:Dv,meshbasic_vert:Uv,meshbasic_frag:kv,meshlambert_vert:Ov,meshlambert_frag:Fv,meshmatcap_vert:Bv,meshmatcap_frag:zv,meshnormal_vert:Vv,meshnormal_frag:Hv,meshphong_vert:Gv,meshphong_frag:Wv,meshphysical_vert:jv,meshphysical_frag:Xv,meshtoon_vert:qv,meshtoon_frag:$v,points_vert:Yv,points_frag:Jv,shadow_vert:Kv,shadow_frag:Zv,sprite_vert:Qv,sprite_frag:eb},We={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Q},probesMax:{value:new Q},probesResolution:{value:new Q}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},Dn={basic:{uniforms:Tn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:Tn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new rt(0)},envMapIntensity:{value:1}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:Tn([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:Tn([We.common,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.roughnessmap,We.metalnessmap,We.fog,We.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:Tn([We.common,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.gradientmap,We.fog,We.lights,{emissive:{value:new rt(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:Tn([We.common,We.bumpmap,We.normalmap,We.displacementmap,We.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:Tn([We.points,We.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:Tn([We.common,We.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:Tn([We.common,We.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:Tn([We.common,We.bumpmap,We.normalmap,We.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:Tn([We.sprite,We.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distance:{uniforms:Tn([We.common,We.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distance_vert,fragmentShader:ft.distance_frag},shadow:{uniforms:Tn([We.lights,We.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};Dn.physical={uniforms:Tn([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};var Uu={r:0,b:0,g:0},tb=new vt,bg=new ct;bg.set(-1,0,0,0,1,0,0,0,1);function nb(n,e,t,i,s,r){let a=new rt(0),o=s===!0?0:1,l,c,d=null,h=0,u=null;function f(C){let I=C.isScene===!0?C.background:null;if(I&&I.isTexture){let v=C.backgroundBlurriness>0;I=e.get(I,v)}return I}function m(C){let I=!1,v=f(C);v===null?p(a,o):v&&v.isColor&&(p(v,1),I=!0);let M=n.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||I)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(C,I){let v=f(I);v&&(v.isCubeTexture||v.mapping===tl)?(c===void 0&&(c=new jt(new va(1,1,1),new kt({name:"BackgroundCubeMaterial",uniforms:Mr(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,w,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(tb.makeRotationFromEuler(I.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(bg),c.material.toneMapped=_t.getTransfer(v.colorSpace)!==At,(d!==v||h!==v.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=v,h=v.version,u=n.toneMapping),c.layers.enableAll(),C.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new jt(new Go(2,2),new kt({name:"BackgroundMaterial",uniforms:Mr(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Ws,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,l.material.toneMapped=_t.getTransfer(v.colorSpace)!==At,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||h!==v.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=v,h=v.version,u=n.toneMapping),l.layers.enableAll(),C.unshift(l,l.geometry,l.material,0,0,null))}function p(C,I){C.getRGB(Uu,Vh(n)),t.buffers.color.setClear(Uu.r,Uu.g,Uu.b,I,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(C,I=1){a.set(C),o=I,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(C){o=C,p(a,o)},render:m,addToRenderList:y,dispose:g}}function ib(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o($,D,O,U,W){let K=!1,H=h($,U,O,D);r!==H&&(r=H,c(r.object)),K=f($,U,O,W),K&&m($,U,O,W),W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,v($,D,O,U),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return n.createVertexArray()}function c($){return n.bindVertexArray($)}function d($){return n.deleteVertexArray($)}function h($,D,O,U){let W=U.wireframe===!0,K=i[D.id];K===void 0&&(K={},i[D.id]=K);let H=$.isInstancedMesh===!0?$.id:0,ee=K[H];ee===void 0&&(ee={},K[H]=ee);let q=ee[O.id];q===void 0&&(q={},ee[O.id]=q);let ie=q[W];return ie===void 0&&(ie=u(l()),q[W]=ie),ie}function u($){let D=[],O=[],U=[];for(let W=0;W<t;W++)D[W]=0,O[W]=0,U[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:O,attributeDivisors:U,object:$,attributes:{},index:null}}function f($,D,O,U){let W=r.attributes,K=D.attributes,H=0,ee=O.getAttributes();for(let q in ee)if(ee[q].location>=0){let te=W[q],se=K[q];if(se===void 0&&(q==="instanceMatrix"&&$.instanceMatrix&&(se=$.instanceMatrix),q==="instanceColor"&&$.instanceColor&&(se=$.instanceColor)),te===void 0||te.attribute!==se||se&&te.data!==se.data)return!0;H++}return r.attributesNum!==H||r.index!==U}function m($,D,O,U){let W={},K=D.attributes,H=0,ee=O.getAttributes();for(let q in ee)if(ee[q].location>=0){let te=K[q];te===void 0&&(q==="instanceMatrix"&&$.instanceMatrix&&(te=$.instanceMatrix),q==="instanceColor"&&$.instanceColor&&(te=$.instanceColor));let se={};se.attribute=te,te&&te.data&&(se.data=te.data),W[q]=se,H++}r.attributes=W,r.attributesNum=H,r.index=U}function y(){let $=r.newAttributes;for(let D=0,O=$.length;D<O;D++)$[D]=0}function p($){g($,0)}function g($,D){let O=r.newAttributes,U=r.enabledAttributes,W=r.attributeDivisors;O[$]=1,U[$]===0&&(n.enableVertexAttribArray($),U[$]=1),W[$]!==D&&(n.vertexAttribDivisor($,D),W[$]=D)}function C(){let $=r.newAttributes,D=r.enabledAttributes;for(let O=0,U=D.length;O<U;O++)D[O]!==$[O]&&(n.disableVertexAttribArray(O),D[O]=0)}function I($,D,O,U,W,K,H){H===!0?n.vertexAttribIPointer($,D,O,W,K):n.vertexAttribPointer($,D,O,U,W,K)}function v($,D,O,U){y();let W=U.attributes,K=O.getAttributes(),H=D.defaultAttributeValues;for(let ee in K){let q=K[ee];if(q.location>=0){let ie=W[ee];if(ie===void 0&&(ee==="instanceMatrix"&&$.instanceMatrix&&(ie=$.instanceMatrix),ee==="instanceColor"&&$.instanceColor&&(ie=$.instanceColor)),ie!==void 0){let te=ie.normalized,se=ie.itemSize,he=e.get(ie);if(he===void 0)continue;let Ne=he.buffer,Ee=he.type,Ue=he.bytesPerElement,X=Ee===n.INT||Ee===n.UNSIGNED_INT||ie.gpuType===Jc;if(ie.isInterleavedBufferAttribute){let Z=ie.data,xe=Z.stride,Se=ie.offset;if(Z.isInstancedInterleavedBuffer){for(let ve=0;ve<q.locationSize;ve++)g(q.location+ve,Z.meshPerAttribute);$.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ve=0;ve<q.locationSize;ve++)p(q.location+ve);n.bindBuffer(n.ARRAY_BUFFER,Ne);for(let ve=0;ve<q.locationSize;ve++)I(q.location+ve,se/q.locationSize,Ee,te,xe*Ue,(Se+se/q.locationSize*ve)*Ue,X)}else{if(ie.isInstancedBufferAttribute){for(let Z=0;Z<q.locationSize;Z++)g(q.location+Z,ie.meshPerAttribute);$.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Z=0;Z<q.locationSize;Z++)p(q.location+Z);n.bindBuffer(n.ARRAY_BUFFER,Ne);for(let Z=0;Z<q.locationSize;Z++)I(q.location+Z,se/q.locationSize,Ee,te,se*Ue,se/q.locationSize*Z*Ue,X)}}else if(H!==void 0){let te=H[ee];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(q.location,te);break;case 3:n.vertexAttrib3fv(q.location,te);break;case 4:n.vertexAttrib4fv(q.location,te);break;default:n.vertexAttrib1fv(q.location,te)}}}}C()}function M(){R();for(let $ in i){let D=i[$];for(let O in D){let U=D[O];for(let W in U){let K=U[W];for(let H in K)d(K[H].object),delete K[H];delete U[W]}}delete i[$]}}function w($){if(i[$.id]===void 0)return;let D=i[$.id];for(let O in D){let U=D[O];for(let W in U){let K=U[W];for(let H in K)d(K[H].object),delete K[H];delete U[W]}}delete i[$.id]}function N($){for(let D in i){let O=i[D];for(let U in O){let W=O[U];if(W[$.id]===void 0)continue;let K=W[$.id];for(let H in K)d(K[H].object),delete K[H];delete W[$.id]}}}function b($){for(let D in i){let O=i[D],U=$.isInstancedMesh===!0?$.id:0,W=O[U];if(W!==void 0){for(let K in W){let H=W[K];for(let ee in H)d(H[ee].object),delete H[ee];delete W[K]}delete O[U],Object.keys(O).length===0&&delete i[D]}}}function R(){B(),a=!0,r!==s&&(r=s,c(r.object))}function B(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:B,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfObject:b,releaseStatesOfProgram:N,initAttributes:y,enableAttribute:p,disableUnusedAttributes:C}}function sb(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let f=0;f<d;f++)u+=c[f];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function rb(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let N=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(N){return!(N!==hn&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(N){let b=N===Ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==sn&&N!==Ii&&!b&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(N){if(N==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",d=l(c);d!==c&&(at("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&at("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),C=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),I=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:C,maxVaryings:I,maxFragmentUniforms:v,maxSamples:M,samples:w}}function ab(n){let e=this,t=null,i=0,s=!1,r=!1,a=new Ei,o=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let f=h.length!==0||u||i!==0||s;return s=u,i=h.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){let m=h.clippingPlanes,y=h.clipIntersection,p=h.clipShadows,g=n.get(h);if(!s||m===null||m.length===0||r&&!p)r?d(null):c();else{let C=r?0:i,I=C*4,v=g.clippingState||null;l.value=v,v=d(m,u,I,f);for(let M=0;M!==I;++M)v[M]=t[M];g.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=C}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,f,m){let y=h!==null?h.length:0,p=null;if(y!==0){if(p=l.value,m!==!0||p===null){let g=f+y*4,C=u.matrixWorldInverse;o.getNormalMatrix(C),(p===null||p.length<g)&&(p=new Float32Array(g));for(let I=0,v=f;I!==y;++I,v+=4)a.copy(h[I]).applyMatrix4(C,o),a.normal.toArray(p,v),p[v+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,p}}var Ca=4,ob=6,lb=20,cb=256,ul=new ba,Qm=new rt,jh=null,Xh=0,qh=0,$h=!1,ub=new Q,wr=new Q,Ou=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=ub}=r;jh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),qh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ng(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(jh,Xh,qh),this._renderer.xr.enabled=$h,e.scissorTest=!1,Aa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===js||e.mapping===br?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),qh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:Ni,format:hn,colorSpace:Lo,depthBuffer:!1},s=eg(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=eg(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=db(r)),this._blurMaterial=fb(r,e,t),this._ggxMaterial=hb(r,e,t)}return s}_compileMaterial(e){let t=new jt(new $t,e);this._renderer.compile(t,ul)}_sceneToCubeUV(e,t,i,s,r){let l=new wn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Qm),h.toneMapping=Pi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jt(new va,new Fs({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,p=y.material,g=!1,C=e.background;C?C.isColor&&(p.color.copy(C),e.background=null,g=!0):(p.color.copy(Qm),g=!0);for(let I=0;I<6;I++){let v=I%3;v===0?(l.up.set(0,c[I],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[I],r.y,r.z)):v===1?(l.up.set(0,0,c[I]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[I],r.z)):(l.up.set(0,c[I],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[I]));let M=this._cubeSize;Aa(s,v*M,I>2?M:0,M,M),h.setRenderTarget(s),g&&h.render(y,l),h.render(e,l)}h.toneMapping=f,h.autoClear=u,e.background=C}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===js||e.mapping===br;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ng()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tg());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Aa(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,ul)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),u=c*1.25,f=h*u,{_lodMax:m}=this,y=this._sizeLods[i],p=3*y*(i>m-Ca?i-m+Ca:0),g=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,Aa(r,p,g,3*y,2*y),s.setRenderTarget(r),s.render(o,ul),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,Aa(e,p,g,3*y,2*y),s.setRenderTarget(e),s.render(o,ul)}_blur(e,t,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let d=this._sizeLods[s],h=3*d*(s>this._lodMax-Ca?s-this._lodMax+Ca:0),u=4*(this._cubeSize-d);Aa(t,h,u,3*d,2*d),a.setRenderTarget(t),a.render(l,ul)}};function db(n){let e=[],t=[],i=n,s=n-Ca+1+ob;for(let r=0;r<s;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,d=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,u=6,f=3,m=new Float32Array(f*u*h),y=new Float32Array(f*u*h);for(let g=0;g<h;g++){let C=g%3*2/3-1,I=g>2?0:-1,v=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];m.set(v,f*u*g);for(let M=0;M<u;M++){let w=d[M*2]*2-1,N=d[M*2+1]*2-1;g===0?wr.set(1,N,w):g===1?wr.set(-w,1,-N):g===2?wr.set(-w,N,1):g===3?wr.set(-1,N,-w):g===4?wr.set(-w,-1,N):wr.set(w,N,-1),wr.toArray(y,(g*u+M)*f)}}let p=new $t;p.setAttribute("position",new tn(m,f)),p.setAttribute("outputDirection",new tn(y,f)),t.push(new jt(p,null)),i>Ca&&i--}return{lodMeshes:t,sizeLods:e}}function eg(n,e,t){let i=new Wn(n,e,t);return i.texture.mapping=tl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Aa(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function hb(n,e,t){return new kt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:cb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function fb(n,e,t){return new kt({name:"SphericalGaussianBlur",defines:{SAMPLES:lb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function tg(){return new kt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function ng(){return new kt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function zu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Fu=class extends Wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Vo(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new va(5,5,5),r=new kt({name:"CubemapFromEquirect",uniforms:Mr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:Ji});r.uniforms.tEquirect.value=t;let a=new jt(s,r),o=t.minFilter;return t.minFilter===Zn&&(t.minFilter=Nt),new Wc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function pb(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===qc||f===$c)if(e.has(u)){let m=e.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let y=new Fu(m.height);return y.fromEquirectangularTexture(n,u),e.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,m=f===qc||f===$c,y=f===js||f===br;if(m||y){let p=t.get(u),g=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return i===null&&(i=new Ou(n)),p=m?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{let C=u.image;return m&&C&&C.height>0||y&&C&&l(C)?(i===null&&(i=new Ou(n)),p=m?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",d),p.texture):null}}}return u}function o(u,f){return f===qc?u.mapping=js:f===$c&&(u.mapping=br),u}function l(u){let f=0,m=6;for(let y=0;y<m;y++)u[y]!==void 0&&f++;return f===m}function c(u){let f=u.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(u){let f=u.target;f.removeEventListener("dispose",d);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function mb(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&_r("WebGLRenderer: "+i+" extension not supported."),s}}}function gb(n,e,t,i){let s={},r=new WeakMap;function a(h){let u=h.target;u.index!==null&&e.remove(u.index);for(let m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(h){let u=h.attributes;for(let f in u)e.update(u[f],n.ARRAY_BUFFER)}function c(h){let u=[],f=h.index,m=h.attributes.position,y=0;if(m===void 0)return;if(f!==null){let C=f.array;y=f.version;for(let I=0,v=C.length;I<v;I+=3){let M=C[I+0],w=C[I+1],N=C[I+2];u.push(M,w,w,N,N,M)}}else{let C=m.array;y=m.version;for(let I=0,v=C.length/3-1;I<v;I+=3){let M=I+0,w=I+1,N=I+2;u.push(M,w,w,N,N,M)}}let p=new(m.count>=65535?Oo:ko)(u,1);p.version=y;let g=r.get(h);g&&e.remove(g),r.set(h,p)}function d(h){let u=r.get(h);if(u){let f=h.index;f!==null&&u.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function _b(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,u){n.drawElements(i,u,r,h*a),t.update(u,i,1)}function c(h,u,f){f!==0&&(n.drawElementsInstanced(i,u,r,h*a,f),t.update(u,i,f))}function d(h,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,h,0,f);let y=0;for(let p=0;p<f;p++)y+=u[p];t.update(y,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function xb(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:ot("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function yb(n,e,t){let i=new WeakMap,s=new mt;function r(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0,u=i.get(o);if(u===void 0||u.count!==h){let R=function(){N.dispose(),i.delete(o),o.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],C=o.morphAttributes.color||[],I=0;f===!0&&(I=1),m===!0&&(I=2),y===!0&&(I=3);let v=o.attributes.position.count*I,M=1;v>e.maxTextureSize&&(M=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let w=new Float32Array(v*M*4*h),N=new xr(w,v,M,h);N.type=Ii,N.needsUpdate=!0;let b=I*4;for(let B=0;B<h;B++){let $=p[B],D=g[B],O=C[B],U=v*M*4*B;for(let W=0;W<$.count;W++){let K=W*b;f===!0&&(s.fromBufferAttribute($,W),w[U+K+0]=s.x,w[U+K+1]=s.y,w[U+K+2]=s.z,w[U+K+3]=0),m===!0&&(s.fromBufferAttribute(D,W),w[U+K+4]=s.x,w[U+K+5]=s.y,w[U+K+6]=s.z,w[U+K+7]=0),y===!0&&(s.fromBufferAttribute(O,W),w[U+K+8]=s.x,w[U+K+9]=s.y,w[U+K+10]=s.z,w[U+K+11]=O.itemSize===4?s.w:1)}}u={count:h,texture:N,size:new nt(v,M)},i.set(o,u),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function vb(n,e,t,i,s){let r=new WeakMap;function a(c){let d=s.render.frame,h=c.geometry,u=e.get(c,h);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==d&&(f.update(),r.set(f,d))}return u}function o(){r=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}var bb={[Mh]:"LINEAR_TONE_MAPPING",[wh]:"REINHARD_TONE_MAPPING",[Eh]:"CINEON_TONE_MAPPING",[Th]:"ACES_FILMIC_TONE_MAPPING",[Ch]:"AGX_TONE_MAPPING",[Rh]:"NEUTRAL_TONE_MAPPING",[Ah]:"CUSTOM_TONE_MAPPING"};function Sb(n,e,t,i,s,r){let a=new Wn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new $t;c.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Wt([0,2,0,0,2,0],2));let d=new Pc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new jt(c,d),u=new ba(-1,1,1,-1,0,1),f=null,m=null,y=!1,p,g=null,C=[],I=!1;this.setSize=function(v,M){a.setSize(v,M),o!==null&&o.setSize(v,M),l!==null&&l.setSize(v,M);for(let w=0;w<C.length;w++){let N=C[w];N.setSize&&N.setSize(v,M)}},this.setEffects=function(v){C=v,I=C.length>0&&C[0].isRenderPass===!0;let M=a.width,w=a.height;C.length>0&&o===null&&(o=new Wn(M,w,{type:Ni,depthBuffer:!1,stencilBuffer:!1}),l=new Wn(M,w,{type:Ni,depthBuffer:!1,stencilBuffer:!1}));for(let N=0;N<C.length;N++){let b=C[N];b.setSize&&b.setSize(M,w)}},this.begin=function(v,M){if(y||v.toneMapping===Pi&&C.length===0)return!1;if(g=M,M!==null){let w=M.width,N=M.height;(a.width!==w||a.height!==N)&&this.setSize(w,N)}return I===!1&&v.setRenderTarget(a),p=v.toneMapping,v.toneMapping=Pi,!0},this.hasRenderPass=function(){return I},this.end=function(v,M){v.toneMapping=p,y=!0;let w=a,N=o;for(let b=0;b<C.length;b++){let R=C[b];R.enabled!==!1&&(R.render(v,N,w,M),R.needsSwap!==!1&&(w=N,N=N===o?l:o))}if(f!==v.outputColorSpace||m!==v.toneMapping){f=v.outputColorSpace,m=v.toneMapping,d.defines={},_t.getTransfer(f)===At&&(d.defines.SRGB_TRANSFER="");let b=bb[m];b&&(d.defines[b]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(g),v.render(h,u),g=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),d.dispose()}}var Sg=new qt,Kh=new zs(1,1),Mg=new xr,wg=new Cc,Eg=new Vo,ig=[],sg=[],rg=new Float32Array(16),ag=new Float32Array(9),og=new Float32Array(4);function Pa(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=ig[s];if(r===void 0&&(r=new Float32Array(s),ig[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function ln(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function cn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Vu(n,e){let t=sg[e];t===void 0&&(t=new Int32Array(e),sg[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Mb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function wb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;n.uniform2fv(this.addr,e),cn(t,e)}}function Eb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ln(t,e))return;n.uniform3fv(this.addr,e),cn(t,e)}}function Tb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;n.uniform4fv(this.addr,e),cn(t,e)}}function Ab(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(ln(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),cn(t,e)}else{if(ln(t,i))return;og.set(i),n.uniformMatrix2fv(this.addr,!1,og),cn(t,i)}}function Cb(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(ln(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),cn(t,e)}else{if(ln(t,i))return;ag.set(i),n.uniformMatrix3fv(this.addr,!1,ag),cn(t,i)}}function Rb(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(ln(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),cn(t,e)}else{if(ln(t,i))return;rg.set(i),n.uniformMatrix4fv(this.addr,!1,rg),cn(t,i)}}function Pb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Lb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;n.uniform2iv(this.addr,e),cn(t,e)}}function Ib(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ln(t,e))return;n.uniform3iv(this.addr,e),cn(t,e)}}function Nb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;n.uniform4iv(this.addr,e),cn(t,e)}}function Db(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ub(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;n.uniform2uiv(this.addr,e),cn(t,e)}}function kb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ln(t,e))return;n.uniform3uiv(this.addr,e),cn(t,e)}}function Ob(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;n.uniform4uiv(this.addr,e),cn(t,e)}}function Fb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Kh.compareFunction=t.isReversedDepthBuffer()?Du:Nu,r=Kh):r=Sg,t.setTexture2D(e||r,s)}function Bb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||wg,s)}function zb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Eg,s)}function Vb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Mg,s)}function Hb(n){switch(n){case 5126:return Mb;case 35664:return wb;case 35665:return Eb;case 35666:return Tb;case 35674:return Ab;case 35675:return Cb;case 35676:return Rb;case 5124:case 35670:return Pb;case 35667:case 35671:return Lb;case 35668:case 35672:return Ib;case 35669:case 35673:return Nb;case 5125:return Db;case 36294:return Ub;case 36295:return kb;case 36296:return Ob;case 35678:case 36198:case 36298:case 36306:case 35682:return Fb;case 35679:case 36299:case 36307:return Bb;case 35680:case 36300:case 36308:case 36293:return zb;case 36289:case 36303:case 36311:case 36292:return Vb}}function Gb(n,e){n.uniform1fv(this.addr,e)}function Wb(n,e){let t=Pa(e,this.size,2);n.uniform2fv(this.addr,t)}function jb(n,e){let t=Pa(e,this.size,3);n.uniform3fv(this.addr,t)}function Xb(n,e){let t=Pa(e,this.size,4);n.uniform4fv(this.addr,t)}function qb(n,e){let t=Pa(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function $b(n,e){let t=Pa(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Yb(n,e){let t=Pa(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Jb(n,e){n.uniform1iv(this.addr,e)}function Kb(n,e){n.uniform2iv(this.addr,e)}function Zb(n,e){n.uniform3iv(this.addr,e)}function Qb(n,e){n.uniform4iv(this.addr,e)}function eS(n,e){n.uniform1uiv(this.addr,e)}function tS(n,e){n.uniform2uiv(this.addr,e)}function nS(n,e){n.uniform3uiv(this.addr,e)}function iS(n,e){n.uniform4uiv(this.addr,e)}function sS(n,e,t){let i=this.cache,s=e.length,r=Vu(t,s);ln(i,r)||(n.uniform1iv(this.addr,r),cn(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Kh:a=Sg;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function rS(n,e,t){let i=this.cache,s=e.length,r=Vu(t,s);ln(i,r)||(n.uniform1iv(this.addr,r),cn(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||wg,r[a])}function aS(n,e,t){let i=this.cache,s=e.length,r=Vu(t,s);ln(i,r)||(n.uniform1iv(this.addr,r),cn(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Eg,r[a])}function oS(n,e,t){let i=this.cache,s=e.length,r=Vu(t,s);ln(i,r)||(n.uniform1iv(this.addr,r),cn(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Mg,r[a])}function lS(n){switch(n){case 5126:return Gb;case 35664:return Wb;case 35665:return jb;case 35666:return Xb;case 35674:return qb;case 35675:return $b;case 35676:return Yb;case 5124:case 35670:return Jb;case 35667:case 35671:return Kb;case 35668:case 35672:return Zb;case 35669:case 35673:return Qb;case 5125:return eS;case 36294:return tS;case 36295:return nS;case 36296:return iS;case 35678:case 36198:case 36298:case 36306:case 35682:return sS;case 35679:case 36299:case 36307:return rS;case 35680:case 36300:case 36308:case 36293:return aS;case 36289:case 36303:case 36311:case 36292:return oS}}var Zh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Hb(t.type)}},Qh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lS(t.type)}},ef=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},Yh=/(\w+)(\])?(\[|\.)?/g;function lg(n,e){n.seq.push(e),n.map[e.id]=e}function cS(n,e,t){let i=n.name,s=i.length;for(Yh.lastIndex=0;;){let r=Yh.exec(i),a=Yh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){lg(t,c===void 0?new Zh(o,n,e):new Qh(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new ef(o),lg(t,h)),t=h}}}var Ra=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);cS(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function cg(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var uS=37297,dS=0;function hS(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var ug=new ct;function fS(n){_t._getMatrix(ug,_t.workingColorSpace,n);let e=`mat3( ${ug.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(n)){case Io:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return at("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function dg(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+hS(n.getShaderSource(e),o)}else return r}function pS(n,e){let t=fS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var mS={[Mh]:"Linear",[wh]:"Reinhard",[Eh]:"Cineon",[Th]:"ACESFilmic",[Ch]:"AgX",[Rh]:"Neutral",[Ah]:"Custom"};function gS(n,e){let t=mS[e];return t===void 0?(at("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ku=new Q;function _S(){_t.getLuminanceCoefficients(ku);let n=ku.x.toFixed(4),e=ku.y.toFixed(4),t=ku.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hl).join(`
`)}function yS(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function vS(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function hl(n){return n!==""}function hg(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fg(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var bS=/^[ \t]*#include +<([\w\d./]+)>/gm;function tf(n){return n.replace(bS,MS)}var SS=new Map;function MS(n,e){let t=ft[e];if(t===void 0){let i=SS.get(e);if(i!==void 0)t=ft[i],at('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return tf(t)}var wS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pg(n){return n.replace(wS,ES)}function ES(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function mg(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var TS={[el]:"SHADOWMAP_TYPE_PCF",[Ma]:"SHADOWMAP_TYPE_VSM"};function AS(n){return TS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var CS={[js]:"ENVMAP_TYPE_CUBE",[br]:"ENVMAP_TYPE_CUBE",[tl]:"ENVMAP_TYPE_CUBE_UV"};function RS(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":CS[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var PS={[br]:"ENVMAP_MODE_REFRACTION"};function LS(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":PS[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var IS={[Xc]:"ENVMAP_BLENDING_MULTIPLY",[Nm]:"ENVMAP_BLENDING_MIX",[Dm]:"ENVMAP_BLENDING_ADD"};function NS(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":IS[n.combine]||"ENVMAP_BLENDING_NONE"}function DS(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function US(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=AS(t),c=RS(t),d=LS(t),h=NS(t),u=DS(t),f=xS(t),m=yS(r),y=s.createProgram(),p,g,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(hl).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(hl).join(`
`),g.length>0&&(g+=`
`)):(p=[mg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hl).join(`
`),g=[mg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pi?"#define TONE_MAPPING":"",t.toneMapping!==Pi?ft.tonemapping_pars_fragment:"",t.toneMapping!==Pi?gS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,pS("linearToOutputTexel",t.outputColorSpace),_S(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hl).join(`
`)),a=tf(a),a=hg(a,t),a=fg(a,t),o=tf(o),o=hg(o,t),o=fg(o,t),a=pg(a),o=pg(o),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===Fh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let I=C+p+a,v=C+g+o,M=cg(s,s.VERTEX_SHADER,I),w=cg(s,s.FRAGMENT_SHADER,v);s.attachShader(y,M),s.attachShader(y,w),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function N($){if(n.debug.checkShaderErrors){let D=s.getProgramInfoLog(y)||"",O=s.getShaderInfoLog(M)||"",U=s.getShaderInfoLog(w)||"",W=D.trim(),K=O.trim(),H=U.trim(),ee=!0,q=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(ee=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,M,w);else{let ie=dg(s,M,"vertex"),te=dg(s,w,"fragment");ot("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+$.name+`
Material Type: `+$.type+`

Program Info Log: `+W+`
`+ie+`
`+te)}else W!==""?at("WebGLProgram: Program Info Log:",W):(K===""||H==="")&&(q=!1);q&&($.diagnostics={runnable:ee,programLog:W,vertexShader:{log:K,prefix:p},fragmentShader:{log:H,prefix:g}})}s.deleteShader(M),s.deleteShader(w),b=new Ra(s,y),R=vS(s,y)}let b;this.getUniforms=function(){return b===void 0&&N(this),b};let R;this.getAttributes=function(){return R===void 0&&N(this),R};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(y,uS)),B},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dS++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=w,this}var kS=0,nf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new sf(e),t.set(e,i)),i}},sf=class{constructor(e){this.id=kS++,this.code=e,this.usedTimes=0}};function OS(n){return n===qs||n===ol||n===ll}function FS(n,e,t,i,s,r){let a=new Uo,o=new nf,l=new Set,c=[],d=new Map,h=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(b){return l.add(b),b===0?"uv":`uv${b}`}function y(b,R,B,$,D,O){let U=$.fog,W=D.geometry,K=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?$.environment:null,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ee=e.get(b.envMap||K,H),q=ee&&ee.mapping===tl?ee.image.height:null,ie=f[b.type];b.precision!==null&&(u=i.getMaxPrecision(b.precision),u!==b.precision&&at("WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));let te=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,se=te!==void 0?te.length:0,he=0;W.morphAttributes.position!==void 0&&(he=1),W.morphAttributes.normal!==void 0&&(he=2),W.morphAttributes.color!==void 0&&(he=3);let Ne,Ee,Ue,X;if(ie){let pt=Dn[ie];Ne=pt.vertexShader,Ee=pt.fragmentShader}else{Ne=b.vertexShader,Ee=b.fragmentShader;let pt=o.getVertexShaderStage(b),ut=o.getFragmentShaderStage(b);o.update(b,pt,ut),Ue=pt.id,X=ut.id}let Z=n.getRenderTarget(),xe=n.state.buffers.depth.getReversed(),Se=D.isInstancedMesh===!0,ve=D.isBatchedMesh===!0,je=!!b.map,ye=!!b.matcap,Ie=!!ee,Te=!!b.aoMap,Ke=!!b.lightMap,Be=!!b.bumpMap&&b.wireframe===!1,st=!!b.normalMap,re=!!b.displacementMap,Re=!!b.emissiveMap,$e=!!b.metalnessMap,Xe=!!b.roughnessMap,G=b.anisotropy>0,ae=b.clearcoat>0,Le=b.dispersion>0,S=b.retroreflectivity>0,x=b.iridescence>0,z=b.sheen>0,j=b.transmission>0,ne=G&&!!b.anisotropyMap,fe=ae&&!!b.clearcoatMap,be=ae&&!!b.clearcoatNormalMap,le=ae&&!!b.clearcoatRoughnessMap,ce=x&&!!b.iridescenceMap,Pe=x&&!!b.iridescenceThicknessMap,Oe=z&&!!b.sheenColorMap,Ve=z&&!!b.sheenRoughnessMap,Fe=!!b.specularMap,et=!!b.specularColorMap,tt=!!b.specularIntensityMap,it=j&&!!b.transmissionMap,Y=j&&!!b.thicknessMap,Ae=!!b.gradientMap,de=!!b.alphaMap,we=b.alphaTest>0,De=!!b.alphaHash,_e=!!b.extensions,Ge=Pi;b.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ge=n.toneMapping);let qe={shaderID:ie,shaderType:b.type,shaderName:b.name,vertexShader:Ne,fragmentShader:Ee,defines:b.defines,customVertexShaderID:Ue,customFragmentShaderID:X,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:ve,batchingColor:ve&&D._colorsTexture!==null,instancing:Se,instancingColor:Se&&D.instanceColor!==null,instancingMorph:Se&&D.morphTexture!==null,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:je,matcap:ye,envMap:Ie,envMapMode:Ie&&ee.mapping,envMapCubeUVHeight:q,aoMap:Te,lightMap:Ke,bumpMap:Be,normalMap:st,displacementMap:re,emissiveMap:Re,normalMapObjectSpace:st&&b.normalMapType===Om,normalMapTangentSpace:st&&b.normalMapType===Iu,packedNormalMap:st&&b.normalMapType===Iu&&OS(b.normalMap.format),metalnessMap:$e,roughnessMap:Xe,anisotropy:G,anisotropyMap:ne,clearcoat:ae,clearcoatMap:fe,clearcoatNormalMap:be,clearcoatRoughnessMap:le,dispersion:Le,retroreflection:S,iridescence:x,iridescenceMap:ce,iridescenceThicknessMap:Pe,sheen:z,sheenColorMap:Oe,sheenRoughnessMap:Ve,specularMap:Fe,specularColorMap:et,specularIntensityMap:tt,transmission:j,transmissionMap:it,thicknessMap:Y,gradientMap:Ae,opaque:b.transparent===!1&&b.blending===wa&&b.alphaToCoverage===!1,alphaMap:de,alphaTest:we,alphaHash:De,combine:b.combine,mapUv:je&&m(b.map.channel),aoMapUv:Te&&m(b.aoMap.channel),lightMapUv:Ke&&m(b.lightMap.channel),bumpMapUv:Be&&m(b.bumpMap.channel),normalMapUv:st&&m(b.normalMap.channel),displacementMapUv:re&&m(b.displacementMap.channel),emissiveMapUv:Re&&m(b.emissiveMap.channel),metalnessMapUv:$e&&m(b.metalnessMap.channel),roughnessMapUv:Xe&&m(b.roughnessMap.channel),anisotropyMapUv:ne&&m(b.anisotropyMap.channel),clearcoatMapUv:fe&&m(b.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&m(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&m(b.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&m(b.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&m(b.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&m(b.sheenRoughnessMap.channel),specularMapUv:Fe&&m(b.specularMap.channel),specularColorMapUv:et&&m(b.specularColorMap.channel),specularIntensityMapUv:tt&&m(b.specularIntensityMap.channel),transmissionMapUv:it&&m(b.transmissionMap.channel),thicknessMapUv:Y&&m(b.thicknessMap.channel),alphaMapUv:de&&m(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(st||G),vertexNormals:!!W.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!W.attributes.uv&&(je||de),fog:!!U,useFog:b.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||W.attributes.normal===void 0&&st===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:xe,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:W.attributes.position!==void 0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:he,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ge,decodeVideoTexture:je&&b.map.isVideoTexture===!0&&_t.getTransfer(b.map.colorSpace)===At,decodeVideoTextureEmissive:Re&&b.emissiveMap.isVideoTexture===!0&&_t.getTransfer(b.emissiveMap.colorSpace)===At,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===di,flipSided:b.side===mn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:_e&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&b.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return qe.vertexUv1s=l.has(1),qe.vertexUv2s=l.has(2),qe.vertexUv3s=l.has(3),l.clear(),qe}function p(b){let R=[];if(b.shaderID?R.push(b.shaderID):(R.push(b.customVertexShaderID),R.push(b.customFragmentShaderID)),b.defines!==void 0)for(let B in b.defines)R.push(B),R.push(b.defines[B]);return b.isRawShaderMaterial===!1&&(g(R,b),C(R,b),R.push(n.outputColorSpace)),R.push(b.customProgramCacheKey),R.join()}function g(b,R){b.push(R.precision),b.push(R.outputColorSpace),b.push(R.envMapMode),b.push(R.envMapCubeUVHeight),b.push(R.mapUv),b.push(R.alphaMapUv),b.push(R.lightMapUv),b.push(R.aoMapUv),b.push(R.bumpMapUv),b.push(R.normalMapUv),b.push(R.displacementMapUv),b.push(R.emissiveMapUv),b.push(R.metalnessMapUv),b.push(R.roughnessMapUv),b.push(R.anisotropyMapUv),b.push(R.clearcoatMapUv),b.push(R.clearcoatNormalMapUv),b.push(R.clearcoatRoughnessMapUv),b.push(R.iridescenceMapUv),b.push(R.iridescenceThicknessMapUv),b.push(R.sheenColorMapUv),b.push(R.sheenRoughnessMapUv),b.push(R.specularMapUv),b.push(R.specularColorMapUv),b.push(R.specularIntensityMapUv),b.push(R.transmissionMapUv),b.push(R.thicknessMapUv),b.push(R.combine),b.push(R.fogExp2),b.push(R.sizeAttenuation),b.push(R.morphTargetsCount),b.push(R.morphAttributeCount),b.push(R.numSunLights),b.push(R.numDirLights),b.push(R.numPointLights),b.push(R.numSpotLights),b.push(R.numSpotLightMaps),b.push(R.numHemiLights),b.push(R.numRectAreaLights),b.push(R.numSunLightShadows),b.push(R.numDirLightShadows),b.push(R.numPointLightShadows),b.push(R.numSpotLightShadows),b.push(R.numSpotLightShadowsWithMaps),b.push(R.numLightProbes),b.push(R.shadowMapType),b.push(R.toneMapping),b.push(R.numClippingPlanes),b.push(R.numClipIntersection),b.push(R.depthPacking)}function C(b,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.retroreflection&&a.enable(24),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function I(b){let R=f[b.type],B;if(R){let $=Dn[R];B=cl.clone($.uniforms)}else B=b.uniforms;return B}function v(b,R){let B=d.get(R);return B!==void 0?++B.usedTimes:(B=new US(n,R,b,s),c.push(B),d.set(R,B)),B}function M(b){if(--b.usedTimes===0){let R=c.indexOf(b);c[R]=c[c.length-1],c.pop(),d.delete(b.cacheKey),b.destroy()}}function w(b){o.remove(b)}function N(){o.dispose()}return{getParameters:y,getProgramCacheKey:p,getUniforms:I,acquireProgram:v,releaseProgram:M,releaseShaderCache:w,programs:c,dispose:N}}function BS(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function zS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function gg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function _g(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,y,p,g){let C=n[e];return C===void 0?(C={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:p,group:g},n[e]=C):(C.id=u.id,C.object=u,C.geometry=f,C.material=m,C.materialVariant=a(u),C.groupOrder=y,C.renderOrder=u.renderOrder,C.z=p,C.group=g),e++,C}function l(u,f,m,y,p,g,C){C.reversedDepth===!0&&(p=-p);let I=o(u,f,m,y,p,g);m.transmission>0?i.push(I):m.transparent===!0?s.push(I):t.push(I)}function c(u,f,m,y,p,g){let C=o(u,f,m,y,p,g);m.transmission>0?i.unshift(C):m.transparent===!0?s.unshift(C):t.unshift(C)}function d(u,f){t.length>1&&t.sort(u||zS),i.length>1&&i.sort(f||gg),s.length>1&&s.sort(f||gg)}function h(){for(let u=e,f=n.length;u<f;u++){let m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:h,sort:d}}function VS(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new _g,n.set(i,[a])):s>=r.length?(a=new _g,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function HS(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new Q,color:new rt};break;case"SpotLight":t={position:new Q,direction:new Q,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Q,color:new rt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Q,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":t={color:new rt,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return n[e.id]=t,t}}}function GS(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var WS=0;function jS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function XS(n){let e=new HS,t=GS(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Q);let s=new Q,r=new vt,a=new vt;function o(c){let d=0,h=0,u=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let f=0,m=0,y=0,p=0,g=0,C=0,I=0,v=0,M=0,w=0,N=0,b=0,R=0,B=0;c.sort(jS);for(let D=0,O=c.length;D<O;D++){let U=c[D],W=U.color,K=U.intensity,H=U.distance,ee=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===qs?ee=U.shadow.map.texture:ee=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)d+=W.r*K,h+=W.g*K,u+=W.b*K;else if(U.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(U.sh.coefficients[q],K);B++}else if(U.isSunLight){let q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ie=U.shadow,te=t.get(U);te.shadowIntensity=ie.intensity,te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize.copy(ie.mapSize).multiply(ie.getFrameExtents()),i.sunShadow[m]=te,i.sunShadowMap[m]=ee;let se=ie.getViewportCount();for(let he=0;he<se;he++)i.sunShadowMatrix[y+he]=ie.getMatrix(he),i.sunShadowCascade[y+he]=ie._cascadeData[he];y+=se,m++}i.sun[f]=q,f++}else if(U.isDirectionalLight){let q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ie=U.shadow,te=t.get(U);te.shadowIntensity=ie.intensity,te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize=ie.mapSize,i.directionalShadow[p]=te,i.directionalShadowMap[p]=ee,i.directionalShadowMatrix[p]=U.shadow.matrix,M++}i.directional[p]=q,p++}else if(U.isSpotLight){let q=e.get(U);q.position.setFromMatrixPosition(U.matrixWorld),q.color.copy(W).multiplyScalar(K),q.distance=H,q.coneCos=Math.cos(U.angle),q.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),q.decay=U.decay,i.spot[C]=q;let ie=U.shadow;if(U.map&&(i.spotLightMap[b]=U.map,b++,ie.updateMatrices(U),U.castShadow&&R++),i.spotLightMatrix[C]=ie.matrix,U.castShadow){let te=t.get(U);te.shadowIntensity=ie.intensity,te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize=ie.mapSize,i.spotShadow[C]=te,i.spotShadowMap[C]=ee,N++}C++}else if(U.isRectAreaLight){let q=e.get(U);q.color.copy(W).multiplyScalar(K),q.halfWidth.set(U.width*.5,0,0),q.halfHeight.set(0,U.height*.5,0),i.rectArea[I]=q,I++}else if(U.isPointLight){let q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),q.distance=U.distance,q.decay=U.decay,U.castShadow){let ie=U.shadow,te=t.get(U);te.shadowIntensity=ie.intensity,te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize=ie.mapSize,te.shadowCameraNear=ie.camera.near,te.shadowCameraFar=ie.camera.far,i.pointShadow[g]=te,i.pointShadowMap[g]=ee,i.pointShadowMatrix[g]=U.shadow.matrix,w++}i.point[g]=q,g++}else if(U.isHemisphereLight){let q=e.get(U);q.skyColor.copy(U.color).multiplyScalar(K),q.groundColor.copy(U.groundColor).multiplyScalar(K),i.hemi[v]=q,v++}}I>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=We.LTC_FLOAT_1,i.rectAreaLTC2=We.LTC_FLOAT_2):(i.rectAreaLTC1=We.LTC_HALF_1,i.rectAreaLTC2=We.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;let $=i.hash;($.sunLength!==f||$.directionalLength!==p||$.pointLength!==g||$.spotLength!==C||$.rectAreaLength!==I||$.hemiLength!==v||$.numSunShadows!==m||$.numDirectionalShadows!==M||$.numPointShadows!==w||$.numSpotShadows!==N||$.numSpotMaps!==b||$.numLightProbes!==B)&&(i.sun.length=f,i.directional.length=p,i.spot.length=C,i.rectArea.length=I,i.point.length=g,i.hemi.length=v,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.directionalShadowMatrix.length=M,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=N,i.spotShadowMap.length=N,i.spotLightMatrix.length=N+b-R,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=B,$.sunLength=f,$.directionalLength=p,$.pointLength=g,$.spotLength=C,$.rectAreaLength=I,$.hemiLength=v,$.numSunShadows=m,$.numDirectionalShadows=M,$.numPointShadows=w,$.numSpotShadows=N,$.numSpotMaps=b,$.numLightProbes=B,i.version=WS++)}function l(c,d){let h=0,u=0,f=0,m=0,y=0,p=0,g=d.matrixWorldInverse;for(let C=0,I=c.length;C<I;C++){let v=c[C];if(v.isSunLight){let M=i.sun[h];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(g),h++}else if(v.isDirectionalLight){let M=i.directional[u];M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),u++}else if(v.isSpotLight){let M=i.spot[m];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),m++}else if(v.isRectAreaLight){let M=i.rectArea[y];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),y++}else if(v.isPointLight){let M=i.point[f];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let M=i.hemi[p];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:i}}function xg(n){let e=new XS(n),t=[],i=[],s=[];function r(u){h.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function qS(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new xg(n),e.set(s,[o])):r>=a.length?(o=new xg(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var $S=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,YS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,JS=[new Q(1,0,0),new Q(-1,0,0),new Q(0,1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1)],KS=[new Q(0,-1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,-1,0),new Q(0,-1,0)],yg=new vt,dl=new Q,Jh=new Q;function ZS(n,e,t){let i=new xa,s=new nt,r=new nt,a=new mt,o=new Lc,l=new Ic,c={},d=t.maxTextureSize,h={[Ws]:mn,[mn]:Ws,[di]:di},u=new kt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:$S,fragmentShader:YS}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new $t;m.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new jt(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=el;let g=this.type;this.render=function(w,N,b){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===pm&&(at("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=el);let R=n.getRenderTarget(),B=n.getActiveCubeFace(),$=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Ji),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let O=g!==this.type;O&&N.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(W=>W.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,W=w.length;U<W;U++){let K=w[U],H=K.shadow;if(H===void 0){at("WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let ee=H.getFrameExtents();s.multiply(ee),r.copy(H.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ee.x),s.x=r.x*ee.x,H.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ee.y),s.y=r.y*ee.y,H.mapSize.y=r.y));let q=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=q,H.map===null||O===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Ma){if(K.isPointLight){at("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Wn(s.x,s.y,{format:qs,type:Ni,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),H.map.texture.name=K.name+".shadowMap",H.map.depthTexture=new zs(s.x,s.y,Ii),H.map.depthTexture.name=K.name+".shadowMapDepth",H.map.depthTexture.format=Xi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=nn,H.map.depthTexture.magFilter=nn}else K.isPointLight?(H.map=new Fu(s.x),H.map.depthTexture=new Rc(s.x,Li)):(H.map=new Wn(s.x,s.y),H.map.depthTexture=new zs(s.x,s.y,Li)),H.map.depthTexture.name=K.name+".shadowMap",H.map.depthTexture.format=Xi,this.type===el?(H.map.depthTexture.compareFunction=q?Du:Nu,H.map.depthTexture.minFilter=Nt,H.map.depthTexture.magFilter=Nt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=nn,H.map.depthTexture.magFilter=nn);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);let ie=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();K.isPointLight!==!0&&H.updateMatrices(K,b);for(let te=0;te<ie;te++){let se=H.getCamera(te);if(K.isPointLight){let he=H.camera,Ne=H.matrix,Ee=K.distance||he.far;Ee!==he.far&&(he.far=Ee,he.updateProjectionMatrix()),dl.setFromMatrixPosition(K.matrixWorld),he.position.copy(dl),Jh.copy(he.position),Jh.add(JS[te]),he.up.copy(KS[te]),he.lookAt(Jh),he.updateMatrixWorld(),Ne.makeTranslation(-dl.x,-dl.y,-dl.z),yg.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),H._frustum.setFromProjectionMatrix(yg,he.coordinateSystem,he.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,te),n.clear();else{te===0&&(n.setRenderTarget(H.map),n.clear());let he=H.getViewport(te);a.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),D.viewport(a)}i=H.getFrustum(te),v(N,b,se,K,this.type)}H.isPointLightShadow!==!0&&this.type===Ma&&C(H,b),H.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(R,B,$)};function C(w,N){let b=e.update(y);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new Wn(s.x,s.y,{format:qs,type:Ni}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(N,null,b,u,y,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(N,null,b,f,y,null)}function I(w,N,b,R){let B=null,$=b.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if($!==void 0)B=$;else if(B=b.isPointLight===!0?l:o,n.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){let D=B.uuid,O=N.uuid,U=c[D];U===void 0&&(U={},c[D]=U);let W=U[O];W===void 0&&(W=B.clone(),U[O]=W,N.addEventListener("dispose",M)),B=W}if(B.visible=N.visible,B.wireframe=N.wireframe,R===Ma?B.side=N.shadowSide!==null?N.shadowSide:N.side:B.side=N.shadowSide!==null?N.shadowSide:h[N.side],B.alphaMap=N.alphaMap,B.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,B.map=N.map,B.clipShadows=N.clipShadows,B.clippingPlanes=N.clippingPlanes,B.clipIntersection=N.clipIntersection,B.displacementMap=N.displacementMap,B.displacementScale=N.displacementScale,B.displacementBias=N.displacementBias,B.wireframeLinewidth=N.wireframeLinewidth,B.linewidth=N.linewidth,b.isPointLight===!0&&B.isMeshDistanceMaterial===!0){let D=n.properties.get(B);D.light=b}return B}function v(w,N,b,R,B){if(w.visible===!1)return;if(w.layers.test(N.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&B===Ma)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,w.matrixWorld);let O=e.update(w),U=w.material;if(Array.isArray(U)){let W=O.groups;for(let K=0,H=W.length;K<H;K++){let ee=W[K],q=U[ee.materialIndex];if(q&&q.visible){let ie=I(w,q,R,B);w.onBeforeShadow(n,w,N,b,O,ie,ee),n.renderBufferDirect(b,null,O,ie,w,ee),w.onAfterShadow(n,w,N,b,O,ie,ee)}}}else if(U.visible){let W=I(w,U,R,B);w.onBeforeShadow(n,w,N,b,O,W,null),n.renderBufferDirect(b,null,O,W,w,null),w.onAfterShadow(n,w,N,b,O,W,null)}}let D=w.children;for(let O=0,U=D.length;O<U;O++)v(D[O],N,b,R,B)}function M(w){w.target.removeEventListener("dispose",M);for(let b in c){let R=c[b],B=w.target.uuid;B in R&&(R[B].dispose(),delete R[B])}}}function QS(n,e){function t(){let Y=!1,Ae=new mt,de=null,we=new mt(0,0,0,0);return{setMask:function(De){de!==De&&!Y&&(n.colorMask(De,De,De,De),de=De)},setLocked:function(De){Y=De},setClear:function(De,_e,Ge,qe,pt){pt===!0&&(De*=qe,_e*=qe,Ge*=qe),Ae.set(De,_e,Ge,qe),we.equals(Ae)===!1&&(n.clearColor(De,_e,Ge,qe),we.copy(Ae))},reset:function(){Y=!1,de=null,we.set(-1,0,0,0)}}}function i(){let Y=!1,Ae=!1,de=null,we=null,De=null;return{setReversed:function(_e){if(Ae!==_e){let Ge=e.get("EXT_clip_control");_e?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),Ae=_e;let qe=De;De=null,this.setClear(qe)}},getReversed:function(){return Ae},setTest:function(_e){_e?Z(n.DEPTH_TEST):xe(n.DEPTH_TEST)},setMask:function(_e){de!==_e&&!Y&&(n.depthMask(_e),de=_e)},setFunc:function(_e){if(Ae&&(_e=$m[_e]),we!==_e){switch(_e){case _c:n.depthFunc(n.NEVER);break;case xc:n.depthFunc(n.ALWAYS);break;case yc:n.depthFunc(n.LESS);break;case ua:n.depthFunc(n.LEQUAL);break;case vc:n.depthFunc(n.EQUAL);break;case bc:n.depthFunc(n.GEQUAL);break;case Sc:n.depthFunc(n.GREATER);break;case Mc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}we=_e}},setLocked:function(_e){Y=_e},setClear:function(_e){De!==_e&&(De=_e,Ae&&(_e=1-_e),n.clearDepth(_e))},reset:function(){Y=!1,de=null,we=null,De=null,Ae=!1}}}function s(){let Y=!1,Ae=null,de=null,we=null,De=null,_e=null,Ge=null,qe=null,pt=null;return{setTest:function(ut){Y||(ut?Z(n.STENCIL_TEST):xe(n.STENCIL_TEST))},setMask:function(ut){Ae!==ut&&!Y&&(n.stencilMask(ut),Ae=ut)},setFunc:function(ut,Vt,bt){(de!==ut||we!==Vt||De!==bt)&&(n.stencilFunc(ut,Vt,bt),de=ut,we=Vt,De=bt)},setOp:function(ut,Vt,bt){(_e!==ut||Ge!==Vt||qe!==bt)&&(n.stencilOp(ut,Vt,bt),_e=ut,Ge=Vt,qe=bt)},setLocked:function(ut){Y=ut},setClear:function(ut){pt!==ut&&(n.clearStencil(ut),pt=ut)},reset:function(){Y=!1,Ae=null,de=null,we=null,De=null,_e=null,Ge=null,qe=null,pt=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,d={},h={},u={},f=new WeakMap,m=[],y=null,p=!1,g=null,C=null,I=null,v=null,M=null,w=null,N=null,b=new rt(0,0,0),R=0,B=!1,$=null,D=null,O=null,U=null,W=null,K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,ee=0,q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(q)[1]),H=ee>=1):q.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),H=ee>=2);let ie=null,te={},se=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),Ne=new mt().fromArray(se),Ee=new mt().fromArray(he);function Ue(Y,Ae,de,we){let De=new Uint8Array(4),_e=n.createTexture();n.bindTexture(Y,_e),n.texParameteri(Y,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Y,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ge=0;Ge<de;Ge++)Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?n.texImage3D(Ae,0,n.RGBA,1,1,we,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(Ae+Ge,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return _e}let X={};X[n.TEXTURE_2D]=Ue(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=Ue(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=Ue(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=Ue(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(n.DEPTH_TEST),a.setFunc(ua),Be(!1),st(xh),Z(n.CULL_FACE),Te(Ji);function Z(Y){d[Y]!==!0&&(n.enable(Y),d[Y]=!0)}function xe(Y){d[Y]!==!1&&(n.disable(Y),d[Y]=!1)}function Se(Y,Ae){return u[Y]!==Ae?(n.bindFramebuffer(Y,Ae),u[Y]=Ae,Y===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Ae),Y===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Ae),!0):!1}function ve(Y,Ae){let de=m,we=!1;if(Y){de=f.get(Ae),de===void 0&&(de=[],f.set(Ae,de));let De=Y.textures;if(de.length!==De.length||de[0]!==n.COLOR_ATTACHMENT0){for(let _e=0,Ge=De.length;_e<Ge;_e++)de[_e]=n.COLOR_ATTACHMENT0+_e;de.length=De.length,we=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,we=!0);we&&n.drawBuffers(de)}function je(Y){return y!==Y?(n.useProgram(Y),y=Y,!0):!1}let ye={[vr]:n.FUNC_ADD,[gm]:n.FUNC_SUBTRACT,[_m]:n.FUNC_REVERSE_SUBTRACT};ye[xm]=n.MIN,ye[ym]=n.MAX;let Ie={[vm]:n.ZERO,[bm]:n.ONE,[Sm]:n.SRC_COLOR,[bh]:n.SRC_ALPHA,[Cm]:n.SRC_ALPHA_SATURATE,[Tm]:n.DST_COLOR,[wm]:n.DST_ALPHA,[Mm]:n.ONE_MINUS_SRC_COLOR,[Sh]:n.ONE_MINUS_SRC_ALPHA,[Am]:n.ONE_MINUS_DST_COLOR,[Em]:n.ONE_MINUS_DST_ALPHA,[Rm]:n.CONSTANT_COLOR,[Pm]:n.ONE_MINUS_CONSTANT_COLOR,[Lm]:n.CONSTANT_ALPHA,[Im]:n.ONE_MINUS_CONSTANT_ALPHA};function Te(Y,Ae,de,we,De,_e,Ge,qe,pt,ut){if(Y===Ji){p===!0&&(xe(n.BLEND),p=!1);return}if(p===!1&&(Z(n.BLEND),p=!0),Y!==mm){if(Y!==g||ut!==B){if((C!==vr||M!==vr)&&(n.blendEquation(n.FUNC_ADD),C=vr,M=vr),ut)switch(Y){case wa:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ki:n.blendFunc(n.ONE,n.ONE);break;case yh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ot("WebGLState: Invalid blending: ",Y);break}else switch(Y){case wa:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ki:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case yh:ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vh:ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ot("WebGLState: Invalid blending: ",Y);break}I=null,v=null,w=null,N=null,b.set(0,0,0),R=0,g=Y,B=ut}return}De=De||Ae,_e=_e||de,Ge=Ge||we,(Ae!==C||De!==M)&&(n.blendEquationSeparate(ye[Ae],ye[De]),C=Ae,M=De),(de!==I||we!==v||_e!==w||Ge!==N)&&(n.blendFuncSeparate(Ie[de],Ie[we],Ie[_e],Ie[Ge]),I=de,v=we,w=_e,N=Ge),(qe.equals(b)===!1||pt!==R)&&(n.blendColor(qe.r,qe.g,qe.b,pt),b.copy(qe),R=pt),g=Y,B=!1}function Ke(Y,Ae){Y.side===di?xe(n.CULL_FACE):Z(n.CULL_FACE);let de=Y.side===mn;Ae&&(de=!de),Be(de),Y.blending===wa&&Y.transparent===!1?Te(Ji):Te(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),a.setFunc(Y.depthFunc),a.setTest(Y.depthTest),a.setMask(Y.depthWrite),r.setMask(Y.colorWrite);let we=Y.stencilWrite;o.setTest(we),we&&(o.setMask(Y.stencilWriteMask),o.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),o.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),Re(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?Z(n.SAMPLE_ALPHA_TO_COVERAGE):xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Be(Y){$!==Y&&(Y?n.frontFace(n.CW):n.frontFace(n.CCW),$=Y)}function st(Y){Y!==hm?(Z(n.CULL_FACE),Y!==D&&(Y===xh?n.cullFace(n.BACK):Y===fm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xe(n.CULL_FACE),D=Y}function re(Y){Y!==O&&(H&&n.lineWidth(Y),O=Y)}function Re(Y,Ae,de){Y?(Z(n.POLYGON_OFFSET_FILL),(U!==Ae||W!==de)&&(U=Ae,W=de,a.getReversed()&&(Ae=-Ae),n.polygonOffset(Ae,de))):xe(n.POLYGON_OFFSET_FILL)}function $e(Y){Y?Z(n.SCISSOR_TEST):xe(n.SCISSOR_TEST)}function Xe(Y){Y===void 0&&(Y=n.TEXTURE0+K-1),ie!==Y&&(n.activeTexture(Y),ie=Y)}function G(Y,Ae,de){de===void 0&&(ie===null?de=n.TEXTURE0+K-1:de=ie);let we=te[de];we===void 0&&(we={type:void 0,texture:void 0},te[de]=we),(we.type!==Y||we.texture!==Ae)&&(ie!==de&&(n.activeTexture(de),ie=de),n.bindTexture(Y,Ae||X[Y]),we.type=Y,we.texture=Ae)}function ae(){let Y=te[ie];Y!==void 0&&Y.type!==void 0&&(n.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Le(){try{n.compressedTexImage2D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function S(){try{n.compressedTexImage3D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function x(){try{n.texSubImage2D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function z(){try{n.texSubImage3D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function ne(){try{n.compressedTexSubImage3D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function fe(){try{n.texStorage2D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function be(){try{n.texStorage3D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function le(){try{n.texImage2D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function ce(){try{n.texImage3D(...arguments)}catch(Y){ot("WebGLState:",Y)}}function Pe(Y){return h[Y]!==void 0?h[Y]:n.getParameter(Y)}function Oe(Y,Ae){h[Y]!==Ae&&(n.pixelStorei(Y,Ae),h[Y]=Ae)}function Ve(Y){Ne.equals(Y)===!1&&(n.scissor(Y.x,Y.y,Y.z,Y.w),Ne.copy(Y))}function Fe(Y){Ee.equals(Y)===!1&&(n.viewport(Y.x,Y.y,Y.z,Y.w),Ee.copy(Y))}function et(Y,Ae){let de=c.get(Ae);de===void 0&&(de=new WeakMap,c.set(Ae,de));let we=de.get(Y);we===void 0&&(we=n.getUniformBlockIndex(Ae,Y.name),de.set(Y,we))}function tt(Y,Ae){let we=c.get(Ae).get(Y);l.get(Ae)!==we&&(n.uniformBlockBinding(Ae,we,Y.__bindingPointIndex),l.set(Ae,we))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},h={},ie=null,te={},u={},f=new WeakMap,m=[],y=null,p=!1,g=null,C=null,I=null,v=null,M=null,w=null,N=null,b=new rt(0,0,0),R=0,B=!1,$=null,D=null,O=null,U=null,W=null,Ne.set(0,0,n.canvas.width,n.canvas.height),Ee.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Z,disable:xe,bindFramebuffer:Se,drawBuffers:ve,useProgram:je,setBlending:Te,setMaterial:Ke,setFlipSided:Be,setCullFace:st,setLineWidth:re,setPolygonOffset:Re,setScissorTest:$e,activeTexture:Xe,bindTexture:G,unbindTexture:ae,compressedTexImage2D:Le,compressedTexImage3D:S,texImage2D:le,texImage3D:ce,pixelStorei:Oe,getParameter:Pe,updateUBOMapping:et,uniformBlockBinding:tt,texStorage2D:fe,texStorage3D:be,texSubImage2D:x,texSubImage3D:z,compressedTexSubImage2D:j,compressedTexSubImage3D:ne,scissor:Ve,viewport:Fe,reset:it}}function eM(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new nt,d=new WeakMap,h=new Set,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(S,x){return m?new OffscreenCanvas(S,x):No("canvas")}function p(S,x,z){let j=1,ne=Le(S);if((ne.width>z||ne.height>z)&&(j=z/Math.max(ne.width,ne.height)),j<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let fe=Math.floor(j*ne.width),be=Math.floor(j*ne.height);u===void 0&&(u=y(fe,be));let le=x?y(fe,be):u;return le.width=fe,le.height=be,le.getContext("2d").drawImage(S,0,0,fe,be),at("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+fe+"x"+be+")."),le}else return"data"in S&&at("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),S;return S}function g(S){return S.generateMipmaps}function C(S){n.generateMipmap(S)}function I(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(S,x,z,j,ne,fe=!1){if(S!==null){if(n[S]!==void 0)return n[S];at("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let be;j&&(be=e.get("EXT_texture_norm16"),be||at("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let le=x;if(x===n.RED&&(z===n.FLOAT&&(le=n.R32F),z===n.HALF_FLOAT&&(le=n.R16F),z===n.UNSIGNED_BYTE&&(le=n.R8),z===n.UNSIGNED_SHORT&&be&&(le=be.R16_EXT),z===n.SHORT&&be&&(le=be.R16_SNORM_EXT)),x===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(le=n.R8UI),z===n.UNSIGNED_SHORT&&(le=n.R16UI),z===n.UNSIGNED_INT&&(le=n.R32UI),z===n.BYTE&&(le=n.R8I),z===n.SHORT&&(le=n.R16I),z===n.INT&&(le=n.R32I)),x===n.RG&&(z===n.FLOAT&&(le=n.RG32F),z===n.HALF_FLOAT&&(le=n.RG16F),z===n.UNSIGNED_BYTE&&(le=n.RG8),z===n.UNSIGNED_SHORT&&be&&(le=be.RG16_EXT),z===n.SHORT&&be&&(le=be.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(le=n.RG8UI),z===n.UNSIGNED_SHORT&&(le=n.RG16UI),z===n.UNSIGNED_INT&&(le=n.RG32UI),z===n.BYTE&&(le=n.RG8I),z===n.SHORT&&(le=n.RG16I),z===n.INT&&(le=n.RG32I)),x===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(le=n.RGB8UI),z===n.UNSIGNED_SHORT&&(le=n.RGB16UI),z===n.UNSIGNED_INT&&(le=n.RGB32UI),z===n.BYTE&&(le=n.RGB8I),z===n.SHORT&&(le=n.RGB16I),z===n.INT&&(le=n.RGB32I)),x===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(le=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(le=n.RGBA16UI),z===n.UNSIGNED_INT&&(le=n.RGBA32UI),z===n.BYTE&&(le=n.RGBA8I),z===n.SHORT&&(le=n.RGBA16I),z===n.INT&&(le=n.RGBA32I)),x===n.RGB&&(z===n.UNSIGNED_SHORT&&be&&(le=be.RGB16_EXT),z===n.SHORT&&be&&(le=be.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(le=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(le=n.R11F_G11F_B10F)),x===n.RGBA){let ce=fe?Io:_t.getTransfer(ne);z===n.FLOAT&&(le=n.RGBA32F),z===n.HALF_FLOAT&&(le=n.RGBA16F),z===n.UNSIGNED_BYTE&&(le=ce===At?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&be&&(le=be.RGBA16_EXT),z===n.SHORT&&be&&(le=be.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(le=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(le=n.RGB5_A1)}return(le===n.R16F||le===n.R32F||le===n.RG16F||le===n.RG32F||le===n.RGBA16F||le===n.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function M(S,x){let z;return S?x===null||x===Li||x===Ta?z=n.DEPTH24_STENCIL8:x===Ii?z=n.DEPTH32F_STENCIL8:x===Ea&&(z=n.DEPTH24_STENCIL8,at("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Li||x===Ta?z=n.DEPTH_COMPONENT24:x===Ii?z=n.DEPTH_COMPONENT32F:x===Ea&&(z=n.DEPTH_COMPONENT16),z}function w(S,x){return g(S)===!0||S.isFramebufferTexture&&S.minFilter!==nn&&S.minFilter!==Nt?Math.log2(Math.max(x.width,x.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?x.mipmaps.length:1}function N(S){let x=S.target;x.removeEventListener("dispose",N),R(x),x.isVideoTexture&&d.delete(x),x.isHTMLTexture&&h.delete(x)}function b(S){let x=S.target;x.removeEventListener("dispose",b),$(x)}function R(S){let x=i.get(S);if(x.__webglInit===void 0)return;let z=S.source,j=f.get(z);if(j){let ne=j[x.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&B(S),Object.keys(j).length===0&&f.delete(z)}i.remove(S)}function B(S){let x=i.get(S);n.deleteTexture(x.__webglTexture);let z=S.source,j=f.get(z);delete j[x.__cacheKey],a.memory.textures--}function $(S){let x=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(x.__webglFramebuffer[j]))for(let ne=0;ne<x.__webglFramebuffer[j].length;ne++)n.deleteFramebuffer(x.__webglFramebuffer[j][ne]);else n.deleteFramebuffer(x.__webglFramebuffer[j]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[j])}else{if(Array.isArray(x.__webglFramebuffer))for(let j=0;j<x.__webglFramebuffer.length;j++)n.deleteFramebuffer(x.__webglFramebuffer[j]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let j=0;j<x.__webglColorRenderbuffer.length;j++)x.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[j]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let z=S.textures;for(let j=0,ne=z.length;j<ne;j++){let fe=i.get(z[j]);fe.__webglTexture&&(n.deleteTexture(fe.__webglTexture),a.memory.textures--),i.remove(z[j])}i.remove(S)}let D=0;function O(){D=0}function U(){return D}function W(S){D=S}function K(){let S=D;return S>=s.maxTextures&&at("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),D+=1,S}function H(S){let x=[];return x.push(S.wrapS),x.push(S.wrapT),x.push(S.wrapR||0),x.push(S.magFilter),x.push(S.minFilter),x.push(S.anisotropy),x.push(S.internalFormat),x.push(S.format),x.push(S.type),x.push(S.generateMipmaps),x.push(S.premultiplyAlpha),x.push(S.flipY),x.push(S.unpackAlignment),x.push(S.colorSpace),x.join()}function ee(S,x){let z=i.get(S);if(S.isVideoTexture&&G(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&z.__version!==S.version){let j=S.image;if(j===null)at("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)at("WebGLRenderer: Texture marked for update but image is incomplete");else{xe(z,S,x);return}}else S.isExternalTexture&&(z.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+x)}function q(S,x){let z=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&z.__version!==S.version){xe(z,S,x);return}else S.isExternalTexture&&(z.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+x)}function ie(S,x){let z=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&z.__version!==S.version){xe(z,S,x);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+x)}function te(S,x){let z=i.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&z.__version!==S.version){Se(z,S,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+x)}let se={[Os]:n.REPEAT,[Gn]:n.CLAMP_TO_EDGE,[wc]:n.MIRRORED_REPEAT},he={[nn]:n.NEAREST,[Um]:n.NEAREST_MIPMAP_NEAREST,[nl]:n.NEAREST_MIPMAP_LINEAR,[Nt]:n.LINEAR,[Yc]:n.LINEAR_MIPMAP_NEAREST,[Zn]:n.LINEAR_MIPMAP_LINEAR},Ne={[Bm]:n.NEVER,[Wm]:n.ALWAYS,[zm]:n.LESS,[Nu]:n.LEQUAL,[Vm]:n.EQUAL,[Du]:n.GEQUAL,[Hm]:n.GREATER,[Gm]:n.NOTEQUAL};function Ee(S,x){if(x.type===Ii&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Nt||x.magFilter===Yc||x.magFilter===nl||x.magFilter===Zn||x.minFilter===Nt||x.minFilter===Yc||x.minFilter===nl||x.minFilter===Zn)&&at("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,se[x.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,se[x.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,se[x.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,he[x.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,he[x.minFilter]),x.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,Ne[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===nn||x.minFilter!==nl&&x.minFilter!==Zn||x.type===Ii&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(S,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Ue(S,x){let z=!1;S.__webglInit===void 0&&(S.__webglInit=!0,x.addEventListener("dispose",N));let j=x.source,ne=f.get(j);ne===void 0&&(ne={},f.set(j,ne));let fe=H(x);if(fe!==S.__cacheKey){ne[fe]===void 0&&(ne[fe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ne[fe].usedTimes++;let be=ne[S.__cacheKey];be!==void 0&&(ne[S.__cacheKey].usedTimes--,be.usedTimes===0&&B(x)),S.__cacheKey=fe,S.__webglTexture=ne[fe].texture}return z}function X(S,x,z){return Math.floor(Math.floor(S/z)/x)}function Z(S,x,z,j){let fe=S.updateRanges;if(fe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,z,j,x.data);else{fe.sort((Oe,Ve)=>Oe.start-Ve.start);let be=0;for(let Oe=1;Oe<fe.length;Oe++){let Ve=fe[be],Fe=fe[Oe],et=Ve.start+Ve.count,tt=X(Fe.start,x.width,4),it=X(Ve.start,x.width,4);Fe.start<=et+1&&tt===it&&X(Fe.start+Fe.count-1,x.width,4)===tt?Ve.count=Math.max(Ve.count,Fe.start+Fe.count-Ve.start):(++be,fe[be]=Fe)}fe.length=be+1;let le=t.getParameter(n.UNPACK_ROW_LENGTH),ce=t.getParameter(n.UNPACK_SKIP_PIXELS),Pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let Oe=0,Ve=fe.length;Oe<Ve;Oe++){let Fe=fe[Oe],et=Math.floor(Fe.start/4),tt=Math.ceil(Fe.count/4),it=et%x.width,Y=Math.floor(et/x.width),Ae=tt,de=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,it),t.pixelStorei(n.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(n.TEXTURE_2D,0,it,Y,Ae,de,z,j,x.data)}S.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,le),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(n.UNPACK_SKIP_ROWS,Pe)}}function xe(S,x,z){let j=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(j=n.TEXTURE_3D);let ne=Ue(S,x),fe=x.source;t.bindTexture(j,S.__webglTexture,n.TEXTURE0+z);let be=i.get(fe);if(fe.version!==be.__version||ne===!0){if(t.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let de=_t.getPrimaries(_t.workingColorSpace),we=x.colorSpace===hi?null:_t.getPrimaries(x.colorSpace),De=x.colorSpace===hi||de===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let ce=p(x.image,!1,s.maxTextureSize);ce=ae(x,ce);let Pe=r.convert(x.format,x.colorSpace),Oe=r.convert(x.type),Ve=v(x.internalFormat,Pe,Oe,x.normalized,x.colorSpace,x.isVideoTexture);Ee(j,x);let Fe,et=x.mipmaps,tt=x.isVideoTexture!==!0,it=be.__version===void 0||ne===!0,Y=fe.dataReady,Ae=w(x,ce);if(x.isDepthTexture)Ve=M(x.format===Xs,x.type),it&&(tt?t.texStorage2D(n.TEXTURE_2D,1,Ve,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,Ve,ce.width,ce.height,0,Pe,Oe,null));else if(x.isDataTexture)if(et.length>0){tt&&it&&t.texStorage2D(n.TEXTURE_2D,Ae,Ve,et[0].width,et[0].height);for(let de=0,we=et.length;de<we;de++)Fe=et[de],tt?Y&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,Fe.width,Fe.height,Pe,Oe,Fe.data):t.texImage2D(n.TEXTURE_2D,de,Ve,Fe.width,Fe.height,0,Pe,Oe,Fe.data);x.generateMipmaps=!1}else tt?(it&&t.texStorage2D(n.TEXTURE_2D,Ae,Ve,ce.width,ce.height),Y&&Z(x,ce,Pe,Oe)):t.texImage2D(n.TEXTURE_2D,0,Ve,ce.width,ce.height,0,Pe,Oe,ce.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){tt&&it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Ve,et[0].width,et[0].height,ce.depth);for(let de=0,we=et.length;de<we;de++)if(Fe=et[de],x.format!==hn)if(Pe!==null)if(tt){if(Y)if(x.layerUpdates.size>0){let De=Wh(Fe.width,Fe.height,x.format,x.type);for(let _e of x.layerUpdates){let Ge=Fe.data.subarray(_e*De/Fe.data.BYTES_PER_ELEMENT,(_e+1)*De/Fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,_e,Fe.width,Fe.height,1,Pe,Ge)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Fe.width,Fe.height,ce.depth,Pe,Fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,Ve,Fe.width,Fe.height,ce.depth,0,Fe.data,0,0);else at("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else tt?Y&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Fe.width,Fe.height,ce.depth,Pe,Oe,Fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,Ve,Fe.width,Fe.height,ce.depth,0,Pe,Oe,Fe.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{tt&&it&&t.texStorage2D(n.TEXTURE_2D,Ae,Ve,et[0].width,et[0].height);for(let de=0,we=et.length;de<we;de++)Fe=et[de],x.format!==hn?Pe!==null?tt?Y&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,Fe.width,Fe.height,Pe,Fe.data):t.compressedTexImage2D(n.TEXTURE_2D,de,Ve,Fe.width,Fe.height,0,Fe.data):at("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):tt?Y&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,Fe.width,Fe.height,Pe,Oe,Fe.data):t.texImage2D(n.TEXTURE_2D,de,Ve,Fe.width,Fe.height,0,Pe,Oe,Fe.data)}else if(x.isDataArrayTexture)if(tt){if(it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Ve,ce.width,ce.height,ce.depth),Y)if(x.layerUpdates.size>0){let de=Wh(ce.width,ce.height,x.format,x.type);for(let we of x.layerUpdates){let De=ce.data.subarray(we*de/ce.data.BYTES_PER_ELEMENT,(we+1)*de/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,we,ce.width,ce.height,1,Pe,Oe,De)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Pe,Oe,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ve,ce.width,ce.height,ce.depth,0,Pe,Oe,ce.data);else if(x.isData3DTexture)tt?(it&&t.texStorage3D(n.TEXTURE_3D,Ae,Ve,ce.width,ce.height,ce.depth),Y&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Pe,Oe,ce.data)):t.texImage3D(n.TEXTURE_3D,0,Ve,ce.width,ce.height,ce.depth,0,Pe,Oe,ce.data);else if(x.isFramebufferTexture){if(it)if(tt)t.texStorage2D(n.TEXTURE_2D,Ae,Ve,ce.width,ce.height);else{let de=ce.width,we=ce.height;for(let De=0;De<Ae;De++)t.texImage2D(n.TEXTURE_2D,De,Ve,de,we,0,Pe,Oe,null),de>>=1,we>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){let de=n.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),ce.parentNode!==de){de.appendChild(ce),h.add(x),de.onpaint=we=>{let De=we.changedElements;for(let _e of h)De.includes(_e.image)&&(_e.needsUpdate=!0)},de.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ce);else{let De=n.RGBA,_e=n.RGBA,Ge=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,De,_e,Ge,ce)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(et.length>0){if(tt&&it){let de=Le(et[0]);t.texStorage2D(n.TEXTURE_2D,Ae,Ve,de.width,de.height)}for(let de=0,we=et.length;de<we;de++)Fe=et[de],tt?Y&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,Pe,Oe,Fe):t.texImage2D(n.TEXTURE_2D,de,Ve,Pe,Oe,Fe);x.generateMipmaps=!1}else if(tt){if(it){let de=Le(ce);t.texStorage2D(n.TEXTURE_2D,Ae,Ve,de.width,de.height)}Y&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Pe,Oe,ce)}else t.texImage2D(n.TEXTURE_2D,0,Ve,Pe,Oe,ce);g(x)&&C(j),be.__version=fe.version,x.onUpdate&&x.onUpdate(x)}S.__version=x.version}function Se(S,x,z){if(x.image.length!==6)return;let j=Ue(S,x),ne=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+z);let fe=i.get(ne);if(ne.version!==fe.__version||j===!0){t.activeTexture(n.TEXTURE0+z);let be=_t.getPrimaries(_t.workingColorSpace),le=x.colorSpace===hi?null:_t.getPrimaries(x.colorSpace),ce=x.colorSpace===hi||be===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);let Pe=x.isCompressedTexture||x.image[0].isCompressedTexture,Oe=x.image[0]&&x.image[0].isDataTexture,Ve=[];for(let _e=0;_e<6;_e++)!Pe&&!Oe?Ve[_e]=p(x.image[_e],!0,s.maxCubemapSize):Ve[_e]=Oe?x.image[_e].image:x.image[_e],Ve[_e]=ae(x,Ve[_e]);let Fe=Ve[0],et=r.convert(x.format,x.colorSpace),tt=r.convert(x.type),it=v(x.internalFormat,et,tt,x.normalized,x.colorSpace),Y=x.isVideoTexture!==!0,Ae=fe.__version===void 0||j===!0,de=ne.dataReady,we=w(x,Fe);Ee(n.TEXTURE_CUBE_MAP,x);let De;if(Pe){Y&&Ae&&t.texStorage2D(n.TEXTURE_CUBE_MAP,we,it,Fe.width,Fe.height);for(let _e=0;_e<6;_e++){De=Ve[_e].mipmaps;for(let Ge=0;Ge<De.length;Ge++){let qe=De[Ge];x.format!==hn?et!==null?Y?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ge,0,0,qe.width,qe.height,et,qe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ge,it,qe.width,qe.height,0,qe.data):at("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ge,0,0,qe.width,qe.height,et,tt,qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ge,it,qe.width,qe.height,0,et,tt,qe.data)}}}else{if(De=x.mipmaps,Y&&Ae){De.length>0&&we++;let _e=Le(Ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,we,it,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(Oe){Y?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Ve[_e].width,Ve[_e].height,et,tt,Ve[_e].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,it,Ve[_e].width,Ve[_e].height,0,et,tt,Ve[_e].data);for(let Ge=0;Ge<De.length;Ge++){let pt=De[Ge].image[_e].image;Y?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ge+1,0,0,pt.width,pt.height,et,tt,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ge+1,it,pt.width,pt.height,0,et,tt,pt.data)}}else{Y?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,et,tt,Ve[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,it,et,tt,Ve[_e]);for(let Ge=0;Ge<De.length;Ge++){let qe=De[Ge];Y?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ge+1,0,0,et,tt,qe.image[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ge+1,it,et,tt,qe.image[_e])}}}g(x)&&C(n.TEXTURE_CUBE_MAP),fe.__version=ne.version,x.onUpdate&&x.onUpdate(x)}S.__version=x.version}function ve(S,x,z,j,ne,fe){let be=r.convert(z.format,z.colorSpace),le=r.convert(z.type),ce=v(z.internalFormat,be,le,z.normalized,z.colorSpace),Pe=i.get(x),Oe=i.get(z);if(Oe.__renderTarget=x,!Pe.__hasExternalTextures){let Ve=Math.max(1,x.width>>fe),Fe=Math.max(1,x.height>>fe);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,fe,ce,Ve,Fe,x.depth,0,be,le,null):t.texImage2D(ne,fe,ce,Ve,Fe,0,be,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),Xe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,ne,Oe.__webglTexture,0,$e(x)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,ne,Oe.__webglTexture,fe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function je(S,x,z){if(n.bindRenderbuffer(n.RENDERBUFFER,S),x.depthBuffer){let j=x.depthTexture,ne=j&&j.isDepthTexture?j.type:null,fe=M(x.stencilBuffer,ne),be=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Xe(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$e(x),fe,x.width,x.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,$e(x),fe,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,fe,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,S)}else{let j=x.textures;for(let ne=0;ne<j.length;ne++){let fe=j[ne],be=r.convert(fe.format,fe.colorSpace),le=r.convert(fe.type),ce=v(fe.internalFormat,be,le,fe.normalized,fe.colorSpace);Xe(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$e(x),ce,x.width,x.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,$e(x),ce,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ce,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(S,x,z){let j=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ne=i.get(x.depthTexture);if(ne.__renderTarget=x,(!ne.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),j){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,x.depthTexture.addEventListener("dispose",N)),ne.__webglTexture===void 0){ne.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),Ee(n.TEXTURE_CUBE_MAP,x.depthTexture);let Pe=r.convert(x.depthTexture.format),Oe=r.convert(x.depthTexture.type),Ve;x.depthTexture.format===Xi?Ve=n.DEPTH_COMPONENT24:x.depthTexture.format===Xs&&(Ve=n.DEPTH24_STENCIL8);for(let Fe=0;Fe<6;Fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,0,Ve,x.width,x.height,0,Pe,Oe,null)}}else ee(x.depthTexture,0);let fe=ne.__webglTexture,be=$e(x),le=j?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,ce=x.depthTexture.format===Xs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Xi)Xe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,le,fe,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,ce,le,fe,0);else if(x.depthTexture.format===Xs)Xe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,le,fe,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,ce,le,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ie(S){let x=i.get(S),z=S.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==S.depthTexture){let j=S.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),j){let ne=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,j.removeEventListener("dispose",ne)};j.addEventListener("dispose",ne),x.__depthDisposeCallback=ne}x.__boundDepthTexture=j}if(S.depthTexture&&!x.__autoAllocateDepthBuffer)if(z)for(let j=0;j<6;j++)ye(x.__webglFramebuffer[j],S,j);else{let j=S.texture.mipmaps;j&&j.length>0?ye(x.__webglFramebuffer[0],S,0):ye(x.__webglFramebuffer,S,0)}else if(z){x.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[j]),x.__webglDepthbuffer[j]===void 0)x.__webglDepthbuffer[j]=n.createRenderbuffer(),je(x.__webglDepthbuffer[j],S,!1);else{let ne=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=x.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,fe)}}else{let j=S.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),je(x.__webglDepthbuffer,S,!1);else{let ne=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,fe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Te(S,x,z){let j=i.get(S);x!==void 0&&ve(j.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Ie(S)}function Ke(S){let x=S.texture,z=i.get(S),j=i.get(x);S.addEventListener("dispose",b);let ne=S.textures,fe=S.isWebGLCubeRenderTarget===!0,be=ne.length>1;if(be||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=x.version,a.memory.textures++),fe){z.__webglFramebuffer=[];for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[le]=[];for(let ce=0;ce<x.mipmaps.length;ce++)z.__webglFramebuffer[le][ce]=n.createFramebuffer()}else z.__webglFramebuffer[le]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let le=0;le<x.mipmaps.length;le++)z.__webglFramebuffer[le]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(be)for(let le=0,ce=ne.length;le<ce;le++){let Pe=i.get(ne[le]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=n.createTexture(),a.memory.textures++)}if(S.samples>0&&Xe(S)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let le=0;le<ne.length;le++){let ce=ne[le];z.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[le]);let Pe=r.convert(ce.format,ce.colorSpace),Oe=r.convert(ce.type),Ve=v(ce.internalFormat,Pe,Oe,ce.normalized,ce.colorSpace,S.isXRRenderTarget===!0),Fe=$e(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,Ve,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,z.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),je(z.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(fe){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),Ee(n.TEXTURE_CUBE_MAP,x);for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)ve(z.__webglFramebuffer[le][ce],S,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,ce);else ve(z.__webglFramebuffer[le],S,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);g(x)&&C(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let le=0,ce=ne.length;le<ce;le++){let Pe=ne[le],Oe=i.get(Pe),Ve=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Ve=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ve,Oe.__webglTexture),Ee(Ve,Pe),ve(z.__webglFramebuffer,S,Pe,n.COLOR_ATTACHMENT0+le,Ve,0),g(Pe)&&C(Ve)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(le=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,j.__webglTexture),Ee(le,x),x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)ve(z.__webglFramebuffer[ce],S,x,n.COLOR_ATTACHMENT0,le,ce);else ve(z.__webglFramebuffer,S,x,n.COLOR_ATTACHMENT0,le,0);g(x)&&C(le),t.unbindTexture()}S.depthBuffer&&Ie(S)}function Be(S){let x=S.textures;for(let z=0,j=x.length;z<j;z++){let ne=x[z];if(g(ne)){let fe=I(S),be=i.get(ne).__webglTexture;t.bindTexture(fe,be),C(fe),t.unbindTexture()}}}let st=[],re=[];function Re(S){if(S.samples>0){if(Xe(S)===!1){let x=S.textures,z=S.width,j=S.height,ne=n.COLOR_BUFFER_BIT,fe=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(S),le=x.length>1;if(le)for(let Pe=0;Pe<x.length;Pe++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);let ce=S.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Pe=0;Pe<x.length;Pe++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),le){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[Pe]);let Oe=i.get(x[Pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Oe,0)}n.blitFramebuffer(0,0,z,j,0,0,z,j,ne,n.NEAREST),l===!0&&(st.length=0,re.length=0,st.push(n.COLOR_ATTACHMENT0+Pe),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(st.push(fe),re.push(fe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,re)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,st))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let Pe=0;Pe<x.length;Pe++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,be.__webglColorRenderbuffer[Pe]);let Oe=i.get(x[Pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,Oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&l){let x=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function $e(S){return Math.min(s.maxSamples,S.samples)}function Xe(S){let x=i.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function G(S){let x=a.render.frame;d.get(S)!==x&&(d.set(S,x),S.update())}function ae(S,x){let z=S.colorSpace,j=S.format,ne=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||z!==Lo&&z!==hi&&(_t.getTransfer(z)===At?(j!==hn||ne!==sn)&&at("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ot("WebGLTextures: Unsupported texture color space:",z)),x}function Le(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=O,this.getTextureUnits=U,this.setTextureUnits=W,this.setTexture2D=ee,this.setTexture2DArray=q,this.setTexture3D=ie,this.setTextureCube=te,this.rebindTextures=Te,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=Be,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Xe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function tM(n,e){function t(i,s=hi){let r,a=_t.getTransfer(s);if(i===sn)return n.UNSIGNED_BYTE;if(i===Kc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Zc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Nh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Dh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Lh)return n.BYTE;if(i===Ih)return n.SHORT;if(i===Ea)return n.UNSIGNED_SHORT;if(i===Jc)return n.INT;if(i===Li)return n.UNSIGNED_INT;if(i===Ii)return n.FLOAT;if(i===Ni)return n.HALF_FLOAT;if(i===Uh)return n.ALPHA;if(i===kh)return n.RGB;if(i===hn)return n.RGBA;if(i===Xi)return n.DEPTH_COMPONENT;if(i===Xs)return n.DEPTH_STENCIL;if(i===Sr)return n.RED;if(i===Qc)return n.RED_INTEGER;if(i===qs)return n.RG;if(i===eu)return n.RG_INTEGER;if(i===tu)return n.RGBA_INTEGER;if(i===il||i===sl||i===rl||i===al)if(a===At)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===il)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===sl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===rl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===al)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===il)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===sl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===rl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===al)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===nu||i===iu||i===su||i===ru)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===nu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===iu)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===su)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ru)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===au||i===ou||i===lu||i===cu||i===uu||i===ol||i===du)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===au||i===ou)return a===At?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===lu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===cu)return r.COMPRESSED_R11_EAC;if(i===uu)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ol)return r.COMPRESSED_RG11_EAC;if(i===du)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===hu||i===fu||i===pu||i===mu||i===gu||i===_u||i===xu||i===yu||i===vu||i===bu||i===Su||i===Mu||i===wu||i===Eu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===hu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_u)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===yu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Su)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Eu)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Tu||i===Au||i===Cu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Tu)return a===At?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Au)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ru||i===Pu||i===ll||i===Lu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ru)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Pu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ll)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Lu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ta?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var nM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,rf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Ho(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new kt({vertexShader:nM,fragmentShader:iM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jt(new Go(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},af=class extends qi{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,f=null,m=null,y=typeof XRWebGLBinding<"u",p=new rf,g={},C=t.getContextAttributes(),I=null,v=null,M=[],w=[],N=new nt,b=null,R=null,B=new wn;B.viewport=new mt;let $=new wn;$.viewport=new mt;let D=[B,$],O=new jc,U=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Z=M[X];return Z===void 0&&(Z=new ma,M[X]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(X){let Z=M[X];return Z===void 0&&(Z=new ma,M[X]=Z),Z.getGripSpace()},this.getHand=function(X){let Z=M[X];return Z===void 0&&(Z=new ma,M[X]=Z),Z.getHandSpace()};function K(X){let Z=w.indexOf(X.inputSource);if(Z===-1)return;let xe=M[Z];xe!==void 0&&(xe.update(X.inputSource,X.frame,c||a),xe.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",ee);for(let X=0;X<M.length;X++){let Z=w[X];Z!==null&&(w[X]=null,M[X].disconnect(Z))}U=null,W=null,p.reset();for(let X in g)delete g[X];if(e.setRenderTarget(I),f=null,u=null,h=null,s=null,v=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(N.width,N.height,!1),R!==null){let X=R.camera;X.fov=R.fov,X.zoom=R.zoom,X.updateProjectionMatrix(),R=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&at("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&at("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h===null&&y&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(I=e.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",H),s.addEventListener("inputsourceschange",ee),C.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(N),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Se=null,ve=null;C.depth&&(ve=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=C.stencil?Xs:Xi,Se=C.stencil?Ta:Li);let je={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(je),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new Wn(u.textureWidth,u.textureHeight,{format:hn,type:sn,depthTexture:new zs(u.textureWidth,u.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let xe={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,xe),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Wn(f.framebufferWidth,f.framebufferHeight,{format:hn,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ue.setContext(s),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ee(X){for(let Z=0;Z<X.removed.length;Z++){let xe=X.removed[Z],Se=w.indexOf(xe);Se>=0&&(w[Se]=null,M[Se].disconnect(xe))}for(let Z=0;Z<X.added.length;Z++){let xe=X.added[Z],Se=w.indexOf(xe);if(Se===-1){for(let je=0;je<M.length;je++)if(je>=w.length){w.push(xe),Se=je;break}else if(w[je]===null){w[je]=xe,Se=je;break}if(Se===-1)break}let ve=M[Se];ve&&ve.connect(xe)}}let q=new Q,ie=new Q;function te(X,Z,xe){q.setFromMatrixPosition(Z.matrixWorld),ie.setFromMatrixPosition(xe.matrixWorld);let Se=q.distanceTo(ie),ve=Z.projectionMatrix.elements,je=xe.projectionMatrix.elements,ye=ve[14]/(ve[10]-1),Ie=ve[14]/(ve[10]+1),Te=(ve[9]+1)/ve[5],Ke=(ve[9]-1)/ve[5],Be=(ve[8]-1)/ve[0],st=(je[8]+1)/je[0],re=ye*Be,Re=ye*st,$e=Se/(-Be+st),Xe=$e*-Be;if(Z.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Xe),X.translateZ($e),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),ve[10]===-1)X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let G=ye+$e,ae=Ie+$e,Le=re-Xe,S=Re+(Se-Xe),x=Te*Ie/ae*G,z=Ke*Ie/ae*G;X.projectionMatrix.makePerspective(Le,S,x,z,G,ae),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function se(X,Z){Z===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Z.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Z=X.near,xe=X.far;p.texture!==null&&(p.depthNear>0&&(Z=p.depthNear),p.depthFar>0&&(xe=p.depthFar)),O.near=$.near=B.near=Z,O.far=$.far=B.far=xe,(U!==O.near||W!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),U=O.near,W=O.far),O.layers.mask=X.layers.mask|6,B.layers.mask=O.layers.mask&-5,$.layers.mask=O.layers.mask&-3;let Se=X.parent,ve=O.cameras;se(O,Se);for(let je=0;je<ve.length;je++)se(ve[je],Se);ve.length===2?te(O,B,$):O.projectionMatrix.copy(B.projectionMatrix),R===null&&X.isPerspectiveCamera&&(R={camera:X,fov:X.fov,zoom:X.zoom}),he(X,O,Se)};function he(X,Z,xe){xe===null?X.matrix.copy(Z.matrixWorld):(X.matrix.copy(xe.matrixWorld),X.matrix.invert(),X.matrix.multiply(Z.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=fa*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(O)},this.getCameraTexture=function(X){return g[X]};let Ne=null;function Ee(X,Z){if(d=Z.getViewerPose(c||a),m=Z,d!==null){let xe=d.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Se=!1;xe.length!==O.cameras.length&&(O.cameras.length=0,Se=!0);for(let Ie=0;Ie<xe.length;Ie++){let Te=xe[Ie],Ke=null;if(f!==null)Ke=f.getViewport(Te);else{let st=h.getViewSubImage(u,Te);Ke=st.viewport,Ie===0&&(e.setRenderTargetTextures(v,st.colorTexture,st.depthStencilTexture),e.setRenderTarget(v))}let Be=D[Ie];Be===void 0&&(Be=new wn,Be.layers.enable(Ie),Be.viewport=new mt,D[Ie]=Be),Be.matrix.fromArray(Te.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(Te.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Ie===0&&(O.matrix.copy(Be.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Se===!0&&O.cameras.push(Be)}let ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){h=i.getBinding();let Ie=h.getDepthInformation(xe[0]);Ie&&Ie.isValid&&Ie.texture&&p.init(Ie,s.renderState)}if(ve&&ve.includes("camera-access")&&y){e.state.unbindTexture(),h=i.getBinding();for(let Ie=0;Ie<xe.length;Ie++){let Te=xe[Ie].camera;if(Te){let Ke=g[Te];Ke||(Ke=new Ho,g[Te]=Ke);let Be=h.getCameraImage(Te);Ke.sourceTexture=Be}}}}for(let xe=0;xe<M.length;xe++){let Se=w[xe],ve=M[xe];Se!==null&&ve!==void 0&&ve.update(Se,Z,c||a)}Ne&&Ne(X,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),m=null}let Ue=new vg;Ue.setAnimationLoop(Ee),this.setAnimationLoop=function(X){Ne=X},this.dispose=function(){}}},sM=new vt,Tg=new ct;Tg.set(-1,0,0,0,1,0,0,0,1);function rM(n,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,Vh(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,C,I,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),h(p,g)):g.isMeshPhongMaterial?(r(p,g),d(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),u(p,g),g.isMeshPhysicalMaterial&&f(p,g,v)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),y(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,C,I):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===mn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===mn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let C=e.get(g),I=C.envMap,v=C.envMapRotation;I&&(p.envMap.value=I,p.envMapRotation.value.setFromMatrix4(sM.makeRotationFromEuler(v)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Tg),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,C,I){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*C,p.scale.value=I*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function d(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function h(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function u(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,C){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===mn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=C.texture,p.transmissionSamplerSize.value.set(C.width,C.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function y(p,g){let C=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(C.matrixWorld),p.nearDistance.value=C.shadow.camera.near,p.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function aM(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){let w=M.program;i.uniformBlockBinding(v,w)}function c(v,M){let w=s[v.id];w===void 0&&(p(v),w=d(v),s[v.id]=w,v.addEventListener("dispose",C));let N=M.program;i.updateUBOMapping(v,N);let b=e.render.frame;r[v.id]!==b&&(u(v),r[v.id]=b)}function d(v){let M=h();v.__bindingPointIndex=M;let w=n.createBuffer(),N=v.__size,b=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,N,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,w),w}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let M=s[v.id],w=v.uniforms,N=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let b=0,R=w.length;b<R;b++){let B=w[b];if(Array.isArray(B))for(let $=0,D=B.length;$<D;$++)f(B[$],b,$,N);else f(B,b,0,N)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,M,w,N){if(y(v,M,w,N)===!0){let b=v.__offset,R=v.value;if(Array.isArray(R)){let B=0;for(let $=0;$<R.length;$++){let D=R[$],O=g(D);m(D,v.__data,B),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(B+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(R,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,v.__data)}}function m(v,M,w){typeof v=="number"||typeof v=="boolean"?M[0]=v:v.isMatrix3?(M[0]=v.elements[0],M[1]=v.elements[1],M[2]=v.elements[2],M[3]=0,M[4]=v.elements[3],M[5]=v.elements[4],M[6]=v.elements[5],M[7]=0,M[8]=v.elements[6],M[9]=v.elements[7],M[10]=v.elements[8],M[11]=0):ArrayBuffer.isView(v)?M.set(new v.constructor(v.buffer,v.byteOffset,M.length)):v.toArray(M,w)}function y(v,M,w,N){let b=v.value,R=M+"_"+w;if(N[R]===void 0)return typeof b=="number"||typeof b=="boolean"?N[R]=b:ArrayBuffer.isView(b)?N[R]=b.slice():N[R]=b.clone(),!0;{let B=N[R];if(typeof b=="number"||typeof b=="boolean"){if(B!==b)return N[R]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(B.equals(b)===!1)return B.copy(b),!0}}return!1}function p(v){let M=v.uniforms,w=0,N=16;for(let R=0,B=M.length;R<B;R++){let $=Array.isArray(M[R])?M[R]:[M[R]];for(let D=0,O=$.length;D<O;D++){let U=$[D],W=Array.isArray(U.value)?U.value:[U.value];for(let K=0,H=W.length;K<H;K++){let ee=W[K],q=g(ee),ie=w%N,te=ie%q.boundary,se=ie+te;w+=te,se!==0&&N-se<q.storage&&(w+=N-se),U.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=w,w+=q.storage}}}let b=w%N;return b>0&&(w+=N-b),v.__size=w,v.__cache={},this}function g(v){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?at("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):at("WebGLRenderer: Unsupported uniform value type.",v),M}function C(v){let M=v.target;M.removeEventListener("dispose",C);let w=a.indexOf(M.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function I(){for(let v in s)n.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:I}}var oM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zi=null;function lM(){return Zi===null&&(Zi=new vs(oM,16,16,qs,Ni),Zi.name="DFG_LUT",Zi.minFilter=Nt,Zi.magFilter=Nt,Zi.wrapS=Gn,Zi.wrapT=Gn,Zi.generateMipmaps=!1,Zi.needsUpdate=!0),Zi}var Bu=class{constructor(e={}){let{canvas:t=jm(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:f=sn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let y=f,p=new Set([tu,eu,Qc]),g=new Set([sn,Li,Ea,Ta,Kc,Zc]),C=new Uint32Array(4),I=new Int32Array(4),v=new Q,M=null,w=null,N=[],b=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,$=!1,D=null,O=null,U=null,W=null;this._outputColorSpace=zt;let K=0,H=0,ee=null,q=-1,ie=null,te=new mt,se=new mt,he=null,Ne=new rt(0),Ee=0,Ue=t.width,X=t.height,Z=1,xe=null,Se=null,ve=new mt(0,0,Ue,X),je=new mt(0,0,Ue,X),ye=!1,Ie=new xa,Te=!1,Ke=!1,Be=new vt,st=new Q,re=new mt,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$e=!1;function Xe(){return ee===null?Z:1}let G=i;function ae(_,E){return t.getContext(_,E)}let Le,S,x,z,j,ne,fe,be,le,ce,Pe,Oe,Ve,Fe,et,tt,it,Y,Ae,de,we,De,_e;try{let _={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",ut,!1),t.addEventListener("webglcontextcreationerror",Vt,!1),G===null){let E="webgl2";if(G=ae(E,_),G===null)throw ae(E)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ge()}catch(_){throw t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",ut,!1),t.removeEventListener("webglcontextcreationerror",Vt,!1),ot("WebGLRenderer: "+_.message),_}function Ge(){Le=new mb(G),Le.init(),we=new tM(G,Le),S=new rb(G,Le,e,we),x=new QS(G,Le),S.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),O=G.createFramebuffer(),U=G.createFramebuffer(),W=G.createFramebuffer(),z=new xb(G),j=new BS,ne=new eM(G,Le,x,j,S,we,z),fe=new pb(B),be=new vx(G),De=new ib(G,be),le=new gb(G,be,z,De),ce=new vb(G,le,be,De,z),Y=new yb(G,S,ne),et=new ab(j),Pe=new FS(B,fe,Le,S,De,et),Oe=new rM(B,j),Ve=new VS,Fe=new qS(Le),it=new nb(B,fe,x,ce,m,l),tt=new ZS(B,ce,S),_e=new aM(G,z,S,x),Ae=new sb(G,Le,z),de=new _b(G,Le,z),z.programs=Pe.programs,B.capabilities=S,B.extensions=Le,B.properties=j,B.renderLists=Ve,B.shadowMap=tt,B.state=x,B.info=z}y!==sn&&(R=new Sb(y,t.width,t.height,o,s,r));let qe=new af(B,G);this.xr=qe,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let _=Le.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Le.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(_){_!==void 0&&(Z=_,this.setSize(Ue,X,!1))},this.getSize=function(_){return _.set(Ue,X)},this.setSize=function(_,E,L=!0){if(qe.isPresenting){at("WebGLRenderer: Can't change size while VR device is presenting.");return}Ue=_,X=E,t.width=Math.floor(_*Z),t.height=Math.floor(E*Z),L===!0&&(t.style.width=_+"px",t.style.height=E+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,_,E)},this.getDrawingBufferSize=function(_){return _.set(Ue*Z,X*Z).floor()},this.setDrawingBufferSize=function(_,E,L){Ue=_,X=E,Z=L,t.width=Math.floor(_*L),t.height=Math.floor(E*L),this.setViewport(0,0,_,E)},this.setEffects=function(_){if(y===sn){ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let E=0;E<_.length;E++)if(_[E].isOutputPass===!0){at("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(te)},this.getViewport=function(_){return _.copy(ve)},this.setViewport=function(_,E,L,P){_.isVector4?ve.set(_.x,_.y,_.z,_.w):ve.set(_,E,L,P),x.viewport(te.copy(ve).multiplyScalar(Z).round())},this.getScissor=function(_){return _.copy(je)},this.setScissor=function(_,E,L,P){_.isVector4?je.set(_.x,_.y,_.z,_.w):je.set(_,E,L,P),x.scissor(se.copy(je).multiplyScalar(Z).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(_){x.setScissorTest(ye=_)},this.setOpaqueSort=function(_){xe=_},this.setTransparentSort=function(_){Se=_},this.getClearColor=function(_){return _.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(_=!0,E=!0,L=!0){let P=0;if(_){let V=!1;if(ee!==null){let oe=ee.texture.format;V=p.has(oe)}if(V){let oe=ee.texture.type,pe=g.has(oe),ge=it.getClearColor(),Me=it.getClearAlpha(),Ce=ge.r,Ye=ge.g,ze=ge.b;pe?(C[0]=Ce,C[1]=Ye,C[2]=ze,C[3]=Me,G.clearBufferuiv(G.COLOR,0,C)):(I[0]=Ce,I[1]=Ye,I[2]=ze,I[3]=Me,G.clearBufferiv(G.COLOR,0,I))}else P|=G.COLOR_BUFFER_BIT}E&&(P|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),L&&(P|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P!==0&&G.clear(P)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),D=_},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",ut,!1),t.removeEventListener("webglcontextcreationerror",Vt,!1),it.dispose(),Ve.dispose(),Fe.dispose(),j.dispose(),fe.dispose(),ce.dispose(),De.dispose(),_e.dispose(),Pe.dispose(),qe.dispose(),qe.removeEventListener("sessionstart",Ms),qe.removeEventListener("sessionend",fi),Rt.stop()};function pt(_){_.preventDefault(),Do("WebGLRenderer: Context Lost."),$=!0}function ut(){Do("WebGLRenderer: Context Restored."),$=!1;let _=z.autoReset,E=tt.enabled,L=tt.autoUpdate,P=tt.needsUpdate,V=tt.type;Ge(),z.autoReset=_,tt.enabled=E,tt.autoUpdate=L,tt.needsUpdate=P,tt.type=V}function Vt(_){ot("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function bt(_){let E=_.target;E.removeEventListener("dispose",bt),Ui(E)}function Ui(_){Jt(_),j.remove(_)}function Jt(_){let E=j.get(_).programs;E!==void 0&&(E.forEach(function(L){Pe.releaseProgram(L)}),_.isShaderMaterial&&Pe.releaseShaderCache(_))}this.renderBufferDirect=function(_,E,L,P,V,oe){E===null&&(E=Re);let pe=V.isMesh&&V.matrixWorld.determinantAffine()<0,ge=Cn(_,E,L,P,V);x.setMaterial(P,pe);let Me=L.index,Ce=1;if(P.wireframe===!0){if(Me=le.getWireframeAttribute(L),Me===void 0)return;Ce=2}let Ye=L.drawRange,ze=L.attributes.position,He=Ye.start*Ce,lt=(Ye.start+Ye.count)*Ce;oe!==null&&(He=Math.max(He,oe.start*Ce),lt=Math.min(lt,(oe.start+oe.count)*Ce)),Me!==null?(He=Math.max(He,0),lt=Math.min(lt,Me.count)):ze!=null&&(He=Math.max(He,0),lt=Math.min(lt,ze.count));let Et=lt-He;if(Et<0||Et===1/0)return;De.setup(V,P,ge,L,Me);let St,xt=Ae;if(Me!==null&&(St=be.get(Me),xt=de,xt.setIndex(St)),V.isMesh)P.wireframe===!0?(x.setLineWidth(P.wireframeLinewidth*Xe()),xt.setMode(G.LINES)):xt.setMode(G.TRIANGLES);else if(V.isLine){let Zt=P.linewidth;Zt===void 0&&(Zt=1),x.setLineWidth(Zt*Xe()),V.isLineSegments?xt.setMode(G.LINES):V.isLineLoop?xt.setMode(G.LINE_LOOP):xt.setMode(G.LINE_STRIP)}else V.isPoints?xt.setMode(G.POINTS):V.isSprite&&xt.setMode(G.TRIANGLES);if(V.isBatchedMesh)if(Le.get("WEBGL_multi_draw"))xt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Zt=V._multiDrawStarts,Je=V._multiDrawCounts,an=V._multiDrawCount,gt=Me?be.get(Me).bytesPerElement:1,vn=j.get(P).currentProgram.getUniforms();for(let Fn=0;Fn<an;Fn++)vn.setValue(G,"_gl_DrawID",Fn),xt.render(Zt[Fn]/gt,Je[Fn])}else if(V.isInstancedMesh)xt.renderInstances(He,Et,V.count);else if(L.isInstancedBufferGeometry){let Zt=L._maxInstanceCount!==void 0?L._maxInstanceCount:1/0,Je=Math.min(L.instanceCount,Zt);xt.renderInstances(He,Et,Je)}else xt.render(He,Et)};function Kt(_,E,L,P){D!==null&&_.isNodeMaterial&&D.setObject(P,_),Te===!0&&et.setState(_,L,!1),_.transparent===!0&&_.side===di&&_.forceSinglePass===!1?(_.side=mn,_.needsUpdate=!0,ki(_,E,P),_.side=Ws,_.needsUpdate=!0,ki(_,E,P),_.side=di):ki(_,E,P)}this.compile=function(_,E,L=null){L===null&&(L=_),D!==null&&D.renderStart(_,E,L),w=Fe.get(L),w.init(E),b.push(w),L.traverseVisible(function(V){V.isLight&&V.layers.test(E.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),_!==L&&_.traverseVisible(function(V){V.isLight&&V.layers.test(E.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),w.setupLights(),D!==null&&D.updateLights(w.state.lightsArray),Ke=this.localClippingEnabled,Te=et.init(this.clippingPlanes,Ke),Te===!0&&et.setGlobalState(this.clippingPlanes,E),D!==null&&tt.render(w.state.shadowsArray,L,E);let P=new Set;return _.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let oe=V.material;if(oe)if(Array.isArray(oe))for(let pe=0;pe<oe.length;pe++){let ge=oe[pe];Kt(ge,L,E,V),P.add(ge)}else Kt(oe,L,E,V),P.add(oe)}),w=b.pop(),D!==null&&D.renderEnd(),P},this.compileAsync=function(_,E,L=null){let P=this.compile(_,E,L);return new Promise(V=>{function oe(){if(P.forEach(function(pe){let Me=j.get(pe).currentProgram;(Me===void 0||Me.isReady())&&P.delete(pe)}),P.size===0){V(_);return}setTimeout(oe,10)}Le.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let rn=null;function On(_){rn&&rn(_)}function Ms(){Rt.stop()}function fi(){Rt.start()}let Rt=new vg;Rt.setAnimationLoop(On),typeof self<"u"&&Rt.setContext(self),this.setAnimationLoop=function(_){rn=_,qe.setAnimationLoop(_),_===null?Rt.stop():Rt.start()},qe.addEventListener("sessionstart",Ms),qe.addEventListener("sessionend",fi),this.render=function(_,E){if(E!==void 0&&E.isCamera!==!0){ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if($===!0)return;D!==null&&D.renderStart(_,E);let L=qe.enabled===!0&&qe.isPresenting===!0,P=R!==null&&(ee===null||L)&&R.begin(B,ee);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),E.parent===null&&E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),qe.enabled===!0&&qe.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(qe.cameraAutoUpdate===!0&&qe.updateCamera(E),E=qe.getCamera()),_.isScene===!0&&_.onBeforeRender(B,_,E,ee),w=Fe.get(_,b.length),w.init(E),w.state.textureUnits=ne.getTextureUnits(),b.push(w),Be.multiplyMatrices(E.projectionMatrix,E.matrixWorldInverse),Ie.setFromProjectionMatrix(Be,Ai,E.reversedDepth),Ke=this.localClippingEnabled,Te=et.init(this.clippingPlanes,Ke),M=Ve.get(_,N.length),M.init(),N.push(M),qe.enabled===!0&&qe.isPresenting===!0){let pe=B.xr.getDepthSensingMesh();pe!==null&&un(pe,E,-1/0,B.sortObjects)}un(_,E,0,B.sortObjects),M.finish(),D!==null&&D.updateLights(w.state.lightsArray),B.sortObjects===!0&&M.sort(xe,Se),$e=qe.enabled===!1||qe.isPresenting===!1||qe.hasDepthSensing()===!1,$e&&it.addToRenderList(M,_),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Te===!0&&et.beginShadows();let V=w.state.shadowsArray;if(tt.render(V,_,E),Te===!0&&et.endShadows(),(P&&R.hasRenderPass())===!1){let pe=M.opaque,ge=M.transmissive;if(w.setupLights(),E.isArrayCamera){let Me=E.cameras;if(ge.length>0)for(let Ce=0,Ye=Me.length;Ce<Ye;Ce++){let ze=Me[Ce];ni(pe,ge,_,ze)}$e&&it.render(_);for(let Ce=0,Ye=Me.length;Ce<Ye;Ce++){let ze=Me[Ce];ti(M,_,ze,ze.viewport)}}else ge.length>0&&ni(pe,ge,_,E),$e&&it.render(_),ti(M,_,E)}ee!==null&&H===0&&(ne.updateMultisampleRenderTarget(ee),ne.updateRenderTargetMipmap(ee)),P&&R.end(B),_.isScene===!0&&_.onAfterRender(B,_,E),De.resetDefaultState(),q=-1,ie=null,b.pop(),b.length>0?(w=b[b.length-1],ne.setTextureUnits(w.state.textureUnits),Te===!0&&et.setGlobalState(B.clippingPlanes,w.state.camera)):w=null,N.pop(),N.length>0?M=N[N.length-1]:M=null,D!==null&&D.renderEnd()};function un(_,E,L,P){if(_.visible===!1)return;if(_.layers.test(E.layers)){if(_.isGroup)L=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(E);else if(_.isLightProbeGrid)w.pushLightProbeGrid(_);else if(_.isLight)w.pushLight(_),_.castShadow&&w.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||_.intersectsFrustum(Ie)){P&&re.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Be);let pe=ce.update(_),ge=_.material;ge.visible&&M.push(_,pe,ge,L,re.z,null,E)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||_.intersectsFrustum(Ie))){let pe=ce.update(_),ge=_.material;if(P&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),re.copy(_.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),re.copy(pe.boundingSphere.center)),re.applyMatrix4(_.matrixWorld).applyMatrix4(Be)),Array.isArray(ge)){let Me=pe.groups;for(let Ce=0,Ye=Me.length;Ce<Ye;Ce++){let ze=Me[Ce],He=ge[ze.materialIndex];He&&He.visible&&M.push(_,pe,He,L,re.z,ze,E)}}else ge.visible&&M.push(_,pe,ge,L,re.z,null,E)}}let oe=_.children;for(let pe=0,ge=oe.length;pe<ge;pe++)un(oe[pe],E,L,P)}function ti(_,E,L,P){let{opaque:V,transmissive:oe,transparent:pe}=_;w.setupLightsView(L),Te===!0&&et.setGlobalState(B.clippingPlanes,L),P&&x.viewport(te.copy(P)),V.length>0&&pi(V,E,L),oe.length>0&&pi(oe,E,L),pe.length>0&&pi(pe,E,L),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function ni(_,E,L,P){if((L.isScene===!0?L.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[P.id]===void 0){let He=Le.has("EXT_color_buffer_half_float")||Le.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[P.id]=new Wn(1,1,{generateMipmaps:!0,type:He?Ni:sn,minFilter:Zn,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_t.workingColorSpace})}let oe=w.state.transmissionRenderTarget[P.id],pe=P.viewport||te;oe.setSize(pe.z*B.transmissionResolutionScale,pe.w*B.transmissionResolutionScale);let ge=B.getRenderTarget(),Me=B.getActiveCubeFace(),Ce=B.getActiveMipmapLevel();B.setRenderTarget(oe),B.getClearColor(Ne),Ee=B.getClearAlpha(),Ee<1&&B.setClearColor(16777215,.5),B.clear(),$e&&it.render(L);let Ye=B.toneMapping;B.toneMapping=Pi;let ze=P.viewport;if(P.viewport!==void 0&&(P.viewport=void 0),w.setupLightsView(P),Te===!0&&et.setGlobalState(B.clippingPlanes,P),pi(_,L,P),ne.updateMultisampleRenderTarget(oe),ne.updateRenderTargetMipmap(oe),Le.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let lt=0,Et=E.length;lt<Et;lt++){let St=E[lt],{object:xt,geometry:Zt,material:Je,group:an}=St;if(Je.side===di&&xt.layers.test(P.layers)){let gt=Je.side;Je.side=mn,Je.needsUpdate=!0,ws(xt,L,P,Zt,Je,an),Je.side=gt,Je.needsUpdate=!0,He=!0}}He===!0&&(ne.updateMultisampleRenderTarget(oe),ne.updateRenderTargetMipmap(oe))}B.setRenderTarget(ge,Me,Ce),B.setClearColor(Ne,Ee),ze!==void 0&&(P.viewport=ze),B.toneMapping=Ye}function pi(_,E,L){let P=E.isScene===!0?E.overrideMaterial:null;for(let V=0,oe=_.length;V<oe;V++){let pe=_[V],{object:ge,geometry:Me,group:Ce}=pe,Ye=pe.material;Ye.allowOverride===!0&&P!==null&&(Ye=P),ge.layers.test(L.layers)&&ws(ge,E,L,Me,Ye,Ce)}}function ws(_,E,L,P,V,oe){D!==null&&V.isNodeMaterial&&D.setObject(_,V),_.onBeforeRender(B,E,L,P,V,oe),_.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),V.onBeforeRender(B,E,L,P,_,oe),V.transparent===!0&&V.side===di&&V.forceSinglePass===!1?(V.side=mn,V.needsUpdate=!0,B.renderBufferDirect(L,E,P,V,_,oe),V.side=Ws,V.needsUpdate=!0,B.renderBufferDirect(L,E,P,V,_,oe),V.side=di):B.renderBufferDirect(L,E,P,V,_,oe),_.onAfterRender(B,E,L,P,V,oe)}function ki(_,E,L){E.isScene!==!0&&(E=Re);let P=j.get(_),V=w.state.lights,oe=w.state.shadowsArray,pe=V.state.version,ge=Pe.getParameters(_,V.state,oe,E,L,w.state.lightProbeGridArray),Me=Pe.getProgramCacheKey(ge),Ce=P.programs;P.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?E.environment:null,P.fog=E.fog;let Ye=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;P.envMap=fe.get(_.envMap||P.environment,Ye),P.envMapRotation=P.environment!==null&&_.envMap===null?E.environmentRotation:_.envMapRotation,Ce===void 0&&(_.addEventListener("dispose",bt),Ce=new Map,P.programs=Ce);let ze=Ce.get(Me);if(ze!==void 0){if(P.currentProgram===ze&&P.lightsStateVersion===pe)return Cr(_,ge),ze}else ge.uniforms=Pe.getUniforms(_),D!==null&&_.isNodeMaterial&&D.build(_,L,ge),_.onBeforeCompile(ge,B),ze=Pe.acquireProgram(ge,Me),Ce.set(Me,ze),P.uniforms=ge.uniforms;let He=P.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(He.clippingPlanes=et.uniform),Cr(_,ge),P.needsLights=A(_),P.lightsStateVersion=pe,P.needsLights&&(He.ambientLightColor.value=V.state.ambient,He.lightProbe.value=V.state.probe,He.sunLights.value=V.state.sun,He.sunLightShadows.value=V.state.sunShadow,He.directionalLights.value=V.state.directional,He.directionalLightShadows.value=V.state.directionalShadow,He.spotLights.value=V.state.spot,He.spotLightShadows.value=V.state.spotShadow,He.rectAreaLights.value=V.state.rectArea,He.ltc_1.value=V.state.rectAreaLTC1,He.ltc_2.value=V.state.rectAreaLTC2,He.pointLights.value=V.state.point,He.pointLightShadows.value=V.state.pointShadow,He.hemisphereLights.value=V.state.hemi,He.sunShadowMatrix.value=V.state.sunShadowMatrix,He.sunShadowCascade.value=V.state.sunShadowCascade,He.directionalShadowMatrix.value=V.state.directionalShadowMatrix,He.spotLightMatrix.value=V.state.spotLightMatrix,He.spotLightMap.value=V.state.spotLightMap,He.pointShadowMatrix.value=V.state.pointShadowMatrix),P.lightProbeGrid=w.state.lightProbeGridArray.length>0,P.currentProgram=ze,P.uniformsList=null,ze}function Zs(_){if(_.uniformsList===null){let E=_.currentProgram.getUniforms();_.uniformsList=Ra.seqWithValue(E.seq,_.uniforms)}return _.uniformsList}function Cr(_,E){let L=j.get(_);L.outputColorSpace=E.outputColorSpace,L.batching=E.batching,L.batchingColor=E.batchingColor,L.instancing=E.instancing,L.instancingColor=E.instancingColor,L.instancingMorph=E.instancingMorph,L.skinning=E.skinning,L.morphTargets=E.morphTargets,L.morphNormals=E.morphNormals,L.morphColors=E.morphColors,L.morphTargetsCount=E.morphTargetsCount,L.numClippingPlanes=E.numClippingPlanes,L.numIntersection=E.numClipIntersection,L.vertexAlphas=E.vertexAlphas,L.vertexTangents=E.vertexTangents,L.toneMapping=E.toneMapping}function Ba(_,E){if(_.length===0)return null;if(_.length===1)return _[0].texture!==null?_[0]:null;v.setFromMatrixPosition(E.matrixWorld);for(let L=0,P=_.length;L<P;L++){let V=_[L];if(V.texture!==null&&V.boundingBox.containsPoint(v))return V}return null}function Cn(_,E,L,P,V){E.isScene!==!0&&(E=Re),ne.resetTextureUnits();let oe=E.fog,pe=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?E.environment:null,ge=ee===null?B.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:_t.workingColorSpace,Me=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap,Ce=fe.get(P.envMap||pe,Me),Ye=P.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,ze=!!L.attributes.tangent&&(!!P.normalMap||P.anisotropy>0),He=!!L.morphAttributes.position,lt=!!L.morphAttributes.normal,Et=!!L.morphAttributes.color,St=Pi;P.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(St=B.toneMapping);let xt=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,Zt=xt!==void 0?xt.length:0,Je=j.get(P),an=w.state.lights;if(Te===!0&&(Ke===!0||_!==ie)){let Pt=_===ie&&P.id===q;et.setState(P,_,Pt)}let gt=!1;P.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==an.state.version||Je.outputColorSpace!==ge||V.isBatchedMesh&&Je.batching===!1||!V.isBatchedMesh&&Je.batching===!0||V.isBatchedMesh&&Je.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Je.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Je.instancing===!1||!V.isInstancedMesh&&Je.instancing===!0||V.isSkinnedMesh&&Je.skinning===!1||!V.isSkinnedMesh&&Je.skinning===!0||V.isInstancedMesh&&Je.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Je.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Je.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Je.instancingMorph===!1&&V.morphTexture!==null||Je.envMap!==Ce||P.fog===!0&&Je.fog!==oe||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==et.numPlanes||Je.numIntersection!==et.numIntersection)||Je.vertexAlphas!==Ye||Je.vertexTangents!==ze||Je.morphTargets!==He||Je.morphNormals!==lt||Je.morphColors!==Et||Je.toneMapping!==St||Je.morphTargetsCount!==Zt||!!Je.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(gt=!0):(gt=!0,Je.__version=P.version);let vn=Je.currentProgram;gt===!0&&(vn=ki(P,E,V),D&&P.isNodeMaterial&&D.onUpdateProgram(P,vn,Je));let Fn=!1,Rn=!1,Bn=!1,Mt=vn.getUniforms(),Ot=Je.uniforms;if(x.useProgram(vn.program)&&(Fn=!0,Rn=!0,Bn=!0),P.id!==q&&(q=P.id,Rn=!0),Je.needsLights){let Pt=Ba(w.state.lightProbeGridArray,V);Je.lightProbeGrid!==Pt&&(Je.lightProbeGrid=Pt,Rn=!0)}if(Fn||ie!==_){x.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),Mt.setValue(G,"projectionMatrix",_.projectionMatrix),Mt.setValue(G,"viewMatrix",_.matrixWorldInverse);let gi=Mt.map.cameraPosition;gi!==void 0&&gi.setValue(G,st.setFromMatrixPosition(_.matrixWorld)),S.logarithmicDepthBuffer&&Mt.setValue(G,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(P.isMeshPhongMaterial||P.isMeshToonMaterial||P.isMeshLambertMaterial||P.isMeshBasicMaterial||P.isMeshStandardMaterial||P.isShaderMaterial)&&Mt.setValue(G,"isOrthographic",_.isOrthographicCamera===!0),ie!==_&&(ie=_,Rn=!0,Bn=!0)}if(Je.needsLights&&(an.state.sunShadowMap.length>0&&Mt.setValue(G,"sunShadowMap",an.state.sunShadowMap,ne),an.state.directionalShadowMap.length>0&&Mt.setValue(G,"directionalShadowMap",an.state.directionalShadowMap,ne),an.state.spotShadowMap.length>0&&Mt.setValue(G,"spotShadowMap",an.state.spotShadowMap,ne),an.state.pointShadowMap.length>0&&Mt.setValue(G,"pointShadowMap",an.state.pointShadowMap,ne)),V.isSkinnedMesh){Mt.setOptional(G,V,"bindMatrix"),Mt.setOptional(G,V,"bindMatrixInverse");let Pt=V.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),Mt.setValue(G,"boneTexture",Pt.boneTexture,ne))}V.isBatchedMesh&&(Mt.setOptional(G,V,"batchingTexture"),Mt.setValue(G,"batchingTexture",V._matricesTexture,ne),Mt.setOptional(G,V,"batchingIdTexture"),Mt.setValue(G,"batchingIdTexture",V._indirectTexture,ne),Mt.setOptional(G,V,"batchingColorTexture"),V._colorsTexture!==null&&Mt.setValue(G,"batchingColorTexture",V._colorsTexture,ne));let mi=L.morphAttributes;if((mi.position!==void 0||mi.normal!==void 0||mi.color!==void 0)&&Y.update(V,L,vn),(Rn||Je.receiveShadow!==V.receiveShadow)&&(Je.receiveShadow=V.receiveShadow,Mt.setValue(G,"receiveShadow",V.receiveShadow)),(P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial)&&P.envMap===null&&E.environment!==null&&(Ot.envMapIntensity.value=E.environmentIntensity),Ot.dfgLUT!==void 0&&(Ot.dfgLUT.value=lM()),Rn){if(Mt.setValue(G,"toneMappingExposure",B.toneMappingExposure),Je.needsLights&&yn(Ot,Bn),oe&&P.fog===!0&&Oe.refreshFogUniforms(Ot,oe),Oe.refreshMaterialUniforms(Ot,P,Z,X,w.state.transmissionRenderTarget[_.id]),Je.needsLights&&Je.lightProbeGrid){let Pt=Je.lightProbeGrid;Ot.probesSH.value=Pt.texture,Ot.probesMin.value.copy(Pt.boundingBox.min),Ot.probesMax.value.copy(Pt.boundingBox.max),Ot.probesResolution.value.copy(Pt.resolution)}Ra.upload(G,Zs(Je),Ot,ne)}if(P.isShaderMaterial&&P.uniformsNeedUpdate===!0&&(Ra.upload(G,Zs(Je),Ot,ne),P.uniformsNeedUpdate=!1),P.isSpriteMaterial&&Mt.setValue(G,"center",V.center),Mt.setValue(G,"modelViewMatrix",V.modelViewMatrix),Mt.setValue(G,"normalMatrix",V.normalMatrix),Mt.setValue(G,"modelMatrix",V.matrixWorld),P.uniformsGroups!==void 0){let Pt=P.uniformsGroups;for(let gi=0,Oi=Pt.length;gi<Oi;gi++){let gl=Pt[gi];_e.update(gl,vn),_e.bind(gl,vn)}}return vn}function yn(_,E){_.ambientLightColor.needsUpdate=E,_.lightProbe.needsUpdate=E,_.sunLights.needsUpdate=E,_.sunLightShadows.needsUpdate=E,_.directionalLights.needsUpdate=E,_.directionalLightShadows.needsUpdate=E,_.pointLights.needsUpdate=E,_.pointLightShadows.needsUpdate=E,_.spotLights.needsUpdate=E,_.spotLightShadows.needsUpdate=E,_.rectAreaLights.needsUpdate=E,_.hemisphereLights.needsUpdate=E}function A(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(_,E,L){let P=j.get(_);P.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,P.__autoAllocateDepthBuffer===!1&&(P.__useRenderToTexture=!1),j.get(_.texture).__webglTexture=E,j.get(_.depthTexture).__webglTexture=P.__autoAllocateDepthBuffer?void 0:L,P.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,E){let L=j.get(_);L.__webglFramebuffer=E,L.__useDefaultFramebuffer=E===void 0},this.setRenderTarget=function(_,E=0,L=0){ee=_,K=E,H=L;let P=null,V=!1,oe=!1;if(_){let ge=j.get(_);if(ge.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(G.FRAMEBUFFER,ge.__webglFramebuffer),te.copy(_.viewport),se.copy(_.scissor),he=_.scissorTest,x.viewport(te),x.scissor(se),x.setScissorTest(he),q=-1;return}else if(ge.__webglFramebuffer===void 0)ne.setupRenderTarget(_);else if(ge.__hasExternalTextures)ne.rebindTextures(_,j.get(_.texture).__webglTexture,j.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Ye=_.depthTexture;if(ge.__boundDepthTexture!==Ye){if(Ye!==null&&j.has(Ye)&&(_.width!==Ye.image.width||_.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(_)}}let Me=_.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(oe=!0);let Ce=j.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Ce[E])?P=Ce[E][L]:P=Ce[E],V=!0):_.samples>0&&ne.useMultisampledRTT(_)===!1?P=j.get(_).__webglMultisampledFramebuffer:Array.isArray(Ce)?P=Ce[L]:P=Ce,te.copy(_.viewport),se.copy(_.scissor),he=_.scissorTest}else te.copy(ve).multiplyScalar(Z).floor(),se.copy(je).multiplyScalar(Z).floor(),he=ye;if(L!==0&&(P=O),x.bindFramebuffer(G.FRAMEBUFFER,P)&&x.drawBuffers(_,P),x.viewport(te),x.scissor(se),x.setScissorTest(he),V){let ge=j.get(_.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+E,ge.__webglTexture,L)}else if(oe){let ge=E;for(let Me=0;Me<_.textures.length;Me++){let Ce=j.get(_.textures[Me]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Me,Ce.__webglTexture,L,ge)}}else if(_!==null&&L!==0){let ge=j.get(_.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,ge.__webglTexture,L)}q=-1};function F(_){let E=j.get(_);return(E.__readFormat!==_.format||E.__readType!==_.type)&&(E.__readFormat=_.format,E.__readType=_.type,E.__formatReadable=S.textureFormatReadable(_.format),E.__typeReadable=S.textureTypeReadable(_.type)),E}this.readRenderTargetPixels=function(_,E,L,P,V,oe,pe,ge=0){if(!(_&&_.isWebGLRenderTarget)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=j.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&pe!==void 0&&(Me=Me[pe]),Me){x.bindFramebuffer(G.FRAMEBUFFER,Me);try{let Ce=_.textures[ge],Ye=Ce.format,ze=Ce.type;_.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+ge);let He=F(Ce);if(He.__formatReadable===!1){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(He.__typeReadable===!1){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}E>=0&&E<=_.width-P&&L>=0&&L<=_.height-V&&G.readPixels(E,L,P,V,we.convert(Ye),we.convert(ze),oe)}finally{let Ce=ee!==null?j.get(ee).__webglFramebuffer:null;x.bindFramebuffer(G.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(_,E,L,P,V,oe,pe,ge=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=j.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&pe!==void 0&&(Me=Me[pe]),Me)if(E>=0&&E<=_.width-P&&L>=0&&L<=_.height-V){x.bindFramebuffer(G.FRAMEBUFFER,Me);let Ce=_.textures[ge],Ye=Ce.format,ze=Ce.type;_.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+ge);let He=F(Ce);if(He.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(He.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let lt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,lt),G.bufferData(G.PIXEL_PACK_BUFFER,oe.byteLength,G.STREAM_READ),G.readPixels(E,L,P,V,we.convert(Ye),we.convert(ze),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let Et=ee!==null?j.get(ee).__webglFramebuffer:null;x.bindFramebuffer(G.FRAMEBUFFER,Et);let St=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await qm(G,St,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,lt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,oe),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(lt),G.deleteSync(St),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,E=null,L=0){let P=Math.pow(2,-L),V=Math.floor(_.image.width*P),oe=Math.floor(_.image.height*P),pe=E!==null?E.x:0,ge=E!==null?E.y:0;ne.setTexture2D(_,0),G.copyTexSubImage2D(G.TEXTURE_2D,L,0,0,pe,ge,V,oe),x.unbindTexture()},this.copyTextureToTexture=function(_,E,L=null,P=null,V=0,oe=0){let pe,ge,Me,Ce,Ye,ze,He,lt,Et,St=_.isCompressedTexture?_.mipmaps[oe]:_.image;if(L!==null)pe=L.max.x-L.min.x,ge=L.max.y-L.min.y,Me=L.isBox3?L.max.z-L.min.z:1,Ce=L.min.x,Ye=L.min.y,ze=L.isBox3?L.min.z:0;else{let Ot=Math.pow(2,-V);pe=Math.floor(St.width*Ot),ge=Math.floor(St.height*Ot),_.isDataArrayTexture?Me=St.depth:_.isData3DTexture?Me=Math.floor(St.depth*Ot):Me=1,Ce=0,Ye=0,ze=0}P!==null?(He=P.x,lt=P.y,Et=P.z):(He=0,lt=0,Et=0);let xt=we.convert(E.format),Zt=we.convert(E.type),Je;E.isData3DTexture?(ne.setTexture3D(E,0),Je=G.TEXTURE_3D):E.isDataArrayTexture||E.isCompressedArrayTexture?(ne.setTexture2DArray(E,0),Je=G.TEXTURE_2D_ARRAY):(ne.setTexture2D(E,0),Je=G.TEXTURE_2D),x.activeTexture(G.TEXTURE0),x.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,E.flipY),x.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),x.pixelStorei(G.UNPACK_ALIGNMENT,E.unpackAlignment);let an=x.getParameter(G.UNPACK_ROW_LENGTH),gt=x.getParameter(G.UNPACK_IMAGE_HEIGHT),vn=x.getParameter(G.UNPACK_SKIP_PIXELS),Fn=x.getParameter(G.UNPACK_SKIP_ROWS),Rn=x.getParameter(G.UNPACK_SKIP_IMAGES);x.pixelStorei(G.UNPACK_ROW_LENGTH,St.width),x.pixelStorei(G.UNPACK_IMAGE_HEIGHT,St.height),x.pixelStorei(G.UNPACK_SKIP_PIXELS,Ce),x.pixelStorei(G.UNPACK_SKIP_ROWS,Ye),x.pixelStorei(G.UNPACK_SKIP_IMAGES,ze);let Bn=_.isDataArrayTexture||_.isData3DTexture,Mt=E.isDataArrayTexture||E.isData3DTexture;if(_.isDepthTexture){let Ot=j.get(_),mi=j.get(E),Pt=j.get(Ot.__renderTarget),gi=j.get(mi.__renderTarget);x.bindFramebuffer(G.READ_FRAMEBUFFER,Pt.__webglFramebuffer),x.bindFramebuffer(G.DRAW_FRAMEBUFFER,gi.__webglFramebuffer);for(let Oi=0;Oi<Me;Oi++)Bn&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,j.get(_).__webglTexture,V,ze+Oi),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,j.get(E).__webglTexture,oe,Et+Oi)),G.blitFramebuffer(Ce,Ye,pe,ge,He,lt,pe,ge,G.DEPTH_BUFFER_BIT,G.NEAREST);x.bindFramebuffer(G.READ_FRAMEBUFFER,null),x.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(V!==0||_.isRenderTargetTexture||j.has(_)){let Ot=j.get(_),mi=j.get(E);x.bindFramebuffer(G.READ_FRAMEBUFFER,U),x.bindFramebuffer(G.DRAW_FRAMEBUFFER,W);for(let Pt=0;Pt<Me;Pt++)Bn?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ot.__webglTexture,V,ze+Pt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ot.__webglTexture,V),Mt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,mi.__webglTexture,oe,Et+Pt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,mi.__webglTexture,oe),V!==0?G.blitFramebuffer(Ce,Ye,pe,ge,He,lt,pe,ge,G.COLOR_BUFFER_BIT,G.NEAREST):Mt?G.copyTexSubImage3D(Je,oe,He,lt,Et+Pt,Ce,Ye,pe,ge):G.copyTexSubImage2D(Je,oe,He,lt,Ce,Ye,pe,ge);x.bindFramebuffer(G.READ_FRAMEBUFFER,null),x.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Mt?_.isDataTexture||_.isData3DTexture?G.texSubImage3D(Je,oe,He,lt,Et,pe,ge,Me,xt,Zt,St.data):E.isCompressedArrayTexture?G.compressedTexSubImage3D(Je,oe,He,lt,Et,pe,ge,Me,xt,St.data):G.texSubImage3D(Je,oe,He,lt,Et,pe,ge,Me,xt,Zt,St):_.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,oe,He,lt,pe,ge,xt,Zt,St.data):_.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,oe,He,lt,St.width,St.height,xt,St.data):G.texSubImage2D(G.TEXTURE_2D,oe,He,lt,pe,ge,xt,Zt,St);x.pixelStorei(G.UNPACK_ROW_LENGTH,an),x.pixelStorei(G.UNPACK_IMAGE_HEIGHT,gt),x.pixelStorei(G.UNPACK_SKIP_PIXELS,vn),x.pixelStorei(G.UNPACK_SKIP_ROWS,Fn),x.pixelStorei(G.UNPACK_SKIP_IMAGES,Rn),oe===0&&E.generateMipmaps&&G.generateMipmap(Je),x.unbindTexture()},this.initRenderTarget=function(_){j.get(_).__webglFramebuffer===void 0&&ne.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?ne.setTextureCube(_,0):_.isData3DTexture?ne.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?ne.setTexture2DArray(_,0):ne.setTexture2D(_,0),x.unbindTexture()},this.resetState=function(){K=0,H=0,ee=null,x.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}};var Hu=class extends on{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new nt(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this.rotation2D=e.rotation2D,this}},Ia=new Q,Ag=new vt,Cg=new vt,Rg=new Q,Pg=new Q,Gu=class{constructor(e={}){let t=this,i,s,r,a,o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(m,y){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),y.parent===null&&y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),Ag.copy(y.matrixWorldInverse),Cg.multiplyMatrices(y.projectionMatrix,Ag),d(m,m,y),this.sortObjects&&f(m)},this.setSize=function(m,y){i=m,s=y,r=i/2,a=s/2,l.style.width=m+"px",l.style.height=y+"px"};function c(m){m.isCSS2DObject&&(m.element.style.display="none");for(let y=0,p=m.children.length;y<p;y++)c(m.children[y])}function d(m,y,p){if(m.visible===!1){c(m);return}if(m.isCSS2DObject){Ia.setFromMatrixPosition(m.matrixWorld),Ia.applyMatrix4(Cg);let g=Ia.z>=-1&&Ia.z<=1&&m.layers.test(p.layers)===!0,C=m.element;if(C.style.display=g===!0?"":"none",g===!0){m.onBeforeRender(t,y,p);let v=100*m.center.x,M=100*m.center.y;C.style.transformOrigin=`${v}% ${M}%`;let w=-m.rotation2D,N=Ia.x*r+r,b=-Ia.y*a+a;C.style.transform=`translate(${-v}%, ${-M}%) translate(${N}px, ${b}px) rotate(${w}rad)`,C.parentNode!==l&&l.appendChild(C),m.onAfterRender(t,y,p)}let I={distanceToCameraSquared:h(p,m)};o.objects.set(m,I)}for(let g=0,C=m.children.length;g<C;g++)d(m.children[g],y,p)}function h(m,y){return Rg.setFromMatrixPosition(m.matrixWorld),Pg.setFromMatrixPosition(y.matrixWorld),Rg.distanceToSquared(Pg)}function u(m){let y=[];return m.traverseVisible(function(p){p.isCSS2DObject&&y.push(p)}),y}function f(m){let y=u(m).sort(function(g,C){if(g.renderOrder!==C.renderOrder)return C.renderOrder-g.renderOrder;let I=o.objects.get(g).distanceToCameraSquared,v=o.objects.get(C).distanceToCameraSquared;return I-v}),p=y.length;for(let g=0,C=y.length;g<C;g++)y[g].element.style.zIndex=p-g}}};var Lg=new Jn,Wu=new Q,Na=class extends Zo{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Wt(e,3)),this.setAttribute("uv",new Wt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new Yi(t,6,1);return this.setAttribute("instanceStart",new En(i,3,0)),this.setAttribute("instanceEnd",new En(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new Yi(t,6,1);return this.setAttribute("instanceColorStart",new En(i,3,0)),this.setAttribute("instanceColorEnd",new En(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new jo(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Lg.setFromBufferAttribute(t),this.boundingBox.union(Lg))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ci),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Wu.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Wu)),Wu.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Wu));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};We.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new nt},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Dn.line={uniforms:cl.merge([We.common,We.fog,We.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Da=class extends kt{constructor(e){super({type:"LineMaterial",uniforms:cl.clone(Dn.line.uniforms),vertexShader:Dn.line.vertexShader,fragmentShader:Dn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var of=new mt,Ig=new Q,Ng=new Q,gn=new mt,_n=new mt,Qi=new mt,lf=new Q,cf=new vt,xn=new Qo,Dg=new Q,ju=new Jn,Xu=new Ci,es=new mt,ts,Er;function Ug(n,e,t){return es.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),es.multiplyScalar(1/es.w),es.x=Er/t.width,es.y=Er/t.height,es.applyMatrix4(n.projectionMatrixInverse),es.multiplyScalar(1/es.w),Math.abs(Math.max(es.x,es.y))}function cM(n,e){let t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,s.count);for(let o=0,l=a;o<l;o++){xn.start.fromBufferAttribute(s,o),xn.end.fromBufferAttribute(r,o),xn.applyMatrix4(t);let c=new Q,d=new Q;ts.distanceSqToSegment(xn.start,xn.end,d,c),d.distanceTo(c)<Er*.5&&e.push({point:d,pointOnLine:c,distance:ts.origin.distanceTo(d),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function uM(n,e,t){let i=e.projectionMatrix,r=n.material.resolution,a=n.matrixWorld,o=n.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,d=Math.min(o.instanceCount,l.count),h=-e.near;ts.at(1,Qi),Qi.w=1,Qi.applyMatrix4(e.matrixWorldInverse),Qi.applyMatrix4(i),Qi.multiplyScalar(1/Qi.w),Qi.x*=r.x/2,Qi.y*=r.y/2,Qi.z=0,lf.copy(Qi),cf.multiplyMatrices(e.matrixWorldInverse,a);for(let u=0,f=d;u<f;u++){if(gn.fromBufferAttribute(l,u),_n.fromBufferAttribute(c,u),gn.w=1,_n.w=1,gn.applyMatrix4(cf),_n.applyMatrix4(cf),gn.z>h&&_n.z>h)continue;if(gn.z>h){let I=gn.z-_n.z,v=(gn.z-h)/I;gn.lerp(_n,v)}else if(_n.z>h){let I=_n.z-gn.z,v=(_n.z-h)/I;_n.lerp(gn,v)}gn.applyMatrix4(i),_n.applyMatrix4(i),gn.multiplyScalar(1/gn.w),_n.multiplyScalar(1/_n.w),gn.x*=r.x/2,gn.y*=r.y/2,_n.x*=r.x/2,_n.y*=r.y/2,xn.start.copy(gn),xn.start.z=0,xn.end.copy(_n),xn.end.z=0;let y=xn.closestPointToPointParameter(lf,!0);xn.at(y,Dg);let p=zh.lerp(gn.z,_n.z,y),g=p>=-1&&p<=1,C=lf.distanceTo(Dg)<Er*.5;if(g&&C){xn.start.fromBufferAttribute(l,u),xn.end.fromBufferAttribute(c,u),xn.start.applyMatrix4(a),xn.end.applyMatrix4(a);let I=new Q,v=new Q;ts.distanceSqToSegment(xn.start,xn.end,v,I),t.push({point:v,pointOnLine:I,distance:ts.origin.distanceTo(v),object:n,face:null,faceIndex:u,uv:null,uv1:null})}}}var qu=class extends jt{constructor(e=new Na,t=new Da({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)Ig.fromBufferAttribute(t,a),Ng.fromBufferAttribute(i,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+Ig.distanceTo(Ng);let r=new Yi(s,2,1);return e.setAttribute("instanceDistanceStart",new En(r,1,0)),e.setAttribute("instanceDistanceEnd",new En(r,1,1)),this}raycast(e,t){let i=this.material.worldUnits,s=e.camera;if(s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;ts=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;Er=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Xu.copy(o.boundingSphere).applyMatrix4(a);let c;if(i)c=Er*.5;else{let h=Math.max(s.near,Xu.distanceToPoint(ts.origin));c=Ug(s,h,l.resolution)}if(Xu.radius+=c,ts.intersectsSphere(Xu)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),ju.copy(o.boundingBox).applyMatrix4(a);let d;if(i)d=Er*.5;else{let h=Math.max(s.near,ju.distanceToPoint(ts.origin));d=Ug(s,h,l.resolution)}ju.expandByScalar(d),ts.intersectsBox(ju)!==!1&&(i?cM(this,t):uM(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(of),this.material.uniforms.resolution.value.set(of.z,of.w))}};var Tr=n=>typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:120}):setTimeout(()=>n({timeRemaining:()=>8,didTimeout:!0}),16),kg=n=>typeof cancelIdleCallback=="function"?cancelIdleCallback(n):clearTimeout(n);function uf(n){return n.repeat.set(1,-1),n.offset.set(0,1),n.userData.topDown=!0,n}function Og(n,e,t={}){let i=e.width,s=e.height,r=t.mipmaps!==!1,a=t.rows||256,o=r?Math.floor(Math.log2(Math.max(i,s)))+1:1,l=R=>[Math.max(1,i>>R),Math.max(1,s>>R)],c=new vs(null,i,s,hn,sn);c.colorSpace=t.colorSpace??zt,c.flipY=!1,c.premultiplyAlpha=!1,c.unpackAlignment=4,c.generateMipmaps=!1,c.magFilter=Nt,c.minFilter=r?Zn:Nt,r&&(c.mipmaps=Array.from({length:o},(R,B)=>({data:null,width:l(B)[0],height:l(B)[1]}))),c.anisotropy=t.anisotropy??1,t.wrapS&&(c.wrapS=t.wrapS),uf(c),c.source.dataReady=!1,c.needsUpdate=!0;let d={w:i,h:s,levels:o,chunks:[],blits:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null,alloc_ms:null},h=n.getContext(),u=null,f=null,m=!1,y=null,p=null,g=new qt,C=[];for(let R=0;R<s;R+=a)C.push({kind:"upload",level:0,y0:R,y1:Math.min(s,R+a)});for(let R=1;R<o;R++){let[B,$]=l(R),D=Math.max(1,Math.floor(a*i/B/2));for(let O=0;O<$;O+=D)C.push({kind:"blit",level:R,y0:O,y1:Math.min($,O+D)})}let I=new Sa(new nt,new nt),v=new nt;function M(R){let B=n.properties.get(c).__webglTexture,[$,D]=l(R.level-1),[O,U]=l(R.level),W=Math.round(R.y0*D/U),K=Math.round(R.y1*D/U);y=y||h.createFramebuffer(),p=p||h.createFramebuffer();let H=n.state;H.bindFramebuffer(h.READ_FRAMEBUFFER,y),h.framebufferTexture2D(h.READ_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,B,R.level-1),H.bindFramebuffer(h.DRAW_FRAMEBUFFER,p),h.framebufferTexture2D(h.DRAW_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,B,R.level),h.blitFramebuffer(0,W,$,K,0,R.y0,O,R.y1,h.COLOR_BUFFER_BIT,h.LINEAR),h.framebufferTexture2D(h.READ_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,null,0),h.framebufferTexture2D(h.DRAW_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,null,0),H.bindFramebuffer(h.READ_FRAMEBUFFER,null),H.bindFramebuffer(h.DRAW_FRAMEBUFFER,null)}function w(){u&&(h.deleteSync(u),u=null),y&&(h.deleteFramebuffer(y),y=null),p&&(h.deleteFramebuffer(p),p=null)}let N=new Promise((R,B)=>{let $=async()=>{if(f=null,!m)try{if(d.alloc_ms===null){let U=performance.now();n.initTexture(c),d.alloc_ms=performance.now()-U,f=Tr($);return}if(u){if(h.getSyncParameter(u,h.SYNC_STATUS)!==h.SIGNALED){d.fence_waits++,f=Tr($);return}h.deleteSync(u),u=null}if(!C.length){w(),d.done=!0,d.t_done=performance.now(),R(c);return}let D=C.shift(),O=performance.now();if(D.kind==="upload"){let U=await createImageBitmap(e,0,D.y0,i,D.y1-D.y0);if(m){U.close&&U.close();return}let W=performance.now();g.image=U,v.set(0,D.y0),n.copyTextureToTexture(g,c,null,v,0,0),U.close&&U.close(),d.chunks.push({level:0,rows:D.y1-D.y0,at:O,crop_ms:W-O,ms:performance.now()-W})}else M(D),d.blits.push({level:D.level,rows:D.y1-D.y0,at:O,ms:performance.now()-O});u=h.fenceSync(h.SYNC_GPU_COMMANDS_COMPLETE,0),h.flush(),f=Tr($)}catch(D){w(),B(D)}};f=Tr($)});function b(){d.done||m||(m=!0,d.cancelled=!0,f!==null&&kg(f),w(),c.dispose())}return{texture:c,promise:N,cancel:b,state:d}}function Fg(n,e,t={}){let i=e.width,s=e.height,r=t.nx||4,a=t.ny||2,o=t.border??8,l=i/r,c=s/a,d=l+2*o,h=c+2*o,u=t.mipmaps!==!1,f=t.rows||256,m=u?Math.floor(Math.log2(Math.max(d,h)))+1:1,y=q=>[Math.max(1,d>>q),Math.max(1,h>>q)],p=n.getContext(),g=[],C={isTiled:!0,tiles:g,nx:r,ny:a,cw:l,ch:c,border:o,size:[d,h],image:{width:i,height:s},levels:m,bytes:r*a*d*h*(t.format===Sr?1:4)*(u?4/3:1),dispose(){for(let q of g)q.dispose()}},I={w:i,h:s,nx:r,ny:a,levels:m,chunks:[],blits:[],allocs:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null},v=null,M=null,w=!1,N=null,b=null,R=new qt,B=new Sa(new nt,new nt),$=new nt,D=[],O=(q,ie)=>{let te=[],se=0,he=(q%i+i)%i,Ne=ie;for(;Ne>0;){let Ee=Math.min(Ne,i-he);te.push([he,Ee,se]),se+=Ee,Ne-=Ee,he=0}return te};for(let q=0;q<a;q++)for(let ie=0;ie<r;ie++){let te=q*r+ie;D.push({kind:"alloc",ti:te});let se=O(ie*l-o,d);for(let he=0;he<h;){let Ne=q*c-o+he;if(Ne<0||Ne>=s){D.push({kind:"upload",ti:te,sy:Ne<0?0:s-1,h:1,dy:he,sx:se}),he++;continue}let Ee=Math.min(f,h-he,s-Ne);D.push({kind:"upload",ti:te,sy:Ne,h:Ee,dy:he,sx:se}),he+=Ee}for(let he=1;he<m;he++){let[Ne,Ee]=y(he),Ue=Math.max(1,Math.floor(f*d/Ne/2));for(let X=0;X<Ee;X+=Ue)D.push({kind:"blit",ti:te,level:he,y0:X,y1:Math.min(Ee,X+Ue)})}}function U(){let q=new vs(null,d,h,t.format??hn,sn);return q.colorSpace=t.colorSpace??zt,q.flipY=!1,q.premultiplyAlpha=!1,q.unpackAlignment=4,q.generateMipmaps=!1,q.magFilter=Nt,q.minFilter=u?Zn:Nt,q.wrapS=q.wrapT=Gn,u&&(q.mipmaps=Array.from({length:m},(ie,te)=>({data:null,width:y(te)[0],height:y(te)[1]}))),q.anisotropy=t.anisotropy??1,q.source.dataReady=!1,q.needsUpdate=!0,q}function W(q){let ie=n.properties.get(g[q.ti]).__webglTexture,[te,se]=y(q.level-1),[he,Ne]=y(q.level),Ee=Math.round(q.y0*se/Ne),Ue=Math.round(q.y1*se/Ne);N=N||p.createFramebuffer(),b=b||p.createFramebuffer();let X=n.state;X.bindFramebuffer(p.READ_FRAMEBUFFER,N),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,ie,q.level-1),X.bindFramebuffer(p.DRAW_FRAMEBUFFER,b),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,ie,q.level),p.blitFramebuffer(0,Ee,te,Ue,0,q.y0,he,q.y1,p.COLOR_BUFFER_BIT,p.LINEAR),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),X.bindFramebuffer(p.READ_FRAMEBUFFER,null),X.bindFramebuffer(p.DRAW_FRAMEBUFFER,null)}function K(){v&&(p.deleteSync(v),v=null),N&&(p.deleteFramebuffer(N),N=null),b&&(p.deleteFramebuffer(b),b=null)}let H=new Promise((q,ie)=>{let te=()=>{if(M=null,!w)try{if(v){if(p.getSyncParameter(v,p.SYNC_STATUS)!==p.SIGNALED){I.fence_waits++,M=Tr(te);return}p.deleteSync(v),v=null}if(!D.length){K(),I.done=!0,I.t_done=performance.now(),q(C);return}let se=D.shift(),he=performance.now();if(se.kind==="alloc"){let Ne=U();g[se.ti]=Ne,n.initTexture(Ne),I.allocs.push({ti:se.ti,at:he,ms:performance.now()-he})}else if(se.kind==="upload"){R.image=e;for(let[Ne,Ee,Ue]of se.sx)B.min.set(Ne,se.sy),B.max.set(Ne+Ee,se.sy+se.h),$.set(Ue,se.dy),n.copyTextureToTexture(R,g[se.ti],B,$,0,0);I.chunks.push({ti:se.ti,rows:se.h,at:he,ms:performance.now()-he})}else W(se),I.blits.push({ti:se.ti,level:se.level,at:he,ms:performance.now()-he});v=p.fenceSync(p.SYNC_GPU_COMMANDS_COMPLETE,0),p.flush(),M=Tr(te)}catch(se){K(),ie(se)}};M=Tr(te)});function ee(){I.done||w||(w=!0,I.cancelled=!0,M!==null&&kg(M),K(),C.dispose())}return{texture:C,promise:H,cancel:ee,state:I}}function Qn(n,e=!1,t=8){let i=r=>e?`textureLod(${r}, q, 0.0)`:`textureGrad(${r}, q, gx, gy)`;if(t===1)return[`uniform sampler2D ${n}T0; uniform float ${n}Tiled; uniform vec4 ${n}Geo;`,`vec4 ${n}_sampleG(vec2 uv, vec2 gx, vec2 gy) { vec2 q = uv; return ${i(n+"T0")}; }`,`vec4 ${n}_sample(vec2 uv) { return ${n}_sampleG(uv, dFdx(uv), dFdy(uv)); }`].join(`
`);let s=[0,1,2,3,4,5,6,7].map(r=>`${r?"else ":""}if (i == ${r}) c = ${i(n+"T"+r)};`).join(" ");return[...[0,1,2,3,4,5,6,7].map(r=>`uniform sampler2D ${n}T${r};`),`uniform float ${n}Tiled; uniform vec4 ${n}Geo;`,`vec4 ${n}_pick(int i, vec2 q, vec2 gx, vec2 gy) { vec4 c = vec4(0.0); ${s} return c; }`,`vec4 ${n}_sampleG(vec2 uv, vec2 gx, vec2 gy) {`,`  if (${n}Tiled < 0.5) { vec2 q = uv; return ${i(n+"T0")}; }`,`  vec2 n = ${n}Geo.xy; float C = ${n}Geo.z, B = ${n}Geo.w, s = C / (C + 2.0 * B);`,"  vec2 g = uv * n; vec2 ip = floor(g); vec2 f = g - ip;","  ip.x = mod(ip.x, n.x); if (ip.y > n.y - 1.0) { ip.y = n.y - 1.0; f.y = 1.0; } if (ip.y < 0.0) { ip.y = 0.0; f.y = 0.0; }","  vec2 q = (B + f * C) / (C + 2.0 * B);",`  return ${n}_pick(int(ip.y * n.x + ip.x), q, gx * n * s, gy * n * s);`,"}",`vec4 ${n}_sample(vec2 uv) { return ${n}_sampleG(uv, dFdx(uv), dFdy(uv)); }`].join(`
`)}function ei(n,e=8){let t={[n+"Tiled"]:{value:0},[n+"Geo"]:{value:new mt(4,2,2048,8)}};for(let i=0;i<e;i++)t[n+"T"+i]={value:null};return t}function $s(n,e,t){if(t&&t.isTiled){for(let i=0;i<8;i++)n[e+"T"+i]&&(n[e+"T"+i].value=t.tiles[i]||null);n[e+"Tiled"].value=1,n[e+"Geo"].value.set(t.nx,t.ny,t.cw,t.border)}else{n[e+"T0"].value=t;for(let i=1;i<8;i++)n[e+"T"+i]&&(n[e+"T"+i].value=null);n[e+"Tiled"].value=0}}var $u={cloudHeightKm:8,cloudShadow:.55,cloudNightAlpha:.45,glint:.75,glintPower:140,glintColor:[1,.96,.88]},Bg="float cloud_alpha(float r) { return clamp((r - 0.08) / 0.82, 0.0, 1.0); }",dM=`
precision highp sampler2DArray;
uniform sampler2DArray pDay; uniform sampler2DArray pNight; uniform sampler2D pTable;
uniform vec4 pInfo; uniform vec4 pRowOff; uniform vec4 pGridX; uniform vec4 pGridY; uniform float pAniso; uniform float pReady;
float pageLod(vec2 gx, vec2 gy) {
  vec2 dx = gx * pInfo.xy, dy = gy * pInfo.xy;
  float a = dot(dx, dx), b = dot(dy, dy);
  float mj = sqrt(max(a, b)), mn = sqrt(min(a, b));
  return log2(max(max(mj / pAniso, mn), 1e-6));
}
bool pageFetch(sampler2DArray arr, int ch, vec2 uv, vec2 gx, vec2 gy, float lod, int pMin, out vec4 color) {
  int p0 = int(clamp(floor(lod), float(pMin), 3.0));
  for (int q = p0; q <= 3; q++) {
    float s = float(1 << q), w = pInfo.x / s, h = pInfo.y / s;
    vec2 g = vec2(uv.x * w, uv.y * h) / pInfo.z;
    vec2 cell = floor(g);
    int cx = int(clamp(cell.x, 0.0, pGridX[q] - 1.0)), cy = int(clamp(cell.y, 0.0, pGridY[q] - 1.0));
    float v = texelFetch(pTable, ivec2(cx, int(pRowOff[q]) + cy), 0)[ch] * 255.0;
    if (v < 0.5) continue;
    vec2 f = g - vec2(float(cx), float(cy));
    float S = pInfo.z + 2.0 * pInfo.w;
    vec2 k = vec2(w, h) / S;
    color = textureGrad(arr, vec3((pInfo.w + f * pInfo.z) / S, floor(v + 0.5) - 1.0), gx * k, gy * k);
    return true;
  }
  return false;
}`;function zg(n,e={}){let t=$u;return new kt({uniforms:{...ei("map",1),...ei("night",1),...ei("land",1),...ei("cloud"),mapOn:{value:0},nightMapOn:{value:0},landOn:{value:0},base:{value:new rt(n)},oblate:{value:1},sunDir:{value:new Q(1,0,0)},sun:{value:e.sun??1.3},ambient:{value:e.ambient??.004},night:{value:e.night??1},nightOn:{value:1},cloudOn:{value:0},cloudShadow:{value:t.cloudShadow},cloudH:{value:t.cloudHeightKm/6371},glint:{value:t.glint},glintPower:{value:t.glintPower},glintColor:{value:new Q(...t.glintColor)},pDay:{value:null},pNight:{value:null},pTable:{value:null},pInfo:{value:new mt(43200,21600,496,8)},pRowOff:{value:new mt},pGridX:{value:new mt(1,1,1,1)},pGridY:{value:new mt(1,1,1,1)},pAniso:{value:8},pReady:{value:0}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec2 vUv; varying vec3 vNW; varying vec3 vView; varying vec3 vNorth;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * normal); vNorth = normalize(mat3(modelMatrix) * vec3(0.0, 1.0, 0.0));","  vec4 wp = modelMatrix * vec4(position, 1.0); vView = cameraPosition - wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",Qn("map",!1,1),Qn("night",!1,1),Qn("land",!1,1),Qn("cloud"),dM,Bg,"uniform float mapOn; uniform float nightMapOn; uniform float landOn; uniform vec3 base; uniform float oblate; uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float night; uniform float nightOn;","uniform float cloudOn; uniform float cloudShadow; uniform float cloudH; uniform float glint; uniform float glintPower; uniform vec3 glintColor;","varying vec2 vUv; varying vec3 vNW; varying vec3 vView; varying vec3 vNorth;","void main() {","#include <logdepthbuf_fragment>","  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);","  vec2 gx = dFdx(uv), gy = dFdy(uv);","  float lod = pageLod(gx, gy);","  float g = smoothstep(3.9, 4.4, lod);","  vec3 N = normalize(vNW);","  float ndl = dot(N, sunDir);","  vec3 day = base; float landF = 1.0; vec3 nl = vec3(0.0); float nightWeight = (night > 0.0 && nightMapOn > 0.5 && nightOn > 0.5) ? 1.0 - smoothstep(-0.1, 0.1, ndl) : 0.0;","  bool dayTile = false, nightTile = false; vec4 dp, np;","  if (pReady > 0.5) {","    if (ndl > -0.05 || nightWeight <= 0.0) dayTile = pageFetch(pDay, 0, uv, gx, gy, lod, 0, dp);","    if (nightWeight > 0.0) nightTile = pageFetch(pNight, 1, uv, gx, gy, lod, 1, np);","  }","  if (dayTile && g <= 0.0) { day = dp.rgb; landF = landOn > 0.5 ? dp.a : 1.0; }","  else {","    if (mapOn > 0.5) day = map_sampleG(uv, gx, gy).rgb;","    if (landOn > 0.5) landF = land_sampleG(uv, gx, gy).r;","    if (dayTile) { day = mix(dp.rgb, day, g); landF = mix(dp.a, landF, g); }","  }","  if (nightWeight > 0.0) {","    if (nightTile && g <= 0.0) nl = np.rgb;","    else { nl = night_sampleG(uv, gx, gy).rgb; if (nightTile) nl = mix(np.rgb, nl, g); }","  }","  float cAlpha = 0.0, cShade = 0.0;","  if (cloudOn > 0.5) {","    vec3 east = cross(vNorth, N); float cl = max(length(east), 1e-3); east /= cl; vec3 north = cross(N, east);","    cAlpha = cloud_alpha(cloud_sampleG(uv, gx, gy).r);","    if (ndl > 0.0) {","      vec2 sh = (vec2(dot(sunDir, east) / (2.0 * PI * cl), -dot(sunDir, north) / PI)) * cloudH / max(ndl, 0.15);","      cShade = cloud_alpha(cloud_sampleG(uv + sh, gx, gy).r);","    }","  }","  vec3 c = day * (max(ndl, 0.0) * sun * (1.0 - cloudShadow * cShade) + ambient);","  if (nightWeight > 0.0) {","    float lum = dot(nl, vec3(0.2126, 0.7152, 0.0722));","    c += nl * (0.12 + 0.88 * smoothstep(0.05, 0.30, lum)) * night * nightWeight;","  }","  vec3 V = normalize(vView); vec3 H = normalize(sunDir + V);","  float spec = pow(max(dot(N, H), 0.0), glintPower) * smoothstep(0.0, 0.1, ndl);","  c += glintColor * glint * spec * (1.0 - landF) * (1.0 - cAlpha);","  gl_FragColor = vec4(c, 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}function Vg(n={}){let e=$u;return new kt({uniforms:{...ei("cloud"),sunDir:{value:new Q(1,0,0)},sun:{value:n.sun??1.3},ambient:{value:n.ambient??.004},nightA:{value:e.cloudNightAlpha}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec2 vUv; varying vec3 vNW;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",Qn("cloud"),Bg,"uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float nightA; varying vec2 vUv; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  float a = cloud_alpha(cloud_sample(vec2(vUv.x, 1.0 - vUv.y)).r);","  float ndl = dot(normalize(vNW), sunDir);","  float lit = max(ndl, 0.0) * sun + ambient;","  gl_FragColor = vec4(vec3(lit), a * mix(nightA, 1.0, smoothstep(-0.1, 0.1, ndl)));","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`),transparent:!0,depthWrite:!1})}var Ua=[{pr:2,family:!0,glow:!0,hiTex:!0},{pr:1.5,family:!0,glow:!0,hiTex:!0},{pr:1,family:!0,glow:!0,hiTex:!1},{pr:1,family:!1,glow:!1,hiTex:!1}],hM=50,fM=150,pM=120;function mM(){let n=document.createElement("canvas");n.width=n.height=64;let e=n.getContext("2d");e.fillStyle="#fff",e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();let t=new ya(n);return t.colorSpace=zt,t}function gM(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(255,255,255,0.55)"),t.addColorStop(.45,"rgba(255,255,255,0.12)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);let i=new ya(n);return i.colorSpace=zt,i}var _M=2e5;function df(){try{return window.matchMedia("(pointer: coarse)").matches&&!window.matchMedia("(pointer: fine)").matches||window.innerWidth<768}catch{return!1}}function Hg(n,e,t,i){let s=t.constants,r=s.length_unit_km,a=i.scene,o=a.colors,l=new Bu({canvas:n,antialias:!0,logarithmicDepthBuffer:!0}),d=df()?1.5:2,h={level:0,auto:!navigator.webdriver,log:[],deviceCap:d},u=()=>Math.min(window.devicePixelRatio||1,d,Ua[h.level].pr);l.setPixelRatio(u());let f=new Gu({element:e}),m=new ga,y=new ga;y.background=new rt(a.background),l.autoClear=!1;let p=new wn(45,1,1e-4,1e11);p.up.set(0,0,1),m.add(new Ko(16777215,.06));let g=new Jo(16777215,2.2);m.add(g,g.target);let C=mM(),I=gM(),v={t:t.tStart,s:0,sTarget:0,precision:"relative",paused:!1,cam:{target:"L2",dist:32e5,az:-1.2,el:.9},fly:null},M=[],w={},N={bary:[0,0,0]},b={},R=null,B=[],$={nightlights:!0,sunglow:!0},D=!1,O=[];function U(A,F,_,E,L={}){let P={name:A,layer:F,obj:_,src:E,kind:L.kind||"line",poly:!!L.poly,label:L.label||null,labelAt:L.labelAt,priority:L.priority||0,pick:L.pick||null,radius:L.radius,minPx:L.minPx,glow:L.glow};return P.work=new Float64Array(E.length),(P.kind==="sky"?y:m).add(_),P.label&&(P.labelObj=new Hu(P.label),P.labelObj.center.set(-.08,.5),m.add(P.labelObj),P.label.style.display="none",e.appendChild(P.label)),M.push(P),P}function W(A,F,_,E=1,L=null){let P=new Na;P.setPositions(new Float32Array(A*6)),L&&P.setColors(L);let V=new Da({color:L?16777215:F,vertexColors:!!L,linewidth:_,transparent:E<1,opacity:E,depthWrite:E>=1});B.push(V);let oe=new qu(P,V);return oe.frustumCulled=!1,oe}function K(A,F,_){let E=new $t;return E.setAttribute("position",new tn(new Float32Array(A*3),3)),new Bs(E,new yr({color:F,size:_,sizeAttenuation:!1,map:C,alphaTest:.5,transparent:!0}))}let H=A=>{let F=new Float64Array(A.length);for(let _=0;_<A.length;_++)F[_]=A[_]*r;return F};function ee(A,F,_,E,L,P={}){let V=P.hidden?0:P.size||a.points.lpt,oe=U(A,F,K(1,E,V),H(_),{kind:"point",label:L,priority:P.priority,pick:P.pick||A});if(P.hidden?(oe.obj.material.opacity=0,oe.obj.material.alphaTest=0):oe.baseSize=V,P.glowPx){let pe=new Bs(new $t,new yr({color:E,size:P.glowPx,sizeAttenuation:!1,map:I,transparent:!0,blending:Ki,depthWrite:!1,opacity:.85}));pe.geometry.setAttribute("position",new tn(new Float32Array(3),3)),U(A+"_glow",F,pe,oe.src,{kind:"point"}).baseSize=P.glowPx}return w[A]=oe,N[A]=oe.src,oe}function q(A,F){let _=F.length/3-1,E=new Float32Array(2*_),L=0;for(let oe=0;oe<_;oe++){let pe=3*oe;E[2*oe]=L,L+=Math.hypot(F[pe+3]-F[pe],F[pe+4]-F[pe+1],F[pe+5]-F[pe+2]),E[2*oe+1]=L}let P=new Yi(E,2,1);A.geometry.setAttribute("instanceDistanceStart",new En(P,1,0)),A.geometry.setAttribute("instanceDistanceEnd",new En(P,1,1));let V=A.material;V.dashed=!0,V.dashSize=a.lines.dashPx??7,V.gapSize=a.lines.gapPx??5,V.needsUpdate=!0,V.userData.dashMaxKm=L,O.push(V)}function ie(A,F,_,E,L=a.lines.traj,P=1,V={}){let oe=_.length/3-1,pe=null;if(V.fade){let Me=new rt(E),Ce=new rt(0),Ye=new rt;pe=new Float32Array(oe*6);for(let ze=0;ze<oe;ze++)for(let[He,lt]of[[0,ze/oe],[3,(ze+1)/oe]])Ye.copy(Ce).lerp(Me,lt**1.6),pe[ze*6+He]=Ye.r,pe[ze*6+He+1]=Ye.g,pe[ze*6+He+2]=Ye.b}let ge=U(A,F,W(oe,E,L,P,pe),H(_),{poly:!0});if(V.fade){let Me=ge.obj.material;Me.blending=Ki,Me.transparent=!0,Me.depthWrite=!1,Me.needsUpdate=!0}return V.dashed&&q(ge.obj,ge.src),ge}function te(A,F,_,E,L=a.lines.traj,P=1){return U(A,F,W(_.length/6,E,L,P),H(_))}function se(A,F,_,E,L=a.points.burn){return U(A,F,K(_.length/3,E,L),H(_),{kind:"point"})}function he(A,F,_,E,L={}){let P=U(A,F,K(1,16777215,0),H(_),{kind:"label",label:E,priority:L.priority,pick:L.pick});return P.obj.material.opacity=0,P.obj.material.alphaTest=0,L.pick&&(N[L.pick]=N[L.pick]||P.src),P}let Ne=new Ri(1,20,14),Ee=[12,40],Ue=1e8,X=null,Z=0;function xe(A,F,_,E,L,P={}){let V=P.surface?ye(L,P.surface):P.limb?je(L):P.emissive?new Fs({color:L}):new Xo({color:L}),oe=P.segments??[64,40],pe=new jt(new Ri(1,oe[0],oe[1]),V),ge=null;P.glow&&(ge=new Bo(new _a({map:I,color:L,blending:Ki,depthWrite:!1,transparent:!0,opacity:a.glow.strength})),ge.scale.setScalar(2*P.glow),pe.add(ge));let Me=null;P.atmosphere&&(Me=new jt(new Ri(P.atmoSize??1.06,oe[0],oe[1]),ve(P.atmosphere)),pe.add(Me));let Ce=U(A,F,pe,_.src,{kind:"sphere",radius:E,minPx:P.minPx||5,glow:P.glow,pick:P.pick||A});if(Ce.glowObj=ge,Ce.atmoObj=Me,P.segments&&(Ce.segGeo={hi:[pe.geometry,Me&&Me.geometry],lo:[new Ri(1,64,40),Me&&new Ri(P.atmoSize??1.06,64,40)]},Ce.segHi=!0),Ce.surface=P.surface||null,Ce.exaggeration=1,Ce.capFrac=P.capFrac||0,Ce.capFloorDev=P.capFloorDev||0,P.dot){let Ye=new jt(Ne,new Fs({color:new rt(L).lerp(new rt(16777215),.2),depthTest:!1,depthWrite:!1,transparent:!0}));Ye.renderOrder=20+P.dot,Ye.scale.setScalar(1.03),Ye.visible=!1,pe.add(Ye),Ce.dotObj=Ye}return A==="Sun_sphere"&&(X=Ce),Ce}function Se(A,F,_){return new kt({uniforms:{...ei("map"),inner:{value:A},outer:{value:F},oblate:{value:_},sunLocal:{value:new Q(1,0,0)},light:{value:(a.surface||{}).ringLight??1}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vP;","void main() { vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",Qn("map"),"uniform float inner; uniform float outer; uniform float oblate; uniform vec3 sunLocal; uniform float light; varying vec3 vP;","void main() {","#include <logdepthbuf_fragment>","  float r = length(vP.xz); float u = (r - inner) / (outer - inner);","  if (u < 0.0 || u > 1.0) discard;","  vec4 c = map_sample(vec2(u, 0.5));","  vec3 o = vec3(vP.x, 0.0, vP.z); vec3 s = normalize(vec3(sunLocal.x, sunLocal.y / oblate, sunLocal.z));","  float b = dot(o, s); float disc = b * b - (dot(o, o) - 1.0);","  float lit = (b < 0.0) ? smoothstep(-0.02, 0.02, -disc) : 1.0;","  gl_FragColor = vec4(c.rgb * light * mix(0.05, 1.0, lit), c.a);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`),transparent:!0,depthWrite:!1,side:di})}function ve(A){return new kt({uniforms:{color:{value:new rt(A)},strength:{value:a.glow.atmosphere??.9},sunDir:{value:new Q(1,0,0)},sunOn:{value:0}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","  vec4 mv = modelViewMatrix * vec4(position, 1.0);","  vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vNW = normalize(mat3(modelMatrix) * normal);","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>","uniform vec3 color; uniform float strength; uniform vec3 sunDir; uniform float sunOn; varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 2.6) * strength;","  f *= mix(1.0, 0.18 + 0.82 * smoothstep(-0.35, 0.25, dot(normalize(vNW), sunDir)), sunOn);","  gl_FragColor = vec4(color * f, f);","}"].join(`
`),blending:Ki,transparent:!0,depthWrite:!1})}function je(A){let F=a.sunLimb||{};return new kt({uniforms:{base:{value:new rt(A)},u:{value:new Q(...F.u??[.5,.6,.72])},...ei("map"),mapOn:{value:0},meanLum:{value:1},mapFade:{value:0}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV; varying vec2 vUv;","void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vUv = uv;","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",Qn("map"),"uniform vec3 base; uniform vec3 u; uniform float mapOn; uniform float meanLum; uniform float mapFade; varying vec3 vN; varying vec3 vV; varying vec2 vUv;","void main() {","#include <logdepthbuf_fragment>","  float mu = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);","  vec4 m = map_sample(vec2(vUv.x, 1.0 - vUv.y));","  float g = mapOn > 0.5 ? mix(1.0, dot(m.rgb, vec3(0.2126, 0.7152, 0.0722)) / meanLum, mapFade) : 1.0;","  gl_FragColor = vec4(base * g * (vec3(1.0) - u * (1.0 - mu)), 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}function ye(A,F){let _=a.surface||{};return F==="earth"?zg(A,_):new kt({uniforms:{...ei("map"),...ei("night"),mapOn:{value:0},nightMapOn:{value:0},base:{value:new rt(A)},oblate:{value:1},sunDir:{value:new Q(1,0,0)},sun:{value:F==="planet"?_.planetSun??1.25:_.sun??(F==="earth"?1.3:1.6)},ambient:{value:_.ambient??.004},night:{value:F==="earth"?_.night??1:0},nightOn:{value:1}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","uniform float oblate; varying vec2 vUv; varying vec3 vNW;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * (normal * vec3(1.0, 1.0 / (oblate * oblate), 1.0)));","  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",Qn("map"),Qn("night"),"uniform float mapOn; uniform float nightMapOn; uniform vec3 base;","uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float night; uniform float nightOn; varying vec2 vUv; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);","  vec4 dayS = map_sample(uv); vec4 nightS = night_sample(uv);","  vec3 day = mapOn > 0.5 ? dayS.rgb : base;","  float ndl = dot(normalize(vNW), sunDir);","  vec3 c = day * (max(ndl, 0.0) * sun + ambient);","  if (night > 0.0 && nightMapOn > 0.5 && nightOn > 0.5) {","    vec3 n = nightS.rgb; float lum = dot(n, vec3(0.2126, 0.7152, 0.0722));","    c += n * (0.12 + 0.88 * smoothstep(0.05, 0.30, lum)) * night * (1.0 - smoothstep(-0.1, 0.1, ndl));","  }","  gl_FragColor = vec4(c, 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}let Ie=6,Te={grid:null,axes:[],key:"",gridStep:0};function Ke(){let A=(2*Ie+1)*2;Te.grid=U("grid","aux",W(A,a.colors.grid??2766160,a.lines.grid??1,a.lines.gridOpacity??.5),new Float64Array(A*6),{});let F=a.colors.axes??[12611696,7385200,7377104];Te.axes=["x","y","z"].map((_,E)=>U("axes_"+_,"aux",W(1,F[E],a.lines.axes??1.6),new Float64Array(6),{}));for(let _ of[Te.grid,...Te.axes])_.on=!1,_.obj.visible=!1}function Be(){if(!Te.grid)return;let A=G(),F=v.cam.dist;if(Te.grid.obj.visible){let _=10**Math.floor(Math.log10(F/3)),E=Math.round(A[0]/_)*_,L=Math.round(A[1]/_)*_,P=A[2],V=`${_}|${E}|${L}|${P}`;if(V!==Te.key){Te.key=V;let oe=Te.grid.src,pe=Ie*_,ge=0;for(let Me=-Ie;Me<=Ie;Me++)oe.set([E+Me*_,L-pe,P,E+Me*_,L+pe,P],ge),ge+=6,oe.set([E-pe,L+Me*_,P,E+pe,L+Me*_,P],ge),ge+=6;Te.gridStep=_}}if(Te.axes[0].obj.visible){let _=F*.12;Te.axes.forEach((E,L)=>{E.src.set([A[0],A[1],A[2],A[0]+(L===0)*_,A[1]+(L===1)*_,A[2]+(L===2)*_])})}}function st(){let A=v.cam.dist;for(let F of M){if(!F.labelObj||!F.labelObj.visible)continue;let _=F.labelObj.position,E=v.precision==="relative"?Math.hypot(_.x,_.y,_.z):Math.hypot(_.x-re[0],_.y-re[1],_.z-re[2]),L=Math.log10(Math.max(E/A,.001)),P=Math.min(1.08,Math.max(.84,1-.16*L)),V=Math.min(1,Math.max(.62,1-.3*L)),oe=P.toFixed(2),pe=V.toFixed(2);F._lk!==oe&&(F.label.style.setProperty("--lbl-k",oe),F._lk=oe),F._lo!==pe&&(F.label.style.opacity=pe,F._lo=pe)}}let re=[0,0,0],Re=A=>t.thetaOffset+ir((A-t.thetaEpoch)/86400,$e());function $e(){return s.time_unit_days}let Xe=()=>v.s*Re(v.t);function G(){return v.fly?v.fly.pos:N[v.cam.target]||[0,0,0]}function ae(){let A=Xe(),F=as(G(),Re(v.t),v.s),{dist:_,az:E,el:L}=v.cam,P=[Math.cos(L)*Math.cos(E),Math.cos(L)*Math.sin(E),Math.sin(L)];return re[0]=F[0]+_*P[0],re[1]=F[1]+_*P[1],re[2]=F[2]+_*P[2],{a:A,tg:F}}let Le=0,S=()=>{let A=Math.tan(p.fov*Math.PI/360);return Math.min(A,A*(n.clientWidth/Math.max(n.clientHeight,1)))},x=A=>A*Le/S(),z=()=>Le?Math.max(2e9,x(1.5)):2e9,j=v;function ne(A,F,_,E){j.precision==="relative"?(_[E]=A[F]-re[0],_[E+1]=A[F+1]-re[1],_[E+2]=A[F+2]-re[2]):(_[E]=A[F],_[E+1]=A[F+1],_[E+2]=A[F+2])}let fe=1,be=1,le=new Float64Array(3),ce=new vt,Pe=new vt().makeRotationX(Math.PI/2),Oe=new Q,Ve=new ui;function Fe(A){let F=t.frameF,_=Math.cos(A),E=Math.sin(A);if(F){let oe=[F.x,F.y,F.z];return[[0,1,2].map(pe=>_*oe[0][pe]-E*oe[1][pe]),[0,1,2].map(pe=>E*oe[0][pe]+_*oe[1][pe]),[...oe[2]]]}let L=A-Re(v.t),P=Math.cos(L),V=Math.sin(L);return[[P,-V,0],[V,P,0],[0,0,1]]}function et(A,F){let _;try{_=A.orientFn(v.t)}catch{return}let E=Fe(F),L=ri(E,_);ce.set(L[0][0],L[0][1],L[0][2],0,L[1][0],L[1][1],L[1][2],0,L[2][0],L[2][1],L[2][2],0,0,0,0,1).multiply(Pe),A.obj.quaternion.setFromRotationMatrix(ce),A.orientNow=L}function tt(A,F){let _=nr(A.src,F,A.work);if(A.kind==="sphere"){let E=[0,0,0];ne(_,0,E,0),A.obj.position.set(E[0],E[1],E[2]);let L=Math.hypot(_[0]-re[0],_[1]-re[1],_[2]-re[2]),P=L/fe,V=A.minPx*P,oe=V;if(!D&&A.capFrac&&Z){let ge=A.capFrac*Z;oe>ge&&(oe=Math.min(V,Math.max(ge,A.capFloorDev/l.getPixelRatio()*P)))}let pe=D?A.radius:Math.max(A.radius,oe);if(A.exaggeration=pe/A.radius,A.camDist=L,A.segGeo){let ge=pe/P*l.getPixelRatio(),Me=A.segHi?ge>=pM:ge>fM;if(Me!==A.segHi){let Ce=Me?A.segGeo.hi:A.segGeo.lo;A.obj.geometry=Ce[0],A.atmoObj&&(A.atmoObj.geometry=Ce[1]),A.cloudObj&&(A.cloudObj.geometry=Ce[0]),A.segHi=Me}}if(A.shape?A.obj.scale.set(pe*A.shape[0],pe*A.shape[1],pe*A.shape[0]):A.obj.scale.setScalar(pe),A.orientFn)et(A,F);else if(A.faceTo&&w[A.faceTo]){let ge=nr(w[A.faceTo].src,F,new Float64Array(3));A.obj.rotation.set(Math.PI/2,0,Math.atan2(ge[1]-_[1],ge[0]-_[0]),"ZYX")}if(A.surface||A.atmoObj){let ge=w.Sun?nr(w.Sun.src,F,le):null;if(ge){let Me=ge[0]-_[0],Ce=ge[1]-_[1],Ye=ge[2]-_[2],ze=Math.hypot(Me,Ce,Ye)||1;A.surface&&A.obj.material.uniforms.sunDir.value.set(Me/ze,Ce/ze,Ye/ze),A.cloudObj&&A.cloudObj.material.uniforms.sunDir.value.set(Me/ze,Ce/ze,Ye/ze),A.ringObj&&(Oe.set(Me/ze,Ce/ze,Ye/ze).applyQuaternion(Ve.copy(A.obj.quaternion).invert()),A.ringObj.material.uniforms.sunLocal.value.copy(Oe)),A.atmoObj&&(A.atmoObj.material.uniforms.sunDir.value.set(Me/ze,Ce/ze,Ye/ze),A.atmoObj.material.uniforms.sunOn.value=A.surface?1:0)}}if(A.glowObj&&(A.glowObj.visible=Ua[h.level].glow&&!(A.name==="Sun_sphere"&&$.sunglow===!1)),A.atmoObj&&(A.atmoObj.visible=Ua[h.level].glow),A.name==="Sun_sphere"&&A.obj.material.uniforms&&A.obj.material.uniforms.mapFade){let ge=Math.min(1,Math.max(0,(pe/P-Ee[0])/(Ee[1]-Ee[0])));A.obj.material.uniforms.mapFade.value=ge*ge*(3-2*ge)}if(A.glowObj&&A.name==="Sun_sphere"){let ge=pe/Math.max(A.radius,V);A.glowObj.scale.setScalar(2*(1+(A.glow-1)*ge)),A.glowObj.material.opacity=a.glow.strength*(.4+.6*ge)}if(A.dotObj){let ge=!D&&A.exaggeration>1&&L>Ue&&(!X||X.exaggeration>1);A.dotObj.visible=ge,ge&&A.glowObj&&(A.glowObj.visible=!1),ge&&A.atmoObj&&(A.atmoObj.visible=!1),A.ringObj&&(A.ringObj.visible=!ge)}return}if(A.baseSize&&(A.obj.material.size=A.baseSize*be),A.obj.isLineSegments2){let E=A.obj.geometry.attributes.instanceStart.data,L=E.array;if(A.poly)for(let P=0,V=0;P+3<_.length;P+=3,V+=6)ne(_,P,L,V),ne(_,P+3,L,V+3);else for(let P=0;P<_.length;P+=3)ne(_,P,L,P);E.needsUpdate=!0}else{let E=A.obj.geometry.attributes.position;for(let L=0;L<_.length;L+=3)ne(_,L,E.array,L);E.needsUpdate=!0,A.obj.geometry.computeBoundingSphere()}if(A.labelObj){let E=A.labelAt===void 0?0:A.labelAt*3,L=[0,0,0];ne(_,E,L,0),A.labelObj.position.set(L[0],L[1],L[2])}}function it(){let A=b[v.fly?v.fly.to:v.cam.target]||null;if(A!==R){R=A;for(let F of M)F.zoom&&(F.obj.visible=Jt(F),F.labelObj&&(F.labelObj.visible=F.on!==!1&&F.zoom===R));for(let F of Y)F(R)}}let Y=[];function Ae(){it(),t.onTime&&t.onTime(v.t,yn);let{a:A,tg:F}=ae();fe=Math.max(n.clientHeight,1)/(2*Math.tan(p.fov*Math.PI/360)),be=Math.min(1,Math.max(.18,r*fe/v.cam.dist/120)),Be();for(let P of O){P.dashScale=fe/v.cam.dist;let V=P.dashScale*P.userData.dashMaxKm<=_M;P.dashed!==V&&(P.dashed=V,P.needsUpdate=!0)}for(let P of M)P.kind!=="sky"&&(P.obj.visible||P.labelObj)&&tt(P,A);st(),v.precision==="relative"?(p.position.set(0,0,0),p.lookAt(F[0]-re[0],F[1]-re[1],F[2]-re[2])):(p.position.set(re[0],re[1],re[2]),p.lookAt(F[0],F[1],F[2]));let E=w.Sun?as(w.Sun.src,Re(v.t),v.s):[0,0,0];g.position.set(E[0]-F[0],E[1]-F[1],E[2]-F[2]).normalize(),g.target.position.set(0,0,0);let L=Math.max(v.cam.dist*1e-4,.001);p.near!==L&&(p.near=L,p.updateProjectionMatrix());for(let P of M)P.kind==="sky"&&P.obj.visible&&(P.obj.position.copy(p.position),P.obj.rotation.set(0,0,A-Re(v.t)),P.frame&&P.frame(yn,A-Re(v.t)))}function de(A){if(!A||A.hidden)return null;let F=getComputedStyle(A);if(F.display==="none"||F.visibility==="hidden"||Number(F.opacity)<.05)return null;let _=A.getBoundingClientRect();return _.width>0&&_.height>0?_:null}let we=(A,F)=>A.left<F.right&&F.left<A.right&&A.top<F.bottom&&F.top<A.bottom;function De(){let A=[...document.querySelectorAll("[data-obstacle]")].map(de).filter(Boolean),F=M.filter(P=>P.label&&P.labelObj&&P.labelObj.visible&&P.label.style.display!=="none").sort((P,V)=>V.priority-P.priority),_=[],E=window.innerWidth,L=window.innerHeight;for(let P of F){P.label.style.visibility="";let V=P.label.getBoundingClientRect();V.left<0||V.top<0||V.right>E||V.bottom>L||A.some(pe=>we(V,pe))||_.some(pe=>we(V,pe))?P.label.style.visibility="hidden":_.push(V)}}function _e(){let A=u();l.getPixelRatio()!==A&&l.setPixelRatio(A);let F=n.clientWidth,_=n.clientHeight;(n.width!==Math.floor(F*A)||n.height!==Math.floor(_*A))&&(l.setSize(F,_,!1),f.setSize(F,_),p.aspect=F/Math.max(_,1),p.updateProjectionMatrix());for(let E of B)E.resolution.set(F,_)}function Ge(){_e(),Ae(),l.clear(),l.render(y,p),l.clearDepth(),l.render(m,p),f.render(m,p),De();for(let A of qe)A(yn)}let qe=[],pt=performance.now(),ut={speedDaysPerSec:0};function Vt(A){if(v.s!==v.sTarget){let F=A/1.5;v.s=v.sTarget>v.s?Math.min(v.sTarget,v.s+F):Math.max(v.sTarget,v.s-F)}if(ut.speedDaysPerSec){let F=v.t+ut.speedDaysPerSec*86400*A;v.t=Math.min(Math.max(F,t.tMin),t.tMax),(v.t===t.tMax||v.t===t.tMin)&&(ut.speedDaysPerSec=0),t.onTimeChange&&t.onTimeChange(v.t)}if(v.fly){let F=v.fly;F.k=Math.min(1,F.k+A/F.dur);let _=F.k<.5?4*F.k**3:1-(-2*F.k+2)**3/2,E=N[F.to]||[0,0,0];for(let L=0;L<3;L++)F.pos[L]=F.from[L]+(E[L]-F.from[L])*_;v.cam.dist=Math.exp(Math.log(F.d0)+(Math.log(F.d1)-Math.log(F.d0))*_),F.k>=1&&(v.cam.target=F.to,v.fly=null,un())}}let bt={frames:0,t0:performance.now(),low:0,history:[]};function Ui(A){bt.frames++;let F=A-bt.t0;if(F<2e3)return;let _=bt.frames*1e3/F;if(bt.history.push(_),bt.frames=0,bt.t0=A,!(!h.auto||bt.history.length<2)&&(bt.low=_<hM?bt.low+1:0,bt.low>=2&&h.level<Ua.length-1)){let E={at:new Date().toISOString(),from:h.level,to:h.level+1,fps:Math.round(_*10)/10};h.level++,h.log.push(E),bt.low=0,Kt(),console.info("[\uD654\uC9C8] \uC790\uB3D9\uC73C\uB85C \uB0AE\uCDA4",JSON.stringify(E))}}function Jt(A){return A.on===!1||A.zoom&&A.zoom!==R?!1:A.familyLine?A.wanted!==!1&&Ua[h.level].family:!0}function Kt(){for(let A of M)A.familyLine&&(A.obj.visible=Jt(A))}l.setAnimationLoop(()=>{let A=performance.now(),F=Math.min((A-pt)/1e3,.1);pt=A,v.paused||Vt(F),Ge(),Ui(A)});let rn=null;n.addEventListener("pointerdown",A=>{rn={x:A.clientX,y:A.clientY,x0:A.clientX,y0:A.clientY},n.setPointerCapture(A.pointerId)}),n.addEventListener("pointermove",A=>{rn&&(v.cam.az-=(A.clientX-rn.x)*.006,v.cam.el=Math.min(1.55,Math.max(-1.55,v.cam.el+(A.clientY-rn.y)*.006)),rn.x=A.clientX,rn.y=A.clientY)}),n.addEventListener("pointerup",A=>{if(rn&&Math.hypot(A.clientX-rn.x0,A.clientY-rn.y0)<5){let F=pi(A.clientX,A.clientY);F&&t.onPick&&t.onPick(F)}rn=null}),n.addEventListener("wheel",A=>{A.preventDefault(),v.fly=null,v.cam.dist=Math.min(z(),Math.max(ni(v.cam.dist),v.cam.dist*Math.exp(A.deltaY*.0012)))},{passive:!1});function On(A){let F=A.shape?A.radius*A.shape[0]:A.radius,_=Math.max(1800,l.getDrawingBufferSize(ti).y),E=_/(2*Math.tan(p.fov*Math.PI/360));return A.surface==="earth"?A.radius+2*Math.PI*A.radius/43200*E:A.texW?Math.max(F*1.03,F+2*Math.PI*F/A.texW*E):F*1.03}let Ms=.5,fi=!0;function Rt(A=v.fly?v.fly.to:v.cam.target){if(!fi||b[A])return .05;let F=Math.max(1800,l.getDrawingBufferSize(ti).y);return Ms*F/(2*Math.tan(p.fov*Math.PI/360))}function un(){if(!fi)return;v.cam.dist=Math.max(v.cam.dist,Rt());let A=Xe(),F=as(G(),Re(v.t),v.s),{az:_,el:E}=v.cam,L=[Math.cos(E)*Math.cos(_),Math.cos(E)*Math.sin(_),Math.sin(E)];for(let P=0;P<3;P++){let V=!1;for(let oe of M){if(oe.kind!=="sphere"||!oe.radius||!oe.work)continue;let pe=nr(oe.src,A,oe.work),ge=F[0]-pe[0],Me=F[1]-pe[1],Ce=F[2]-pe[2],Ye=On(oe),ze=ge*L[0]+Me*L[1]+Ce*L[2],He=ge*ge+Me*Me+Ce*Ce-Ye*Ye,lt=ze*ze-He;if(lt<0)continue;let Et=-ze-Math.sqrt(lt),St=-ze+Math.sqrt(lt),xt=v.cam.dist;xt>Et&&xt<St&&(v.cam.dist=St*(1+1e-12),V=!0)}if(!V)break}}let ti=new nt;function ni(A){let F=Xe(),_=as(G(),Re(v.t),v.s),{az:E,el:L}=v.cam,P=[Math.cos(L)*Math.cos(E),Math.cos(L)*Math.sin(E),Math.sin(L)],V=Rt();if(!fi)return V;for(let oe of M){if(oe.kind!=="sphere"||!oe.radius||!oe.work)continue;let pe=nr(oe.src,F,oe.work),ge=_[0]-pe[0],Me=_[1]-pe[1],Ce=_[2]-pe[2],Ye=On(oe),ze=ge*P[0]+Me*P[1]+Ce*P[2],He=ge*ge+Me*Me+Ce*Ce-Ye*Ye,lt=ze*ze-He;if(lt<0)continue;let Et=-ze+Math.sqrt(lt);(He<0||A>=Et)&&(V=Math.max(V,Et))}return V}function pi(A,F){let _=null,E=22,L=new Q;for(let P of M){if(!P.pick||!P.obj.visible)continue;if(P.kind==="sphere")L.copy(P.obj.position);else if(P.labelObj)L.copy(P.labelObj.position);else continue;if(L.project(p),L.z<-1||L.z>1)continue;let V=(L.x+1)/2*n.clientWidth,oe=(1-L.y)/2*n.clientHeight,pe=Math.hypot(V-A,oe-F);pe<E&&(E=pe,_=P.pick)}return _}function ws(){let A=l.getContext(),F=A.drawingBufferWidth,_=A.drawingBufferHeight,E=new Uint8Array(F*_*4);return A.readPixels(0,0,F,_,A.RGBA,A.UNSIGNED_BYTE,E),{px:E,w:F,h:_}}function ki(){Ge();let{px:A,w:F,h:_}=ws(),E=new Set;for(let L=0;L<A.length;L+=388)E.add(A[L]<<16|A[L+1]<<8|A[L+2]);return{width:F,height:_,distinctColors:E.size,webgl2:l.capabilities.isWebGL2}}function Zs(A){let F=M.map(ze=>ze.obj.visible),_=w[A],E=_.obj.material.color.getHex();for(let ze of M)ze.obj.visible=ze===_;_.obj.material.color.setHex(16777215);let L=e.style.display;e.style.display="none";let P=y.background;y.background=new rt(0),Ge();let{px:V,w:oe,h:pe}=ws(),ge=0,Me=0,Ce=0;for(let ze=0;ze<pe;ze++)for(let He=0;He<oe;He++){let lt=(ze*oe+He)*4;V[lt]>200&&V[lt+1]>200&&V[lt+2]>200&&(ge+=He,Me+=pe-1-ze,Ce++)}M.forEach((ze,He)=>{ze.obj.visible=F[He]}),_.obj.material.color.setHex(E),e.style.display=L,y.background=P,Ge();let Ye=l.getPixelRatio();return Ce?{x:ge/Ce/Ye,y:Me/Ce/Ye,n:Ce}:null}function Cr(A){return as(w[A].src,Re(v.t),v.s)}function Ba(A=3e3){return new Promise(F=>{let _=h.auto;h.auto=!1;let E=0,L=performance.now(),P=()=>{E++,performance.now()-L<A?requestAnimationFrame(P):(h.auto=_,F({fps:E*1e3/(performance.now()-L),level:h.level,pr:l.getPixelRatio()}))};requestAnimationFrame(P)})}function Cn(A=120){let F=l.getContext(),_=new Uint8Array(4);Ge(),F.readPixels(0,0,1,1,F.RGBA,F.UNSIGNED_BYTE,_);let E=performance.now();for(let P=0;P<A;P++)Ge(),F.readPixels(0,0,1,1,F.RGBA,F.UNSIGNED_BYTE,_);let L=(performance.now()-E)/A;return{ms:L,fpsUnlocked:1e3/L,pr:l.getPixelRatio()}}Ke();let yn={renderer:l,scene:m,skyScene:y,camera:p,state:v,items:M,markers:w,anchors:N,COLORS:o,anim:ut,model:t,tokens:i,quality:h,addMarker:ee,addPolyline:ie,addSegments:te,addPoints:se,addLabel:he,addSphere:xe,addItem:U,ndToKm:H,theta:Re,angle:Xe,render:Ge,update:Ae,setLayer(A,F){yn.setItemsVisible(_=>_.layer===A,F)},removeItem(A){let F=M.findIndex(L=>L.name===A);if(F<0)return!1;let _=M[F];_.obj.parent&&_.obj.parent.remove(_.obj),_.obj.geometry.dispose();let E=_.obj.material;for(let L of[B,O]){let P=L.indexOf(E);P>=0&&L.splice(P,1)}return E.dispose(),_.labelObj&&(m.remove(_.labelObj),_.label.remove()),w[A]===_&&delete w[A],M.splice(F,1),!0},setItemsVisible(A,F){for(let _ of M)A(_)&&(_.on=F,_.obj.visible=Jt(_),_.labelObj&&(_.labelObj.visible=F&&(!_.zoom||_.zoom===R)))},wantVisible:Jt,setItemsDimmed(A,F,_=.32){for(let E of M)if(A(E)&&E.kind!=="label"&&E.kind!=="sphere"){let L=E.obj.material;if(E.base===void 0&&(E.base={opacity:L.opacity,transparent:L.transparent,depthWrite:L.depthWrite,alphaTest:L.alphaTest}),!!E.dimmed===F)continue;E.dimmed=F,L.opacity=F?E.base.opacity*_:E.base.opacity,L.transparent=F||E.base.transparent,L.depthWrite=F?!1:E.base.depthWrite,E.base.alphaTest&&(L.alphaTest=F?E.base.alphaTest*_*.5:E.base.alphaTest),L.needsUpdate=!0}},setLabelsVisible(A){e.style.display=A?"":"none"},addZoomTarget(A,F){b[A]=F},onZoomChange(A){Y.push(A)},get zoomNow(){return R},setSphereTexture(A,F,_){let E=M.find(V=>V.name===A&&V.kind==="sphere");if(!E)return!1;let L=new qt(F);L.colorSpace=zt,L.anisotropy=l.capabilities.getMaxAnisotropy(),L.needsUpdate=!0;let P=E.obj.material;return P.map&&P.map.dispose(),P.map=L,P.color.set(16777215),P.needsUpdate=!0,E.texture={label:_,w:F.width,h:F.height},!0},maxTextureSize:()=>l.capabilities.maxTextureSize,makeTexture(A,F={}){let _=new qt(A);return _.colorSpace=F.colorSpace??zt,_.anisotropy=F.anisotropy??l.capabilities.getMaxAnisotropy(),F.mipmaps===!1&&(_.generateMipmaps=!1,_.minFilter=Nt),F.wrapS&&(_.wrapS=F.wrapS),uf(_),_.needsUpdate=!0,_},setSphereMap(A,F,_,E="map"){let L=M.find(oe=>oe.name===A&&oe.kind==="sphere");if(!L)return!1;let P=L.obj.material,V=E==="nightMap"?"night":E;return P.uniforms&&P.uniforms[V+"T0"]?($s(P.uniforms,V,F),P.uniforms[E+"On"]&&(P.uniforms[E+"On"].value=1)):(P.map=F,P.color.set(16777215),P.needsUpdate=!0),L.textures=L.textures||{},L.textures[E]={label:_,w:F.image.width,h:F.image.height},L.texture=L.textures.map||L.textures[E],!0},setSphereShape(A,F,_){let E=M.find(L=>L.name===A&&L.kind==="sphere");return E?(E.shape=[F,_],E.obj.material.uniforms&&E.obj.material.uniforms.oblate&&(E.obj.material.uniforms.oblate.value=_/F),!0):!1},addEarthClouds(A,F=$u.cloudHeightKm){let _=M.find(L=>L.name===A&&L.kind==="sphere");if(!_||_.cloudObj)return!1;let E=new jt(_.obj.geometry,Vg(a.surface||{}));return E.scale.setScalar(1+F/_.radius),E.renderOrder=5,E.frustumCulled=!1,_.obj.add(E),_.cloudObj=E,!0},setCloudMap(A,F,_){let E=M.find(L=>L.name===A&&L.kind==="sphere");return!E||!E.cloudObj?!1:($s(E.cloudObj.material.uniforms,"cloud",F),$s(E.obj.material.uniforms,"cloud",F),E.obj.material.uniforms.cloudOn.value=$.clouds===!1?0:1,E.cloudObj.visible=$.clouds!==!1,E.cloudTexture={label:_,w:F.image.width,h:F.image.height},!0)},setLandMap(A,F){let _=M.find(E=>E.name===A&&E.kind==="sphere");return _?($s(_.obj.material.uniforms,"land",F),_.obj.material.uniforms.landOn.value=1,!0):!1},zoomFloorKm(){return ni(v.cam.dist)},pointFloorKm(A){return Rt(A)},bodyFloorKm(A){let F=M.find(_=>_.name===A&&_.kind==="sphere");return F?On(F):null},addSaturnRing(A,F,_){let E=M.find(oe=>oe.name===A&&oe.kind==="sphere");if(!E||E.ringObj)return!1;let L=new Wo(F,_,180,1);L.rotateX(-Math.PI/2);let P=E.shape?E.shape[1]/E.shape[0]:1,V=new jt(L,Se(F,_,P));return V.scale.set(1,1/P,1),V.renderOrder=15,V.frustumCulled=!1,E.obj.add(V),E.ringObj=V,!0},setRingMap(A,F,_){let E=M.find(L=>L.name===A&&L.kind==="sphere");return!E||!E.ringObj?!1:($s(E.ringObj.material.uniforms,"map",F),E.ringTexture={label:_,w:F.image.width,h:F.image.height},!0)},sphereScreenPx(A){let F=M.find(_=>_.name===A&&_.kind==="sphere");return!F||!F.obj.visible||!F.camDist?0:F.obj.scale.x*fe/F.camDist*l.getPixelRatio()},qualityAllowsHiTex:()=>Ua[h.level].hiTex!==!1,setSunMeanLum(A){X&&X.obj.material.uniforms&&(X.obj.material.uniforms.meanLum.value=A)},setSphereOrient(A,F){let _=M.find(E=>E.name===A&&E.kind==="sphere");_&&(_.orientFn=F)},setGraphic(A,F){if($[A]=F,A==="nightlights"&&yn.setSurface("Earth_sphere","nightOn",F?1:0),A==="clouds"){let _=M.find(E=>E.name==="Earth_sphere");_&&_.cloudObj&&(_.cloudObj.visible=F&&!!_.cloudTexture,_.obj.material.uniforms.cloudOn.value=F&&_.cloudTexture?1:0)}},graphic:()=>({...$}),setSurface(A,F,_){let E=M.find(L=>L.name===A&&L.kind==="sphere");E&&E.surface&&E.obj.material.uniforms[F]&&(E.obj.material.uniforms[F].value=_)},setFaceTo(A,F){let _=M.find(E=>E.name===A&&E.kind==="sphere");_&&(_.faceTo=F)},addSky(A,F,_,E){_.renderOrder=-10,_.frustumCulled=!1;let L=U(A,F,_,new Float64Array(3),{kind:"sky"});return L.frame=E||null,L},setTrueSize(A){D=!!A},get trueSize(){return D},kmPerPx(){return v.cam.dist/fe},helper:Te,onRender:qe,setTime(A){v.t=Math.min(Math.max(A,t.tMin),t.tMax),t.onTime&&t.onTime(v.t,yn),t.onTimeChange&&t.onTimeChange(v.t)},setMode(A,F=!1){v.sTarget=A==="inertial"?1:0,F&&(v.s=v.sTarget)},setCamera(A){v.fly=null,Object.assign(v.cam,A),un()},setSphereTexWidth(A,F){let _=M.find(E=>E.name===A&&E.kind==="sphere");_&&(_.texW=F,v.fly||un())},setOrbitOuter(A){Le=A},setOrbitInner(A){Z=A},zoomOutMax:z,orbitFitDist:x,flyTo(A,F,_=Math.min(2,Math.max(1,1+.08*Math.abs(Math.log(F/v.cam.dist))))){let E=M.find(L=>L.kind==="sphere"&&L.pick===A&&L.radius);E&&(F=Math.max(F,On(E))),F=Math.max(F,Rt(A)),v.fly={from:[...G()],pos:[...G()],to:A,d0:v.cam.dist,d1:F,k:0,dur:_}},pickAt:pi,debug:{camera:p,eclToSceneNow:()=>Fe(Xe()),canvasStats:ki,markerCentroid:Zs,worldOf:Cr,measureFps:Ba,measureFrameCost:Cn,declutter:De,pause(A=!0){v.paused=A},step(A){Vt(A),Ge()},setPrecision(A){v.precision=A,Ge()},setQuality(A,F=!1){h.level=A,h.auto=F,Kt(),Ge()},enableAutoQuality(A=!0){h.auto=A},setFloors(A){fi=!!A}}};return yn}var Bt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=me(r)):s.startsWith("data-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Oa=[];function Gg(){for(let n of Oa)n()}function Wg(n,e){let t=vi(n,e);return Oa.push(t._render),t}function hf(n,e){let t=Wg(n,e);return t.classList.add("layer-tag"),t}function ka(n,e,t){let i=Bt("button",{type:"button",class:"lbl-num"});i.dataset.source=n.provenance.source.map(a=>`${a.file}>${a.key}`).join(" | "),i.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`;let s=()=>{i.textContent=n.text+(typeof t=="function"?t():t)};s(),Oa.push(s),i.addEventListener("click",a=>{a.stopPropagation(),e.openSource(n)});let r=Bt("span",{class:"lbl-numwrap"},i,Wg(n.provenance.verification,e.table));return r.dataset.source=i.dataset.source,r.dataset.verification=i.dataset.verification,Ls(r,n.id,"label"),r}function jg(n,e,t){let i=n.COLORS,s=n.tokens.scene.lines,r=n.tokens.scene.spheres,a=n.tokens.scene.glow,o=t.constants.mu,l=t.constants.length_unit_km,c=(X,Z,...xe)=>{let Se=Bt("div",{class:`lbl ${X}`},...xe);if(Z){Se.dataset.pick=Z;let ve=Se.firstChild;ve.classList.add("lbl-name"),ve.addEventListener("click",()=>t.onPick&&t.onPick(Z))}return Se},d=n.addMarker("Sun","bodies",[-o,0,0],i.sun,c("lbl-body","Sun",Bt("span",{i18n:"body.sun"})),{hidden:!0,priority:10});n.addSphere("Sun_sphere","bodies",d,t.radii.sun.km,i.sun,{emissive:!0,limb:!0,glow:a.sun,minPx:r.sunMinPx,pick:"Sun",capFrac:.5,capFloorDev:1.2}),n.addMarker("EMB","bodies",[1-o,0,0],i.emb,c("lbl-body","EMB",Bt("span",{i18n:"body.emb"})),{size:n.tokens.scene.points.emb,priority:6});let h={L1:8,L2:9,L3:5,L4:5,L5:5};for(let X of e["stage1.points"].items){let Z=c("lbl-lpt",X.id,Bt("b",{"data-meta":""},X.id),ka(X.dist,t," km"));Z.dataset.lpt=X.id,n.addMarker(X.id,"lpoints",[X.x,X.y,X.z],i.lpt,Z,{priority:h[X.id],glowPx:n.tokens.scene.points.lptGlow??22})}let u=e["stage2.l2_directions"],f=u.origin,m=Math.abs(f[0]-(1-o));for(let X of u.items){let Z=X.angle_deg*Math.PI/180,xe=.25*m,Se=[f[0]+xe*Math.cos(Z),f[1]+xe*Math.sin(Z),0];n.addSegments("dir_"+X.id,"dirs",[f[0]-xe*Math.cos(Z),f[1]-xe*Math.sin(Z),0,...Se],X.id==="unstable"?i.unstable:i.stable,s.dir),n.addLabel("dirlabel_"+X.id,"dirs",Se,c("lbl-dir","L2",Bt("span",{i18n:X.id==="unstable"?"l2.unstable":"l2.stable"}),ka(X.num,t,"\xB0")),{priority:3})}let y=e["stage3c.halo_family"],p=n.tokens.scene.familyEvery;for(let X of["\uBD81\uCABD","\uB0A8\uCABD"]){let Z=y._arrays[y.family[X].array],[xe,Se]=Z.shape;for(let ve of["some","all"]){let je=[];for(let Ke=0;Ke<xe;Ke++)(ve==="some"?Ke%p===0:Ke%p!==0)&&je.push(Ke);let ye=new Float64Array(je.length*(Se-1)*6),Ie=0;for(let Ke of je)for(let Be=0;Be<Se-1;Be++)for(let st of[(Ke*Se+Be)*3,(Ke*Se+Be+1)*3])ye[Ie++]=Z.data[st],ye[Ie++]=Z.data[st+1],ye[Ie++]=Z.data[st+2];let Te=n.addSegments(ve==="some"?"halo_"+X:"halo_rest_"+X,"halo",ye,i.haloFam,s.family,s.familyOpacity);Te.familyLine=!0,ve==="all"&&(Te.wanted=!1,Te.obj.visible=!1,Te.familyRest=!0)}}{let X=y._arrays[y.family[y.main.side].array],Z=X.shape[1],xe=X.data.slice(y.main.index*Z*3,(y.main.index+1)*Z*3);n.addPolyline("halo_main","halo",xe,i.haloMain,s.main),n.addLabel("halo_main_label","halo",Array.from(xe.slice(Math.floor(Z/4)*3,Math.floor(Z/4)*3+3)),c("lbl-orbit","halo_main",Bt("span",{i18n:"l2.halo_main"}),ka(y.main.period,t,()=>` ${vM(y.main.period.unit)}`)),{priority:7,pick:"halo_main"})}let g=e["stage3b.escape_samples"];for(let X of g.items)n.addPolyline("esc_"+X.\uBC88\uD638,"escape",g._arrays[X.array].data,X.direction_316>0?i.escOut:i.escIn,s.escape);let C=e["stage3.burns"],I={"3-A":i.a3,"3-C":i.c3,"4-C":i.c4};for(let[X,Z]of Object.entries(C.runs)){n.addPolyline("traj_"+X,"burns",C._arrays[Z.array_traj].data,I[X],s.traj,.7);let xe=C._arrays[Z.array_pos].data,Se=C._arrays[Z.array_dv].data,ve=new Float64Array(xe.length*2),je=3e3/l;for(let ye=0;ye<xe.length;ye+=3){let Ie=Math.hypot(Se[ye],Se[ye+1],Se[ye+2])||1;ve.set([xe[ye],xe[ye+1],xe[ye+2],xe[ye]+je*Se[ye]/Ie,xe[ye+1]+je*Se[ye+1]/Ie,xe[ye+2]+je*Se[ye+2]/Ie],ye*2)}n.addSegments("dv_"+X,"burns",ve,I[X],s.dv),n.addPoints("burnpts_"+X,"burns",xe,I[X])}let v=e["stage4.reference"];n.addPolyline("ref_4C","ref",v._arrays["4C"].data,i.ref4c,s.ref),n.addPolyline("ref_4D","ref",v._arrays["4D"].data,i.ref4d,s.ref);let M=t.screenEph||(()=>{let X=Vr(e).ephem;return{evaluate:Z=>X.evaluate(Z),tMin:X.tMin}})(),w=t.screenEph?t.screenEph.tMin:M.tMin,N=n.addMarker("Earth","earthmoon",[1-o,0,0],i.earth,c("lbl-body","Earth",Bt("span",{i18n:"body.earth"})),{hidden:!0,priority:7}),b=n.addMarker("Moon","earthmoon",[1-o,0,0],i.moon,c("lbl-body","Moon",Bt("span",{i18n:"body.moon"})),{hidden:!0,priority:4});n.addSphere("Earth_sphere","earthmoon",N,t.radii.earth.km,i.earth,{glow:a.earth,minPx:r.earthMinPx,pick:"Earth",dot:6,capFrac:.6,capFloorDev:3.01,atmosphere:i.atmosphere??7320831,surface:"earth",segments:[256,128]}),n.addSphere("Moon_sphere","earthmoon",b,t.radii.moon.km,i.moon,{glow:a.moon,minPx:r.moonMinPx,pick:"Moon",capFrac:.3,capFloorDev:1.5,surface:"moon"});let R=121,B=30,$=n.addPolyline("moon_trail","earthmoon",new Float64Array(R*3),i.moonTrail,s.trail,1,{fade:!0}),D=(X,Z)=>{let xe=ls(X.pos[0],X.vel[0],X.pos[3],X.vel[3]),Se=sr(X.pos[Z],xe);return[(Se[0]+1-o)*l,Se[1]*l,Se[2]*l]};xM(n,e,t,c,i,s);let O=[["mercury_bary","Mercury"],["venus_bary","Venus"],["mars_bary","Mars"],["jupiter_bary","Jupiter"],["saturn_bary","Saturn"],["uranus_bary","Uranus"],["neptune_bary","Neptune"]],U={Mercury:1,Venus:2,Earth:3,Mars:4,Jupiter:5,Saturn:6,Uranus:7,Neptune:8},W={Mercury:11053224,Venus:15256992,Mars:13656634,Jupiter:14201994,Saturn:14929818,Uranus:10475744,Neptune:7048432},K={Venus:[15258278,1.03],Mars:[14262908,1.02],Jupiter:[14205088,1.015],Saturn:[14929818,1.015],Uranus:[10475744,1.02],Neptune:[7048432,1.02]},H=t.screenEph?t.screenEph.solar():null,ee=[];if(H)for(let[X,Z]of O){let xe=H.bodies.find(je=>je.name===X);if(!xe)continue;let Se=(i.planets&&i.planets[Z])??W[Z],ve=n.addMarker(Z,"planets",[0,0,0],Se,c("lbl-body",Z,Bt("span",{i18n:"body."+Z.toLowerCase()})),{hidden:!0,priority:3});n.addSphere(Z+"_sphere","planets",ve,xe.radius_km,Se,{minPx:r.planetMinPx??4,pick:Z,dot:9-U[Z],capFrac:.6,capFloorDev:3.01,surface:"planet",...K[Z]?{atmosphere:K[Z][0],atmoSize:K[Z][1]}:{}}),ee.push({key:X,mk:ve})}let q=[],ie=100,te=-1/0,se=!1,he=null,Ne=null;if(t.orbitShapes&&H){let X=0,Z=1/0;for(let xe of t.orbitShapes.orbits){let Se=xe.xyz_km,ve=1/0;for(let Re=0;Re<Se.length;Re+=3)ve=Math.min(ve,Math.hypot(Se[Re],Se[Re+1],Se[Re+2]));let je=(xe.aphelion_km+ve)/2,ye=(xe.aphelion_km-ve)/(xe.aphelion_km+ve),Ie=O.find(([,Re])=>Re===xe.name),Te=Ie?Ie[0]:"earth",Ke=Ie?H.bodies.find(Re=>Re.name===Te).radius_km:t.radii.earth.km,Be=bd(je,ye,Ke),st=Be.dE.length,re=n.addPolyline("orbit_"+xe.name,"planet_orbits",new Float64Array(3*st),i.planetOrbit??11123926,s.planetOrbit??1,s.planetOrbitOpacity??.42);q.push({it:re,key:Te,mu:xe.mu_km3_s2,grid:Be,p:new Float64Array(3*st),rho:new Float64Array(3*st),tRef:NaN,dtMax:0}),X=Math.max(X,xe.aphelion_km),Z=Math.min(Z,ve)}n.setOrbitOuter(X),n.setOrbitInner(Z)}let Ee=(X,Z,xe,Se)=>{let ve=performance.now(),je=ve-te>=ie,ye=t.screenEph.solar().chunkFor(X).year,Ie=!1;se=!1;for(let Te of q){if(Math.abs(X-Te.tRef)<=Te.dtMax)continue;if(!je){se=!0;continue}let Ke=Te.key==="earth"?{pos:Z.pos[1],vel:Z.vel[1]}:H.evaluate(Te.key,X,ye),Be=qa(Ke.pos,Ke.vel,Z.pos[0],Z.vel[0],Te.mu,Te.grid.dE,Te.p);Be&&(Te.tRef=X,Te.dtMax=vd*Te.grid.stepKm/Be.speed,Ie=!0)}if(Ie&&(te=ve),!(!Se&&!Ie))for(let Te of q){md(Te.p,Z.pos[0],xe,Te.rho);let Ke=Te.it.src,Be=Te.rho;for(let st=0;st<Be.length;st+=3)Ke[st]=(Be[st]+1-o)*l,Ke[st+1]=Be[st+1]*l,Ke[st+2]=Be[st+2]*l}},Ue=null;return t.onTime=X=>{if(t.jwstOnTime&&t.jwstOnTime(X),X===Ue){se&&q.length&&Ee(X,he,Ne,!1);return}let Z=M.evaluate(X),xe=Math.max(w,X-B*86400),Se=M.evaluate(xe);if(!(!Z||!Se)){if(Ue=X,t.frameF=ls(Z.pos[0],Z.vel[0],Z.pos[3],Z.vel[3]),N.src.set(D(Z,1)),b.src.set(D(Z,2)),ee.length){let ve=ls(Z.pos[0],Z.vel[0],Z.pos[3],Z.vel[3]),je=t.screenEph.solar().chunkFor(X).year;for(let ye of ee){let Ie=sr(H.evaluate(ye.key,X,je).pos,ve);ye.mk.src.set([(Ie[0]+1-o)*l,Ie[1]*l,Ie[2]*l])}q.length&&(he=Z,Ne=ve,Ee(X,Z,ve,!0))}for(let ve=0;ve<R;ve++){let je=Math.max(w,X-B*86400*(R-1-ve)/(R-1));$.src.set(D(M.evaluate(je),2),ve*3)}}},{eph:M,toScene:D}}function xM(n,e,t,i,s,r){let a=e["stage4a.jwst"];if(!a)return;let o=n.tokens.scene.points,l=a._arrays;n.addPoints("jwst_pts","jwst",l.daily.data,s.jwst,o.jwst),n.addPolyline("jwst_interp","jwst",l.interp.data,s.jwst,r.jwstInterp,.85,{dashed:!0}),n.addPolyline("jwst_10m","jwst",l.tenmin.data,s.jwst,r.jwst);let c=a.parts.recent&&l.recent?{pts:l.recent.data,ip:l.recent_interp.data,t0:a.parts.recent.t_first_tdb_s,n:l.recent.data.length/3,nI:l.recent_interp.data.length/3,stepI:a.parts.recent_interp.step_h*3600}:null;c&&(n.addPoints("jwst_pts_recent","jwst",c.pts,s.jwst,o.jwst),n.addPolyline("jwst_interp_recent","jwst",c.ip,s.jwst,r.jwstInterp,.85,{dashed:!0}));let d=Array.from((c?c.pts:l.tenmin.data).slice(-3)),h=86400,u=Date.UTC(2e3,0,1,12)/1e3,f=ye=>Date.parse(ye.replace(" ","T")+"Z")/1e3-u,m=ye=>new Date((ye+u)*1e3).toISOString().slice(0,16).replace("T"," "),y=a.parts.daily.t_first_tdb_s,p=l.daily.data.length/3,g=a.parts.tenmin.t_first_tdb_s,C=l.tenmin.data.length/3,I=a.parts.tenmin.t_last_tdb_s,v=a.marker.t_tdb_s,M=a.parts.interp.step_h*3600,w=l.interp.data.length/3,N=e["stage5.jwst"],b=N&&N.layers.ext.windows.A,R=null,B=a.parts.pred;if(B&&l.pred&&l.pred.data.length>=6)R={t0:B.t_first_tdb_s,data:l.pred.data,n:l.pred.data.length/3,tEnd:B.t_last_tdb_s,copy:B.solution,sol:B.sol};else if(b){let ye=N._arrays[b.array].data,Ie=f(b.start),Te=Math.ceil((v-Ie)/h-1e-9);Te>=0&&Te<ye.length/3-1&&(R={t0:Ie+Te*h,data:ye.slice(3*Te),n:ye.length/3-Te,tEnd:f(b.end),copy:b.copy,sol:"01U"})}let $=R?R.tEnd:v,D=[n.addPolyline("jwst_ahead_interp","jwst",l.interp.data,s.jwst,r.jwstInterp,.3,{dashed:!0}),n.addPolyline("jwst_ahead_10m","jwst",l.tenmin.data,s.jwst,r.jwst,.3)];if(c&&D.push(n.addPolyline("jwst_ahead_recent","jwst",c.ip,s.jwst,r.jwstInterp,.3,{dashed:!0})),R){n.addPolyline("jwst_pred01U","jwst",R.data,s.jwst,r.jwstInterp,.45,{dashed:!0});let ye=Bt("span",{"data-meta":""}),Ie=()=>{ye.textContent=me("jwst.pred_ahead",{sol:R.sol})};Ie(),Oa.push(Ie),n.addLabel("jwst_pred_label","jwst",Array.from(R.data.slice(-3)),i("lbl-pred lbl-ext","JWST",ye,hf(N?N.layers.ext.verification:null,t.table)),{priority:2,pick:"JWST"})}t.jwstSpan={t0:y,tRec:v,tPredEnd:R?R.tEnd:null,sol:R?R.sol:null,predCopy:R?R.copy:null};let O=Bt("small",{class:"lbl-fixed","data-meta":""}),U=Bt("small",{class:"lbl-fixed lbl-nodata","data-meta":"",hidden:!0}),W={k:"at",date:m(v)},K=()=>{let ye={from:m(y).slice(0,10),to:m($).slice(0,10)};O.textContent=W.k==="none"?me("jwst.no_data",ye):me(W.k==="pred"?"jwst.marker_pred":"jwst.marker_at",{date:W.date,sol:R?R.sol:""}),O.title=W.k==="pred"?R.copy:me("jwst.data_range",ye),U.hidden=W.k!=="none",U.textContent=me("jwst.no_data_short"),U.title=me("jwst.no_data",ye)};K(),Oa.push(K);let H=n.addMarker("JWST","jwst",d,s.jwst,i("lbl-body lbl-jwst","JWST",Bt("span",{"data-meta":""},"JWST"),U),{size:o.jwstMarker,priority:8}),ee=n.addLabel("jwst_fixed","jwst",d,Bt("div",{class:"lbl lbl-fixed-wrap"},O),{priority:2});ee.labelObj.center.set(-.08,-.45);let q={pts:n.items.find(ye=>ye.name==="jwst_pts"),ip:n.items.find(ye=>ye.name==="jwst_interp"),ten:n.items.find(ye=>ye.name==="jwst_10m"),rpts:n.items.find(ye=>ye.name==="jwst_pts_recent"),rip:n.items.find(ye=>ye.name==="jwst_interp_recent")},ie=H.baseSize,te=(ye,Ie)=>Math.max(0,Math.min(Ie,ye)),se=null;t.jwstOnTime=ye=>{if(ye===se)return;se=ye,q.pts.obj.geometry.setDrawRange(0,te(Math.floor((ye-y)/h)+1,p)),q.ip.obj.geometry.instanceCount=te(Math.floor((ye-y)/M),w-1),q.ten.obj.geometry.instanceCount=te(Math.floor((ye-g)/600),C-1),c&&(q.rpts.obj.geometry.setDrawRange(0,te(Math.floor((ye-c.t0)/h)+1,c.n)),q.rip.obj.geometry.instanceCount=te(Math.floor((ye-c.t0)/c.stepI),c.nI-1));let Ie=null,Te;if(ye>=y&&ye<g){let Be=te(Math.floor((ye-y)/h),p-1);Ie=l.daily.data.slice(3*Be,3*Be+3),Te={k:"at",date:m(y+Be*h)}}else if(ye>=g&&ye<=I){let Be=te(Math.floor((ye-g)/600),C-1);Ie=l.tenmin.data.slice(3*Be,3*Be+3),Te={k:"at",date:m(g+Be*600)}}else if(c&&ye>I&&ye<=v){let Be=te(Math.floor((ye-c.t0)/h),c.n-1);Ie=c.pts.slice(3*Be,3*Be+3),Te={k:"at",date:m(c.t0+Be*h)}}else if(R&&ye>v&&ye<=R.tEnd){let Be=te(Math.floor((ye-R.t0)/h),R.n-1);Ie=R.data.slice(3*Be,3*Be+3),Te={k:"pred",date:m(R.t0+Be*h)}}else Te={k:"none"};let Ke=t.constants.length_unit_km;if(Ie)H.src.set([Ie[0]*Ke,Ie[1]*Ke,Ie[2]*Ke]),H.baseSize=ie;else{let Be=ye<y?l.daily.data.slice(0,3):d;H.src.set([Be[0]*Ke,Be[1]*Ke,Be[2]*Ke]),H.baseSize=0}ee.src.set(H.src),(Te.k!==W.k||Te.date!==W.date)&&(W=Te,K(),H.labelObj&&H.labelObj.center.set(Te.k==="none"?1.08:-.08,.5))};let he=Math.floor(l.daily.data.length/6)*3;n.addLabel("jwst_orbit_label","jwst",Array.from(l.daily.data.slice(he,he+3)),i("lbl-orbit","jwst_period",Bt("span",{i18n:"jwst.orbit_label"})),{priority:2,pick:"jwst_period"});let Ne=e["stage5.jwst"];if(!Ne)return;let Ee=Ne._arrays,Ue=Ne.layers.ext,X=Ne.layers.phys;for(let[ye,Ie]of Object.entries(Ue.windows))n.addPolyline("jpl_"+ye,"jwst_ext",Ee[Ie.array].data,s.extJpl,r.pred);for(let ye of Ue.curves){let Ie=Ee[ye.array_pos].data;n.addPolyline("mine_"+ye.id,"jwst_ext",Ie,s.extMine,r.traj),n.addPoints("mine_end_"+ye.id,"jwst_ext",Ie.slice(-3),s.extMine,o.predEnd)}let Z=Ee[X.arrays_pos.recon].data,xe=Ee[X.arrays_pos.mine].data;n.addPolyline("recon_R","jwst_phys",Z,s.physRecon,r.pred),n.addPolyline("mine_R","jwst_phys",xe,s.physMine,r.traj),n.addPoints("mine_end_R","jwst_phys",xe.slice(-3),s.physMine,o.predEnd),n.addPolyline("jpl01U_R","jwst_phys",Ee[X.arrays_pos.jpl].data,s.physJpl,r.traj,1,{dashed:!0});let Se=Ue.items.find(ye=>ye.id==="jwst_err_range"),ve=X.items.find(ye=>ye.id==="jwst_err_R5"),je=Ee[Ue.windows.B.array].data;n.addLabel("jwst_ext_label","jwst_ext",Array.from(je.slice(-3)),i("lbl-pred lbl-ext","JWST",Bt("span",{i18n:"jwst.layer_ext_short"}),hf(Ue.verification,t.table),ka(Se,t," km")),{priority:6,pick:"JWST"}),n.addLabel("jwst_phys_label","jwst_phys",Array.from(Z.slice(-3)),i("lbl-pred lbl-phys","JWST",Bt("span",{i18n:"jwst.layer_phys_short"}),hf(X.verification,t.table),ka(ve,t,()=>` km (${me("jwst.rep_5d")})`)),{priority:6,pick:"JWST"}),yM(n,Ne,t,s,o,r)}function yM(n,e,t,i,s,r){let a=e._arrays,o=e.layers.ext,l=e.layers.phys,c=t.constants.length_unit_km,d=(w,N)=>{let b=a[w].data,R=b.length/3,B=N<0?R+N:N;return{arr:w,k:B,p:[b[3*B],b[3*B+1],b[3*B+2]]}},h=(w,N)=>{let b=a[w].data;for(let R=0;R<b.length;R++)if(Math.abs(b[R]-N)<1e-9)return R;return-1},u=(w,N)=>w.items.find(b=>b.id===N),f=(Date.parse(l.window.rep_end.replace(" ","T")+"Z")-Date.parse(l.window.start.replace(" ","T")+"Z"))/864e5,m=[{id:"R5",layer:"jwst_phys",lines:["recon_R","mine_R","mine_end_R","jpl01U_R"],base:{...d(l.arrays_pos.recon,h("days_R",f)),name:"jwst.zl_recon",color:i.physRecon},others:[{...d(l.arrays_pos.mine,h("days_R",f)),name:"jwst.zl_mine_kB",color:i.physMine,item:u(l,"jwst_err_R5"),gap:"jwst.gap_mine_recon"},{...d(l.arrays_pos.jpl,h("days_R_jpl",f)),name:"jwst.zl_jpl01U",color:i.physJpl,item:u(l,"jwst_err_R5_jpl"),gap:"jwst.gap_jpl_recon"}]}];for(let w of["A","B","C"]){let N=o.curves.filter(b=>b.window===w);N.length&&m.push({id:w,layer:"jwst_ext",lines:["jpl_"+w,...N.flatMap(b=>["mine_"+b.id,"mine_end_"+b.id])],base:{...d(o.windows[w].array,-1),name:"jwst.zl_jpl",color:i.extJpl},others:N.map(b=>({...d(b.array_pos,-1),text:b.label,color:i.extMine,item:u(o,"jwst_err_"+b.id),gap:"jwst.gap_mine_jpl"}))})}n.zoomStops={};let y=(w,N)=>[w[0]-N[0],w[1]-N[1],w[2]-N[2]],p=(w,N)=>[w[1]*N[2]-w[2]*N[1],w[2]*N[0]-w[0]*N[2],w[0]*N[1]-w[1]*N[0]],g=w=>{let N=Math.hypot(...w)||1;return w.map(b=>b/N)},C=(w,N)=>(w.zoom=N,w.obj.visible=!1,w.labelObj&&(w.labelObj.visible=!1),w.pick=null,w),I=w=>document.documentElement.lang==="ko"?w.ko:w.en;for(let w of m){if(w.base.k<0||w.others.some(se=>se.k<0||!se.item))continue;let N=[w.base,...w.others],b=[0,1,2].map(se=>N.reduce((he,Ne)=>he+Ne.p[se],0)/N.length),R=w.others.map(se=>Math.hypot(...y(se.p,w.base.p))*c),B=Math.max(25,4.5*Math.max(...R)),$=a[w.base.arr].data,D=w.base.k,O=$.length/3,U=Math.min(D+1,O-1),W=Math.max(D-1,0),K=g(y(Array.from($.slice(3*U,3*U+3)),Array.from($.slice(3*W,3*W+3)))),H=y(w.others[R.indexOf(Math.max(...R))].p,w.base.p),ee=p(K,H);Math.hypot(...ee)<1e-6*Math.hypot(...H)&&(ee=p(K,[0,0,1])),ee=g(ee),ee[2]<0&&(ee=ee.map(se=>-se));let q="zoom_"+w.id;n.anchors[q]=n.ndToKm(b),n.addZoomTarget(q,w.id),n.zoomStops[w.id]={layer:w.layer,cam:{target:q,dist:B,az:Math.atan2(ee[1],ee[0]),el:Math.asin(ee[2])},gapsDrawnKm:R,points:N.map(se=>se.p),items:w.others.map(se=>se.item.id)},N.forEach((se,he)=>C(n.addMarker(`zoompt_${w.id}_${he}`,w.layer,se.p,se.color,null,{size:s.zoomPt}),w.id));let ie=new Float64Array(6*w.others.length);w.others.forEach((se,he)=>ie.set([...w.base.p,...se.p],6*he)),C(n.addSegments("zoomgap_"+w.id,w.layer,ie,i.zoomGap,r.zoomGap,.9),w.id);let te=.18*B/c;N.forEach((se,he)=>{let Ne=a[se.arr].data,Ee=Ne.length/3,Ue=se.k>0?se.k-1:Math.min(se.k+1,Ee-1),X=g(y(Array.from(Ne.slice(3*Ue,3*Ue+3)),se.p)),Z=se.p.map((ve,je)=>ve+te*X[je]),xe=se.text?Bt("span",{class:"lbl-name-only","data-meta":""},I(se.text)):Bt("span",{class:"lbl-name-only","data-meta":"",i18n:se.name});se.text&&Oa.push(()=>{xe.textContent=I(se.text)});let Se=Bt("div",{class:"lbl lbl-zoomline"},xe);Se.style.setProperty("--zl-color","#"+se.color.toString(16).padStart(6,"0")),C(n.addLabel(`zoomname_${w.id}_${he}`,w.layer,Z,Se,{priority:8}),w.id)}),w.others.forEach((se,he)=>{let Ne=Bt("div",{class:"lbl lbl-gap"},Bt("span",{class:"lbl-name-only","data-meta":"",i18n:se.gap}),ka(se.item,t," km"));Ne.dataset.gap=se.item.id,C(n.addLabel(`zoomgapl_${w.id}_${he}`,w.layer,se.p,Ne,{priority:9}),w.id)})}let v=Object.fromEntries(m.map(w=>[w.id,new Set(w.lines)])),M=w=>(w.layer==="jwst_ext"||w.layer==="jwst_phys")&&!w.zoom&&w.kind!=="label";n.onZoomChange(w=>{n.setItemsDimmed(M,!1),w&&v[w]&&n.setItemsDimmed(N=>M(N)&&!v[w].has(N.name),!0,.18)})}function vM(n){return n&&typeof n=="object"?document.documentElement.lang==="ko"?n.ko:n.en:n||""}var bM=(()=>{let n=document.createElement("div");return n.innerHTML="<svg></svg>",n.firstChild.namespaceURI})(),bs=(n,e={},...t)=>{let i=document.createElementNS(bM,n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},Yt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=me(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i};function SM(n,e,t,i){let d=t.days[0],h=t.days[t.days.length-1],u=Math.log10(t.km[0]),f=Math.log10(t.km[t.km.length-1]),m=v=>40+(v-d)/(h-d)*252,y=v=>8+(1-(Math.log10(Math.min(Math.max(v,t.km[0]),t.km[t.km.length-1]))-u)/(f-u))*116,p=bs("svg",{viewBox:"0 0 300 150",width:300,height:150,class:"err-chart",role:"img","aria-label":Tt(n.title)});if(n.outside_from_day!==void 0){let v=m(n.outside_from_day),M=m(n.outside_to_day);p.append(bs("rect",{x:v,y:8,width:M-v,height:116,class:"err-outside"}))}let g=bs("g",{class:"err-axes","data-aux":"tick","data-source":t.source,"data-verification":"display/axis"});for(let v of t.km)g.append(bs("line",{x1:40,x2:292,y1:y(v),y2:y(v),class:"err-grid"})),g.append(bs("text",{x:36,y:y(v)+4,"text-anchor":"end"},t.km_text[t.km.indexOf(v)]));for(let v of t.days)g.append(bs("line",{x1:m(v),x2:m(v),y1:8,y2:124,class:"err-grid"})),g.append(bs("text",{x:m(v),y:138,"text-anchor":"middle"},String(v)));p.append(g);for(let v of n.curves){let M=e[v.array_days].data,w=e[v.array_km].data,N="";for(let b=0;b<M.length;b++)w[b]>0&&(N+=`${N?"L":"M"}${m(M[b]).toFixed(2)},${y(w[b]).toFixed(2)}`);p.append(bs("path",{d:N,class:"err-line",stroke:v.color,"stroke-dasharray":v.dashed?"4 3":"none","data-curve":v.id}));for(let b of v.marks)p.append(bs("circle",{cx:m(b.day),cy:y(b.km),r:2.6,fill:v.color,"data-mark":`${v.id}@${b.day}`}))}let C=Yt("figure",{class:"err-fig","data-layer":i.key});C.append(p);let I=Yt("figcaption",{class:"err-legend","data-meta":""});for(let v of n.curves){let M=Yt("span",{class:"err-swatch"+(v.dashed?" dashed":"")});M.style.borderColor=v.color,I.append(Yt("span",{class:"err-key"},M,document.createTextNode(Tt(v.label))))}return I.append(Yt("span",{class:"err-axis-note",i18n:"jwst.axis_note"})),C.append(I),C}function Xg(n,e,t,i,s){let r=e?Yt("button",{type:"button",id:n,class:"link-btn zoom-btn",i18n:e}):Yt("button",{type:"button",id:n,class:"link-btn zoom-btn"},s);return r.addEventListener("click",()=>t(i)),r}function ff(n,e,t,i,s,r){let a=Yt("div",{class:"jwst-body"}),o=n["stage5.jwst"];if(!o)return a.append(Yt("p",{class:"note",i18n:"jwst.no_predictions"})),a;for(let c of["ext","phys"]){let d=o.layers[c],h=Yt("section",{class:`jwst-layer jwst-${c}`,"data-layer":c}),u=Yt("h4",{"data-meta":""},Yt("span",{i18n:`jwst.layer_${c}`}),oi(d.verification,e));h.append(u,Yt("p",{class:"desc","data-meta":""},Tt(d.note))),h.append(SM(d,o._arrays,o.axes,{key:c}));for(let f of d.items){let m=bi(f,e,t);i.push(m),h.append(m)}if(r){let f=Yt("div",{class:"zoom-row","data-meta":""});if(c==="phys")f.append(Xg("zoom-R5","jwst.zoom_phys",r,"R5"));else{f.append(Yt("span",{i18n:"jwst.zoom_ext"}));for(let m of Object.keys(d.windows))f.append(Xg("zoom-"+m,null,r,m,m))}h.append(f)}a.append(h)}let l=Yt("button",{type:"button",id:"open-period",class:"link-btn",i18n:"jwst.period_button"});return l.addEventListener("click",s),a.append(l),a}function pf(n,e,t,i){let r=n["stage4a.jwst"].period_card,a=Yt("div",{class:"period-body"}),o=Yt("p",{class:"period-class","data-meta":""},Yt("span",{i18n:"jwst.period_class"}),oi(r.verification,e));a.append(o,Yt("p",{class:"desc","data-meta":""},Tt(r.summary)));for(let l of r.items){let c=bi(l,e,t);i.push(c),a.append(c)}return a.append(Yt("p",{class:"note period-unknown","data-meta":""},Tt(r.unknown))),a}var k=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?i.dataset.i18n=r:s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Un={all:{target:"bary",dist:42e7,az:-1.5708,el:1.2},emb:{target:"EMB",dist:75e5,az:-1.5708,el:1.1},l2:{target:"L2",dist:32e5,az:-1.2,el:.6},l2zoom:{target:"L2",dist:300,az:-1.2,el:.6},jwst:{target:"L2",dist:29e5,az:-.45,el:.42},solar:{target:"bary",dist:125e8,az:-1.5708,el:1.15}},Ar={Sun:["Sun",6e6],EMB:["EMB",25e5],Earth:["Earth",12e4],Moon:["Moon",12e4],L1:["L1",25e5],L2:["L2",32e5],L3:["L3",6e7],L4:["L4",6e7],L5:["L5",6e7],halo_main:["L2",32e5],JWST:["JWST",12e5],jwst_period:["L2",29e5],Mercury:["Mercury",6e6],Venus:["Venus",15e6],Mars:["Mars",1e7],Jupiter:["Jupiter",12e7],Saturn:["Saturn",1e8],Uranus:["Uranus",5e7],Neptune:["Neptune",5e7]},MM=["lpoints","bodies","dirs","earthmoon","halo","escape","burns","ref","jwst","jwst_ext","jwst_phys"],wM=[1,10,30];function qg(n,e,t){let i=[],s=t.manifest.verification,r=k("button",{type:"button",id:"mode-rot",class:"on",i18n:"l2.mode_rot"}),a=k("button",{type:"button",id:"mode-in",i18n:"l2.mode_inertial"});r.addEventListener("click",()=>{n.setMode("rot"),r.classList.add("on"),a.classList.remove("on")}),a.addEventListener("click",()=>{n.setMode("inertial"),a.classList.add("on"),r.classList.remove("on")});let o=k("div",{class:"ctl-row","data-meta":""},k("span",{class:"ctl-h",i18n:"l2.mode"}),r,a),l=k("div",{class:"ctl-row","data-meta":""},k("span",{class:"ctl-h",i18n:"l2.view"}));for(let ae of Object.keys(Un)){let Le=k("button",{type:"button",id:"view-"+ae,i18n:"l2.view_"+ae});Le.addEventListener("click",()=>n.setCamera({...Un[ae],...ae==="solar"?{dist:Math.max(Un.solar.dist,n.orbitFitDist(1.2))}:{}})),l.append(Le)}let c=k("button",{type:"button",id:"true-size",i18n:"view.true_size","aria-pressed":"false"});if(c.title=me("view.true_size_title"),c.addEventListener("click",()=>{n.setTrueSize(!n.trueSize),c.setAttribute("aria-pressed",String(n.trueSize)),c.classList.toggle("on",n.trueSize)}),l.append(c),n.zoomStops&&n.zoomStops.R5){let ae=k("button",{type:"button",id:"view-jwstzoom",i18n:"l2.view_jwstzoom"});ae.addEventListener("click",()=>n.model.onZoom&&n.model.onZoom("R5")),l.append(ae)}let d=k("input",{type:"range",id:"time",min:String(n.model.tMin),max:String(n.model.tMax),step:"3600","aria-label":"time"});d.value=String(n.state.t),d.addEventListener("input",()=>n.setTime(Number(d.value)));let h=k("button",{type:"button",id:"play",i18n:"l2.play"}),u=10;h.addEventListener("click",()=>{let ae=!n.anim.speedDaysPerSec;n.anim.speedDaysPerSec=ae?u:0,h.dataset.i18n=ae?"l2.pause":"l2.play",h.textContent=me(h.dataset.i18n)});let f=k("select",{id:"speed","aria-label":"speed"});for(let ae of wM){let Le=k("option",{value:String(ae)});Le.dataset.speed=String(ae),f.append(Le)}f.value=String(u),f.addEventListener("change",()=>{u=Number(f.value),n.anim.speedDaysPerSec&&(n.anim.speedDaysPerSec=u)});let m=e["time.utc"],y={t:m._arrays.t_tdb_s.data,u:m._arrays.unix_utc_s.data},p=k("button",{type:"button",id:"date",class:"num"});p.dataset.source="time.utc (results/web) | "+m.provenance.source.map(ae=>`${ae.file}>${ae.key}`).join(" | "),p.dataset.verification=`${m.provenance.verification.tag}/${m.provenance.verification.detail}`;let g=ae=>({id:"date",value:ae,text:Gi(bn(ae,y)),unit:"UTC",label:{ko:"\uD654\uBA74 \uC2DC\uAC01 (UTC)",en:"Displayed time (UTC)"},note:{ko:`TDB ${Al(ae)} (J2000 TDB ${ae} \uCD08). UTC = Python \uC774 \uB0B4\uBCF4\uB0B8 \uD558\uB8E8 \uAC04\uACA9 \uD658\uC0B0\uD45C (astropy) \uB97C \uC120\uD615 \uBCF4\uAC04 \u2014 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0`,en:`TDB ${Al(ae)} (J2000 TDB ${ae} s). UTC = linear interpolation of the daily table exported by Python (astropy) \u2014 browser calculation`},provenance:m.provenance,browser_calc:{tolerance:"1e-3 s (golden utc)"}});p.addEventListener("click",()=>t.openSource(g(n.state.t)));let C=()=>{for(let ae of f.options)ae.textContent=me("l2.speed",{n:ae.dataset.speed})},I=()=>{p.textContent=`${Gi(bn(n.state.t,y))} UTC`},v=k("button",{type:"button",id:"t-start",i18n:"time.start"});v.addEventListener("click",()=>n.setTime(n.model.tMin));let M=k("button",{type:"button",id:"t-now",i18n:"time.now"});M.addEventListener("click",()=>n.setTime(Ha(y,Date.now()/1e3)));let w=ae=>Gi(bn(ae,y)).slice(0,10),N=k("input",{type:"date",id:"date-jump","aria-label":"date"}),b=bn(n.model.tMin,y),R=bn(n.model.tMax,y),B=new Date(Math.ceil(b/86400)*864e5).toISOString().slice(0,10),$=new Date(Math.floor(R/86400)*864e5).toISOString().slice(0,10);N.min=B,N.max=$;let D=k("button",{type:"button",id:"date-go",i18n:"time.go"}),O=k("span",{id:"date-range-note",class:"note",hidden:!0,i18n:"time.out_of_range"}),U=()=>{let ae=N.value,Le=!!ae&&ae>=B&&ae<=$;return D.disabled=!Le,O.hidden=!ae||Le,Le};N.addEventListener("input",U),D.addEventListener("click",()=>{U()&&n.setTime(Hi(Date.parse(N.value+"T00:00:00Z")/1e3,y))}),D.disabled=!0,N.dataset.range=`${B} ~ ${$}`;let W=k("div",{class:"ctl-row","data-meta":""},k("span",{class:"ctl-h",i18n:"l2.time"}),v,h,M,f,N,D,O,k("span",{id:"ephem-busy-slot"})),K=k("div",{class:"ctl-row slider-row"},d),H=vi(m.provenance.verification,s),ee=k("div",{class:"ctl-row date-row"},p,H);ee.dataset.source=p.dataset.source,ee.dataset.verification=p.dataset.verification,n.model.onTimeChange=ae=>{d.value=String(ae),I()};let q=k("div",{class:"layers","data-meta":""});for(let ae of MM){let Le=k("input",{type:"checkbox",id:"layer-"+ae,checked:!0});Le.addEventListener("change",()=>n.setLayer(ae,Le.checked)),q.append(k("label",{},Le,k("span",{i18n:"l2.layer_"+ae})))}let ie=k("input",{type:"checkbox",id:"family-all"});ie.addEventListener("change",()=>{for(let ae of n.items)ae.familyRest&&(ae.wanted=ie.checked,ae.obj.visible=ie.checked&&document.getElementById("layer-halo").checked)}),q.append(k("label",{class:"fam"},ie,k("span",{i18n:"l2.family_all"})));let te=k("div",{class:"nums"}),se=(ae,Le,S=!1)=>{let x=k("details",{open:S});x.append(k("summary",{"data-meta":"",i18n:ae}));for(let z of Le){let j=bi(z,s,t.openSource);i.push(j),x.append(j)}return te.append(x),x},he=e["ephem.earth_moon"];se("l2.g_lpoints",e["stage1.points"].items.map(ae=>ae.dist),!0),se("l2.g_dirs",e["stage2.l2_directions"].items.map(ae=>ae.num),!0),se("l2.g_halo",[e["stage3c.halo_family"].main.period,e["stage3c.halo_family"].main.zmax],!0),se("l2.g_annual",e["stage3.burns"].annual,!0),se("l2.g_ref",e["stage4.reference"].numbers,!0),se("l2.g_escape",e["stage3b.escape_samples"].items.map(ae=>ae.t316)).querySelector("summary").after(k("p",{class:"note","data-meta":"",i18n:"l2.escape_rule"}));let Ee=n.model.screenEph&&e["m4.ephem"];se("l2.g_interp",Ee&&Ee.holdout?[Ee.holdout.earth,Ee.holdout.moon]:["\uC9C0\uAD6C","\uB2EC"].map(ae=>he.holdout[ae]));let Ue=e["stage5.jwst"],X=e["stage4a.jwst"];Ue&&(se("jwst.g_ext",Ue.layers.ext.items),se("jwst.g_phys",Ue.layers.phys.items)),X&&se("jwst.g_period",X.period_card.items),se("l2.g_m0",[]).append(document.getElementById("samples"));let xe=k("div",{class:"legend"},k("p",{"data-meta":""},qn(),k("span",{i18n:"l2.legend_spheres"})),k("p",{"data-meta":"",i18n:"l2.legend_markers"}),k("p",{"data-meta":"",i18n:"l2.legend_pulsating"}),k("p",{"data-meta":"",i18n:"l2.legend_inertial"}),k("p",{"data-meta":"",i18n:"l2.legend_jwst"}),k("p",{"data-meta":"",i18n:"l2.legend_jwstzoom"})),Se={};for(let ae of e["stage1.points"].items)Se[ae.id]=[ae.dist];let ve=e["stage2.l2_directions"].items.map(ae=>ae.num),je=e["stage3c.halo_family"],ye=Object.fromEntries(e["stage3.burns"].annual.map(ae=>[ae.id,ae]));Se.L2=[...Se.L2,...ve,ye.annual_3A,...e["stage3b.escape_samples"].items.map(ae=>ae.t316)],Se.halo_main=[je.main.period,je.main.zmax,ye.annual_3C,ye.annual_4C,...e["stage4.reference"].numbers],Se.Earth=[Ee&&Ee.holdout?Ee.holdout.earth:he.holdout.\uC9C0\uAD6C],Se.Moon=[Ee&&Ee.holdout?Ee.holdout.moon:he.holdout.\uB2EC],Se.Sun=[],Se.EMB=[];for(let ae of["Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"])Se[ae]=[];let Ie={Sun:"body.sun",EMB:"body.emb",Earth:"body.earth",Moon:"body.moon",halo_main:"l2.halo_main",JWST:"body.jwst",jwst_period:"jwst.period_title",Mercury:"body.mercury",Venus:"body.venus",Mars:"body.mars",Jupiter:"body.jupiter",Saturn:"body.saturn",Uranus:"body.uranus",Neptune:"body.neptune"},Te=[],Ke=ae=>Ie[ae]?me(Ie[ae]):ae;function Be(ae){let Le=k("div",{class:"card-body"});Le.append(k("h3",Ie[ae]?{i18n:Ie[ae]}:{"data-meta":""},Ke(ae))),Le.append(k("p",{class:"desc","data-meta":"",i18n:"desc."+ae},me("desc."+ae))),n.items.find(j=>j.kind==="sphere"&&j.pick===ae)&&Le.append(k("p",{class:"note","data-meta":""},qn(),k("span",{i18n:"card.sphere_note"},me("card.sphere_note"))));let x=Se[ae]||[];for(let j of Te)Gr(j);Te.length=0;for(let j of x){let ne=bi(j,s,t.openSource);Te.push(ne),Le.append(ne)}return ae==="JWST"&&Le.append(ff(e,s,t.openSource,Te,()=>n.model.onPick&&n.model.onPick("jwst_period"),n.zoomStops?j=>n.model.onZoom&&n.model.onZoom(j):null)),ae==="jwst_period"&&Le.append(pf(e,s,t.openSource,Te)),cs(),x.length||ae==="JWST"||ae==="jwst_period"?Le.querySelector(".num-row")||Le.append(k("p",{class:"note",id:"card-numbers-off",i18n:"card.numbers_off"},me("card.numbers_off"))):Le.append(k("p",{class:"note",i18n:"card.no_numbers"},me("card.no_numbers"))),Le}let st=Ue?[...Ue.layers.ext.items,...Ue.layers.phys.items]:[],re=(ae,Le)=>ae.map(S=>Le.find(x=>x.id===S)).filter(Boolean);function Re(ae){let Le={key:[],more:[],expert:[]};return ae==="L2"?(Le.key=[Se.L2[0],ye.annual_3A],Le.more=ve,Le.expert=e["stage3b.escape_samples"].items.map(S=>S.t316)):/^L[1-5]$/.test(ae)?Le.key=Se[ae].slice(0,1):ae==="halo_main"?(Le.key=[je.main.period,je.main.zmax,ye.annual_3C,ye.annual_4C],Le.more=e["stage4.reference"].numbers):ae==="Earth"||ae==="Moon"?Le.expert=Se[ae]:ae==="JWST"?Le.key=re(["jwst_err_R5","jwst_err_R5_jpl","jwst_err_range"],st):ae==="jwst_period"&&X&&(Le.key=X.period_card.items),Le}return{mode:o,views:l,timeHead:W,timeSlider:K,timeDate:ee,layers:q,nums:te,legend:xe,rows:i,rerender:()=>{C(),I(),H._render(),h.textContent=me(h.dataset.i18n);for(let ae of i)ae._render();for(let ae of Te)ae._render()},dateItem:g,card:Be,nameOf:Ke,NAME:Ie,sections:Re,jwstBody:(ae,Le)=>ff(e,s,t.openSource,ae,Le,null),periodBody:ae=>pf(e,s,t.openSource,ae),utcTable:y,hasSphere:ae=>!!n.items.find(Le=>Le.kind==="sphere"&&Le.pick===ae)}}var $g=typeof document<"u"?document.createElement("template"):null,EM={mark:'<circle cx="7" cy="12" r="3.2"/><circle cx="14.5" cy="12" r="1.4"/><path d="M19.5 12h0" stroke-width="3"/><path d="M3 12c0-6 18-6 18 0s-18 6-18 0" opacity=".45"/>',search:'<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',layers:'<path d="M12 4l8 4.5-8 4.5-8-4.5z"/><path d="M4 12.5l8 4.5 8-4.5"/><path d="M4 16.5l8 4.5 8-4.5"/>',gear:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',pause:'<path d="M8 5.5v13M16 5.5v13" stroke-width="3"/>',chev:'<path d="M6 9l6 6 6-6"/>',chevr:'<path d="M9 6l6 6-6 6"/>',fly:'<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8" opacity=".0"/><path d="M9 15l6-6M10 9h5v5"/>',focus:'<circle cx="12" cy="12" r="2.2"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',cal:'<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',now:'<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',share:'<circle cx="6.5" cy="12" r="2.2"/><circle cx="17.5" cy="6.5" r="2.2"/><circle cx="17.5" cy="17.5" r="2.2"/><path d="M8.5 11l7-3.5M8.5 13l7 3.5"/>',download:'<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M5 19.5h14"/>',tour:'<path d="M5 19c3-1 3-6 7-7s4-6 7-7"/><circle cx="5" cy="19" r="1.6" fill="currentColor"/><circle cx="19" cy="5" r="1.6" fill="currentColor"/>',lab:'<path d="M9.5 3.5h5M10.5 3.5v5L5 18.5a1.5 1.5 0 0 0 1.3 2.2h11.4a1.5 1.5 0 0 0 1.3-2.2L13.5 8.5v-5"/><path d="M7.5 14.5h9"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',sun:'<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',planet:'<circle cx="12" cy="12" r="5"/><path d="M3.5 15.5c2 1.5 15 -3 17 -7" />',point:'<path d="M12 6v12M6 12h12" /><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/>',orbit:'<ellipse cx="12" cy="12" rx="9" ry="5"/><circle cx="19.5" cy="9.8" r="1.6" fill="currentColor"/>',craft:'<rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M3 9.5h5v5H3zM16 9.5h5v5h-5z"/><path d="M8 12h1.5M14.5 12H16"/>',view:'<path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.6"/>',info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.4"/>',keyboard:'<rect x="3" y="6.5" width="18" height="11" rx="2"/><path d="M7 10.5h0M10.5 10.5h0M14 10.5h0M17.5 10.5h0M8 14h8"/>',lang:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c-3 3-3 14 0 17M12 3.5c3 3 3 14 0 17"/>',t_impl:'<circle cx="12" cy="12" r="8" fill="currentColor" stroke="none"/>',t_ext:'<path d="M12 2.5l9.5 9.5-9.5 9.5L2.5 12z" fill="currentColor" stroke="none"/>',t_phys:'<path d="M12 3l10 17.5H2z" fill="currentColor" stroke="none"/>',t_approx:'<path d="M2.5 10c3-4 6-4 9.5 0s6.5 4 9.5 0M2.5 16c3-4 6-4 9.5 0s6.5 4 9.5 0" stroke-width="3"/>'};function An(n,{size:e,cls:t}={}){let i=EM[n];if(i===void 0)throw new Error("\uC544\uC774\uCF58 \uC5C6\uC74C: "+n);$g.innerHTML="<svg></svg>";let s=$g.content.firstChild;return s.remove(),s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.7"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),s.setAttribute("aria-hidden","true"),s.setAttribute("focusable","false"),e&&(s.setAttribute("width",String(e)),s.setAttribute("height",String(e))),t&&s.setAttribute("class",t),s.innerHTML=i,s}function Fa(n,e,t={},...i){let s=document.createElement(n);e&&(s.className=e);for(let[r,a]of Object.entries(t))a!=null&&s.setAttribute(r,String(a));return s.append(...i.filter(r=>r!=null)),s}function Di(n,{label:e,iconName:t,pressed:i,title:s,busyLabel:r}={}){let a=Fa("button",`k-btn k-${n}`,{type:"button",title:s||(n==="icon"?e:void 0)});if(n==="icon")return a.setAttribute("aria-label",e),a.append(An(t)),a;if(n==="toggle")return a.setAttribute("aria-pressed",String(!!i)),a.append(Fa("span","k-ind",{},An("check")),e),a.addEventListener("click",()=>a.setAttribute("aria-pressed",String(a.getAttribute("aria-pressed")!=="true"))),a;t&&a.append(An(t));let o=Fa("span","k-label",{},e);return a.append(Fa("span","k-spin",{"aria-hidden":"true"}),o),n==="primary"&&a.append(An("chevr",{cls:"k-arrow"})),a.setBusy=l=>{a.classList.toggle("is-busy",l),a.setAttribute("aria-busy",String(l)),o.textContent=l&&r?r:e},a}function mf(n,{label:e,wide:t=!1}={}){let i=Fa("aside",`k-vpanel k-${n}${t?" k-wide":""}`,{"aria-label":e,"data-open":"false"});return i.setOpen=s=>i.setAttribute("data-open",String(!!s)),i}function gf(n){return Fa("div",`k-scrim k-${n}`,{"aria-hidden":"true"})}var Ct=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=me(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},yf=[{id:"bodies",layers:["sun","earth","moon","emb","planets","lpoints"]},{id:"orbits",layers:["halo_main","halo_family","escape","ref","burns","moon_orbit","planet_orbits","dirs","jwst","jwst_ext","jwst_phys"]},{id:"numbers",layers:["n_distance","n_period","n_angle","n_annual","n_escape","n_jwst","n_tags"]},{id:"aux",layers:["labels","scale","grid","axes","stars","milkyway","nightlights","sunglow","clouds"]}],ns=yf.flatMap(n=>n.layers),Ku=n=>Object.fromEntries(ns.map(e=>[e,n.includes(e)])),Zu=Object.fromEntries(yf.map(n=>[n.id,n.layers])),TM={clean:Ku(["sun","earth","moon","emb","planets","lpoints","halo_main","moon_orbit","planet_orbits","jwst","n_tags","labels","stars","milkyway","nightlights","sunglow","clouds"]),explore:Ku([...Zu.bodies,...Zu.orbits,"labels","scale","stars","milkyway","nightlights","sunglow","clouds"]),research:Ku(ns)},AM={m1:Ku(ns.filter(n=>!["scale","grid","axes","stars","milkyway","nightlights","sunglow","clouds","planet_orbits"].includes(n)))},Yu=["clean","explore","research"],Yg=[["L","labels"],["O","g:orbits"],["N","g:numbers"],["B","g:bodies"],["G","grid"],["1","p:clean"],["2","p:explore"],["3","p:research"],["?","help"]],Jg={sun:n=>n.name==="Sun"||n.name==="Sun_sphere",earth:n=>n.name==="Earth"||n.name==="Earth_sphere",moon:n=>n.name==="Moon"||n.name==="Moon_sphere",emb:n=>n.name==="EMB",planets:n=>n.layer==="planets",lpoints:n=>n.layer==="lpoints",halo_main:n=>n.name==="halo_main"||n.name==="halo_main_label",halo_family:n=>!!n.familyLine,escape:n=>n.layer==="escape",ref:n=>n.layer==="ref",burns:n=>n.layer==="burns",moon_orbit:n=>n.name==="moon_trail",planet_orbits:n=>n.layer==="planet_orbits",dirs:n=>n.layer==="dirs",jwst:n=>n.layer==="jwst",jwst_ext:n=>n.layer==="jwst_ext",jwst_phys:n=>n.layer==="jwst_phys",grid:n=>n.name==="grid",axes:n=>n.name.startsWith("axes_"),stars:n=>n.name==="stars",milkyway:n=>n.name==="milkyway"},CM=["nightlights","sunglow","clouds"],Kg={clean:["jwst"]},Zg="lagrange.layers",Qg={get(){try{return JSON.parse(localStorage.getItem(Zg)||"null")}catch{return null}},set(n){try{localStorage.setItem(Zg,JSON.stringify(n))}catch{}}},Ju=["escape","burns","dirs"],_f="lagrange.layers_expert",xf={get(){try{return JSON.parse(localStorage.getItem(_f)||"null")}catch{return null}},set(n){try{localStorage.setItem(_f,JSON.stringify(n))}catch{}},clear(){try{localStorage.removeItem(_f)}catch{}}};function RM(n){let e=n*110,t=10**Math.floor(Math.log10(e)),i=e/t;return(i>=5?5:i>=2?2:1)*t}var PM=n=>n>=1?Math.round(n).toLocaleString("en-US"):String(Number(n.toPrecision(1)));function e0(n,e){let t={...TM,...AM},i=e.persist?Qg.get():null,s={preset:e.initial,state:{...t[e.initial]},labelNumbers:!0,familyAll:!1,temp:null,zoomOn:!1,noSave:!1,modeKey:null},r=()=>s.temp?{...s.state,...Object.fromEntries([...s.temp].map(D=>[D,!0]))}:s.state;if(i&&i.state&&typeof i.state=="object"){for(let D of ns)typeof i.state[D]=="boolean"&&(s.state[D]=i.state[D]);s.preset=Yu.includes(i.preset)||i.preset==="custom"?i.preset:"custom",s.familyAll=!!i.familyAll}let a=[],o=Ct("span",{class:"sb-bar"}),l=Ct("span",{class:"sb-text"}),c=Ct("div",{id:"scalebar",class:"scalebar",hidden:!0,"data-obstacle":"","data-aux":"tick","data-source":"screen scale (camera distance, field of view \u2014 browser drawing aid)","data-verification":"display/approx"},o,l,qn()),d="";n.onRender.push(D=>{if(c.hidden)return;let O=D.kmPerPx(),U=RM(O),W=U/O,K=`${U}|${W.toFixed(1)}`;K!==d&&(d=K,o.style.width=`${W.toFixed(1)}px`,l.textContent=`${PM(U)} km`,c.dataset.km=String(U))});let h=()=>s.modeKey?[...Yg.filter(([,D])=>!D.startsWith("p:")),["1","m:general"],["2","m:expert"]]:Yg,u=Ct("div",{id:"help",class:"help",hidden:!0,role:"dialog","data-obstacle":"","data-meta":""}),f=[["L","labels"],["O","g_orbits"],["N","g_numbers"],["B","g_bodies"],["G","grid"],["1","m_general"],["2","m_expert"],["E","export"],["/","search"],["T","targets"],["?","help"],["Esc","esc"],["\u2190 \u2192","tour"]];function m(){let D=s.modeKey?f.map(([U,W])=>[U,"keyc."+W]):h().map(([U,W])=>[U,"key."+W.replace(":","_")]);u.replaceChildren(Ct("h3",{i18n:"help.title"}),Ct("table",{},Ct("tbody",{},...D.map(([U,W])=>Ct("tr",{},Ct("th",{},...U.split(" ").map(K=>Ct("kbd",{},K))),Ct("td",{i18n:W}))))),Ct("p",{class:"note",i18n:s.modeKey?"help.note_c":"help.note"}));let O=Ct("button",{type:"button",class:"close",i18n:"source.close"});O.addEventListener("click",()=>{u.hidden=!0}),u.prepend(O)}m();let y=[];function p(){for(let D of n.items)D.familyRest&&(D.wanted=s.familyAll,D.obj.visible=n.wantVisible(D))}function g(){let D=r();for(let[O,U]of Object.entries(Jg))n.setItemsVisible(U,!!D[O]);if(n.setGraphic)for(let O of CM)n.setGraphic(O,!!D[O]);for(let O of new Set(Object.values(Kg).flat()))n.setItemsDimmed(Jg[O],(Kg[s.preset]||[]).includes(O));p(),n.setLabelsVisible(D.labels),Ap((O,U)=>D.n_tags?U==="key"?!0:O!=="n_other"&&!D[O]?!1:U==="label"?D.labels&&(s.labelNumbers||s.zoomOn&&O==="n_jwst"):!0:!1),cs(),c.hidden=!D.scale,d="",e.persist&&!s.noSave&&Qg.set({preset:s.preset,state:s.state,familyAll:s.familyAll}),document.body.dataset.preset=s.preset,s.temp?document.body.dataset.zoomTemp="":delete document.body.dataset.zoomTemp;for(let O of a)O(s)}function C(D){s.noSave=!1,s.preset=D,s.state={...t[D]},g()}function I(D){for(let O of ns)typeof D[O]=="boolean"&&(s.state[O]=D[O]);s.preset="custom",s.noSave=!0,g()}function v(D,O){s.noSave=!1,s.state[D]=O,s.preset="custom",s.temp&&s.temp.delete(D),g()}function M(D,O="zoom"){let U=new Set(D.filter(W=>!s.state[W]));s.temp=U.size?U:null,s.tempWhy=O,s.zoomOn=O==="zoom",g()}function w(D="zoom"){s.tempWhy===D&&(s.temp=null,s.tempWhy=null,s.zoomOn=!1,g())}function N(D){let O=Zu[D],U=O.some(W=>s.state[W]);s.noSave=!1;for(let W of O)s.state[W]=!U,s.temp&&s.temp.delete(W);s.preset="custom",g()}function b(D){s.labelNumbers=D,g()}function R(D,O){if(!(s.noSave||D===O)){if(D==="general"){let U=Ju.filter(W=>s.state[W]);if((O==="expert"||U.length)&&xf.set(Object.fromEntries(Ju.map(W=>[W,!!s.state[W]]))),!U.length)return;for(let W of U)s.state[W]=!1}else if(D==="expert"&&O!=="expert"){let U=xf.get();if(xf.clear(),!U||typeof U!="object"||!Ju.some(W=>U[W]===!0&&!s.state[W]))return;for(let W of Ju)U[W]===!0&&(s.state[W]=!0)}else return;s.preset=Yu.find(U=>ns.every(W=>!!t[U][W]==!!s.state[W]))||"custom",g()}}function B(D){if(D.ctrlKey||D.metaKey||D.altKey)return!1;let O=D.target&&D.target.tagName||"";if(O==="INPUT"||O==="SELECT"||O==="TEXTAREA")return!1;let U=D.key.length===1?D.key.toUpperCase():D.key,W=h().find(([H])=>H===U);if(!W)return!1;let K=W[1];return K.startsWith("m:")?(s.modeKey(K.slice(2)),!0):e.mobile&&!K.startsWith("p:")&&K!=="help"?!1:(K==="help"?(u.hidden=!u.hidden,u.hidden||yt(u)):K.startsWith("p:")?C(K.slice(2)):K.startsWith("g:")?N(K.slice(2)):v(K,!s.state[K]),!0)}function $(){let D=Ct("div",{class:"layer-panel"}),O=Ct("div",{class:"preset-row",role:"group"}),U={};for(let ie of Yu){let te=Ct("button",{type:"button",id:"preset-"+ie,i18n:"preset."+ie});te.addEventListener("click",()=>C(ie)),U[ie]=te,O.append(te)}let W=Ct("span",{id:"preset-status",class:"preset-status",i18n:"preset.custom"}),K=Ct("span",{id:"preset-zoom",class:"preset-status",i18n:"preset.zooming",hidden:!0});O.append(W,K),D.append(O);let H={},ee=null;if(!e.mobile){for(let se of yf){let he=Ct("fieldset",{class:"layer-group","data-meta":""},Ct("legend",{i18n:"layer.g_"+se.id}));for(let Ne of se.layers){let Ee=Ct("input",{type:"checkbox",id:"lay-"+Ne});Ee.addEventListener("change",()=>v(Ne,Ee.checked)),H[Ne]=Ee,he.append(Ct("label",{},Ee,Ct("span",{i18n:"layer."+Ne}),...Ne==="planet_orbits"?[document.createTextNode(" "),qn()]:[])),Ne==="halo_family"&&(ee=Ct("input",{type:"checkbox",id:"lay-family-all"}),ee.addEventListener("change",()=>{s.familyAll=ee.checked,g()}),he.append(Ct("label",{class:"sub"},ee,Ct("span",{i18n:"l2.family_all"}))))}se.id==="numbers"&&he.append(Ct("p",{class:"note",i18n:"layer.tags_note"})),D.append(he)}let ie=Ct("button",{type:"button",id:"help-btn",class:"help-btn",i18n:"help.button"});ie.addEventListener("click",()=>{u.hidden=!u.hidden,u.hidden||yt(u)});let te=Ct("span",{i18n:s.modeKey?"help.keys_line_c":"help.keys_line"});y.push(te),D.append(Ct("div",{class:"keys-line","data-meta":""},te,ie))}let q=()=>{for(let te of Yu)U[te].classList.toggle("on",s.preset===te);W.hidden=s.preset!=="custom",K.hidden=!s.temp,K.dataset.i18n=s.tempWhy==="tour"?"preset.touring":"preset.zooming",K.textContent=me(K.dataset.i18n);let ie=r();for(let[te,se]of Object.entries(H))se.checked=!!ie[te],se.parentElement.classList.toggle("temp-on",!!(s.temp&&s.temp.has(te)));for(let te of Zu.numbers)H[te]&&te!=="n_tags"&&(H[te].disabled=!ie.n_tags);ee&&(ee.checked=s.familyAll,ee.disabled=!s.state.halo_family)};return a.push(q),q(),D}return{get state(){return s.state},get preset(){return s.preset},get labelNumbers(){return s.labelNumbers},get effective(){return r()},get temp(){return s.temp?[...s.temp].sort():[]},applyAll:g,setPreset:C,set:v,toggleGroup:N,setLabelNumbers:b,handleKey:B,panel:$,setTemp:M,clearTemp:w,applyShared:I,modeLayers:R,setModeKeys(D){s.modeKey=D,m();for(let O of y)O.dataset.i18n="help.keys_line_c",O.textContent=me("help.keys_line_c")},get noSave(){return s.noSave},onChange(D){a.push(D)},elements:{scalebar:c,help:u},rerender(){m()},census:Cp}}var t0=1.8,fl=[{id:"solar",cam:n=>({...Un.solar,dist:Math.max(Un.solar.dist,n.orbitFitDist(1.2))}),layers:["sun","earth","planets","planet_orbits","labels"],nums:[]},{id:"emb",cam:()=>({...Un.emb}),layers:["earth","moon","emb","lpoints","moon_orbit","labels","n_tags"],nums:[["L2","L2_dist"]]},{id:"l2",cam:()=>({target:"L2",dist:16e5,az:-1.2,el:.75}),layers:["lpoints","dirs","escape","labels","n_tags"],nums:[]},{id:"halo",cam:()=>({target:"L2",dist:26e5,az:-.75,el:.32}),layers:["lpoints","halo_main","labels","n_tags"],nums:[["halo_main","halo_period"],["halo_main","halo_zmax"]]},{id:"jwst",cam:()=>({...Un.jwst}),layers:["lpoints","jwst","labels","n_tags"],nums:[["jwst_period","jwst_period_recon"]]},{id:"dv",cam:()=>({...Un.l2}),fit:["halo_main","jwst_10m","jwst_interp"],layers:["lpoints","halo_main","burns","labels","n_tags"],nums:[["halo_main","annual_4C"]]},{id:"expert",cam:null,layers:["labels","n_tags"],nums:[],highlight:"mode-expert"}],LM=()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}},IM=n=>Math.atan2(Math.sin(n),Math.cos(n)),NM=16,DM=40;function UM(n,e,t,i){let s=(n.items||[]).filter(m=>t.includes(m.name)&&m.obj&&m.obj.visible),r=n.anchors&&n.anchors[e.target],a=document.getElementById("scene");if(!s.length||!r||!a||!i)return null;let o=0;for(let m of s)for(let y=0;y<m.src.length;y+=3)o=Math.max(o,Math.hypot(m.src[y]-r[0],m.src[y+1]-r[1],m.src[y+2]-r[2]));let l=a.getBoundingClientRect(),c=l.left+l.width/2,d=l.top+l.height/2,h=l.top;for(let m of["nav","tr"]){let y=document.getElementById(m);y&&y.offsetParent!==null&&(h=Math.max(h,y.getBoundingClientRect().bottom))}let u=Math.min(i.getBoundingClientRect().top-d,d-h,c-l.left,l.right-c)-NM;if(!(u>=DM)||!(o>0))return null;let f=n.kmPerPx()*l.height/(2*n.state.cam.dist);return o/Math.sin(Math.atan(u*f/(l.height/2)))}function n0(n){let{view:e,layers:t,P:i,table:s,mobile:r}=n,a={active:!1,paused:!1,index:0,anim:null,hl:null,rows:[]},o=k("span",{class:"k-tstep",id:"tour-step","data-meta":""}),l=k("h3",{class:"k-ttitle",id:"tour-title","data-meta":""}),c=k("p",{class:"k-ttext",id:"tour-text","data-meta":""}),d=k("p",{class:"k-tpaused",id:"tour-paused",hidden:!0},k("span",{"data-meta":"",i18n:"tour.paused"})),h=Di("secondary",{label:me("tour.resume")});h.id="tour-resume",h.querySelector(".k-label").dataset.i18n="tour.resume",d.append(h);let u=Di("secondary",{label:me("tour.prev")});u.id="tour-prev",u.querySelector(".k-label").dataset.i18n="tour.prev",u.prepend(An("chevr",{cls:"k-flip"}));let f=Di("primary",{label:me("tour.next")});f.id="tour-next";let m=Di("icon",{label:me("tour.end"),iconName:"close"});m.id="tour-end",m.dataset.i18nAria="tour.end",m.dataset.i18nTitle="tour.end",m.classList.add("k-close");let y=k("span",{class:"k-tkeys","data-meta":"",i18n:"tour.keys",hidden:!!r}),p=k("section",{id:"tour",class:"k-tour",role:"region","data-obstacle":"","data-i18n-aria":"tour.label","aria-label":me("tour.label"),hidden:!0},k("div",{class:"k-thead"},k("span",{class:"k-tname","data-meta":""},An("tour"),k("span",{i18n:"tour.label"})),o,m),k("div",{"aria-live":"polite"},l,c),d,k("div",{class:"k-tfoot"},u,y,f));n.reg(p),document.body.append(p);function g([H,ee]){let q=i.sections(H);return[...q.key,...q.more,...q.expert].find(ie=>ie&&ie.id===ee)||null}function C(H){let ee=H.provenance,q=k("span",{class:"num-row k-tnum"});q.dataset.source=yi(ee),q.dataset.verification=`${ee.verification.tag}/${ee.verification.detail}`;let ie=H.unit&&typeof H.unit=="object"?H.unit[Vn()]??H.unit.ko:H.unit,te=k("button",{type:"button",class:"num k-tval"},H.text+(ie?ie==="\xB0"||ie==="\xD7"?ie:` ${ie}`:""));return te.dataset.source=q.dataset.source,te.dataset.verification=q.dataset.verification,te.dataset.id=H.id,te.setAttribute("aria-label",`${n.numberName(H)} ${te.textContent}`),te.addEventListener("click",()=>e.model.openSource(H)),q.append(te,oi(ee.verification,s)),q._item=H,Ls(q,H.id,"key"),q}function I(){for(let H of a.rows)Gr(H);a.rows=[]}function v(){let H=fl[a.index],ee=fl.length;o.textContent=me("tour.step",{i:a.index+1,n:ee}),o.setAttribute("aria-label",me("tour.step_aria",{i:a.index+1,n:ee})),l.textContent=me(`tour.${H.id}_title`),I();let q=H.id==="expert"&&r?"tour.expert_text_touch":`tour.${H.id}_text`,ie=Object.fromEntries(H.nums.map((he,Ne)=>[`n${Ne}`,`{n${Ne}}`])),te=me(q,ie).split(/(\{n\d\})/);c.replaceChildren(...te.map(he=>{let Ne=/^\{n(\d)\}$/.exec(he);if(!Ne)return document.createTextNode(he);let Ee=g(H.nums[+Ne[1]]);if(!Ee)throw new Error(`\uB458\uB7EC\uBCF4\uAE30 \uC22B\uC790 \uC5C6\uC74C: ${H.nums[+Ne[1]].join("/")}`);let Ue=C(Ee);return a.rows.push(Ue),Ue})),cs(),n.decorateTags(p),u.disabled=a.index===0;let se=a.index===ee-1;f.querySelector(".k-label").textContent=me(se?"tour.finish":"tour.next"),d.hidden=!a.paused,p.dataset.station=H.id,p.dataset.paused=a.paused?"1":"0",yt(p)}function M(){a.anim&&(cancelAnimationFrame(a.anim.raf),a.anim=null)}function w(H){if(M(),!H.cam)return;let ee=H.cam(e);if(H.fit){let Ue=UM(e,ee,H.fit,p);Ue&&(ee.dist=Math.min(e.zoomOutMax(),Math.max(e.zoomFloorKm(),Ue)))}if(a.fitDist=H.fit?ee.dist:null,LM()){e.setCamera(ee);return}let q=e.state.cam,ie=q.az,te=q.el,se=IM(ee.az-ie),he=ee.el-te;e.flyTo(ee.target,ee.dist,t0);let Ne=performance.now(),Ee=()=>{if(!a.anim)return;let Ue=Math.min(1,(performance.now()-Ne)/(t0*1e3)),X=Ue<.5?4*Ue**3:1-(-2*Ue+2)**3/2;q.az=ie+se*X,q.el=te+he*X,Ue<1?a.anim.raf=requestAnimationFrame(Ee):a.anim=null};a.anim={raf:requestAnimationFrame(Ee)}}function N(H){a.hl&&(a.hl.classList.remove("k-tourhl"),a.hl=null);let ee=H&&document.getElementById(H);ee&&(ee.classList.add("k-tourhl"),a.hl=ee)}function b(H){a.index=Math.max(0,Math.min(fl.length-1,H)),a.paused=!1;let ee=fl[a.index];t.setTemp(ee.layers,"tour"),v(),w(ee),N(ee.highlight)}function R(H=0){a.active||(a.active=!0,p.hidden=!1,document.body.classList.add("touring"),n.onStart&&n.onStart()),b(H),f.focus({preventScroll:!0})}function B(){a.active&&(a.active=!1,a.paused=!1,M(),N(null),I(),t.clearTemp("tour"),p.hidden=!0,document.body.classList.remove("touring"),delete p.dataset.station,n.onEnd&&n.onEnd())}function $(){a.index>=fl.length-1?B():b(a.index+1)}function D(){a.index>0&&b(a.index-1)}function O(){b(a.index),f.focus({preventScroll:!0})}function U(){!a.active||a.paused||(a.paused=!0,M(),d.hidden=!1,p.dataset.paused="1")}f.addEventListener("click",$),u.addEventListener("click",D),m.addEventListener("click",B),h.addEventListener("click",O);let W=H=>{if(!a.active||!H.isTrusted)return;let ee=H.target;ee&&(ee.id==="scene"||ee.closest&&ee.closest("#labels"))&&U()};for(let H of["pointerdown","wheel","touchstart"])window.addEventListener(H,W,{capture:!0,passive:!0});function K(H){if(!a.active||H.ctrlKey||H.metaKey||H.altKey)return!1;if(H.key==="Escape")return e.state.fly&&e.setCamera({dist:e.state.fly.d0}),B(),!0;let ee=H.target,q=ee&&ee.tagName||"";return q==="INPUT"||q==="SELECT"||q==="TEXTAREA"||ee&&ee.closest&&ee.closest("[role=tablist], [role=slider], [role=radiogroup]")?!1:H.key==="ArrowRight"?($(),!0):H.key==="ArrowLeft"?(D(),!0):!1}return{el:p,start:R,end:B,next:$,prev:D,resume:O,pause:U,handleKey:K,render:v,get active(){return a.active},get paused(){return a.paused},get index(){return a.index},get fitDist(){return a.fitDist??null}}}var kM=6,vf=.6,OM=.6;function i0(n,e){let t=Math.max(240,Math.round(n-e-112));return{half:Math.min(t,Math.round(n*.52)),full:t}}function bf(n,{onClose:e,heights:t}){let i=k("span",{class:"k-grabbar","aria-hidden":"true"}),s=k("button",{type:"button",class:"k-grab","aria-expanded":"false","data-meta":""},i),r="half",a=null,o=!1;function l(){let h=r==="full"?"sheet.collapse":"sheet.expand";s.setAttribute("aria-label",me(h)),s.title=me(h),s.dataset.i18nAria=h,s.dataset.i18nTitle=h}function c(h){r=h==="full"?"full":"half",n.dataset.sheet=r,s.setAttribute("aria-expanded",String(r==="full")),l()}s.addEventListener("pointerdown",h=>{if(!(h.button>0)){a={y0:h.clientY,t0:performance.now(),h0:n.getBoundingClientRect().height},o=!1;try{s.setPointerCapture(h.pointerId)}catch{}}}),s.addEventListener("pointermove",h=>{if(!a)return;let u=h.clientY-a.y0;!o&&Math.abs(u)>kM&&(o=!0,n.classList.add("k-dragging")),o&&(n.style.height=`${Math.max(0,Math.min(t().full,a.h0-u))}px`)});function d(h,u){if(!a)return;let f=h.clientY-a.y0,m=f/Math.max(1,performance.now()-a.t0),y=a.h0-f;if(a=null,n.classList.remove("k-dragging"),n.style.height="",!o||u)return;let{half:p,full:g}=t();y<p*OM||m>vf&&r==="half"?(c("half"),e()):m>vf?c("half"):m<-vf?c("full"):c(Math.abs(y-g)<Math.abs(y-p)?"full":"half")}return s.addEventListener("pointerup",h=>d(h,!1)),s.addEventListener("pointercancel",h=>d(h,!0)),s.addEventListener("click",h=>{if(o){o=!1,h.preventDefault();return}c(r==="full"?"half":"full")}),c("half"),{grab:s,set:c,reset:()=>c("half"),relabel:l,get state(){return r}}}var FM=4e3,s0={impl:"t_impl",external:"t_ext",physical:"t_phys",approx:"t_approx"},r0=[1,10,30],BM=()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}},wf=n=>({get(){try{return localStorage.getItem(n)}catch{return null}},set(e){try{localStorage.setItem(n,e)}catch{}}}),a0=wf("lagrange.mode"),Sf=wf("lagrange.hint"),o0=wf("lagrange.hint_expert"),Mf=[{g:"tour",rows:[{id:"tgt-tour",icon:"tour",key:"tgt.tour",tour:!0}]},{g:"views",rows:[{id:"view-all",icon:"view",key:"l2.view_solar",view:"all",info:"v_all"},{id:"view-emb",icon:"view",key:"l2.view_emb",view:"emb",info:"v_emb"},{id:"view-l2zoom",icon:"view",key:"l2.view_l2zoom",view:"l2zoom",info:"v_l2zoom"}]},{g:"points",rows:["L1","L2","L3","L4","L5"].map(n=>({id:"tgt-"+n,icon:"point",pick:n}))},{g:"orbits",rows:[{id:"tgt-halo_main",icon:"orbit",pick:"halo_main"},{id:"view-jwst",icon:"craft",pick:"JWST",view:"jwst"},{id:"tgt-jwst_period",icon:"craft",pick:"jwst_period"}]},{g:"bodies",rows:["Sun","Earth","Moon","EMB","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"].map(n=>({id:"tgt-"+n,icon:n==="Sun"?"sun":"planet",pick:n,only:n==="EMB"?"expert":void 0}))},{g:"tools",rows:[{id:"view-lab",icon:"lab",key:"l2.view_lab",tool:"lab",only:"expert"},{id:"all-numbers",icon:"info",key:"ui.numbers",tool:"all",only:"expert"}]}],l0={L1:"point",L2:"point",L3:"point",L4:"point",L5:"point",halo_main:"orbit",JWST:"craft",jwst_period:"period",Sun:"star",Earth:"planet",Moon:"moon",EMB:"bary",Mercury:"system",Venus:"system",Mars:"system",Jupiter:"system",Saturn:"system",Uranus:"system",Neptune:"system"};function c0(n,e){return e==="general"&&_o("numg."+n.id)?me("numg."+n.id):Tt(n.label)}function u0(n,e,t,i,s){let r=document.body,a=t.model.table,o=e.utcTable,l=T=>s.setLabelNumbers(T);s.labelNumbersDefault=n.label.numbers,r.dataset.mode="general",i&&r.classList.add("k-touch");let c={layout:n.layout},d=!1,h=[],u=T=>(T.dataset.shell="",h.push(T),T),f=(T,J)=>{BM()?t.setCamera({target:T,dist:J}):t.flyTo(T,J)},m=T=>An(T),y=(T,J,ue,ke)=>{let Ze=Di("icon",{label:me(J),iconName:ue});return Ze.id=T,Ze.dataset.i18nAria=J,ke?Ze.dataset.i18nTitle=ke:Ze.dataset.i18nTitle=J,Ze};document.getElementById("panel").hidden=!0;let p=document.getElementById("credits");p&&p.remove(),r.append(s.elements.scalebar,s.elements.help),document.getElementById("source").dataset.obstacle="";let g=document.getElementById("source");r.append(gf("top"),gf("bottom"));let C=null,I=null,v={};function M(T,J){let ue=k("div",{id:T,class:"k-pop",role:"dialog","aria-label":J?me(J):"","data-obstacle":"",hidden:!0});return J&&(ue.dataset.i18nAria=J),u(ue),r.append(ue),v[T]=ue,ue}function w(T,J,ue){T.style.left=T.style.right=T.style.top=T.style.bottom="";let ke=innerWidth,Ze=innerHeight,dt=i?8:12,Lt=Math.min(T.offsetWidth||300,ke-2*dt),Ut=J.closest&&J.closest("#info .num-row");if(Ut){T.classList.add("k-pop-inline");let Ht=Ut;if(Ut.parentElement&&Ut.parentElement.classList.contains("k-key")){let rs=Ut.offsetTop;for(let Gt=Ut.nextElementSibling;Gt;Gt=Gt.nextElementSibling)if(Gt!==T){if(Gt.offsetTop!==rs)break;Ht=Gt}}Ht.after(T),T.scrollIntoView({block:"nearest"});return}T.classList.remove("k-pop-inline"),T.parentNode!==r&&r.append(T);let Xt=J.getBoundingClientRect(),fn=ue==="right"?Xt.right-Lt:Xt.left+Xt.width/2-Lt/2;fn=Math.max(dt,Math.min(ke-dt-Lt,fn)),T.style.left=`${Math.round(fn)}px`,Xt.top>Ze/2?T.style.bottom=`${Math.round(Ze-Xt.top+8)}px`:T.style.top=`${Math.round(Xt.bottom+8)}px`}function N(T,J,ue){C&&C!==T&&b(!1),C=T,I=J||null,T.hidden=!1,yt(T),J&&(J.setAttribute("aria-expanded","true"),w(T,J,ue)),zi()}function b(T=!0){C&&(C.hidden=!0,I&&(I.setAttribute("aria-expanded","false"),T&&I.focus({preventScroll:!0})),C=null,I=null,is())}let R=(T,J,ue)=>C===T?b():N(T,J,ue);c.closePop=b;let B=An("mark");B.setAttribute("role","img"),B.removeAttribute("aria-hidden"),B.classList.add("k-mark"),B.insertAdjacentHTML("afterbegin","<title></title>");let $=B.firstChild,D=k("span",{id:"focus",class:"k-tname","data-meta":""}),O=k("small",{class:"k-tkind","data-meta":""}),U=k("button",{type:"button",id:"target-btn",class:"k-btn k-target","aria-haspopup":"dialog","aria-expanded":"false","aria-controls":"targets","data-i18n-title":"nav.targets"},D,O,m("chev")),W=k("div",{id:"zoom-norecon",class:"k-znote","data-meta":""}),K=u(k("nav",{id:"nav",class:"k-nav k-bare","data-obstacle":"","data-i18n-aria":"nav.label"},k("div",{class:"k-navrow"},B,U)));r.append(K);let H=y("search-btn","tr.search","search","tr.search_title");H.dataset.only="expert";let ee=y("layers-btn","ui.layers","layers");ee.setAttribute("aria-haspopup","dialog"),ee.setAttribute("aria-expanded","false");let q=k("button",{type:"button",id:"mode-general",role:"radio","aria-checked":"true",i18n:"mode.general","data-meta":""}),ie=k("button",{type:"button",id:"mode-expert",role:"radio","aria-checked":"false",i18n:"mode.expert","data-meta":""}),te=k("div",{class:"k-seg k-modesel",role:"radiogroup","data-i18n-aria":"mode.label"},q,k("span",{class:"k-dot","aria-hidden":"true"}),ie),se=y("settings-btn","tr.settings","gear");se.setAttribute("aria-haspopup","dialog"),se.setAttribute("aria-expanded","false");let he=y("export-btn","export.button","share");he.dataset.only="expert",he.setAttribute("aria-haspopup","dialog"),he.setAttribute("aria-expanded","false");let Ne=u(k("div",{id:"tr",class:"k-tr k-bare",role:"toolbar","data-obstacle":"","data-i18n-aria":"tr.label"},he,H,ee,te,se));r.append(Ne);let Ee=M("pop-layers","ui.layers");Ee.classList.add("k-pop-wide");let Ue=Di("toggle",{label:"",pressed:t.trueSize});Ue.id="true-size",Ue.querySelector(".k-ind").after(k("span",{i18n:"view.true_size"})),Ue.dataset.i18nTitle="view.true_size_title",Ue.addEventListener("click",()=>{t.setTrueSize(Ue.getAttribute("aria-pressed")==="true")});let X=k("button",{type:"button",id:"layers-mode-default",class:"k-btn k-secondary",i18n:"layer.mode_default"});X.addEventListener("click",()=>s.setPreset(re==="expert"?"research":"clean")),Ee.append(k("div",{class:"k-popsect","data-meta":""},k("h4",{i18n:"layer.view_options"}),Ue,X),s.panel()),ee.addEventListener("click",()=>R(Ee,ee,"right"));let Z=M("pop-settings","tr.settings"),xe=document.getElementById("lang");xe.classList.add("k-btn","k-secondary");let Se=k("button",{type:"button",id:"settings-help",class:"k-btn k-secondary",i18n:"help.button"});Se.addEventListener("click",()=>{b(!1),s.elements.help.hidden=!1,yt(s.elements.help)});let ve=document.getElementById("version");Z.append(k("div",{class:"k-popsect","data-meta":""},k("h4",{i18n:"settings.lang"}),xe),k("div",{class:"k-popsect"},k("h4",{"data-meta":"",i18n:"settings.legend"}),e.legend),k("div",{class:"k-popsect","data-meta":""},k("h4",{i18n:"settings.keys"}),Se),k("div",{class:"k-popsect","data-meta":""},k("h4",{i18n:"settings.about"}),k("p",{class:"k-sub",i18n:"app.subtitle"}),ve)),se.addEventListener("click",()=>R(Z,se,"right"));let je=M("pop-export","export.title");je.classList.add("k-pop-wide");let ye=()=>{let T=new Set,J=[];for(let ue of e.rows){let ke=ue._item;ke&&ke.id&&!T.has(ke.id)&&(T.add(ke.id),J.push(ke))}return J},Ie=k("button",{type:"button",id:"export-csv",class:"k-btn k-secondary",i18n:"export.csv"}),Te=k("button",{type:"button",id:"export-json",class:"k-btn k-secondary",i18n:"export.json"});Ie.addEventListener("click",()=>ld(ye(),"csv","all")),Te.addEventListener("click",()=>ld(ye(),"json","all"));let Ke=k("input",{type:"text",id:"share-url",class:"k-search k-shareurl",readOnly:!0,spellcheck:!1,"data-i18n-aria":"export.share"}),Be=k("button",{type:"button",id:"share-copy",class:"k-btn k-secondary",i18n:"export.copy"}),st=k("span",{class:"k-cap",id:"share-msg","aria-live":"polite","data-meta":""});Be.addEventListener("click",async()=>{Ke.value=wl();try{await navigator.clipboard.writeText(Ke.value),st.textContent=me("export.copied")}catch{Ke.select(),st.textContent=me("export.copy_fail")}}),je.append(k("div",{class:"k-popsect","data-meta":""},k("h4",{i18n:"export.title"}),k("p",{class:"k-sub",i18n:"export.note"})),k("div",{class:"k-acts"},Ie,Te),k("div",{class:"k-popsect","data-meta":""},k("h4",{i18n:"export.share"}),k("p",{class:"k-sub",i18n:"export.share_note"})),Ke,k("div",{class:"k-acts"},Be,st)),he.addEventListener("click",()=>{Ke.value=wl(),st.textContent="",R(je,he,"right")}),c.openExport=()=>he.click();let re="general",Re=!1,$e=[];function Xe(T,J=!0){let ue=Re?re:null;Re=!0,re=T==="expert"?"expert":"general",s.modeLayers&&s.modeLayers(re,ue),r.dataset.mode=re,q.setAttribute("aria-checked",String(re==="general")),ie.setAttribute("aria-checked",String(re==="expert")),J&&a0.set(re),Fd(re==="general");for(let ke of $e)ke(re)}q.addEventListener("click",()=>Xe("general")),ie.addEventListener("click",()=>Xe("expert")),s.setModeKeys(T=>Xe(T)),c.setMode=Xe,Object.defineProperty(c,"mode",{get:()=>re});let G=u(mf("left",{label:me("nav.targets_panel")}));G.id="targets",G.dataset.i18nAria="nav.targets_panel",G.dataset.obstacle="";let ae=k("input",{type:"search",id:"target-search",class:"k-search",autocomplete:"off",spellcheck:!1}),Le=k("label",{class:"k-searchwrap"},m("search"),ae,k("kbd",{"aria-hidden":"true","data-meta":""},"/")),S=y("targets-close","nav.targets_close","close");S.classList.add("k-close");let x=k("div",{class:"k-vbody k-list"});G.append(k("div",{class:"k-lhead"},Le,S),x),r.append(G);let z=bf(G,{onClose:()=>Pe(!1),heights:()=>za});G.prepend(z.grab);let j=[],ne=T=>re==="general"&&_o("tgtg."+T)?me("tgtg."+T):null,fe=T=>ne(T.pick||T.id)||(T.key?me(T.key):e.nameOf(T.pick));for(let T of Mf){let J=k("section",{class:"k-group","data-group":T.g});J.append(k("h3",{"data-meta":"",i18n:"tgt.g_"+T.g}));for(let ue of T.rows){let ke=k("span",{class:"k-rname","data-meta":""}),Ze=k("button",{type:"button",id:ue.id,class:"k-row"},m(ue.icon),ke);ue.only&&(Ze.dataset.only=ue.only),ue.soon&&(Ze.disabled=!0,Ze.dataset.i18nTitle=ue.soon,Ze.setAttribute("aria-disabled","true")),Ze._r=ue,Ze._name=ke,Ze.addEventListener("click",()=>Ms(ue,Ze)),j.push(Ze),J.append(Ze)}x.append(J)}function be(){for(let T of j)T._name.textContent=fe(T._r);le()}function le(){let T=ae.value.trim().toLowerCase();for(let J of j){let ue=J._r,ke=[fe(ue),ue.pick||"",ue.view||"",ue.id].join(" ").toLowerCase();J.hidden=!!T&&!ke.includes(T)}for(let J of x.children)J.hidden=![...J.querySelectorAll(".k-row")].some(ue=>!ue.hidden)}ae.addEventListener("input",le),ae.addEventListener("keydown",T=>{if(T.key==="Enter"){let J=j.find(ue=>!ue.hidden&&!ue.disabled&&getComputedStyle(ue).display!=="none");J&&J.click()}});let ce=!1;function Pe(T,{focusSearch:J=!1,refocus:ue=!0}={}){T&&!ce&&(z.reset(),zf()&&we&&Kt(!1)),ce=!!T,G.setOpen(ce),r.classList.toggle("list-open",ce),Ml(),U.setAttribute("aria-expanded",String(ce)),ce?(zi(),J&&setTimeout(()=>ae.focus(),0)):ue&&U.focus({preventScroll:!0}),is()}U.addEventListener("click",()=>Pe(!ce)),S.addEventListener("click",()=>Pe(!1)),H.addEventListener("click",()=>Pe(!0,{focusSearch:!0})),c.setList=Pe;let Oe=null,Ve=null,Fe=null;function et(T){if(!T)return{name:"",kind:""};if(T.startsWith("view:")){let J=Mf.flatMap(ue=>ue.rows).find(ue=>ue.view===T.slice(5)&&!ue.pick);return{name:J?fe(J):"",kind:me("kind.view")}}return T==="__all"?{name:me("ui.numbers"),kind:me("kind.numbers")}:{name:ne(T)||e.nameOf(T),kind:l0[T]?me("kind."+l0[T]):""}}function tt(){if(W.remove(),Oe&&Oe.startsWith("zoom:")){let T=Oe.slice(5);D.textContent=me("jwst.zoom_focus_"+T),O.textContent=me("kind.zoom"),T!=="R5"&&(W.textContent=me("jwst.zoom_norecon"),K.append(W))}else{let T=et(Oe);D.textContent=T.name,O.textContent=T.kind}D.dataset.name=Oe||"",d&&Sl();for(let T of j){let J=T._r;!!Oe&&(J.pick&&J.pick===Oe||!J.pick&&J.view&&Oe==="view:"+J.view)?T.setAttribute("aria-current","true"):T.removeAttribute("aria-current")}}function it(T){Oe=T,T&&!T.startsWith("zoom:")&&(Fe=T),tt()}let Y=u(mf("right",{label:me("info.label")}));Y.id="info",Y.dataset.i18nAria="info.label",Y.dataset.obstacle="",r.append(Y);let Ae=bf(Y,{onClose:()=>Kt(),heights:()=>za}),de=null,we=!1,De=null,_e=[],Ge=!1,qe=o0.get()==="1",pt=()=>{for(let T of _e)Gr(T);_e=[]},ut="summary";function Vt(T){let J=T._render;return T._render=()=>{J(),re==="general"&&T._item&&_o("numg."+T._item.id)&&(T.querySelector(".num-label").textContent=me("numg."+T._item.id))},T._render(),T}function bt(T){let J=T.provenance,ue=k("div",{class:"k-srcrow"});ue.dataset.source=yi(J),ue.dataset.verification=`${J.verification.tag}/${J.verification.detail}`,ue._item=T;let ke=k("p",{class:"k-srcpath"});for(let Lt of J.source)ke.append(k("code",{"data-literal":""},`${Lt.file} \u203A ${Lt.key}`),document.createTextNode(" "));let Ze=[J.computed_by,J.ref_commit&&`commit ${J.ref_commit}`,J.source_hash&&`sha256 ${J.source_hash.slice(0,12)}\u2026`].filter(Boolean).join(" \xB7 "),dt=k("button",{type:"button",class:"k-btn k-small k-srcopen",i18n:"info.src_open"});return dt.addEventListener("click",()=>t.model.openSource(T)),ue.append(k("div",{class:"k-labrow"},k("span",{class:"k-lab","data-literal":""},Tt(T.label)),oi(J.verification,a)),ke,k("p",{class:"k-srcmeta","data-literal":""},Ze),dt),ue}function Ui(T){let J=k("div",{class:"num-row k-keycell"});J.dataset.source=yi(T.provenance),J.dataset.verification=`${T.provenance.verification.tag}/${T.provenance.verification.detail}`;let ue=k("span",{class:"num-label k-lab"}),ke=oi(T.provenance.verification,a),Ze=k("button",{type:"button",class:"num k-val"});return Ze.dataset.source=J.dataset.source,Ze.dataset.verification=J.dataset.verification,Ze.dataset.id=T.id,Ze.addEventListener("click",()=>t.model.openSource(T)),J._render=()=>{let dt=T.unit&&typeof T.unit=="object"?T.unit[Vn()]??T.unit.ko:T.unit;ue.textContent=c0(T,re),Ze.replaceChildren(document.createTextNode(T.text+(dt?" ":"")),...dt?[k("small",{},dt)]:[]),Ze.classList.toggle("k-long",T.text.length>=9),ke._render()},J._render(),J._item=T,J.append(k("div",{class:"k-labrow"},ue,ke),Ze),Ls(J,T.id,"key"),J}function Jt(T,J={}){C&&Y.contains(C)&&b(!1);let ue=we;de=T,pt();let ke=T.startsWith("view:"),Ze=T==="__all",dt=ke?Mf.flatMap(Pn=>Pn.rows).find(Pn=>Pn.view===T.slice(5)&&!Pn.pick):null,Lt=et(T),Ut=y("info-close","info.close","close");Ut.classList.add("k-close"),Ut.addEventListener("click",()=>Kt());let Xt=ke||Ze||!e.NAME[T]||!!ne(T),fn=k("div",{class:"k-vhead"},k("h3",Xt?{class:"k-name","data-meta":""}:{class:"k-name",i18n:e.NAME[T]},Lt.name),k("span",{class:"k-kind","data-meta":""},Lt.kind),Ut),Ht=k("div",{class:"k-vbody"}),rs=ke?"desc."+dt.info:"desc."+T;Ze||Ht.append(k("p",{class:"desc k-desc","data-meta":"",i18n:rs},me(rs))),!ke&&!Ze&&e.hasSphere(T)&&Ht.append(k("p",{class:"note k-note","data-meta":""},qn(),k("span",{i18n:"card.sphere_note"},me("card.sphere_note"))));let Gt=!1;if(Ze)Ht.append(e.nums),Gt=!0;else if(!ke){let Pn=e.sections(T);if(Pn.key.length){let Qt=k("div",{class:"k-key"+(Pn.key.length>2?" k-key-many":"")});for(let si of Pn.key){let Xn=Ui(si);_e.push(Xn),Qt.append(Xn)}Ht.append(k("div",{class:"k-sect"},Qt)),Gt=!0}if(T==="JWST"){let Qt=k("div",{class:"k-sect k-acts","data-meta":""},k("h4",{i18n:"jwst.zoom_title"}));if(t.zoomStops)for(let[Xn,er]of[["R5","jwst.zoom_r5"],["A",null],["B",null],["C",null]]){if(!t.zoomStops[Xn])continue;let tr=k("button",{type:"button",id:"zoom-"+Xn,class:"k-btn k-secondary zoom-btn"});er?tr.dataset.i18n=er:tr.textContent=me("jwst.zoom_window",{w:Xn}),tr.addEventListener("click",()=>c.zoom(Xn)),Qt.append(tr)}let si=k("button",{type:"button",id:"open-period",class:"k-btn k-secondary",i18n:"jwst.period_button"});si.addEventListener("click",()=>c.pick("jwst_period")),Qt.append(si),Ht.append(Qt)}let xi=[...Pn.more,...re==="expert"?Pn.expert:[]],ii=[];if(T==="JWST"&&re==="expert"){let Qt=e.jwstBody(_e,()=>c.pick("jwst_period")),si=Qt.querySelector("#open-period");si&&si.remove(),ii.push(Qt)}if(T==="jwst_period"&&re==="expert"&&ii.push(e.periodBody(_e)),xi.length||ii.length){let Qt=k("details",{class:"k-more",id:"info-more"},k("summary",{"data-meta":"",i18n:"info.more"}));Qt.open=re==="expert"||!!J.moreOpen;for(let si of xi){let Xn=Vt(bi(si,a,t.model.openSource));_e.push(Xn),Qt.append(Xn)}Qt.append(...ii),Ht.append(Qt),Gt=!0}!Pn.key.length&&!xi.length&&!ii.length&&!Pn.expert.length&&T!=="JWST"&&Ht.append(k("p",{class:"note k-note",i18n:"card.no_numbers"},me("card.no_numbers")))}re==="general"&&!Ze&&(Ge||!qe)&&(Ge||(Ge=!0,o0.set("1")),Ht.append(k("p",{class:"k-cap",id:"info-expert-hint","data-meta":"",i18n:"info.expert_hint"})));let Dr=k("button",{type:"button",id:"info-focus",class:"k-btn k-secondary","data-only":"expert",i18n:"info.focus_only"}),wt=Di("primary",{label:me("info.fly")});wt.id="info-fly",wt.querySelector(".k-label").dataset.i18n="info.fly";let pn=Ar[T];Dr.hidden=!pn,Dr.addEventListener("click",()=>{f(pn[0],t.state.cam.dist)}),wt.addEventListener("click",()=>{dt?On(dt.view):pn&&f(pn[0],pn[1])}),wt.disabled=!dt&&!pn;let Ts=k("div",{class:"k-vfoot"},k("div",{class:"k-left-acts"},Dr),wt),Qs=Ht;if(re==="expert"&&!ke&&!Ze){let Pn=new Set,xi=[];for(let Dt of _e){let Ln=Dt._item;Ln&&Ln.id&&!Pn.has(Ln.id)&&(Pn.add(Ln.id),xi.push(Ln))}let ii=k("div",{class:"k-vbody k-pane",id:"info-pane-all",role:"tabpanel"}),Qt=k("div",{class:"k-vbody k-pane",id:"info-pane-source",role:"tabpanel"}),si={all(){for(let Dt of xi){let Ln=bi(Dt,a,t.model.openSource);_e.push(Ln),ii.append(Ln)}xi.length||ii.append(k("p",{class:"note k-note",i18n:"info.src_none"},me("info.src_none"))),cs(),xi.length&&!ii.querySelector(".num-row")&&ii.append(k("p",{class:"note k-note",i18n:"card.numbers_off"},me("card.numbers_off")))},source(){for(let Dt of xi)Qt.append(bt(Dt));if(!xi.length)Qt.append(k("p",{class:"note k-note",i18n:"info.src_none"},me("info.src_none")));else{let Dt=k("button",{type:"button",id:"info-export",class:"k-btn k-secondary",i18n:"info.export_this"});Dt.addEventListener("click",()=>ld(xi,"json",T)),Qt.append(k("div",{class:"k-popfoot"},Dt))}}},Xn=new Set;Ht.id="info-pane-summary",Ht.setAttribute("role","tabpanel"),Ht.classList.add("k-pane");let er={summary:Ht,all:ii,source:Qt},tr=k("div",{class:"k-tabs",role:"tablist","data-i18n-aria":"info.tabs"}),El={},ud=(Dt,Ln)=>{ut=Dt,si[Dt]&&!Xn.has(Dt)&&(Xn.add(Dt),si[Dt](),yt(er[Dt]),yl(er[Dt]));for(let[Vi,Tl]of Object.entries(er))Tl.hidden=Vi!==Dt,El[Vi].setAttribute("aria-selected",String(Vi===Dt)),El[Vi].tabIndex=Vi===Dt?0:-1;Ln&&El[Dt].focus()};for(let Dt of["summary","all","source"]){let Ln=k("button",{type:"button",role:"tab",id:"info-tab-"+Dt,class:"k-tab","aria-controls":"info-pane-"+Dt,i18n:"info.tab_"+Dt,"data-meta":""});Ln.addEventListener("click",()=>ud(Dt)),Ln.addEventListener("keydown",Vi=>{let Tl=["summary","all","source"],W0=Tl.indexOf(Dt);(Vi.key==="ArrowRight"||Vi.key==="ArrowLeft")&&(Vi.preventDefault(),ud(Tl[(W0+(Vi.key==="ArrowRight"?1:2))%3],!0))}),El[Dt]=Ln,tr.append(Ln)}Qs=k("div",{class:"k-tabwrap"},tr,Ht,ii,Qt),ud(er[ut]?ut:"summary")}Y.replaceChildren(Ae.grab,k("div",{class:"card-body k-card"},fn,Qs,Ts)),ue||(Ae.reset(),zf()&&ce&&Pe(!1,{refocus:!1})),yt(Y),cs(),Gt&&!Y.querySelector(".num-row")&&Ht.append(k("p",{class:"note k-note",id:"card-numbers-off",i18n:"card.numbers_off"},me("card.numbers_off"))),yl(Y),(!ue||J.opener)&&(De=J.opener||(document.activeElement&&document.activeElement!==r?document.activeElement:null)),we=!0,Y.setOpen(!0),r.classList.add("info-open"),Ml(),zi()}function Kt(T=!0){we&&(we=!1,Ge&&(Ge=!1,qe=!0),Y.setOpen(!1),r.classList.remove("info-open"),Ml(),pt(),T&&De&&document.contains(De)&&De.offsetParent!==null?De.focus({preventScroll:!0}):Y.contains(document.activeElement)&&document.activeElement.blur(),De=null,is())}c.closeInfo=Kt,c.showInfo=Jt,s.onChange(()=>{we&&Jt(de,{moreOpen:!!(Y.querySelector("#info-more")||{}).open})}),$e.push(()=>{we&&Jt(de)});let rn=0;function On(T){t.setCamera({...Un[T],...T==="solar"?{dist:Math.max(Un.solar.dist,t.orbitFitDist(1.2))}:{}})}c.view=T=>On(T);function Ms(T,J){if(!T.soon){if(T.tour){Fi.start(0);return}if(T.tool==="lab"){c.lab&&c.lab.button.click(),i&&Pe(!1,{refocus:!1});return}if(T.tool==="all"){it("__all"),Jt("__all",{opener:J}),i&&Pe(!1,{refocus:!1});return}if(T.view&&On(T.view),T.pick){if(c.frameForPick&&c.frameForPick(T.pick),!T.view){let ue=Ar[T.pick];ue&&f(ue[0],ue[1])}it(T.pick),Jt(T.pick,{opener:J})}else it("view:"+T.view),Jt("view:"+T.view,{opener:J});i&&Pe(!1,{refocus:!1})}}c.pick=T=>{rn=performance.now(),zi();let J=Ar[T];c.frameForPick&&c.frameForPick(T),J&&f(J[0],J[1]),it(T),Jt(T)},c.zoom=T=>{let J=t.zoomStops&&t.zoomStops[T];J&&(s.setTemp([J.layer,"n_jwst","n_tags","labels"]),t.setCamera({...J.cam}),it("zoom:"+T))},t.onZoomChange&&t.onZoomChange(T=>{T||(s.clearTemp(),(Oe||"").startsWith("zoom:")&&it(Fe))}),c.renameFocus=()=>tt();function fi(){let T=t.state.fly;return T?(t.setCamera({dist:T.d0}),!0):!1}let Rt=Di("icon",{label:me("l2.play"),iconName:"play"});Rt.id="play";let un=10,ti=()=>{let T=!!t.anim.speedDaysPerSec,J=T?"l2.pause":"l2.play";Rt.setAttribute("aria-label",me(J)),Rt.title=`${me(J)}`,Rt.dataset.state=T?"playing":"paused";let ue=T?"pause":"play";Rt.dataset.icon!==ue&&(Rt.replaceChildren(An(ue)),Rt.dataset.icon=ue)};Rt.addEventListener("click",()=>{t.anim.speedDaysPerSec=t.anim.speedDaysPerSec?0:un,ti(),is()}),Rt.classList.add("k-play"),ti();let ni=k("button",{type:"button",id:"speed-btn",class:"k-btn k-small k-speed","aria-haspopup":"menu","aria-expanded":"false","data-meta":""}),pi=M("pop-speed","time.speed_menu");pi.setAttribute("role","menu");let ws=r0.map(T=>{let J=k("button",{type:"button",role:"menuitemradio",class:"k-menuitem","data-speed":String(T),"aria-checked":String(T===un),"data-meta":""});return J.addEventListener("click",()=>{un=T,t.anim.speedDaysPerSec&&(t.anim.speedDaysPerSec=T),ki(),b()}),J});pi.append(...ws);let ki=()=>{ni.textContent=me("l2.speed",{n:un}),ni.title=me("time.speed_title");for(let T of ws)T.textContent=me("l2.speed",{n:T.dataset.speed}),T.setAttribute("aria-checked",String(Number(T.dataset.speed)===un));for(let T of Zs)T.setAttribute("aria-checked",String(Number(T.dataset.speed)===un)),T.setAttribute("aria-label",me("l2.speed",{n:T.dataset.speed}))};ni.addEventListener("click",()=>R(pi,ni)),ni.dataset.only="general";let Zs=r0.map(T=>{let J=k("button",{type:"button",role:"radio",class:"k-segbtn","data-speed":String(T),"aria-checked":String(T===un),"data-meta":""},String(T));return J.addEventListener("click",()=>{un=T,t.anim.speedDaysPerSec&&(t.anim.speedDaysPerSec=T),ki()}),J}),Cr=k("span",{class:"k-segunit","data-meta":"",i18n:"time.speed_unit"}),Ba=k("div",{id:"speed-seg",class:"k-seg k-speedseg",role:"radiogroup","data-only":"expert","data-i18n-aria":"time.speed_group"},...Zs,Cr),Cn=t.model.tMin,yn=t.model.tMax,A=k("input",{type:"range",id:"time",class:"k-range",min:String(Cn),max:String(yn),step:"3600"});A.value=String(t.state.t),A.addEventListener("input",()=>t.setTime(Number(A.value)));let F=bn(Cn,o),_=bn(yn,o),E=k("div",{class:"k-ticks","aria-hidden":"true","data-meta":""});for(let[T,J]of[[2022,null],[2030,"expert"],[2040,"expert"],[2050,null]]){let ue=Date.UTC(T,0,1)/1e3;if(ue<F-3*86400||ue>_+3*86400)continue;let ke=Hi(Math.min(Math.max(ue,F),_),o),Ze=k("span",{},String(T));Ze.style.left=`${(100*(ke-Cn)/(yn-Cn)).toFixed(2)}%`,J&&(Ze.dataset.only=J),E.append(Ze)}let L=k("div",{class:"k-slider"},A,E),P=t.model.jwstSpan;if(P&&P.tRec>Cn){let T=wt=>Math.max(0,Math.min(100,100*(wt-Cn)/(yn-Cn))),J=wt=>new Date((wt+Date.UTC(2e3,0,1,12)/1e3)*1e3).toISOString().slice(0,10),ue=k("span",{class:"k-jb-rec"}),ke=k("span",{class:"k-jb-pred"});ue.style.left=`${T(P.t0).toFixed(3)}%`,ue.style.width=`${(T(P.tRec)-T(P.t0)).toFixed(3)}%`;let Ze=k("div",{id:"jwst-band",class:"k-jband","aria-hidden":"true","data-meta":""},ue);P.tPredEnd&&(ke.style.left=`${T(P.tRec).toFixed(3)}%`,ke.style.width=`${(T(P.tPredEnd)-T(P.tRec)).toFixed(3)}%`,Ze.append(ke));let dt=k("div",{id:"jwst-band-tip",class:"k-jtip",role:"tooltip",hidden:!0,"data-meta":""}),Lt=k("span",{id:"jwst-band-desc",hidden:!0,"data-meta":""}),Ut=()=>{let wt=P.tPredEnd?me("time.jwst_band",{rec:J(P.tRec),pred:J(P.tPredEnd)}):me("time.jwst_band_rec",{rec:J(P.tRec)});dt.textContent=wt+(re==="expert"&&P.predCopy?` (${P.predCopy})`:""),Lt.textContent=wt};Ut(),Ze.dataset.recEnd=J(P.tRec),P.tPredEnd&&(Ze.dataset.predEnd=J(P.tPredEnd)),A.setAttribute("aria-describedby","jwst-band-desc"),L.append(Ze,Lt),document.body.append(dt);let Xt=wt=>{let pn=A.getBoundingClientRect(),Ts=pn.width-12;return Cn+(wt-pn.left-6)/Ts*(yn-Cn)},fn=wt=>{let pn=Xt(wt),Ts=A.getBoundingClientRect(),Qs=8/(Ts.width-12)*(yn-Cn);return pn>=P.t0-Qs&&pn<=(P.tPredEnd||P.tRec)+Qs},Ht=wt=>{Ut(),dt.hidden=!1;let pn=A.getBoundingClientRect(),Ts=dt.offsetWidth,Qs=dt.offsetHeight;dt.style.left=`${Math.max(8,Math.min(innerWidth-Ts-8,wt-Ts/2)).toFixed(1)}px`,dt.style.top=`${Math.max(8,pn.top-Qs-4).toFixed(1)}px`},rs=()=>{dt.hidden=!0},Gt=null;A.addEventListener("pointermove",wt=>{wt.pointerType==="mouse"?fn(wt.clientX)?Ht(wt.clientX):rs():Gt&&Math.hypot(wt.clientX-Gt.x,wt.clientY-Gt.y)>10&&(clearTimeout(Gt.id),Gt=null)}),A.addEventListener("pointerleave",wt=>{wt.pointerType==="mouse"&&rs()}),A.addEventListener("pointerdown",wt=>{if(wt.pointerType==="mouse"||!fn(wt.clientX))return;let pn=wt.clientX;Gt={x:pn,y:wt.clientY,id:setTimeout(()=>{Ht(pn),Gt=null},500)}});let Dr=()=>{Gt&&(clearTimeout(Gt.id),Gt=null),dt.hidden||setTimeout(rs,2e3)};A.addEventListener("pointerup",Dr),A.addEventListener("pointercancel",Dr),$e.push(Ut),dr(Ut),c.jwstBand={band:Ze,tip:dt,showTip:Ht,hideTip:rs}}let V={provenance:e.dateItem(t.state.t).provenance},oe=k("button",{type:"button",id:"date",class:"k-btn num k-date","aria-haspopup":"dialog","aria-expanded":"false"}),pe=k("span",{class:"k-dmain"}),ge=k("small",{class:"k-dsub"});oe.append(pe,ge);let Me=vi(V.provenance.verification,a),Ce=k("div",{class:"date-row k-dateblock"},oe,Me);for(let T of[oe,Ce])T.dataset.source="time.utc (results/web) | "+yi(V.provenance),T.dataset.verification=`${V.provenance.verification.tag}/${V.provenance.verification.detail}`;Ce._itemFn=()=>e.dateItem(t.state.t);let Ye=T=>String(T).padStart(2,"0"),ze=T=>{let J=new Date(Math.floor(T/60)*6e4);return`${J.getFullYear()}-${Ye(J.getMonth()+1)}-${Ye(J.getDate())} ${Ye(J.getHours())}:${Ye(J.getMinutes())}`},He=T=>{let J=-new Date(Math.floor(T/60)*6e4).getTimezoneOffset(),ue=J>=0?"+":"\u2212",ke=Math.abs(J);return`UTC${ue}${Math.floor(ke/60)}${ke%60?":"+Ye(ke%60):""}`};function lt(){let T=bn(t.state.t,o),J=Gi(T),ue=ze(T),ke=He(T);re==="expert"?(pe.textContent=`${J} UTC`,ge.textContent=`${me("time.local")} ${ue.slice(11)} (${ke})`):(pe.textContent=ue,ge.textContent=ke),oe.setAttribute("aria-label",me("time.date_aria",{utc:J,local:ue,zone:ke})),A.setAttribute("aria-valuetext",`${J} UTC`),A.setAttribute("aria-label",me("time.slider"))}let Et=k("button",{type:"button",id:"t-now",class:"k-btn k-small k-now",i18n:"time.now","data-meta":""}),St=()=>Math.floor(Date.now()/6e4)*60,xt=()=>{let T=St(),J=T>=F&&T<=_;return Et.disabled=!J,Et.title=J?me("time.now_title"):me("time.now_out"),J};Et.addEventListener("click",()=>{xt()&&t.setTime(Hi(St(),o))}),c.nowTdb=()=>Hi(St(),o),setInterval(xt,6e4);let Zt=u(k("div",{id:"timebar",class:"k-timebar k-bare",role:"group","data-obstacle":"","data-i18n-aria":"time.group"},Rt,ni,Ba,L,k("div",{class:"k-dateacts"},Ce,Et)));r.append(Zt);let Je=t.model.onTimeChange;t.model.onTimeChange=T=>{Je&&Je(T),A.value=String(T),lt(),!t.anim.speedDaysPerSec&&Rt.dataset.state==="playing"&&ti()};let an=document.getElementById("ephem-busy");an&&new MutationObserver(()=>{let T=!an.hidden;oe.classList.toggle("is-busy",T),oe.setAttribute("aria-busy",String(T))}).observe(an,{attributes:!0,attributeFilter:["hidden"]});let gt=M("pop-date","time.date_pop"),vn=new Date(Math.ceil(F/86400)*864e5).toISOString().slice(0,10),Fn=new Date(Math.floor(_/86400)*864e5).toISOString().slice(0,10),Rn=k("input",{type:"date",id:"date-jump",class:"k-dateinput",min:vn,max:Fn,"data-i18n-aria":"time.date_input"});Rn.dataset.range=`${vn} ~ ${Fn}`;let Bn=Di("primary",{label:me("time.go")});Bn.id="date-go",Bn.querySelector(".k-label").dataset.i18n="time.go",Bn.disabled=!0;let Mt=k("p",{id:"date-range-note",class:"k-warn",hidden:!0,i18n:"time.out_of_range","data-meta":""}),Ot=()=>{let T=Rn.value,J=!!T&&T>=vn&&T<=Fn;return Bn.disabled=!J,Mt.hidden=!T||J,J};Rn.addEventListener("input",Ot),Rn.addEventListener("keydown",T=>{T.key==="Enter"&&Ot()&&Bn.click()}),Bn.addEventListener("click",()=>{Ot()&&t.setTime(Hi(Date.parse(Rn.value+"T00:00:00Z")/1e3,o))});let mi=k("button",{type:"button",id:"t-start",class:"k-btn k-secondary",i18n:"time.start"});mi.addEventListener("click",()=>t.setTime(Cn)),gt.append(k("div",{class:"k-popsect","data-meta":""},k("h4",{i18n:"time.date_pop"}),k("p",{class:"k-sub",i18n:"time.date_utc_note"})),k("div",{class:"k-daterow"},Rn,Bn),Mt,k("div",{class:"k-popfoot"},mi)),oe.addEventListener("click",()=>R(gt,oe));let Pt=k("span",{class:"tag-approx k-adot","aria-hidden":"true"},An("t_approx")),gi=k("span",{"data-meta":""}),Oi=k("button",{type:"button",id:"credits",class:"k-btn k-small credits","data-obstacle":""},gi,Pt),gl=()=>vo(()=>Gl(qn));Oi.addEventListener("click",gl);let nd=k("button",{type:"button",id:"frame-rot",role:"radio","aria-checked":"true",i18n:"l2.mode_rot","data-meta":""}),id=k("button",{type:"button",id:"frame-in",role:"radio","aria-checked":"false",i18n:"l2.mode_inertial","data-meta":""}),_l=T=>{t.setMode(T),nd.setAttribute("aria-checked",String(T==="rot")),id.setAttribute("aria-checked",String(T!=="rot"))};nd.addEventListener("click",()=>{c.frameChosen=!0,_l("rot")}),id.addEventListener("click",()=>{c.frameChosen=!0,_l("inertial")}),c.frameForPick=T=>{re==="general"&&!c.frameChosen&&["L2","halo_main","JWST","jwst_period"].includes(T)&&t.state.sTarget&&_l("rot")};let N0=k("div",{class:"k-seg k-frame",role:"radiogroup","data-i18n-aria":"l2.mode"},nd,id),Pf=k("span",{class:"k-stval num"}),D0=vi(V.provenance.verification,a),xl=k("div",{id:"status-tdb",class:"date-row k-stitem"},k("span",{class:"k-stlab","data-meta":"",i18n:"status.tdb"}),Pf,D0);xl.dataset.source="time.utc (results/web) | "+yi(V.provenance),xl.dataset.verification=`${V.provenance.verification.tag}/${V.provenance.verification.detail}`,xl._itemFn=()=>e.dateItem(t.state.t);let Lf=k("span",{class:"k-stval"}),If=k("div",{id:"status-focus",class:"k-stitem","data-aux":"tick","data-source":"camera distance to focus (browser drawing state)","data-verification":"display/approx","data-i18n-title":"status.focus_title"},k("span",{class:"k-stlab","data-meta":"",i18n:"status.focus"}),Lf,qn()),Rr=k("div",{id:"status",class:"k-status","data-only":"expert","data-obstacle":"",role:"group","data-i18n-aria":"status.label"},xl,N0,If),U0=T=>new Date(Date.UTC(2e3,0,1,12)+Math.floor(T/60)*6e4).toISOString().slice(0,16).replace("T"," "),sd="";t.onRender.push(T=>{if(re!=="expert")return;let J=T.state.cam.dist,ue=U0(T.state.t),ke=`${Math.round(J).toLocaleString("en-US")} km`;if(ue+ke===sd)return;let Ze=(ue+ke).length!==sd.length;sd=ue+ke,Pf.textContent=ue,Lf.textContent=ke,If.dataset.km=String(Math.round(J)),Ze&&d&&Lr()});let Pr=k("button",{type:"button",id:"status-more",class:"k-btn k-small k-stmore","data-only":"expert","aria-haspopup":"dialog","aria-expanded":"false","data-i18n-title":"status.more_title",hidden:!0},k("span",{"data-meta":"",i18n:"status.more"}),m("chev")),rd=M("pop-status","status.label");Pr.addEventListener("click",()=>R(rd,Pr,"right"));let Es=u(k("div",{id:"strip",class:"k-strip k-bare"},Oi,Rr,Pr));r.append(Es);function Lr(){if(C===rd)return;Rr.parentNode!==Es&&Es.insertBefore(Rr,Pr),Pr.hidden=!0;let T=!1;if(re==="expert"){let J=Math.max(...[...Rr.children].map(ue=>ue.getBoundingClientRect().height),0);T=Es.scrollWidth>Es.clientWidth+1||J>46||Rr.getBoundingClientRect().height>46}T&&(rd.append(Rr),Pr.hidden=!1),r.classList.toggle("status-folded",T)}Es.addEventListener("transitionend",T=>{T.target===Es&&(T.propertyName==="left"||T.propertyName==="right")&&Lr()}),c.fitStrip=Lr,d=!0;let Nf=()=>{gi.textContent=me(re==="expert"?"credits.long":"credits.short"),Oi.title=me("credits.open"),Pt.title=me("tag.display_approx")},Ir=null,Fi=n0({view:t,layers:s,P:e,table:a,mobile:i,reg:u,decorateTags:yl,numberName:T=>c0(T,re),onStart(){Ir=document.activeElement&&document.activeElement!==r?document.activeElement:null,b(!1),Pe(!1,{refocus:!1}),Kt(!1),zi()},onEnd(){Ir&&document.contains(Ir)&&Ir.offsetParent!==null?Ir.focus({preventScroll:!0}):U.focus({preventScroll:!0}),Ir=null,is()}});c.tour=Fi;let _i=null,k0=i||(()=>{try{return matchMedia("(pointer: coarse)").matches&&!matchMedia("(any-pointer: fine)").matches}catch{return!1}})();if(Sf.get()!=="1"){let T=k("button",{type:"button",id:"hint-tour",class:"k-btn k-small"},An("tour"),k("span",{i18n:"hint.tour"})),J=y("hint-close","hint.close","close");_i=u(k("div",{id:"hint",class:"k-hint k-bare",role:"note","data-obstacle":"","data-only":"general","data-i18n-aria":"hint.label"},k("span",{class:"k-lead","data-meta":"",i18n:"hint.lead"}),k("span",{class:"k-how",id:"hint-how","data-meta":"",i18n:k0?"hint.how_touch":"hint.how"}),T,J)),window.addEventListener("pointerdown",ue=>{let ke=_i&&_i.querySelector("#hint-how");ke&&ue.pointerType==="touch"&&ke.dataset.i18n!=="hint.how_touch"&&(ke.dataset.i18n="hint.how_touch",yt(_i))},{capture:!0,passive:!0}),J.addEventListener("click",()=>{Sf.set("1"),_i.remove(),_i=null}),T.addEventListener("click",()=>{Sf.set("1"),_i.remove(),_i=null,Fi.start(0)}),r.append(_i)}function yl(T){for(let J of T.querySelectorAll(".tag:not(.tag-approx):not(.tag-open)")){J.querySelector(":scope > .tag-shape")||J.prepend(k("span",{class:"tag-shape","aria-hidden":"true"},An(s0[J.dataset.tag]||"t_impl")));let ue=(J.querySelector(".tag-name")||{}).textContent||"",ke=(J.querySelector(".tag-tip")||{}).textContent||"";J.setAttribute("role","button"),J.setAttribute("aria-label",`${J.classList.contains("mini")?ke:`${ue} \u2014 ${ke}`} \u2014 ${me("tag.open_hint")}`)}}let Bi=M("pop-tag","tag.pop_label");Bi.classList.add("k-tpop","num-row");function Df(T){let J=T.closest(".num-row, .date-row"),ue=J&&(J._item||J._itemFn&&J._itemFn()),ke={tag:T.dataset.tag,detail:T.dataset.detail},Ze=ue?ue.provenance.verification:ke,dt=oi(Ze,a);dt.classList.add("tag-open");let Lt=[k("div",{class:"k-tphead"},dt)];if(re==="general"&&(dt.querySelector(".tag-tip").remove(),dt.prepend(k("span",{class:"tag-shape","aria-hidden":"true"},An(s0[Ze.tag]||"t_impl"))),Lt.push(k("p",{class:"k-teasy","data-meta":"",i18n:"tag.easy_"+Ze.tag},me("tag.easy_"+Ze.tag)))),ue&&re==="general"){if(Bi.dataset.source=yi(ue.provenance),Bi.dataset.verification=`${ue.provenance.verification.tag}/${ue.provenance.verification.detail}`,J.classList.contains("date-row")){let Xt=bn(t.state.t,o);Lt.push(k("p",{class:"k-tsrc"},`${Gi(Xt)} UTC \xB7 ${me("time.local")} ${ze(Xt)} (${He(Xt)})`))}Lt.push(k("p",{class:"k-cap","data-meta":"",i18n:"tag.easy_more"},me("tag.easy_more")));let Ut=k("button",{type:"button",id:"tag-open-source",class:"k-btn k-secondary",i18n:"tag.pop_open"});Ut.addEventListener("click",()=>{b(!1),t.model.openSource(ue)}),Lt.push(k("div",{class:"k-popfoot"},Ut))}else if(ue){Bi.dataset.source=yi(ue.provenance),Bi.dataset.verification=`${ue.provenance.verification.tag}/${ue.provenance.verification.detail}`;let Ut=k("p",{class:"k-tsrc"},k("span",{"data-meta":"",i18n:"tag.pop_source"}),document.createTextNode(" "));for(let fn of ue.provenance.source)Ut.append(k("code",{"data-literal":""},`${fn.file} \u203A ${fn.key}`),document.createTextNode(" "));if(Lt.push(Ut),J.classList.contains("date-row")){let fn=bn(t.state.t,o);Lt.push(k("p",{class:"k-tsrc"},`${Gi(fn)} UTC \xB7 ${me("time.local")} ${ze(fn)} (${He(fn)})`))}let Xt=k("button",{type:"button",id:"tag-open-source",class:"k-btn k-secondary",i18n:"tag.pop_open"});Xt.addEventListener("click",()=>{b(!1),t.model.openSource(ue)}),Lt.push(k("div",{class:"k-popfoot"},Xt))}else delete Bi.dataset.source,delete Bi.dataset.verification;Bi.replaceChildren(...Lt),N(Bi,T)}let Uf=T=>T&&T.closest&&T.closest("#info, #timebar, #status, #tour")&&T.closest(".tag:not(.tag-approx):not(.tag-open)");document.addEventListener("click",T=>{let J=Uf(T.target);J&&(T.stopPropagation(),Df(J))},!0),document.addEventListener("keydown",T=>{(T.key==="Enter"||T.key===" ")&&Uf(T.target)&&(T.preventDefault(),Df(T.target.closest(".tag")))});let O0=!!globalThis.__LAGRANGE_IDLE_OFF,kf=null,ad=()=>r.classList.contains("chrome-hidden"),F0=()=>{let T=document.activeElement;return!!(T&&T!==r&&T.closest&&T.closest("[data-shell], #source, #lab"))},Of=()=>{let T=document.getElementById("lab");return!!(T&&!T.hidden)},B0=()=>!Fi.active&&!t.anim.speedDaysPerSec&&!ce&&!we&&!C&&!F0()&&g.hidden&&s.elements.help.hidden&&!Of();function is(){clearTimeout(kf),!O0&&(kf=setTimeout(()=>{ad()||(B0()?vl():is())},FM))}function vl(){r.classList.add("chrome-hidden"),l(!1)}function zi(){ad()&&(r.classList.remove("chrome-hidden"),l(!0)),is()}function z0(){b(!1),Pe(!1,{refocus:!1}),Kt(!1),vl()}c.reveal=zi,c.hide=z0,c.retreat=vl;for(let T of["pointermove","pointerdown","wheel","touchstart"])window.addEventListener(T,()=>zi(),{passive:!0,capture:!0});let jn=new Map,ss=null,Ff=()=>{let[T,J]=[...jn.values()];return Math.hypot(T.x-J.x,T.y-J.y)};window.addEventListener("pointerdown",T=>{T.pointerType!=="touch"||T.target!==t.renderer.domElement||(jn.set(T.pointerId,{x:T.clientX,y:T.clientY}),jn.size===2&&(ss={d0:Math.max(Ff(),1),dist0:t.state.cam.dist}),jn.size>=2&&T.stopPropagation())},!0),window.addEventListener("pointermove",T=>{if(!jn.has(T.pointerId)||(jn.set(T.pointerId,{x:T.clientX,y:T.clientY}),!ss)||(T.stopPropagation(),jn.size<2))return;let J=Math.min(t.zoomOutMax(),Math.max(t.zoomFloorKm(),ss.dist0*(ss.d0/Math.max(Ff(),1))));t.setCamera({dist:J})},!0);let Bf=T=>{jn.has(T.pointerId)&&(jn.delete(T.pointerId),ss&&jn.size>0&&T.stopPropagation(),jn.size<2&&ss&&(jn.size===0?ss=null:ss.d0=0))};window.addEventListener("pointerup",Bf,!0),window.addEventListener("pointercancel",Bf,!0),c.pinchState=()=>({touches:jn.size,pinching:!!ss});let bl=null;window.addEventListener("pointerdown",T=>{bl={x:T.clientX,y:T.clientY,t:T.target}},!0),window.addEventListener("click",T=>{if(!T.isTrusted)return;let J=T.target,ue=bl?Math.hypot(T.clientX-bl.x,T.clientY-bl.y):0;C&&!C.contains(J)&&!(I&&I.contains(J))&&b(!1),!(!(J&&(J.id==="scene"||J.closest&&J.closest("#labels")))||ue>5)&&(performance.now()-rn<400||(ce&&Pe(!1,{refocus:!1}),we&&Kt(!1)))}),window.addEventListener("keydown",T=>{if(Fi.active&&!C&&g.hidden&&s.elements.help.hidden&&Fi.handleKey(T)){T.stopPropagation(),T.preventDefault(),zi();return}if(T.key==="Escape"){let ue=!0;fi()||(C?b():g.hidden?s.elements.help.hidden?Of()&&c.lab&&c.lab.close?c.lab.close():we?Kt():ce?Pe(!1):ad()?ue=!1:(document.activeElement&&document.activeElement!==r&&document.activeElement.blur(),vl()):s.elements.help.hidden=!0:Vl()),ue&&(T.stopPropagation(),T.preventDefault());return}if(s.handleKey(T))return;zi();let J=T.target&&T.target.tagName||"";T.ctrlKey||T.metaKey||T.altKey||J==="INPUT"||J==="SELECT"||J==="TEXTAREA"||i||(T.key==="/"?(T.preventDefault(),Pe(!0,{focusSearch:!0})):T.key==="t"||T.key==="T"?(T.preventDefault(),Pe(!ce,{focusSearch:!ce})):(T.key==="e"||T.key==="E")&&re==="expert"&&(T.preventDefault(),c.openExport()))},!0);let Nr=null;new MutationObserver(()=>{g.hidden?(Nr&&document.contains(Nr)&&Nr.offsetParent!==null&&Nr.focus({preventScroll:!0}),Nr=null,is()):(Nr=document.activeElement&&document.activeElement!==r?document.activeElement:null,zi())}).observe(g,{attributes:!0,attributeFilter:["hidden"]});let za={half:0,full:0};function zf(){return i||innerWidth<1080}function Vf(){let T=i&&innerWidth<768,J=i&&!T;r.classList.toggle("k-phone",T),r.classList.toggle("k-tablet",J);let ue=parseFloat(getComputedStyle(Hf).paddingTop)||0;za=i0(innerHeight,ue),r.style.setProperty("--sheet-half",`${za.half}px`),r.style.setProperty("--sheet-full",`${za.full}px`),Sl(),Ml()}function Sl(){r.style.setProperty("--tr-w",`${Math.ceil(Ne.getBoundingClientRect().width)}px`),i&&(K.classList.remove("k-nav2"),D.scrollWidth>D.clientWidth+1&&K.classList.add("k-nav2"))}function Ml(){let T=r.classList.contains("k-phone"),J=r.classList.contains("k-tablet");r.classList.toggle("sheet-open",T&&(ce||we)||J&&ce),d&&Lr()}let Hf=k("div",{class:"k-safeprobe","aria-hidden":"true"});r.append(Hf),addEventListener("resize",Vf),$e.push(()=>{Sl(),Lr()}),Vf();function Gf(){$.textContent=Hr,B.setAttribute("aria-label",Hr),tt(),be(),ki(),lt(),Nf(),ti(),xt(),ae.placeholder=me("nav.search_ph"),ae.setAttribute("aria-label",me("nav.search_ph")),Me._render(),yl(Zt),yt(K),yt(Ne),yt(Zt),yt(Es),yt(G),_i&&yt(_i);for(let T of Object.values(v))yt(T)}dr(()=>{Fi.active&&Fi.render(),Gf(),we&&Jt(de,{moreOpen:!!(Y.querySelector("#info-more")||{}).open}),C===Bi&&b(!1),Sl(),Lr()}),$e.push(()=>{lt(),Nf(),be(),tt(),Fi.active&&Fi.render()}),c.setLab=T=>{c.lab=T};let od=document.getElementById("lab");od&&new MutationObserver(()=>{od.hidden||(Kt(!1),Pe(!1,{refocus:!1}),b(!1))}).observe(od,{attributes:!0,attributeFilter:["hidden"]});function V0(){let T=a0.get();if(T==="expert"||T==="general")return T;try{let J=JSON.parse(localStorage.getItem("lagrange.layers")||"null");return J&&J.preset==="research"?"expert":"general"}catch{return"general"}}let Wf=()=>((document.getElementById("version")||{}).textContent||"").trim();function jf(T){let J=bn(t.state.t,o);return T.map(ue=>{let ke=ue.provenance,Ze=ue.unit&&typeof ue.unit=="object"?ue.unit:{ko:ue.unit||"",en:ue.unit||""};return{id:ue.id,label_ko:(ue.label||{}).ko??String(ue.label||""),label_en:(ue.label||{}).en??"",value:ue.value??null,text:ue.text,unit_ko:Ze.ko??"",unit_en:Ze.en??"",tag:ke.verification.tag,detail:ke.verification.detail,source:yi(ke),computed_by:ke.computed_by||"",source_hash:ke.source_hash||"",ref_commit:ke.ref_commit||"",stage:ke.stage||"",model:ke.model||"",screen_utc:`${Gi(J)} UTC`,screen_tdb_s:Math.round(t.state.t),time_conversion:"browser (core.tdbToUnix, Python table)",app:Wf()}})}let H0=T=>{let J=T==null?"":String(T);return/[",\n\r]/.test(J)?'"'+J.replace(/"/g,'""')+'"':J};function ld(T,J,ue){let ke=jf(T),Ze,dt;if(J==="csv"){let Ut=Object.keys(ke[0]||{id:""});Ze="\uFEFF"+[Ut.join(","),...ke.map(Xt=>Ut.map(fn=>H0(Xt[fn])).join(","))].join(`\r
`)+`\r
`,dt="text/csv"}else Ze=JSON.stringify({app:Wf(),share:wl(),numbers:ke},null,1),dt="application/json";let Lt=k("a",{download:`lagrange_${ue}.${J}`,href:URL.createObjectURL(new Blob([Ze],{type:`${dt};charset=utf-8`}))});document.body.append(Lt),Lt.click(),Lt.remove(),setTimeout(()=>URL.revokeObjectURL(Lt.href),4e3),c.lastExport={kind:J,name:ue,n:ke.length,bytes:Ze.length}}c.exportRows=jf;let cd=T=>Number(T.toPrecision(7));function wl(){let T=t.state.cam,J=s.state,ue=new URLSearchParams;ue.set("t",String(Math.round(t.state.t/60)*60));let ke=Oe&&!Oe.startsWith("zoom:")&&Oe!=="__all"?Oe:"";return ke&&ue.set("target",ke),ue.set("cam",[cd(T.dist),cd(T.az),cd(T.el)].join(",")),ue.set("frame",t.state.sTarget?"inertial":"rot"),ue.set("mode",re),ue.set("lang",Vn()),ue.set("layers",ns.map(Ze=>J[Ze]?"1":"0").join("")),`${location.origin==="null"?location.href.split("#")[0]:location.origin+location.pathname+location.search}#${ue.toString()}`}c.shareUrl=wl;function G0(){let T=location.hash.slice(1);if(!T||!T.includes("="))return;let J=new URLSearchParams(T);(J.get("mode")==="expert"||J.get("mode")==="general")&&Xe(J.get("mode"),!1),(J.get("lang")==="ko"||J.get("lang")==="en")&&J.get("lang")!==Vn()&&go(J.get("lang"),!1);let ue=J.get("layers");ue&&/^[01]+$/.test(ue)&&ue.length===ns.length&&s.applyShared(Object.fromEntries(ns.map((Ut,Xt)=>[Ut,ue[Xt]==="1"]))),(J.get("frame")==="inertial"||J.get("frame")==="rot")&&(c.frameChosen=!0,_l(J.get("frame")));let ke=J.get("target"),Ze=ke&&ke.startsWith("view:")?ke.slice(5):null;Ze&&Un[Ze]?(On(Ze),it(ke)):ke&&Ar[ke]&&(t.setCamera({target:Ar[ke][0],dist:Ar[ke][1]}),it(ke));let dt=(J.get("cam")||"").split(",").map(Number);dt.length===3&&dt.every(Number.isFinite)&&dt[0]>0&&t.setCamera({dist:dt[0],az:dt[1],el:Math.max(-1.55,Math.min(1.55,dt[2]))});let Lt=Number(J.get("t"));J.get("t")&&Number.isFinite(Lt)&&t.setTime(Lt),r.dataset.shared="1",c.shared=Object.fromEntries(J.entries())}return Xe(V0(),!1),it("L2"),c.applyShareHash=G0,Gf(),l(!0),is(),c}var d0="lagrange.panel",h0={get(){try{return localStorage.getItem(d0)}catch{return null}},set(n){try{localStorage.setItem(d0,n)}catch{}}};function f0(n,e,t,i,s){let r=document.body,a=document.getElementById("top"),o=document.getElementById("panel");a.dataset.obstacle="",document.getElementById("version").dataset.obstacle="",document.getElementById("source").dataset.obstacle="";let l=h=>s.setLabelNumbers(h);s.labelNumbersDefault=n.label.numbers,r.append(s.elements.scalebar,s.elements.help);let c={pick:()=>{},layout:n.layout},d=h=>s.handleKey(h);if(n.layout==="panel"){o.dataset.obstacle="";let h=k("button",{type:"button",id:"panel-toggle",class:"panel-toggle","aria-expanded":"true"}),u=k("div",{class:"panel-inner"},k("h2",{id:"panel-h",i18n:"l2.panel"}),k("div",{class:"ctl"},e.mode,e.views,e.timeHead,e.timeSlider,e.timeDate),e.layers,e.nums,e.legend);o.replaceChildren(h,u);let f=(y,p=!0)=>{r.classList.toggle("panel-collapsed",y),h.setAttribute("aria-expanded",String(!y)),h.dataset.i18n=y?"panel.open":"panel.close",h.textContent=me(h.dataset.i18n),p&&h0.set(y?"collapsed":"open")},m=h0.get();return f(m?m==="collapsed":i,!1),h.addEventListener("click",()=>f(!r.classList.contains("panel-collapsed"))),c.setCollapsed=f,window.addEventListener("keydown",d),l(n.label.numbers),c}return u0(n,e,t,i,s)}var p0={name:"default",layout:"panel",css:{"--bg":"#04060c","--fg":"#e7ecf5","--muted":"#a3aec4","--panel":"rgba(12, 18, 32, 0.92)","--line":"#26324c","--impl":"#5aa5ff","--external":"#f0a23b","--physical":"#3fca7f","--approx":"#9aa0aa","--accent":"#5aa5ff","--font":"'Pretendard', system-ui, 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif","--panel-radius":"10px","--panel-blur":"0px","--panel-width":"340px","--btn-bg":"#1b2740","--btn-on":"#2d4a7a","--label-bg":"rgba(12, 18, 32, 0.72)","--label-border":"1px dashed #26324c","--label-radius":"4px","--label-size":"12px","--fs-body":"13px","--fs-small":"12px","--label-min":"12px"},scene:{background:263692,colors:{sun:16765562,emb:8369151,earth:5217791,moon:13620966,lpt:16743129,unstable:16734810,stable:4180607,haloFam:3824266,haloMain:9425919,escOut:15770171,escIn:5822146,a3:13079274,c3:16763755,c4:16747109,ref4c:11583173,ref4d:8440772,moonTrail:7109270,jwst:15255666,extJpl:15770171,extMine:16767392,physRecon:4180607,physMine:11728335,physJpl:3120739,zoomGap:16777215},lines:{main:2.6,family:1,familyOpacity:.35,traj:1.6,dir:2.2,ref:1.8,dv:1.4,trail:1.4,escape:1.8,jwst:1.6,jwstInterp:1.3,pred:2,zoomGap:1.4,dashPx:7,gapPx:5},points:{lpt:9,emb:8,burn:6,jwst:3.5,jwstMarker:9,predEnd:6,zoomPt:10},spheres:{sunMinPx:9,earthMinPx:6,moonMinPx:4},glow:{sun:3.2,earth:1.8,moon:1.4,strength:.55},familyEvery:10},label:{numbers:!0},layers:{initial:"m1",persist:!1}};var m0={name:"C",layout:"hybrid",css:{"--bg":"#000000","--fg":"#f3f5f9","--muted":"#c3cad5","--panel":"rgba(8, 10, 14, 0.80)","--line":"rgba(255, 255, 255, 0.09)","--accent":"#f2f5fa","--panel-radius":"4px","--panel-blur":"16px","--panel-width":"350px","--btn-bg":"rgba(255, 255, 255, 0.07)","--btn-on":"rgba(255, 255, 255, 0.16)","--label-bg":"rgba(0, 0, 0, 0.45)","--label-border":"none","--label-radius":"6px","--label-size":"12px","--fg-2":"#c3cad5","--fg-scene":"#f3f5f9","--fg-scene-2":"#d4d9e1","--on-accent":"#0c0f15","--line-strong":"rgba(255, 255, 255, 0.44)","--edge-hover":"rgba(255, 255, 255, 0.70)","--hover":"rgba(0, 0, 0, 0.45)","--press":"rgba(0, 0, 0, 0.60)","--focus":"#ffffff","--focus-halo":"rgba(0, 0, 0, 0.9)","--scrim-top":"linear-gradient(to bottom, rgba(0, 0, 0, .70) 0, rgba(0, 0, 0, .64) 64px, rgba(0, 0, 0, .30) 112px, rgba(0, 0, 0, 0) 168px)","--scrim-bottom":"linear-gradient(to top, rgba(0, 0, 0, .74) 0, rgba(0, 0, 0, .66) 128px, rgba(0, 0, 0, .30) 176px, rgba(0, 0, 0, 0) 236px)","--scrim-top-h":"168px","--scrim-bottom-h":"236px","--fs-name":"36px","--fw-name":"300","--fs-key":"30px","--fw-key":"300","--fs-unit":"12px","--fs-ui":"14px","--track-cap":"0.06em","--r-ctl":"6px","--ctl-h":"32px","--icon-btn":"32px","--tag-dot":"7px","--tag-hit":"28px","--vpanel-left":"340px","--vpanel-right":"380px","--vpanel-right-expert":"420px","--t-fast":"160ms","--t-base":"480ms","--t-slow":"560ms","--ease":"cubic-bezier(.16, 1, .3, 1)"},scene:{background:0,colors:{haloFam:2834528,haloMain:12575743},lines:{main:2.6,family:.9,familyOpacity:.26,traj:1.5,dir:2,ref:1.7,dv:1.2,trail:1.3,escape:1.7},glow:{sun:3.8,earth:2.2,moon:1.6,strength:.7},familyEvery:12},label:{numbers:!1},layers:{initial:"clean",persist:!0}};var zM="C",g0={C:m0,PANEL:{name:"panel"}},VM=["--t-fast","--t-base","--t-slow"];function _0(n,e){let t={...n};for(let[i,s]of Object.entries(e||{}))t[i]=s&&typeof s=="object"&&!Array.isArray(s)?_0(n[i]||{},s):s;return t}function x0(n){let e=null;try{e=new URLSearchParams(n).get("style")}catch{e=null}let t=e&&g0[e.toUpperCase()]||g0[zM];return _0(p0,t)}function y0(n,e=document.documentElement){for(let[s,r]of Object.entries(n.css))e.style.setProperty(s,r);document.body.classList.add(`layout-${n.layout}`,`style-${n.name}`),document.body.dataset.style=n.name;let t=null;try{t=window.matchMedia("(prefers-reduced-motion: reduce)")}catch{t=null}let i=()=>{for(let s of VM)n.css[s]!==void 0&&e.style.setProperty(s,t&&t.matches?"0ms":n.css[s])};i(),t&&t.addEventListener&&t.addEventListener("change",i)}function v0(n){if(!("serviceWorker"in navigator))return Promise.resolve(null);let e=i=>{i.waiting&&navigator.serviceWorker.controller&&(n.hidden=!1)};n.addEventListener("click",async()=>{let i=await navigator.serviceWorker.getRegistration();i&&i.waiting&&i.waiting.postMessage({type:"SKIP_WAITING"})});let t=!1;return navigator.serviceWorker.addEventListener("controllerchange",()=>{t||!n.dataset.armed||(t=!0,location.reload())}),n.addEventListener("click",()=>{n.dataset.armed="1"},{capture:!0}),navigator.serviceWorker.register("./sw.js").then(i=>(e(i),i.addEventListener("updatefound",()=>{let s=i.installing;s&&s.addEventListener("statechange",()=>{s.state==="installed"&&e(i)})}),i))}function Ef(n,e){let t=n.dirty?` + ${e["version.dirty"]}`:"";return`v${n.version} \xB7 ${n.date} \xB7 ${e["version.commit"]} ${n.commit}${t}`}var b0=null;function S0(n){let e=null,t=null,i=null,s=0,r=null,a={};async function o(){if(e)return e;if(t)return t;if(!n.lab)throw new Error("\uC774 \uD310\uC5D0\uB294 \uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uAC00 \uC5C6\uB2E4 (manifest.lab)");return t=(async()=>{for(let h of n.lab.datasets){let u=await Ps(h.file),f=os(u,n.verification.details);if(f.errors.length)throw new Error(`${h.id}: ${f.errors.join("; ")}`);u.binary&&(u._arrays=Rs(await ai(u.binary.file),u.binary.arrays)),u.d24&&(u._forest=await ai(u.d24.file)),a[h.id]=u}let d=a["m3.lab"];return e=oo(d,d._arrays,d._forest),e})(),t}function l(){if(i)return i;if(cr==="embedded"){let d=URL.createObjectURL(new Blob([b0],{type:"text/javascript"}));i=new Worker(d)}else i=new Worker("lab-worker.js");return i.onmessage=d=>{let h=d.data;if(!r||h.id!==r.id)return;if(h.type==="progress"){r.onProgress&&r.onProgress(h);return}let u=r;r=null,h.type==="done"?u.resolve({...h.result,wall_ms:performance.now()-u.t0}):u.reject(new Error(h.message))},i.onerror=d=>{if(r){let h=r;r=null,h.reject(new Error(d.message||"Worker \uC624\uB958"))}},i}function c(d,h={}){if(!e)return Promise.reject(new Error("\uBA3C\uC800 lab.load()"));let u=l();if(r){let m=r;r=null,m.reject(new Error("\uBC84\uB9BC"))}let f=++s;return new Promise((m,y)=>{r={id:f,resolve:m,reject:y,onProgress:h.onProgress,t0:performance.now()},u.postMessage({id:f,params:e.escapeParams(h),s0:Array.from(d),chunk:h.chunk,trajTol:h.trajTol,trajMax:h.trajMax})})}return{load:o,integrate:c,get loaded(){return!!e},get lab(){return e},datasets:a,predict:d=>Or(e,d),predictState:d=>Nd(e,d),components:d=>rr(e,d),stateOf:d=>Rl(e,d)}}function pl(n,e){let t={},i=null;async function s(){if(i)return i;let l=n[e];if(!l)throw new Error(`\uC774 \uD310\uC5D0\uB294 ${e} \uC790\uB8CC\uAC00 \uC5C6\uB2E4`);return i=(async()=>{for(let c of l.datasets){let d=await Ps(c.file),h=os(d,n.verification.details);if(h.errors.length)throw new Error(`${c.id}: ${h.errors.join("; ")}`);d.binary&&(d._arrays=Rs(await ai(d.binary.file),d.binary.arrays)),d.chunks&&(d._chunks={}),t[c.id]=d}return t})(),i}let r={};async function a(l,c){await s();let d=t[l];if(!d||!d.chunks)throw new Error(`${l}: \uC870\uAC01 \uC790\uB8CC\uAC00 \uC544\uB2C8\uB2E4`);if(d._chunks[c])return d._chunks[c];let h=l+":"+c;if(!r[h]){let u=d.chunks.find(f=>f.year===c);if(!u)throw new Error(`${l}: \uC870\uAC01 ${c} \uC5C6\uC74C`);r[h]=ai(u.file).then(f=>(d._chunks[c]=Rs(f,u.arrays),d._chunks[c]))}return r[h]}async function o(){await s();for(let[l,c]of Object.entries(t))if(c.chunks)for(let d of c.chunks)await a(l,d.year);return t}return{load:s,loadChunk:a,loadAllChunks:o,datasets:t,get loaded(){return Object.keys(t).length>0},available:!!n[e]}}var HM={target:"L2",dist:17e5,az:-1.25,el:.8},GM=300,Tf=900,Ys=2e3,WM={tag:"impl",detail:"implementation"},Qu=[{id:"truth",key:"lab.col_truth",src:"m3.lab.json>integrate (core/lab/escape.js DOP853, Worker)"},{id:"T3",key:"lab.col_t3",src:"m3.lab.json>t3 (core/lab/eigen.js lnT3)"},{id:"D24",key:"lab.col_d24",src:"m3.lab.json>d24 (core/lab/forest.js predictD24)"},{id:"MLP",key:"lab.col_mlp",src:"m3.lab.json>mlp (core/lab/mlp.js predictMLP)"},{id:"HYB",key:"lab.col_hybrid",src:"m3.lab.json>d24>w_R (\uD558\uC774\uBE0C\uB9AC\uB4DC = D24, w_R \uBAA8\uB450 0)",only:["research"]},{id:"dT3",key:"lab.col_dt3",src:"core/lab \u2014 ln t_T3 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"T3"},{id:"dD24",key:"lab.col_dd24",src:"core/lab \u2014 ln t_D24 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"D24"},{id:"dMLP",key:"lab.col_dmlp",src:"core/lab \u2014 ln t_MLP \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"MLP"},{id:"dir",key:"lab.col_dir",src:"core/lab \u2014 e_u* \uBD80\uD638 \uB300 \uC815\uB2F5 \uC774\uD0C8 \uBC29\uD5A5",only:["research"]}],ml=n=>{if(!Number.isFinite(n))return"\u2014";let e=Math.exp(n);return e>=100?e.toFixed(1):e>=10?e.toFixed(2):e.toFixed(3)},jM=n=>Number.isFinite(n)?(n>=0?"+":"\u2212")+Math.abs(n).toExponential(1):"\u2014",ed=n=>{if(n===0)return"0";let e=Math.floor(Math.log10(Math.abs(n)));return`${(n/10**e).toFixed(2)}e${e}`};function M0({view:n,labApi:e,layers:t,mobile:i,onOpen:s}){let r=k("aside",{id:"lab",class:"lab",hidden:!0,"data-obstacle":"","aria-live":"polite"}),a=k("button",{type:"button",id:"view-lab",i18n:"l2.view_lab"}),o={v:null,E:null,pred:null,flags:null,truth:null,outside:!1,timer:null,job:0,built:!1,example:null,lastResult:null},l=null;if(i){let S=k("div",{id:"lab-mobile",class:"lab-mobile"},k("p",{i18n:"lab.mobile_note"})),x=k("button",{type:"button",class:"close",i18n:"source.close"});return x.addEventListener("click",()=>{r.hidden=!0}),r.append(x,k("h3",{i18n:"lab.title"}),S),a.addEventListener("click",()=>{r.hidden=!1,yt(r),s&&s()}),{panel:r,button:a,open:async()=>{r.hidden=!1,yt(r)},state:o}}let c=k("button",{type:"button",class:"close",id:"lab-close",i18n:"source.close"}),d=k("div",{id:"lab-status",class:"lab-status","data-meta":"",i18n:"lab.loading"}),h=[],u=()=>{let S=vi(WM,n.model.table);return h.push(S),S},f=k("div",{class:"lab-scope","data-meta":""},u(),k("span",{i18n:"lab.scope"})),m=k("div",{id:"lab-examples",class:"lab-examples","data-meta":""}),y=k("div",{id:"lab-example-src",class:"lab-note","data-meta":""}),p=k("div",{id:"lab-controls",class:"lab-controls","data-meta":""}),g=k("div",{id:"lab-flags",class:"lab-flags"}),C=k("div",{id:"lab-progress",class:"lab-progress","data-meta":""}),I=k("progress",{id:"lab-bar",max:1,value:0}),v=k("span",{id:"lab-progtext"});C.append(I,v);let M=k("table",{id:"lab-table",class:"lab-table"}),w=k("div",{class:"lab-table-wrap"},M),N=k("div",{id:"lab-foot",class:"lab-note","data-meta":""}),b=k("button",{type:"button",class:"lab-fold",id:"lab-fold","aria-expanded":"true"}),R="lagrange.lab.folded",B={get(){try{return localStorage.getItem(R)==="1"}catch{return!1}},set(S){try{localStorage.setItem(R,S?"1":"0")}catch{}}};function $(S,x=!0){r.dataset.folded=S?"1":"0",b.setAttribute("aria-expanded",S?"false":"true"),b.dataset.i18n=S?"lab.unfold":"lab.fold";try{b.textContent=me(b.dataset.i18n)}catch{}x&&B.set(S)}b.addEventListener("click",()=>$(r.dataset.folded!=="1")),$(B.get(),!1),r.append(c,b,k("h3",{i18n:"lab.title"}),f,d,m,y,p,g,C,w,N),c.addEventListener("click",()=>Le());let D={};function O(S,x,z,j){let ne=k("input",{type:"range",id:"lab-"+S,min:String(x),max:String(z),step:String(j),"aria-label":S}),fe=k("span",{class:"lab-val",id:"lab-"+S+"-val"}),be=k("label",{class:"lab-row"},k("span",{class:"lab-name",i18n:"lab.s_"+S}),ne,fe);return ne.addEventListener("input",()=>te(S)),ne.addEventListener("change",()=>ve()),D[S]={input:ne,val:fe,row:be},be}let U=k("button",{type:"button",id:"lab-sign-out",i18n:"lab.sign_out"}),W=k("button",{type:"button",id:"lab-sign-in",i18n:"lab.sign_in"}),K=k("input",{type:"checkbox",id:"lab-outside"}),H=k("label",{class:"lab-outside",id:"lab-outside-row"},K,k("span",{i18n:"lab.outside"}));function ee(){let S=l.sliders,x=o.outside?S.out_factor:1;return{es:S.es_in*x,ap:S.ap_in*x,az:S.az_in*x}}function q(){let S=o.v,x=ee(),z=l.sliders;D.eu.input.value=String(Math.round((Math.log10(Math.max(S.eu,1e-300))-z.eu_log10[0])/(z.eu_log10[1]-z.eu_log10[0])*Tf)),D.es.input.value=String(Math.round(S.es/x.es*Ys)),D.ap.input.value=String(Math.round(S.ap/x.ap*Ys)),D.az.input.value=String(Math.round(S.az/x.az*Ys)),D.phip.input.value=String(Math.round(S.phip*180/Math.PI)),D.phiz.input.value=String(Math.round(S.phiz*180/Math.PI)),D.eu.val.textContent=`${ed(S.eu)} \u03B3`,D.es.val.textContent=`${ed(S.es)} \u03B3`,D.ap.val.textContent=`${ed(S.ap)} \u03B3`,D.az.val.textContent=`${ed(S.az)} \u03B3`,D.phip.val.textContent=`${(S.phip*180/Math.PI).toFixed(0)}\xB0`,D.phiz.val.textContent=`${(S.phiz*180/Math.PI).toFixed(0)}\xB0`,U.classList.toggle("on",S.sign>0),W.classList.toggle("on",S.sign<0)}function ie(S){let x=Number(D[S].input.value),z=ee(),j=l.sliders;return S==="eu"?10**(j.eu_log10[0]+x/Tf*(j.eu_log10[1]-j.eu_log10[0])):S==="phip"||S==="phiz"?x*Math.PI/180:x/Ys*z[S]}function te(S){o.example=null;let x={...o.v,[S]:ie(S)};!o.outside&&S!=="phip"&&S!=="phiz"&&(x=to(l,x,S)),o.v=x,q(),xe(),Se()}function se(S){o.example=null,o.v={...o.v,sign:S},q(),xe(),Se(),ve()}U.addEventListener("click",()=>se(1)),W.addEventListener("click",()=>se(-1)),K.addEventListener("change",()=>he(K.checked));function he(S){if(o.outside=S&&t.preset==="research",K.checked=o.outside,!o.outside&&o.v&&!o.example){let x=o.v;for(let z of["eu","es","ap","az"])x=to(l,x,z);o.v=x}l&&(q(),xe(),ve())}function Ne(){let S=k("tr",{},k("th",{"data-meta":"",i18n:"lab.col_r"}));for(let z of Qu){let j=k("th",{class:"c-"+z.id,"data-col":z.id,"data-meta":""},k("span",{i18n:z.key}));z.id!=="dir"&&j.append(u()),S.append(j)}S.append(k("th",{class:"c-flag","data-meta":"",i18n:"lab.col_flag"}));let x=k("tbody");l.R_over_gamma.forEach((z,j)=>{let ne=k("tr",{"data-k":String(j)},k("td",{"data-meta":""},`${l.labels[j]} \u03B3`));for(let fe of Qu){let be=k("td",{class:"num c-"+fe.id,"data-col":fe.id,"data-source":fe.src,"data-verification":"impl/implementation","data-browser":"1"});ne.append(be)}ne.append(k("td",{class:"c-flag","data-col":"flag"})),x.append(ne)}),M.replaceChildren(k("thead",{},S),x)}function Ee(S,x){return M.querySelector(`tbody tr[data-k="${S}"] td[data-col="${x}"]`)}function Ue(S,x,z){S.dataset.value=String(x),S.textContent=z}function X(){let S=o.pred,x=o.flags;l.R_over_gamma.forEach((z,j)=>{Ue(Ee(j,"T3"),S.T3[j],ml(S.T3[j])),Ue(Ee(j,"D24"),S.D24?S.D24[j]:NaN,S.D24?ml(S.D24[j]):"\u2014"),Ue(Ee(j,"MLP"),S.MLP[j],ml(S.MLP[j])),Ue(Ee(j,"HYB"),S.D24?S.D24[j]:NaN,S.D24?ml(S.D24[j]):"\u2014");let ne=Ee(j,"flag"),fe=[];x.inRange||fe.push(k("span",{class:"flag flag-extrap",i18n:"lab.flag_extrap"})),x.uncertain[j]&&fe.push(k("span",{class:"flag flag-unc",i18n:"lab.flag_unc",title:me(x.mismatch[j]?"lab.flag_unc_mismatch":"lab.flag_unc_spread")})),ne.replaceChildren(...fe),ne.dataset.uncertain=x.uncertain[j]?"1":"0"}),g.replaceChildren(...x.inRange?[]:[k("span",{id:"lab-extrap",class:"flag flag-extrap",i18n:"lab.extrap_long"})]),Z(),yt(r)}function Z(){let S=o.truth;l.R_over_gamma.forEach((x,z)=>{if(!S){Ue(Ee(z,"truth"),NaN,"\u2026");for(let fe of Qu)(fe.diff||fe.id==="dir")&&Ue(Ee(z,fe.id),NaN,"\u2026");return}let j=Math.log(S.t_days[z]);Ue(Ee(z,"truth"),j,Number.isFinite(j)?ml(j):me("lab.no_escape"));for(let fe of Qu)if(fe.diff){let be=o.pred[fe.diff],le=be?be[z]-j:NaN;Ue(Ee(z,fe.id),le,jM(le))}let ne=S.dir[z]===0?null:Math.sign(o.pred.eus)===S.dir[z];Ue(Ee(z,"dir"),ne===null?NaN:ne?1:0,ne===null?"\u2014":me(ne?"lab.dir_hit":"lab.dir_miss"))})}function xe(){o.E=o.example!==null?l.examples[o.example].E.slice():Ll(l,o.v),o.pred=e.predict(o.E),o.flags=Ur(l,o.pred),o.truth=null,X()}function Se(){clearTimeout(o.timer),o.timer=null}function ve(){Se(),o.timer=setTimeout(ye,GM),v.textContent=me("lab.waiting")}function je(){let S=n.model.constants.length_unit_km,x=n.state.cam.dist,z=l.frame.gamma*l.R_over_gamma[l.R_over_gamma.length-1]*S,j=Math.max(.05,(x-z)/x);return n.kmPerPx()*j/n.renderer.getPixelRatio()/S}async function ye(){o.timer=null;let S=++o.job,x=l.escapeParams().t_max_days;I.max=x,I.value=0,v.textContent=me("lab.integrating"),r.dataset.integrating="1";let z=je();try{let j=await e.integrate(e.stateOf(o.E),{trajTol:z,onProgress:ne=>{S===o.job&&(I.value=ne.t_days,v.textContent=me("lab.integrating_days",{d:ne.t_days.toFixed(0)}))}});if(S!==o.job)return;o.truth=j,o.lastResult=j,o.trajTolUsed=z,o.trajE=o.E,I.value=j.t_reached_days,v.textContent=me("lab.done",{ms:j.wall_ms.toFixed(0),n:j.traj?j.traj.n:0}),Z(),Te(j),Ke(j),yt(r),r.dataset.integrating="0",r.dataset.done=String(S)}catch(j){if(String(j.message)==="\uBC84\uB9BC")return;v.textContent=me("lab.error",{msg:j.message}),r.dataset.integrating="0"}}function Ie(){let S=l.s_ref,x=l.frame.gamma,z=160;l.R_over_gamma.forEach((j,ne)=>{let fe=new Float64Array(3*(z+1));for(let be=0;be<=z;be++){let le=2*Math.PI*be/z;fe[3*be]=S[0]+j*x*Math.cos(le),fe[3*be+1]=S[1]+j*x*Math.sin(le),fe[3*be+2]=S[2]}n.addPolyline("lab_ring_"+ne,"lab",fe,7109270,1,.55,{dashed:!0})})}function Te(S){if(n.removeItem&&n.removeItem("lab_traj"),!S.traj||S.traj.n<2)return;let x=S.traj.points,z=l.s_ref,j=new Float64Array(x.length);for(let be=0;be<x.length;be+=3)j[be]=z[0]+x[be],j[be+1]=z[1]+x[be+1],j[be+2]=z[2]+x[be+2];let ne=S.dir.filter(be=>be!==0).pop(),fe=ne>0?n.COLORS.escOut:ne<0?n.COLORS.escIn:13686498;n.addPolyline("lab_traj","lab",j,fe,2.2),r.dataset.trajN=String(S.traj.n),n.render()}function Ke(S){if(!S.traj||S.traj.n<2||r.hidden||n.state.cam.target!=="L2"||n.state.fly)return;let x=S.traj.points,z=0;for(let ce=0;ce<x.length;ce+=3)z=Math.max(z,Math.hypot(x[ce],x[ce+1],x[ce+2]));if(!(z>0))return;let j=z*n.model.constants.length_unit_km,ne=n.camera,fe=ne.fov*Math.PI/360,be=Math.atan(Math.tan(fe)*ne.aspect),le=j/Math.sin(Math.min(fe,be))*1.1;o.fitDist=le,!(Math.abs(Math.log(le/n.state.cam.dist))<.01)&&n.flyTo("L2",le,.8)}let Be=null,st=0,re=!1;n.onRender.push(()=>{if(!l||r.hidden||!o.lastResult||re)return;let S=n.state.cam,x=`${S.dist}|${S.target}|${n.state.fly?1:0}`,z=performance.now();if(x!==Be){Be=x,st=z;return}z-st<250||n.state.fly||o.timer||r.dataset.integrating==="1"||o.trajE!==o.E||!(je()<o.trajTolUsed/1.5)||Re()});async function Re(){re=!0;let S=je(),x=o.E;try{let z=await e.integrate(e.stateOf(x),{trajTol:S});if(o.E!==x||r.dataset.integrating==="1")return;o.lastResult={...o.lastResult,traj:z.traj},o.trajTolUsed=S,Te(z),r.dataset.resampled=String((Number(r.dataset.resampled)||0)+1)}catch(z){String(z.message)!=="\uBC84\uB9BC"&&console.warn("\uADA4\uC801 \uB2E4\uC2DC \uBF51\uAE30 \uC2E4\uD328",z)}finally{re=!1}}function $e(){m.replaceChildren(k("span",{class:"ctl-h",i18n:"lab.examples"})),l.examples.forEach((S,x)=>{let z=k("button",{type:"button",class:"lab-ex",id:"lab-ex-"+x,"data-ex":String(x),i18n:"lab.ex_"+S.kind});z.addEventListener("click",()=>Xe(x)),m.append(z)})}function Xe(S){let x=l.examples[S];o.example=S,o.v=Il(l,x.E),q();for(let z of m.querySelectorAll(".lab-ex"))z.classList.toggle("on",z.dataset.ex===String(S));y.textContent=me("lab.ex_src",{no:x.sample_no??"\u2014",src:Vn()==="en"?x.source_en:x.source}),xe(),Se(),ye()}function G(){let S=t.preset;r.dataset.preset=S,H.hidden=S!=="research",S!=="research"&&o.outside&&he(!1),N.replaceChildren(...S==="research"?[k("span",{i18n:"lab.hybrid_note"})]:[],k("span",{i18n:"lab.foot"})),yt(N)}async function ae(){if(r.hidden=!1,s&&s(),n.setCamera({...HM}),n.setLayer("lab",!0),o.built)return G(),o;if(d.hidden=!1,yt(r),l=await e.load(),!l.uncertain||!l.sliders||l.examples.length!==5)throw new Error("\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 uncertain\xB7sliders\xB7examples \uAC00 \uC5C6\uB2E4 (main.py web \uB2E4\uC2DC)");p.replaceChildren(k("div",{class:"lab-row lab-sign"},k("span",{class:"lab-name",i18n:"lab.s_sign"}),U,W),O("eu",0,Tf,1),O("es",-Ys,Ys,1),O("ap",0,Ys,1),O("phip",0,359,1),O("az",0,Ys,1),O("phiz",0,359,1),H);let S=l.sliders,x=(Math.log10(S.eu_train[0])-S.eu_log10[0])/(S.eu_log10[1]-S.eu_log10[0])*100,z=(Math.log10(S.eu_train[1])-S.eu_log10[0])/(S.eu_log10[1]-S.eu_log10[0])*100;return D.eu.input.style.setProperty("--band-a",x+"%"),D.eu.input.style.setProperty("--band-b",z+"%"),D.eu.input.classList.add("banded"),Ne(),$e(),Ie(),d.hidden=!0,o.built=!0,t.onChange(G),G(),Xe(l.examples.findIndex(j=>j.kind==="q50")),o}function Le(){r.hidden=!0,Se(),n.setLayer("lab",!1)}return a.addEventListener("click",()=>{ae().catch(S=>{d.hidden=!1,d.textContent=me("lab.error",{msg:S.message})})}),{panel:r,button:a,open:ae,close:Le,state:o,rerender(){for(let S of h)S._render();if(o.example!==null&&l){let S=l.examples[o.example];y.textContent=me("lab.ex_src",{no:S.sample_no??"\u2014",src:Vn()==="en"?S.source_en:S.source})}},get lab(){return l},slide(S,x,z=!0){D[S].input.value=String(x),te(S),z&&ve()},useExample:Xe,setOutside:he}}var XM=["sun","earth","moon","emb"];function w0(n,e=()=>{}){let t=null,i=null,s=new Set;async function r(){return await n.load(),t=n.datasets["m4.ephem"],i=Xa(t,{}),c}function a(d){return i.chunkFor(d).year}function o(d){i.hasChunk(d)||s.has(d)||(s.add(d),e(!0),n.loadChunk("m4.ephem",d).then(h=>{i.hasChunk(d)||i.addChunk(d,h),s.delete(d),e(s.size>0)}).catch(h=>{s.delete(d),e(s.size>0),console.warn("\uCC9C\uCCB4\uB825 \uC870\uAC01 \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",d,h)}))}async function l(d){let h=a(d);if(!i.hasChunk(h))for(o(h);!i.hasChunk(h);)await new Promise(u=>setTimeout(u,10))}let c={init:r,ensure:l,get range(){return t.range_tdb_s},get tMin(){return t.range_tdb_s[0]},get tMax(){return t.range_tdb_s[1]},ready:d=>i.hasChunk(a(d)),loadedYears:()=>t.chunks.map(d=>d.year).filter(d=>i.hasChunk(d)),evaluate(d){let h=a(d);if(!i.hasChunk(h))return o(h),null;let u=[],f=[];for(let m of XM){let y=i.evaluate(m,d,h);u.push(y.pos),f.push(y.vel)}return{pos:u,vel:f}},solar:()=>i};return c}var Ss={startPx:160,releasePx:80,holdMs:2e3};function E0(n,e={}){let t={},i=[],s=e.mobile?"mobile":e.single?"single":null;function r(u){return s||(globalThis.__LAGRANGE_TEX2K?"test2k":u.hi?u.hiPx&&n.maxTextureSize()<Math.max(...u.hiPx)?"maxTextureSize "+n.maxTextureSize():n.qualityAllowsHiTex()?null:"quality":"no_hi")}async function a(u){let f={...u,level:null,pending:null,hiTex:null,loTex:null,px:0,belowSince:null,loads:0,releases:0,last_upload:null,steps:[],blocked:null,hiBitmap:null};t[u.id]=f,i.push(f);let m=performance.now(),y=await u.lo(),p=[y.width,y.height];return f.loTex=n.makeTexture(y,{mipmaps:u.mipmaps!==!1,wrapS:u.wrapS,colorSpace:u.colorSpace,anisotropy:u.anisotropy}),n.renderer.initTexture(f.loTex),y.close&&y.close(),u.apply(f.loTex,"2k"),f.level="2k",f.steps.push({level:"2k",ms:performance.now()-m,px:p}),f}function o(u){let f={cancelled:!1,stream:null};u.pending=f,(async()=>{let m=performance.now(),y=await u.hi();if(f.cancelled){y.close&&y.close();return}let p=performance.now()-m,g={mipmaps:u.mipmaps!==!1,wrapS:u.wrapS,anisotropy:u.anisotropy??n.renderer.capabilities.getMaxAnisotropy(),format:u.format,colorSpace:u.colorSpace};f.stream=globalThis.__LAGRANGE_TILES===!1?Og(n.renderer,y,g):Fg(n.renderer,y,{...g,nx:4,ny:2,border:8});let C=await f.stream.promise;if(y.close&&y.close(),f.cancelled){C.dispose();return}u.hiTex=C,u.pending=null,u.level="8k",u.loads++,u.apply(C,"8k");let I=f.stream.state;u.last_upload={tiled:!!C.isTiled,allocs:I.allocs?I.allocs.map(v=>Math.round(v.ms*10)/10):null,decode_ms:p,alloc_ms:I.alloc_ms??null,chunks:I.chunks.length,chunk_max_ms:Math.max(...I.chunks.map(v=>v.ms)),chunk_ms:I.chunks.map(v=>[v.level,Math.round(v.ms*10)/10,Math.round(v.at)]),blits:I.blits.length,blit_max_ms:I.blits.length?Math.max(...I.blits.map(v=>v.ms)):0,fence_waits:I.fence_waits,decode_at:[Math.round(m),Math.round(m+p)],total_ms:performance.now()-m,px:[I.w,I.h],levels:I.levels},u.steps.push({level:"8k",ms:performance.now()-m,px:[I.w,I.h]})})().catch(m=>{console.warn("8K \uADF8\uB9BC \uC62C\uB9AC\uAE30 \uC2E4\uD328",u.id,m),u.pending=null,u.blocked=String(m)})}function l(u){u.pending&&(u.pending.cancelled=!0,u.pending.stream&&u.pending.stream.cancel(),u.pending=null),u.hiTex&&(u.apply(u.loTex,"2k"),u.hiTex.dispose(),u.hiTex=null,u.releases++),u.level="2k"}function c(){let u=performance.now();for(let y of i)y.level&&(y.px=y.sphere?n.sphereScreenPx(y.sphere):1/0);let f=null,m=-1;for(let y of i)y.level&&y.body&&!r(y)&&y.px>=Ss.startPx&&y.px>m&&(f=y.body,m=y.px);if(f===null)for(let y of i)y.body&&(y.hiTex||y.pending)&&y.px>=Ss.releasePx&&y.px>m&&(f=y.body,m=y.px);for(let y of i)if(y.level){if(y.blocked=r(y),y.blocked){(y.hiTex||y.pending)&&l(y);continue}if(y.body&&f!==null&&y.body!==f){(y.hiTex||y.pending)&&l(y),y.belowSince=null;continue}y.px>=Ss.startPx?(y.belowSince=null,!y.hiTex&&!y.pending&&o(y)):y.px<Ss.releasePx&&(y.hiTex||y.pending)?y.belowSince===null?y.belowSince=u:u-y.belowSince>=Ss.holdMs&&(l(y),y.belowSince=null):y.belowSince=null}}n.onRender.push(c);function d(u,f,m=6e4){return new Promise((y,p)=>{let g=performance.now(),C=()=>{let I=t[u];I&&I.level===f&&!I.pending?y(h()[u]):performance.now()-g>m?p(new Error(`${u} ${f} \uAE30\uB2E4\uB9BC \uC2DC\uAC04 \uB118\uC74C (${I&&I.level})`)):setTimeout(C,50)};C()})}function h(){let u={};for(let f of i)u[f.id]={level:f.level,pending:!!f.pending,px:f.px,loads:f.loads,releases:f.releases,blocked:f.blocked,last_upload:f.last_upload,steps:f.steps};return u}return{add:a,tick:c,slots:t,snapshot:h,waitLevel:d,rule:Ss,hiBodies:()=>[...new Set(i.filter(u=>u.body&&(u.hiTex||u.pending)).map(u=>u.body))],gpuTextures:()=>n.renderer.info.memory.textures}}var qM=n=>typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:120}):setTimeout(()=>n({didTimeout:!0,timeRemaining:()=>8}),16),T0=3,Js={desktop:{day:96,night:32},mobile:{day:28,night:12},maxInflight:6,gridCols:32,gridRows:20,pCoarse:4.4,planMs:100,uploadGapMs:40};function A0(n,e,t={}){let i=n.renderer,s=i.getContext(),r=e.content,a=e.border,o=e.size,l=e.w0,c=e.h0,d=re=>re==="day"?[0,1,2,3]:[1,2,3],h=[0,1,2,3].map(re=>e.levels.day[re].grid),u=[],f=0;for(let re=0;re<=3;re++)u[re]=f,f+=h[re][1];let m=h[0][0],y=t.mobile?Js.mobile:Js.desktop,p=new Uint8Array(m*f*4);for(let re=3;re<p.length;re+=4)p[re]=255;let g=new vs(p,m,f,hn,sn);g.magFilter=g.minFilter=nn,g.generateMipmaps=!1,g.needsUpdate=!0;let C=n.items.find(re=>re.name==="Earth_sphere"),I=C.obj.material.uniforms;I.pTable.value=g,I.pInfo.value.set(l,c,r,a),I.pRowOff.value.fromArray(u),I.pGridX.value.fromArray(h.map(re=>re[0])),I.pGridY.value.fromArray(h.map(re=>re[1]));let v=Math.min(8,i.capabilities.getMaxAnisotropy());I.pAniso.value=v;let M={kinds:{day:w(y.day),night:w(y.night)},uploads:0,upload_ms_max:0,upload_ms:[],alloc_ms:{},evictions:0,tiles_seen:0,plans:0,plan_ms_max:0,no_room:0,allocs:0,releases:0};function w(re){return{array:null,cap:re,pages:new Map,free:[],pending:new Set}}let N=0,b=new Map,R=0,B=0,$=0,D=null,O=null,U=0,W=!1,K=null,H=null,ee=null,q=[],ie=(()=>{try{let re=s.getExtension("WEBGL_debug_renderer_info");return re&&/swiftshader|llvmpipe|software|basic render/i.test(s.getParameter(re.UNMASKED_RENDERER_WEBGL))}catch{return!1}})();function te(re){let Re=M.kinds[re],$e=performance.now(),Xe=new xr(null,o,o,Re.cap);Xe.format=hn,Xe.type=sn,Xe.colorSpace=zt,Xe.minFilter=Zn,Xe.magFilter=Nt,Xe.wrapS=Xe.wrapT=Gn,Xe.generateMipmaps=!1,Xe.anisotropy=v,Xe.flipY=!1,Xe.premultiplyAlpha=!1,Xe.mipmaps=Array.from({length:T0},(G,ae)=>({data:null,width:o>>ae,height:o>>ae})),Xe.source.dataReady=!1,Xe.needsUpdate=!0,i.initTexture(Xe),Re.array=Xe,Re.free=Array.from({length:Re.cap},(G,ae)=>ae),M.alloc_ms[re]=performance.now()-$e,M.allocs++,I[re==="day"?"pDay":"pNight"].value=Xe,I.pReady.value=1}function se(re,Re,$e,Xe,G){let ae=u[Re]+$e;p[(ae*m+Xe)*4+(re==="day"?0:1)]=G,W=!0}let he=(re,Re,$e,Xe)=>`${re}|${Re}|${$e}|${Xe}`;function Ne(re,Re,$e){let Xe=l>>$e,G=c>>$e;return[Math.min(h[$e][1]-1,Math.max(0,Math.floor(Re*G/r))),Math.min(h[$e][0]-1,Math.max(0,Math.floor(re*Xe/r)))]}function Ee(re,Re,$e,Xe,G,ae){let Le=he(Re,$e,Xe,G),S=re.get(Le);(!S||ae<S.score)&&re.set(Le,{kind:Re,p:$e,r:Xe,c:G,score:ae})}let Ue=Math.atan2,X=Math.asin,Z=Math.PI;function xe(){let re=performance.now(),Re=C.orientNow,$e=new Map,Xe=i.getDrawingBufferSize(new nt),G=n.debug.camera;if(!ee&&C.obj.visible&&Re&&C.exaggeration<=1.000001){let x=G.matrixWorld.elements,z=[x[0],x[1],x[2]],j=[x[4],x[5],x[6]],ne=[-x[8],-x[9],-x[10]],fe=Math.tan(G.fov*Z/360),be=G.aspect,le=C.obj.position,ce=C.obj.scale.x,Pe=(Ae,de,we)=>[Re[0][0]*Ae+Re[1][0]*de+Re[2][0]*we,Re[0][1]*Ae+Re[1][1]*de+Re[2][1]*we,Re[0][2]*Ae+Re[1][2]*de+Re[2][2]*we],Oe=Pe(-le.x+G.position.x,-le.y+G.position.y,-le.z+G.position.z),Ve=(Ae,de)=>{let we=ne[0]+Ae*fe*be*z[0]+de*fe*j[0],De=ne[1]+Ae*fe*be*z[1]+de*fe*j[1],_e=ne[2]+Ae*fe*be*z[2]+de*fe*j[2],Ge=Math.hypot(we,De,_e),qe=Pe(we/Ge,De/Ge,_e/Ge),pt=Oe[0]*qe[0]+Oe[1]*qe[1]+Oe[2]*qe[2],ut=Oe[0]**2+Oe[1]**2+Oe[2]**2-ce*ce,Vt=pt*pt-ut;if(Vt<0)return null;let bt=-pt-Math.sqrt(Vt);if(bt<0)return null;let Ui=Oe[0]+bt*qe[0],Jt=Oe[1]+bt*qe[1],Kt=Oe[2]+bt*qe[2];return[(Ue(Jt,Ui)+Z)/(2*Z),(Z/2-X(Math.max(-1,Math.min(1,Kt/ce))))/Z]},Fe=2/Xe.x,et=2/Xe.y,tt=Js.gridCols,it=Js.gridRows,Y=Ae=>Ae>.5?Ae-1:Ae<-.5?Ae+1:Ae;for(let Ae=0;Ae<tt;Ae++)for(let de=0;de<it;de++){let we=(Ae+.5)/tt*2-1,De=(de+.5)/it*2-1,_e=Ve(we,De);if(!_e)continue;let Ge=Ve(we+Fe,De),qe=Ve(we,De+et);if(!Ge||!qe)continue;let pt=Y(Ge[0]-_e[0])*l,ut=(Ge[1]-_e[1])*c,Vt=Y(qe[0]-_e[0])*l,bt=(qe[1]-_e[1])*c,Ui=pt*pt+ut*ut,Jt=Vt*Vt+bt*bt,Kt=Math.log2(Math.max(Math.max(Math.sqrt(Math.max(Ui,Jt))/v,Math.sqrt(Math.min(Ui,Jt))),1e-6));if(Kt>=Js.pCoarse)continue;let rn=we*we+De*De;for(let On of["day","night"]){let Ms=d(On)[0],fi=Math.max(Ms,Math.min(3,Math.floor(Kt)));for(let Rt=fi;Rt<=3;Rt++){let[un,ti]=Ne(_e[0],_e[1],Rt);Ee($e,On,Rt,un,ti,rn)}}}}b=$e,R++,!ee&&C.obj.visible&&n.sphereScreenPx("Earth_sphere")>=Ss.releasePx&&(M.kinds.day.array?M.kinds.night.array||te("night"):te("day"),$=performance.now());let ae=performance.now();$e.size?$=ae:ae-$>Ss.holdMs&&(M.kinds.day.array||M.kinds.night.array)&&Te();for(let{kind:x,p:z,r:j,c:ne}of $e.values()){let fe=M.kinds[x].pages.get(he(x,z,j,ne));fe&&(fe.last=R)}let Le=[...$e.values()].filter(x=>!M.kinds[x.kind].pages.has(he(x.kind,x.p,x.r,x.c))&&!M.kinds[x.kind].pending.has(he(x.kind,x.p,x.r,x.c)));Le.sort((x,z)=>z.p-x.p||x.score-z.score);for(let x of Le){if(U>=Js.maxInflight)break;Se(x)}let S=performance.now()-re;M.plans++,M.plan_ms_max=Math.max(M.plan_ms_max,S),W&&(g.needsUpdate=!0,W=!1),ve()}function Se(re){let Re=he(re.kind,re.p,re.r,re.c);M.kinds[re.kind].pending.add(Re),U++,(async()=>{let $e=await ai(`${e.dir}/${re.kind}/${re.p}/${re.r}_${re.c}.webp`),Xe=await createImageBitmap(new Blob([$e],{type:"image/webp"}),{imageOrientation:"from-image",premultiplyAlpha:"none",colorSpaceConversion:"none"});M.tiles_seen++,q.push({...re,k:Re,bm:Xe})})().catch($e=>{console.warn("\uC9C0\uAD6C \uD0C0\uC77C \uC77D\uAE30 \uC2E4\uD328",Re,$e),M.kinds[re.kind].pending.delete(Re)}).finally(()=>{U--,ve()})}function ve(){O===null&&(q.length||D)&&(O=qM(Ie))}function je(re){let Re=M.kinds[re];if(Re.free.length)return Re.free.pop();let $e=null,Xe=1/0;for(let[ae,Le]of Re.pages)!b.has(ae)&&Le.last<Xe&&(Xe=Le.last,$e=ae);if($e===null)return-1;let G=Re.pages.get($e);return Re.pages.delete($e),se(G.kind,G.p,G.r,G.c,0),M.evictions++,G.layer}function ye(re,Re,$e){let Xe=M.kinds[re].array,G=performance.now(),ae=i.state,Le=i.properties.get(Xe).__webglTexture;ae.bindTexture(s.TEXTURE_2D_ARRAY,Le),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.NONE),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Re,o,o,1,s.RGBA,s.UNSIGNED_BYTE,$e),K=K||s.createFramebuffer(),H=H||s.createFramebuffer(),ae.bindFramebuffer(s.READ_FRAMEBUFFER,K),ae.bindFramebuffer(s.DRAW_FRAMEBUFFER,H);for(let x=1;x<T0;x++)s.framebufferTextureLayer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,Le,x-1,Re),s.framebufferTextureLayer(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,Le,x,Re),s.blitFramebuffer(0,0,o>>x-1,o>>x-1,0,0,o>>x,o>>x,s.COLOR_BUFFER_BIT,s.LINEAR);s.framebufferTextureLayer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,null,0,0),s.framebufferTextureLayer(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,null,0,0),ae.bindFramebuffer(s.READ_FRAMEBUFFER,null),ae.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ae.unbindTexture();let S=performance.now()-G;M.upload_ms_max=Math.max(M.upload_ms_max,S),M.upload_ms.length<400&&M.upload_ms.push(Math.round(S*100)/100),M.uploads++}function Ie(){if(O=null,performance.now()-N<Js.uploadGapMs){ve();return}if(D){if(s.getSyncParameter(D,s.SYNC_STATUS)!==s.SIGNALED){ve();return}s.deleteSync(D),D=null}for(;q.length;){let re=q.shift(),Re=M.kinds[re.kind];if(Re.pending.delete(re.k),!b.has(re.k)||Re.pages.has(re.k)){re.bm.close&&re.bm.close();continue}Re.array||te(re.kind);let $e=je(re.kind);if($e<0){M.no_room++,re.bm.close&&re.bm.close();continue}ye(re.kind,$e,re.bm),re.bm.close&&re.bm.close(),Re.pages.set(re.k,{kind:re.kind,p:re.p,r:re.r,c:re.c,layer:$e,last:R}),se(re.kind,re.p,re.r,re.c,$e+1),g.needsUpdate=!0,N=performance.now(),D=s.fenceSync(s.SYNC_GPU_COMMANDS_COMPLETE,0),s.flush();break}ve()}function Te(){for(let re of["day","night"]){let Re=M.kinds[re];Re.array&&(Re.array.dispose(),Re.array=null),Re.pages.clear(),Re.free=[],I[re==="day"?"pDay":"pNight"].value=null}p.fill(0);for(let re=3;re<p.length;re+=4)p[re]=255;g.needsUpdate=!0,I.pReady.value=0,M.releases++}function Ke(){globalThis.__LAGRANGE_TEX2K?ee="test2k":ie?ee="software":t.single?ee="single":n.qualityAllowsHiTex()?ee=null:ee="quality";let re=performance.now();re-B>=Js.planMs&&(B=re,xe())}n.onRender.push(Ke);function Be(re=12e4){return new Promise((Re,$e)=>{let Xe=performance.now(),G=()=>{let ae=b,Le=[...ae.values()].some(S=>!M.kinds[S.kind].pages.has(he(S.kind,S.p,S.r,S.c)));ae.size&&!Le&&!q.length&&!U?Re(st()):performance.now()-Xe>re?$e(new Error(`\uD0C0\uC77C \uAE30\uB2E4\uB9BC \uC2DC\uAC04 \uB118\uC74C: \uD544\uC694 ${ae.size}, \uC62C\uB9BC ${M.uploads}`)):setTimeout(G,60)};G()})}function st(){let re=Re=>({cap:M.kinds[Re].cap,pages:M.kinds[Re].pages.size,pending:M.kinds[Re].pending.size});return{day:re("day"),night:re("night"),uploads:M.uploads,upload_ms_max:M.upload_ms_max,upload_ms:M.upload_ms,alloc_ms:M.alloc_ms,evictions:M.evictions,no_room:M.no_room,allocs:M.allocs,releases:M.releases,plans:M.plans,plan_ms_max:M.plan_ms_max,blocked:ee,wanted:b.size,pageKeys:{day:[...M.kinds.day.pages.keys()],night:[...M.kinds.night.pages.keys()]}}}return{tick:Ke,snapshot:st,waitIdle:Be,table:g,st:M,desc:e}}var Af={};async function kn(n,e={}){Af[n]||(Af[n]=ai(n).then(i=>new Blob([i],{type:"image/webp"})));let t=await Af[n];return createImageBitmap(t,{imageOrientation:"from-image",premultiplyAlpha:"none",colorSpaceConversion:"none",...e})}function C0(n,e,t,i){let s=cr==="embedded",r=E0(t,{mobile:i,single:s}),a={moon:null,steps:[],gpu_bytes:0,skipped8k:i?"mobile":s?"single":null,lod:null,earthTiles:null};t.onRender.push(()=>{let l=r.slots.earth_day;l&&(a.earth=l.level);let c=r.slots.moon;if(c&&a.moon!==c.level){a.moon=c.level,c.level==="8k"&&!a.steps.some(h=>h.moon==="8k")&&a.steps.push({moon:"8k",ms:c.steps[c.steps.length-1].ms,px:c.steps[c.steps.length-1].px});let d=c.level==="8k"?(c.last_upload||{}).px||[8192,4096]:c.steps[0].px;a.gpu_bytes=d[0]*d[1]*4*4/3}});async function o(){if(!e.available)return a;let c=(await e.load())["m4.textures"];if(!c||!c.moon)return a;if(c.orient&&c._arrays){let h=fo(c);a.orient=h,t.setSphereOrient("Moon_sphere",u=>h.moon(u)),c.earth&&c.earth.earth_day&&t.setSphereOrient("Earth_sphere",u=>h.earth(u))}else t.setFaceTo("Moon_sphere","Earth");t.setSphereTexWidth("Moon_sphere",c.moon.hi.size_px[0]);let d=await r.add({id:"moon",body:"earthmoon",sphere:"Moon_sphere",lo:()=>kn(c.moon.lo.file),hi:()=>kn(c.moon.hi.file),hiPx:c.moon.hi.size_px,apply:(h,u)=>t.setSphereMap("Moon_sphere",h,u)});if(c.earth&&c.earth.earth_day){for(let[h,u]of[["earth_day","map"],["earth_night","nightMap"]]){let f=c.earth[h];await r.add({id:h,body:"earthmoon",sphere:"Earth_sphere",lo:()=>kn(f.lo.file),hi:null,apply:(m,y)=>t.setSphereMap("Earth_sphere",m,y,u)})}if(c.earth.land){let h=await kn(c.earth.land.file),u=t.makeTexture(h,{colorSpace:hi});t.renderer.initTexture(u),h.close&&h.close(),t.setLandMap("Earth_sphere",u)}if(c.earth.clouds){t.addEarthClouds("Earth_sphere");let h=c.earth.clouds;await r.add({id:"earth_clouds",body:"earthmoon",sphere:"Earth_sphere",lo:()=>kn(h.lo.file),hi:()=>kn(h.hi.file),hiPx:h.hi.size_px,wrapS:Os,format:Sr,colorSpace:hi,anisotropy:2,apply:(u,f)=>t.setCloudMap("Earth_sphere",u,f)})}c.earth.tiles&&!s&&(a.earthTiles=A0(t,c.earth.tiles,{mobile:i,single:s})),a.earth="2k"}if(c.planets&&c.orient){a.planets={};for(let[h,u]of Object.entries(c.planets)){let f=h+"_sphere";t.setSphereOrient(f,Br(u.coef,c.orient.earth.eps_arcsec)),t.setSphereShape(f,u.shape.equator,u.shape.polar),t.setSphereTexWidth(f,(u.hi||u.lo).size_px[0]),await r.add({id:"planet_"+h,body:h,sphere:f,lo:()=>kn(u.lo.file),hi:u.hi?()=>kn(u.hi.file):null,hiPx:u.hi?u.hi.size_px:null,apply:(m,y)=>t.setSphereMap(f,m,y)}),a.planets[h]="2k"}if(c.saturn_ring){let h=c.saturn_ring;t.addSaturnRing("Saturn_sphere",h.inner_km/h.r_eq_km,h.outer_km/h.r_eq_km),await r.add({id:"saturn_ring",body:"Saturn",sphere:"Saturn_sphere",lo:()=>kn(h.lo.file),hi:()=>kn(h.hi.file),hiPx:h.hi.size_px,apply:(u,f)=>t.setRingMap("Saturn_sphere",u,f)})}}return c.sun&&c.orient&&(t.setSphereOrient("Sun_sphere",Br(c.sun.coef,c.orient.earth.eps_arcsec)),t.setSunMeanLum(c.sun.lo.mean_lum_linear),t.setSphereTexWidth("Sun_sphere",c.sun.hi.size_px[0]),a.sun="2k",await r.add({id:"sun",body:"Sun",sphere:"Sun_sphere",lo:()=>kn(c.sun.lo.file),hi:()=>kn(c.sun.hi.file),hiPx:c.sun.hi.size_px,apply:(h,u)=>{t.setSunMeanLum(c.sun[u==="2k"?"lo":"hi"].mean_lum_linear),t.setSphereMap("Sun_sphere",h,u)}})),a.moon="2k",a.gpu_bytes=d.steps[0].px[0]*d.steps[0].px[1]*4*4/3,a.steps.push({moon:"2k",ms:d.steps[0].ms,px:d.steps[0].px}),!a.skipped8k&&t.maxTextureSize()<c.moon.hi.size_px[0]&&(a.skipped8k="maxTextureSize "+t.maxTextureSize()),a}return{run:o,state:a,lod:r}}var R0=5e10,Ks=[[-.4,[.61,.69,1]],[0,[.79,.84,1]],[.4,[.97,.97,1]],[.6,[1,.96,.91]],[.8,[1,.91,.8]],[1.2,[1,.82,.63]],[1.6,[1,.73,.46]],[2,[1,.62,.35]]];function $M(n){if(n<=Ks[0][0])return Ks[0][1];for(let e=1;e<Ks.length;e++)if(n<=Ks[e][0]){let[t,i]=Ks[e-1],[s,r]=Ks[e],a=(n-t)/(s-t);return i.map((o,l)=>o+a*(r[l]-o))}return Ks[Ks.length-1][1]}function P0(n,e,t){let i=e._arrays,s=i.dir.data,r=i.mag.data,a=i.ci.data,o=t?e.mag_limit_mobile:e.mag_limit,l=[];for(let p=0;p<r.length;p++)r[p]<=o&&l.push(p);let c=new Float32Array(l.length*3),d=new Float32Array(l.length*3),h=new Float32Array(l.length);l.forEach((p,g)=>{for(let v=0;v<3;v++)c[3*g+v]=s[3*p+v]*R0;let C=$M(a[p]),I=Math.min(1,.35+.65*Math.max(0,(o-r[p])/(o+1.5)));d.set(C.map(v=>v*I),3*g),h[g]=Math.min(9,1.2+2.4*Math.max(0,6.5-r[p])**.8)});let u=new $t;u.setAttribute("position",new tn(c,3)),u.setAttribute("color",new tn(d,3)),u.setAttribute("psize",new tn(h,1));let f=new kt({uniforms:{pr:{value:n.renderer.getPixelRatio()}},vertexShader:["attribute float psize; varying vec3 vC; uniform float pr;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vC = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = psize * pr; gl_Position.z = 0.0;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["varying vec3 vC;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec2 q = gl_PointCoord - 0.5; float r = length(q) * 2.0; if (r > 1.0) discard;","float a = smoothstep(1.0, 0.0, r); gl_FragColor = vec4(vC * a, a); }"].join(`
`),vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,blending:Ki}),m=new Bs(u,f),y=n.addSky("stars","sky",m,p=>{f.uniforms.pr.value=p.renderer.getPixelRatio()});return y.count=l.length,y}function L0(n,e){let t=e.gal_to_ecl,i=new ct().set(t[0][0],t[1][0],t[2][0],t[0][1],t[1][1],t[2][1],t[0][2],t[1][2],t[2][2]),s=new kt({uniforms:{...ei("map"),Gt:{value:i},gain:{value:0}},vertexShader:["varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position.z = 0.0;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:[Qn("map",!0),"uniform mat3 Gt; uniform float gain; varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec3 g = normalize(Gt * normalize(vD));","float l = atan(g.y, g.x); float b = asin(clamp(g.z, -1.0, 1.0));","vec2 uv = vec2(0.5 - l / (2.0 * PI), 0.5 - b / PI);","gl_FragColor = vec4(map_sample(uv).rgb * gain, 1.0);","#include <colorspace_fragment>","}"].join(`
`),side:mn,depthTest:!1,depthWrite:!1}),r=new jt(new Ri(R0*1.02,96,48),s),a=n.addSky("milkyway","sky",r);return a.renderOrder=-20,r.renderOrder=-20,a.level=null,a.setTexture=(o,l)=>{o.isTiled||(o.magFilter=Nt),$s(s.uniforms,"map",o),s.uniforms.gain.value=n.tokens.scene.milkyWayGain??.1,a.level=l,a.px=[o.image.width,o.image.height]},a}async function Cf(n,e,t,i,s){let r=e.variants,a=r.hi.level||"4k_lossless",o=await i.add({id:"milkyway",sphere:null,mipmaps:!1,wrapS:Os,lo:()=>s(r.lo.file),hi:()=>s(r.hi.file),hiPx:r.hi.size_px,apply:(d,h)=>n.setTexture(d,h==="8k"?a:"2k")}),l=[{level:"2k",ms:o.steps[0].ms}];if(i.tick(),o.blocked)return{level:"2k",steps:l,skipped:o.blocked,hi:Promise.resolve({level:"2k",steps:l,skipped:o.blocked})};let c=i.waitLevel("milkyway","8k",6e5).then(()=>({level:n.level,steps:[...l,{level:n.level,ms:o.steps[o.steps.length-1].ms,upload:o.last_upload}]}));return{level:"2k",steps:l,hi:c}}var td=Qe;function Rf(n,e){let t=document.getElementById("error");t.textContent=me(n,{msg:e}),t.hidden=!1}function I0(){let n=document.getElementById("version");n.textContent=Ef(td,ur[Vn()]),document.title=Hr}async function YM(){let n=x0(location.search);y0(n),Od(),yt(),I0();let e,t={};try{e=await Ps("manifest.json");let O=Wa(e);if(O.length){Rf("error.schema",O.join("; "));return}for(let U of e.datasets){let W=await Ps(U.file),K=os(W,e.verification.details);if(K.errors.length){Rf("error.schema",`${U.id}: ${K.errors.join("; ")}`);return}for(let H of K.warnings)console.warn(U.id,H);W.binary&&(W._arrays=Rs(await ai(W.binary.file),W.binary.arrays)),t[U.id]=W}}catch(O){Rf("error.load",O.message);return}let i=e.verification;Dp(i,()=>Ef(td,ur[Vn()])),Ip(t["stage4a.jwst"]&&t["stage4a.jwst"].join);let s=t["m0.tag_samples"].items.map(O=>bi(O,i,Hl));document.getElementById("samples").replaceChildren(...s);let r=pl(e,"solar"),a=pl(e,"sky"),o=pl(e,"m1test"),l=t["time.utc"],c={t:l._arrays.t_tdb_s.data,u:l._arrays.unix_utc_s.data},d=document.getElementById("ephem-busy"),h=null,u,f;if(r.available)h=w0(r,O=>{d&&(d.hidden=!O)}),await h.init(),u=h.tMin,f=h.tMax;else{let O=t["ephem.earth_moon"]._arrays.t.data;u=O[0],f=O[O.length-1]}let m=Math.floor(Date.now()/6e4)*60,y=c.u,p=n.layout!=="panel"&&m>=y[0]&&m<=y[y.length-1]?Hi(m,c):Ha(c,Date.now()/1e3),g=Math.min(Math.max(p,u),f);h&&(await h.ensure(g),await h.ensure(Math.max(u,g-30*86400)));let C=null;try{C=await Ps("m4.orbits.json")}catch(O){console.warn("\uACF5\uC804 \uADA4\uB3C4\uC120 \uC790\uB8CC \uC5C6\uC74C",O.message)}let I={constants:e.constants,thetaEpoch:e.scene.theta_epoch_tdb_s,thetaOffset:e.scene.theta_offset_rad,radii:e.scene.radii_km,table:i,screenEph:h,orbitShapes:C,tMin:u,tMax:f,tStart:g,openSource:Hl},v=df(),M=Hg(document.getElementById("scene"),document.getElementById("labels"),I,n);jg(M,t,I);let w=qg(M,{...t,...r.datasets},{manifest:e,openSource:Hl}),N=e0(M,{initial:n.layers.initial,persist:n.layers.persist,mobile:v}),b=f0(n,w,M,v,N);N.applyAll(),I.onPick=O=>b.pick(O),I.onZoom=O=>b.zoom(O),M.setCamera({...Un.l2}),b.applyShareHash&&b.applyShareHash(),yt(),w.rerender(),M.render(),yt(),dr(()=>{I0();for(let O of s)O._render();w.rerender(),Gg(),Up(),N.rerender(),b.renameFocus&&b.renameFocus(),B&&B.rerender&&B.rerender()}),document.getElementById("lang").addEventListener("click",()=>go(Vn()==="ko"?"en":"ko"));let R=S0(e),B=e.lab?M0({view:M,labApi:R,layers:N,mobile:v,onOpen:()=>{if(b.reveal&&b.reveal(),b.closeInfo)b.closeInfo(!1);else{let O=document.getElementById("info");O&&(O.hidden=!0)}}}):null;B&&(w.views.append(B.button),document.body.append(B.panel),b.setLab&&b.setLab(B),yt()),window.lagrange={core:lr,build:td,loaderMode:cr,manifest:e,datasets:t,i18n:Bd,view:M,tokens:n,layout:b,layers:N,lab:R,labUi:B,solar:r,sky:a,m1test:o,screenEph:h,debug:{...M.debug,context:()=>Vr({...t,...R.datasets,...r.datasets,...a.datasets,...o.datasets,...$.datasets})}};let $=pl(e,"textures"),D=C0(e,$,M,v);if(window.lagrange.textures=D,window.lagrange.texGroup=$,window.lagrange.texturesDone=D.run().catch(O=>(console.warn("\uD45C\uBA74 \uADF8\uB9BC \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",O),D.state)),window.lagrange.skyDone=(async()=>{if(!a.available)return null;let O=await a.load(),U=P0(M,O["m5.stars"],v),W=L0(M,O["m5.milkyway"]);if(N.applyAll(),n.layout!=="panel"){let se=await Cf(W,O["m5.milkyway"],v,D.lod,kn);window.lagrange.skyHiDone=se.hi.then(Ee=>({stars:U.count,milkyway:Ee}));let{hi:he,...Ne}=se;return{stars:U.count,milkyway:Ne}}let K=document.getElementById("credits"),H=()=>{let se=N.state.stars||N.state.milkyway;K.hidden=!se,K.classList.remove("credits-compact"),K.replaceChildren(document.createTextNode(me("sky.credits_stars")+" \xB7 "+me("sky.credits_mw")+" "),qn(),document.createTextNode(" \xB7 "+me("sky.credits_moon")+" \xB7 "+me("sky.credits_horizons"))),se&&K.getBoundingClientRect().height>1.5*parseFloat(getComputedStyle(K).lineHeight)&&(K.classList.add("credits-compact"),K.replaceChildren(document.createTextNode(me("credits.short"))))};H(),K.style.cursor="pointer",K.title=me("credits.open"),K.tabIndex=0,K.setAttribute("role","button");let ee=()=>vo(()=>Gl(qn));K.addEventListener("click",ee),K.addEventListener("keydown",se=>{(se.key==="Enter"||se.key===" ")&&(se.preventDefault(),ee())}),window.addEventListener("resize",H),document.fonts&&document.fonts.ready&&document.fonts.ready.then(H),N.onChange(H),dr(H);let q=await Cf(W,O["m5.milkyway"],v,D.lod,kn);window.lagrange.skyHiDone=q.hi.then(se=>({stars:U.count,milkyway:se}));let{hi:ie,...te}=q;return{stars:U.count,milkyway:te}})().catch(O=>(console.warn("\uD558\uB298 \uBC30\uACBD \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",O),null)),cr==="fetch"&&!td.dev)try{await v0(document.getElementById("update"))}catch(O){console.warn("\uC11C\uBE44\uC2A4 \uC6CC\uCEE4 \uB4F1\uB85D \uC2E4\uD328",O)}document.body.dataset.ready="1"}YM();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
