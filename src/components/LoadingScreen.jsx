import React from 'react'
import ReactLoading from 'react-loading';

const LoadingScreen = () => {

  return (
    <div>
      <ReactLoading type={'spin'} color={'#ffff'} height={80} width={150} />
    </div>
    )
}

export default LoadingScreen