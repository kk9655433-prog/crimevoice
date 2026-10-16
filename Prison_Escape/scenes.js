// All paths are relative: usable on GitHub Pages project sites or at a domain root.
window.SCENES={
 // Filename bits: FRONT, RIGHT, BACK, LEFT. 1=open, 0=wall; directions are relative to the drone.
 routes:Object.fromEntries(Array.from({length:16},(_,n)=>{const key=[0,1,2,3].map(i=>n&(1<<i)?1:0).join('');return[key,'assets/scenes/'+key+'.png'];})),
 stairs:'assets/scenes/stairs-down.png',
 stairsUp:'assets/scenes/stairs-up.png',
 exit:'assets/scenes/exit.png',
 paper:'assets/scenes/paper.png',
 // Fractions of the full exit image: desk interaction and eye marker, fitted to the current photo.
 tableHotspot:{x:.835,y:.50,width:.15,height:.075},
 tableEye:{x:.94,y:.526},
 objective:'你確保了逃脫路線，也注意到了一旦檔案室燃燒，獄警都會立刻撤離，現在你可以將這兩個資訊告訴雙面人了。',
 documentText:'檔案室文件眾多，資料不易保存，需常時警備，加強巡邏，如檔案室起火，會即刻啟動撤離計畫',
 captureDelay:650
};
