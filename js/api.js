import { API_URL, DEMO_DATA } from './config.js';
const localKey = 'fares-glam-demo-catalog';
export const isConnected = Boolean(API_URL);
function busy(active){document.documentElement.classList.toggle('busy',active)}
export async function getCatalog(){
  busy(true);
  try{if(API_URL){const response=await fetch(`${API_URL}?action=catalog`,{redirect:'follow'}); if(!response.ok) throw new Error('No se pudo cargar el catálogo.'); return response.json();}
  const saved=localStorage.getItem(localKey); if(saved) return JSON.parse(saved);
  const response=await fetch('./datos/productos.json'); const products=await response.json();
  const names={argollas:'Argollas',topos:'Topos','eur-fur':'Eur Fur',aretes:'Aretes',collares:'Collares',pulseras:'Pulseras',anillos:'Anillos'};
  const categories=Object.keys(names).map((slug,i)=>({slug,nombre:names[slug],orden:i+1,visible:true}));
  const data={ok:true,config:DEMO_DATA,categorias:categories,productos:products}; localStorage.setItem(localKey,JSON.stringify(data)); return data;}finally{busy(false)}
}
export async function send(action,payload={}){if(!API_URL) return {ok:false,code:'DEMO',message:'Conecta el Apps Script en js/config.js para activar esta acción.'}; busy(true); try{const response=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,...payload}),redirect:'follow'}); return response.json()}finally{busy(false)}}
