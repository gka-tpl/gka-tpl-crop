
module.exports = function css(data, prefix, frameduration) {
    
    var frames = data.frames,
        len = frames.length,
        per = 100 / (len); 

    var keyframesStr = frames.reduce(function(str, frame, i, frames){

        var percent = (i * (per)).toFixed(2);
        percent = percent == 0? 0: percent; // fix 0.00 to 0;

        str += `
    ${percent}% {
        width: ${frame.width}px;
        height: ${frame.height}px;
        transform: translate(${frame.offX}px, ${frame.offY}px);
        background-image: url("img/${frame.file}");
    }
`;

        if (i == len - 1) {
            str += `
    100% {
        width: ${frame.width}px;
        height: ${frame.height}px;
        transform: translate(${frame.offX}px, ${frame.offY}px);
        background-image: url("img/${frame.file}");
    }
`;      }

        return str;
    }, "");

    
    var frame = frames[0];
    var css = `.gka-wrap {
    width: ${frame.sourceW}px;
    height: ${frame.sourceH}px;
}

`;

    css += `.gka-base {
   
    background-repeat: no-repeat;
    background-position: center center;
    
    /* background-size: contain;*/
    
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    
    animation-timing-function: steps(1);

    /* 只播放一次，播放停止到最后一帧*/
    /* animation-iteration-count: 1; */ 
}

`;

    css += `.${prefix}animation {
    animation-name: ${prefix}keyframes;
    animation-duration: ${len * frameduration}s;
}

@-webkit-keyframes ${prefix}keyframes {${keyframesStr}}
`;

    return css;
}

