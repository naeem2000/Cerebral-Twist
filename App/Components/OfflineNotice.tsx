import NetInfo from '@react-native-community/netinfo';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';

export default function OfflineNotice() {
	const [isConnected, setIsConnected] = useState<boolean>(false);

	useEffect(() => {
		NetInfo.addEventListener(handleConnectivityChange);
		NetInfo.fetch().then((state: any) => {
			setIsConnected(state.isConnected);
		});

		return () => {
			NetInfo.addEventListener((state: any) => {
				setIsConnected(state.isConnected);
			});
		};
	}, [NetInfo]);

	function handleConnectivityChange(state: any) {
		if (state.isConnected) {
			setIsConnected(true);
		} else {
			setIsConnected(false);
		}
	}

	function MiniOfflineSign() {
		return (
			<Lottie
				source={require('../Assets/142259-offline-dgaccel.json')}
				autoPlay
				loop
				style={styles.offlineContainer}
			/>
		);
	}

	if (!isConnected) {
		return <MiniOfflineSign />;
	}
	return null;
}

const styles = StyleSheet.create({
	offlineContainer: {
		position: 'absolute',
		top: 32,
		alignSelf: 'center',
		height: 50,
		zIndex: 999,
	},
});
