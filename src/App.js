import { Button, Grid } from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {
  const dataInit = [
    [{ color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#ff726f' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }],
    [{ color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#ff726f' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }],
    [{ color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#ff726f' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }],
    [{ color: '#ff726f' }, { color: '#ff726f' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#ff726f' }, { color: '#ff726f' }],
    [{ color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#ff726f' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }],
    [{ color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#ff726f' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }],
    [{ color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#ff726f' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }, { color: '#FFE7C7' }]
  ]
  const [dataArr, setDataArr] = useState(dataInit);

  const [disable, setDisable] = useState(false);
  const [custQueue, setcustQueue] = useState([]);
  const checkBound = (row, col, m, n) => (row >= 0 && row < m) && (col >= 0 && col < n)

  const btnSelected = (rc, cc) => {
    setDisable(true);
    const custQ = custQueue;
    custQ.push({ row: rc, col: cc })
    slowIteration();
  }

  const clearData = () => {
    setDisable(false)
    setDataArr([...dataInit])
  }

  const slowIteration = () => {
    setTimeout(() => {
      const image = dataArr
      const custQ = custQueue;

      const m = image.length
      const n = image[0].length

      const obj = custQ.shift()
      const row = obj.row
      const col = obj.col

      if (checkBound(row, col - 1, m, n)) {
        if (image[row][col - 1].color === image[row][col].color && image[row][col - 1].color !== '#86BFF3') {
          custQ.push({ row: row, col: col - 1 })
        }
      }

      if (checkBound(row, col + 1, m, n)) {
        if (image[row][col + 1].color === image[row][col].color && image[row][col + 1].color !== '#86BFF3') {
          custQ.push({ row: row, col: col + 1 })
        }
      }

      if (checkBound(row - 1, col, m, n)) {
        if (image[row - 1][col].color === image[row][col].color && image[row - 1][col].color !== '#86BFF3') {
          custQ.push({ row: row - 1, col: col })
        }
      }

      if (checkBound(row + 1, col, m, n)) {
        if (image[row + 1][col].color === image[row][col].color && image[row + 1][col].color !== '#86BFF3') {
          custQ.push({ row: row + 1, col: col })
        }
      }
      image[row][col].color = '#86BFF3'
      setcustQueue(custQ)
      setDataArr([...image])

      if (custQueue.length !== 0){
        slowIteration(); //  decrement call myLoop again
      }
    }, 200)
  };

  return (
    <Grid container className='mainCls' direction='column'>
      <Grid item className='squareMain' direction='column'>
        {dataArr.map((row, ri) => (
          <Grid item direction='row' className='row-style'>
            {row.map((item, ci) => (
              <Button disabled={disable} className='btn-style' style={{ backgroundColor: item.color }} onClick={() => btnSelected(ri, ci)}></Button>
            ))}
          </Grid>
        ))}
      </Grid>
      <Button style={{ width: 20, height: 20 }} onClick={clearData}>Clear</Button>
    </Grid>
  );
}

export default App;
