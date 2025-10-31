import {
	onCLS,
	onINP,
	onLCP,
	onTTFB,
	onFCP,
	type Metric,
} from 'web-vitals/attribution';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
	if (onPerfEntry && typeof onPerfEntry === 'function') {
		onCLS(onPerfEntry);
		onINP(onPerfEntry);
		onLCP(onPerfEntry);
		onTTFB(onPerfEntry);
		onFCP(onPerfEntry);
	}
};

export default reportWebVitals;
