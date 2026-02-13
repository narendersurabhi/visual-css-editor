import React, { useState } from 'https://esm.sh/react@18';

const KEYS = ['title','heading','subheading','bullets','paragraph'];
const DEFAULTS = {
  title:{fontFamily:'Inter, sans-serif', fontSize:40, fontWeight:700, fontStyle:'normal', color:'#ffffff', lineHeight:1.05, marginTop:0, marginBottom:12},
  heading:{fontFamily:'Inter, sans-serif', fontSize:28, fontWeight:600, fontStyle:'normal', color:'#dbeafe', lineHeight:1.12, marginTop:8, marginBottom:8},
  subheading:{fontFamily:'Inter, sans-serif', fontSize:18, fontWeight:500, fontStyle:'normal', color:'#9fb4d9', lineHeight:1.18, marginTop:6, marginBottom:10},
  bullets:{fontFamily:'Inter, sans-serif', fontSize:16, fontWeight:400, fontStyle:'normal', color:'#cfe6ff', lineHeight:1.6, marginTop:8, marginBottom:8},
  paragraph:{fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:400, fontStyle:'normal', color:'#cbd9ea', lineHeight:1.6, marginTop:6, marginBottom:6}
};

export default function App(){
  const [styles, setStyles] = useState(DEFAULTS);
  const [keySel, setKeySel] = useState('title');

  const cur = styles[keySel];
  function update(k, v){
    setStyles(s => ({...s, [keySel]:{...s[keySel],[k]:v}}));
  }

  return (
    React.createElement('div', {style:{display:'flex',gap:20,height:'100%'}},
      // Sidebar
      React.createElement('aside', {style:{width:320,background:'rgba(255,255,255,0.03)',borderRadius:12,padding:18,boxShadow:'0 6px 18px rgba(2,6,23,0.6)'}},
        React.createElement('div', {style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}},
          React.createElement('h2', {style:{margin:0,fontSize:18,fontWeight:600}}, 'Visual CSS Editor'),
          React.createElement('small', {style:{color:'#8ea9d6'}}, 'Step 2')
        ),
        React.createElement('label', {style:{display:'block',fontSize:13,color:'#aac7ee',marginBottom:6}}, 'Element'),
        React.createElement('select', {value:keySel,onChange:e=>setKeySel(e.target.value),style:{width:'100%',padding:'8px',borderRadius:8,background:'#071025',color:'#e6eef8',border:'1px solid rgba(255,255,255,0.04)',marginBottom:12}},
          KEYS.map(k=>React.createElement('option',{key:k,value:k}, k.charAt(0).toUpperCase()+k.slice(1)))
        ),

        React.createElement('div', {style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}},
          React.createElement('label',{style:{fontSize:12,color:'#9fb4d9'}}, 'Font size',
            React.createElement('input',{type:'range',min:10,max:72,value:cur.fontSize,onInput:e=>update('fontSize',Number(e.target.value)),style:{width:'100%'}})
          ),
          React.createElement('label',{style:{fontSize:12,color:'#9fb4d9'}}, 'Line height',
            React.createElement('input',{type:'range',min:1,max:2,step:0.01,value:cur.lineHeight,onInput:e=>update('lineHeight',Number(e.target.value)),style:{width:'100%'}})
          )
        ),

        React.createElement('div',{style:{display:'flex',gap:8,marginTop:10}},
          React.createElement('div',null,
            React.createElement('label',{style:{fontSize:12,color:'#9fb4d9',display:'block'}}, 'Weight'),
            React.createElement('select',{value:cur.fontWeight,onChange:e=>update('fontWeight',Number(e.target.value)),style:{padding:8,background:'#071025',color:'#e6eef8',borderRadius:8,border:'1px solid rgba(255,255,255,0.04)'}},
              [300,400,500,600,700].map(w=>React.createElement('option',{key:w,value:w},w))
            )
          ),
          React.createElement('div',null,
            React.createElement('label',{style:{fontSize:12,color:'#9fb4d9',display:'block'}}, 'Style'),
            React.createElement('select',{value:cur.fontStyle,onChange:e=>update('fontStyle',e.target.value),style:{padding:8,background:'#071025',color:'#e6eef8',borderRadius:8,border:'1px solid rgba(255,255,255,0.04)'}},
              ['normal','italic'].map(s=>React.createElement('option',{key:s,value:s},s))
            )
          )
        ),

        React.createElement('div',{style:{display:'flex',gap:8,marginTop:12,alignItems:'center'}},
          React.createElement('div',null,
            React.createElement('label',{style:{fontSize:12,color:'#9fb4d9',display:'block'}}, 'Color'),
            React.createElement('input',{type:'color',value:cur.color,onChange:e=>update('color',e.target.value),style:{width:48,height:36,borderRadius:8,border:'none',padding:4}})
          ),
          React.createElement('div',null,
            React.createElement('label',{style:{fontSize:12,color:'#9fb4d9',display:'block'}}, 'Font'),
            React.createElement('select',{value:cur.fontFamily,onChange:e=>update('fontFamily',e.target.value),style:{padding:8,background:'#071025',color:'#e6eef8',borderRadius:8,border:'1px solid rgba(255,255,255,0.04)'}},
              ["Inter, sans-serif","Georgia, serif","Arial, sans-serif","'Times New Roman', serif"].map(f=>React.createElement('option',{key:f,value:f},f.split(',')[0]))
            )
          )
        ),

        React.createElement('div',{style:{display:'flex',gap:8,marginTop:12}},
          React.createElement('label',{style:{fontSize:12,color:'#9fb4d9',flex:1}}, 'Margin top',
            React.createElement('input',{type:'number',min:0,max:120,value:cur.marginTop,onChange:e=>update('marginTop',Number(e.target.value)),style:{width:'100%',padding:8,marginTop:6,borderRadius:8,background:'#071025',color:'#e6eef8',border:'1px solid rgba(255,255,255,0.04)'}})
          ),
          React.createElement('label',{style:{fontSize:12,color:'#9fb4d9',flex:1}}, 'Margin bottom',
            React.createElement('input',{type:'number',min:0,max:120,value:cur.marginBottom,onChange:e=>update('marginBottom',Number(e.target.value)),style:{width:'100%',padding:8,marginTop:6,borderRadius:8,background:'#071025',color:'#e6eef8',border:'1px solid rgba(255,255,255,0.04)'}})
          )
        )
      ),

      // Preview
      React.createElement('main', {style:{flex:1,overflow:'auto'}},
        React.createElement('div',{style:{background:'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',borderRadius:12,padding:28,minHeight:480,boxShadow:'inset 0 1px rgba(255,255,255,0.02), 0 8px 30px rgba(2,6,23,0.6)'}},
          React.createElement('div',null,
            React.createElement('div',{style:apply(styles.title)}, 'Title — Your Product Name'),
            React.createElement('div',{style:apply(styles.heading)}, 'Heading that draws attention'),
            React.createElement('div',{style:apply(styles.subheading)}, 'A concise subheading that supports the heading and explains the value.'),
            React.createElement('div',{style:apply(styles.paragraph)},
              'This paragraph demonstrates body text. It adjusts based on the controls. Use it to get a feel for spacing, size and color combinations.'
            ),
            React.createElement('div',{style:{marginTop:8}},
              React.createElement('ul',{style:applyObject(styles.bullets, {paddingLeft:20,marginTop:styles.bullets.marginTop,marginBottom:styles.bullets.marginBottom})},
                React.createElement('li',null,'First bullet point'),
                React.createElement('li',null,'Second bullet with a bit more text'),
                React.createElement('li',null,'Third concise point')
              )
            )
          )
        )
      )
    )
  );
}

function apply(s){
  return applyObject(s, {display:'block',marginTop:s.marginTop+'px',marginBottom:s.marginBottom+'px'});
}
function applyObject(s, extra={}){
  return Object.assign({}, extra, {
    fontFamily: s.fontFamily,
    fontSize: s.fontSize + 'px',
    fontWeight: s.fontWeight,
    fontStyle: s.fontStyle,
    color: s.color,
    lineHeight: s.lineHeight
  });
}
