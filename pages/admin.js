import axios from 'axios'
import { useState } from 'react'

function Admin() {
    const [state, setState] = useState({})

    const setCat = e => {
        e.preventDefault()


        if(state.nom && state.icon){
            console.log(state)
            axios.post(`${process.env.DOMAIN}/api/categorie`, state).then(res => {
                if (res.data.success) {
                    alert('new cat', res.data)
                }
            })

        }else{
            console.log(state)
        }

    
    }

    return (
        <div className='page_wrapper'>
            <form onSubmit={setCat}>
                <label htmlFor="nom">categorie name</label>
                <input
                    type='text'
                    name='nom'
                    onChange={(e) => setState({...state, nom: e.target.value })}
                />

                <label htmlFor="icon">categorie icon</label>
                <input
                    type='text'
                    name='icon'
                    onChange={(e) => setState({...state, icon: e.target.value })}
                />
                <button>Envoyer</button>
            </form>
        </div>
    )
}

export default Admin
