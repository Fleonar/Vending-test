import React, {useState} from 'react';
import VendingMachine from './components/VendingMachine';
import Layout from './UI/Layout';

function App() {
  return (
    <Layout>
      <VendingMachine></VendingMachine>
    </Layout>
  );
}

export default App;