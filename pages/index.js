import 'react-pro-sidebar/dist/css/styles.css';
import SignInSide from './SignInSide';
import Layout from "../components/Layout";
import { useEffect, useState } from 'react';
import { useState as UseState}  from '@hookstate/core';
import { getSessionFromLocalStorage, Store } from '../services/Store';
const Home = () => {
  const state = UseState(Store);
  const user = state.user.get();
  const loading = state.loading.get();
  useEffect(() => {
    getSessionFromLocalStorage()
  }, [])

  return (
    <>
      {!loading && <>
        {user &&
          <Layout user={user}> </Layout>
        }
        {!user &&
          <SignInSide />
        }
      </>
      }

    </>
  )
}

export default Home
