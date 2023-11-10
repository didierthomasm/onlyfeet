return (

<ApolloProvider client = {client}> 
<Router>
<div>
<StoreProvider>
<Nav />
<Switch>
<Route exact path = '/success' component={Sucesss} />
<Route exact path = '/login' component={Login} />
<Route exact path = '/signup' component={Signup} />
<Route exact path = '/orderHistory' component={OrderHistorry} />
<Route exact path = '/products/:id' component={Detail} />
<Route component={NoMatch} />

</Switch>
</StoreProvider>
</div>
</Router>
</ApolloProvider>

)

export default App