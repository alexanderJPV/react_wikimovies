import React, { Fragment } from 'react'
import Card from '../components/Card/Card'
console.log(process.env.API);
const API = process.env.API;
class List extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            searchTerm: "",
            error: "",
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
    }
    // carga junto con el componente
    async componentDidMount() {
        const res = await fetch(`${API}&s=batman`);
        const resJason = await res.json();
        // console.log(resJason);
        this.setState({ data: resJason.Search, loading: false })
    }
    async handleSubmit(event){
        event.preventDefault();
        console.log('enviando..........................');
        if(!this.state.searchTerm){
            return this.setState({ error: 'please write a valid text'})
        }
        const res = await fetch(`${API}&s=${this.state.searchTerm}`)
        const data = await res.json();
        if(!data.Search){
            return this.setState({error: 'there are no result'})
        }
        this.setState({ data: data.Search, error:'', searchTerm: ''})
    }
    handleChange(event){
        this.setState({searchTerm: event.target.value})
    }
    render() {
        const { data, loading } = this.state;
        if(loading){
            return <h2 className="text-light">Loading.....</h2>
        }
        // console.log(this.state.data);
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4 offset-md-4 p-4">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                onChange = {this.handleChange}
                                value={this.state.searchTerm}
                                autoFocus
                            >
                            </input>
                        </form>
                        <p className="text-white">{this.state.error? this.state.error : ''}</p>
                    </div>
                </div>
                <div className="row">
                    {
                        data.map((movie,i) => {
                            return <Card movie={movie} key={i}></Card>
                        })
                    }
                </div>
            </Fragment>
        )
    }
}
export default List