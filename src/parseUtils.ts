import { Config } from './types/ConfigTypes'

// TODO: rename streams for ator case
const ATOR_NODE_STREAM = '0x4169e052642f0dd2a937f8b218f72243b2bcfd79/ator-metrics-test' // Todo: lets make a general stream for this

function parseSentryConfig(envKeyUrls: string, envKeyNames: string, configBaseName: string, streamId: string): Config[] {
	const result: Config[] = []
	const urls: string[] = process.env[envKeyUrls]?.split(',') || []

	// Use default names if not explicitly given
	const names = process.env[envKeyNames]?.split(',') || urls.map((url, index) => {
		return process.env.VALIDATOR_NAME + (urls.length > 1 ? `-${index + 1}` : '')
	})

	if (urls.length !== names.length) {
		throw new Error(`Number of ${configBaseName} URLs doesn't match the number of names!\n\nURLs (${urls.length}):\n${urls.join('\n')}\n\nNames: (${names.length}):\n${names.join('\n')}\n`)
	}

	urls.forEach((url, index) => {
		result.push({
			configName: `${configBaseName} (${names[index]})`,
			nodeName: names[index],
			url,
			streamId,
		})
	})

	return result
}

export function parseEnvToConfigs(): Config[] {
	let result: Config[] = []
	result = result.concat(parseSentryConfig('VALIDATOR_NAME', 'NODE_NAMES', 'Ator Node', ATOR_NODE_STREAM))
	return result
}