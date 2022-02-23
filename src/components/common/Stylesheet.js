import React from 'react'
import '../../styles.css'

function Stylesheet(props) {
    let className = props.primary ? 'primary' : ''
  return (
    <div className={`${className} font-xl`} >Sayfa bulunamadı</div>
  )
}

export default Stylesheet