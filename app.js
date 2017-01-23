class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.handleProductUpVote = this.handleProductUpVote.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleProductDownVote = this.handleProductDownVote.bind(this);
     
  }

  componentDidMount () {
    this.updateState();
  }

  updateState() {
    // sorts the list in descending order using the number of votes
    // If the return value is less than 0, a should come first(have a lower index).
    // If the return value is greater than 0, b should come first.
    // If the return value is equal to 0, leave order of a and b unchanged with respect to each other.

    const products = Data.sort((a,b) => (
      b.votes - a.votes
    ));

    this.setState({products: products})
  }

  handleProductUpVote(productId) {
    Data.forEach((dataItem) => {
      if(dataItem.id === productId) {
        dataItem.votes = dataItem.votes + 1;
        return;
      }
    });
    this.updateState();
  }

  handleProductDownVote(productId) {
    Data.forEach((dataItem) => {
      if(dataItem.id === productId) {
        dataItem.votes = dataItem.votes - 1;
        return;
      }
    });
    this.updateState();
  }

  render() {
    const products = this.state.products.map((product) => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title} 
          description={product.description} 
          url={product.url}
          votes={product.votes} 
          submitter_avatar_url={product.submitter_avatar_url} 
          product_image_url={product.product_image_url} 
          onVote={this.handleProductUpVote}
          onDownVote={this.handleProductDownVote}
        /> 
      );
    }); 
    return (
      <div className='ui items'>
        {products}
      </div> 
    );
  }
}

class Product extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote(){
    this.props.onVote(this.props.id);
  }

  handleDownVote(){
    this.props.onDownVote(this.props.id);
  }

  render() {
    return (
      <div className='item'>
        <div className='image'>
           <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'></i>
            </a>
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon'></i>
            </a>
            <p>{this.props.votes}</p>
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById('content'));
