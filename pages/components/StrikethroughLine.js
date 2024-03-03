import React from 'react'

export default function StrikethroughLine( {bottomPos, rightPos, width, height, borderBottomWidth, borderRightWidth, rotateDeg} ) {
  return (
    <tr className={`absolute bottom-[32.8rem] right-[${rightPos}rem] transform ${rotateDeg === 39 && 'rotate-[39deg]'} ${rotateDeg === -39 && '-rotate-[39deg]'} ${rotateDeg === 0 && 'rotate-[0deg]'}`} style={{ borderBottom:`${borderBottomWidth}px solid red`, borderRight: `${borderRightWidth}px solid red`, width: `${width}rem`, height: `${height}rem`}}>
        <td colSpan="3"> </td>
    </tr>
  )
}


//       Horizontal lines for Game Board
// bottom-[29.9rem] for first line with width 22rem with borderBottom with rightPos 41.5rem
// bottom-[21.8rem] for 2nd line with width 22rem with borderBottom with rightPos 41.5rem
// bottom-[13.7rem] for 3rd line with width 22rem with borderBottom with rightPos 41.5rem

//       Vertical lines for Game Board
// right-[46rem] for first line with height 24.2rem with borderRight with bottomPos 9.5rem
// right-[52.6rem] for 2nd line with height 24.2rem with borderRight with bottomPos 9.5rem
// right-[59.2rem] for 3rd line with height 24.2rem with borderRight with bottomPos 9.5rem

//       Diagonal lines for Game Board
// right-[52.2rem] for first line with height 24.2rem with borderRight with transform -rotate-[39deg] with bottomPos 9.5rem
// right-[52.8rem] for 2nd line with height 24.2rem with borderRight with transform rotate-[39deg] with bottomPos 10rem
