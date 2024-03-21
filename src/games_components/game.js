// import React, { useEffect, useState } from 'react';
// import "./game.css";

// const Game2048 = () => {
//   const [board, setBoard] = useState([]);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     initializeBoard();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const initializeBoard = () => {
//     const newBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
//     setBoard(newBoard);
//     setScore(0);
//     setTwo(newBoard);
//     setTwo(newBoard);
//   };

//   const setTwo = (currentBoard) => {
//     if (!hasEmptyTile(currentBoard)) {
//       return currentBoard;
//     }
//     const newBoard = [...currentBoard];
//     let found = false;
//     while (!found) {
//       let r = Math.floor(Math.random() * 4);
//       let c = Math.floor(Math.random() * 4);
//       if (newBoard[r][c] === 0) {
//         newBoard[r][c] = 2;
//         found = true;
//       }
//     }
//     return newBoard;
//   };
//   const hasEmptyTile = (board) => {
//     return board.some(row => row.includes(0));
//   };

//   const handleKeyDown = (e) => {
//     if (e.code === 'ArrowUp') {
//       slideLeft();
//     } else if (e.code === 'ArrowDown') {
//       slideRight();
//     } else if (e.code === 'ArrowLeft') {
//       slideUp();
//     } else if (e.code === 'ArrowRight') {
//       slideDown();
//     }
//   };

//   const slide = (row) => {
//     row = row.filter(num => num !== 0);
//     for (let i = 0; i < row.length - 1; i++) {
//       if (row[i] === row[i + 1]) {
//         row[i] *= 2;
//         row[i + 1] = 0;
//         setScore(score + row[i]);
//       }
//     }
//     row = row.filter(num => num !== 0);
//     while (row.length < 4) {
//       row.push(0);
//     }
//     return row;
//   };

//   const slideLeft = () => {
//     const newBoard = board.map(row => slide(row));
//     const updatedBoard = setTwo(newBoard);
//     setBoard(updatedBoard);
//   };
  
//   const slideRight = () => {
//     const newBoard = board.map(row => slide(row.reverse()).reverse());
//     const updatedBoard = setTwo(newBoard);
//     setBoard(updatedBoard);
//   };
  
//   const slideUp = () => {
//     const transposedBoard = transpose(board);
//     const newBoard = transposedBoard.map(row => slide(row));
//     const updatedBoard = setTwo(transpose(newBoard));
//     setBoard(updatedBoard);
//   };
  
//   const slideDown = () => {
//     const transposedBoard = transpose(board);
//     const newBoard = transposedBoard.map(row => slide(row.reverse()).reverse());
//     const updatedBoard = setTwo(transpose(newBoard));
//     setBoard(updatedBoard);
//   };
  

//   const transpose = (matrix) => {
//     return matrix[0].map((_, i) => matrix.map(row => row[i]));
//   };

//   useEffect(() => {
//     document.addEventListener('keyup', handleKeyDown);
//     return () => {
//       document.removeEventListener('keyup', handleKeyDown);
//     };
//   });
//   if(score > localStorage.getItem("highestscore")){
//     localStorage.setItem("highestscore", score);
//   }

//   return (
//     <div className="game-container">
//       <h1>2048</h1>
//       <h2>Score: <span id="score">{score}</span></h2>
//       <h2>Highest Score: <span id="highestscore">{localStorage.getItem("highestscore")}</span></h2>
//       <div id="board" className="board" style={{marginTop: "20px", padding: "10px"}}>
//         {board.map((row, rowIndex) => (
//           <div key={rowIndex} className="row">
//             {row.map((value, colIndex) => (
//               <Tile key={`${rowIndex}-${colIndex}`} value={value} />
//             ))}
//           </div>
//         ))}
//       </div>
//       <div style={{marginTop: "20px",justifyContent: "center",}}>
//       <button id="new-game" onClick={initializeBoard}>New Game</button>
//       </div>
//     </div>
//   );
// };

// const Tile = ({ value }) => {
//   return (
//     <div className={`tile x${value}`}>{value !== 0 && value}</div>
//   );
// };

// export default Game2048;


import React, { useEffect, useState } from 'react';
import "./game.css";

const Game2048 = () => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeBoard = () => {
    const newBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
    setBoard(newBoard);
    setScore(0);
    setTwo(newBoard);
    setTwo(newBoard);
  };

  const setTwo = (currentBoard) => {
    if (!hasEmptyTile(currentBoard)) {
      return currentBoard;
    }
    const newBoard = [...currentBoard];
    let found = false;
    while (!found) {
      let r = Math.floor(Math.random() * 4);
      let c = Math.floor(Math.random() * 4);
      if (newBoard[r][c] === 0) {
        newBoard[r][c] = 2;
        found = true;
      }
    }
    return newBoard;
  };

  const handleEndGame = () => {
    if (score>0 && !hasEmptyTile(board)) {
      alert("Game Over! No more moves available.");
      initializeBoard();
    }
  };

  useEffect(() => {
    handleEndGame();
  }, [board]);

  const hasEmptyTile = (board) => {
    return board.some(row => row.includes(0));
  };

  const handleKeyDown = (e) => {
    if (e.code === 'ArrowUp') {
      slideLeft();
    } else if (e.code === 'ArrowDown') {
      slideRight();
    } else if (e.code === 'ArrowLeft') {
      slideUp();
    } else if (e.code === 'ArrowRight') {
      slideDown();
    }
  };

  const slide = (row) => {
    row = row.filter(num => num !== 0);
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        setScore(score + row[i]);
      }
    }
    row = row.filter(num => num !== 0);
    while (row.length < 4) {
      row.push(0);
    }
    return row;
  };

  const slideLeft = () => {
    const newBoard = board.map(row => slide(row));
    const updatedBoard = setTwo(newBoard);
    setBoard(updatedBoard);
  };
  
  const slideRight = () => {
    const newBoard = board.map(row => slide(row.reverse()).reverse());
    const updatedBoard = setTwo(newBoard);
    setBoard(updatedBoard);
  };
  
  const slideUp = () => {
    const transposedBoard = transpose(board);
    const newBoard = transposedBoard.map(row => slide(row));
    const updatedBoard = setTwo(transpose(newBoard));
    setBoard(updatedBoard);
  };
  
  const slideDown = () => {
    const transposedBoard = transpose(board);
    const newBoard = transposedBoard.map(row => slide(row.reverse()).reverse());
    const updatedBoard = setTwo(transpose(newBoard));
    setBoard(updatedBoard);
  };
  

  const transpose = (matrix) => {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyDown);
    return () => {
      document.removeEventListener('keyup', handleKeyDown);
    };
  });

  if(score > localStorage.getItem("highestscore")){
    localStorage.setItem("highestscore", score);
  }

  return (
    <div className="game-container" style={{height:"94%"}}>
      <h1 style={{color:"black", fontSize:"40px", fontWeight:"bold"}}>2048</h1>
      <h2 style={{color:"black", fontSize:"40px", fontWeight:"bold"}}>Score: <span id="score">{score}</span></h2>
      <h2 style={{color:"black", fontSize:"40px", fontWeight:"bold"}}>Highest Score: <span id="highestscore">{localStorage.getItem("highestscore")}</span></h2>
      <div id="board" className="board" style={{marginTop: "20px", padding: "10px"}}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row" >
            {row.map((value, colIndex) => (
              <Tile key={`${rowIndex}-${colIndex}`} value={value}/>
            ))}
          </div>
        ))}
      </div>
      <div style={{marginTop: "20px",justifyContent: "center",}}>
        <button id="new-game" onClick={initializeBoard} style={{border: "3px solid black",padding: "10px", borderRadius: "10px",backgroundColor:"green", color:"white"}}>New Game</button>
      </div>
    </div>
  );
};

const Tile = ({ value }) => {
  return (
    <div className={`tile x${value}`} style={{border: "3px solid black"}}>{value !== 0 && value}</div>
  );
};

export default Game2048;
