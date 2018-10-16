'use babel';

import suggestionsHelpersMetadata from '../data/chef-metadata';

class ChefProviderMetadata {
	constructor() {
		this.selector = '.source.chef.metadata';
		this.suggestions = this.initSuggestions();
	}

	// TODO: Read all files in data/ as JSON and concatenate
	initSuggestions() {
		let temp = suggestionsHelpersMetadata;
		// temp = temp.concat(suggestionsHelpersMetadata);
		// ...
		// temp = temp.concat(suggestionsHelpersProperties);
		// ...
		// temp = temp.concat(suggestionsHelpersRecipes);
		// ...

		return temp;
	}

	// getOptimisticVersion(version) {
	// 	let components = version.split('.')
	// 	let optimistic = components[0] + '.' + components[1]
	// 	return optimistic
	// }

	getSuggestions(options) {
		const { prefix } = options;

		if (prefix.length >= 1) {
			return this.findMatchingSuggestions(prefix);
		}
	}

  // TODO: Implement dynamic-scope + expansion of options
	findMatchingSuggestions(prefix) {
		let prefixLower = prefix.toLowerCase();
		let matchingSuggestions = this.suggestions.filter((suggestion) => {
			let textLower = suggestion.snippet.toLowerCase();
			return textLower.startsWith(prefixLower);
		});

		return matchingSuggestions.map(this.inflateSuggestion);
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(suggestion) {
		// Check, if type is set, otherwise set to none
		// TODO: Prove, why this thing doesn't work right now
		var suggestiontypes:
		suggestiontypes = ['Resource', 'Helper', 'Metadata'];
		let actype = (suggestiontypes.indexOf(suggestiontypes == suggestion.type )) ? suggestion.type:'';

		// Not set currently
		let replacementPrefix = suggestion.replacementPrefix;

		// Set description: Show code, which will be set, when pressing enter; followed by description
		// -> suggestion.snippet (cleaned up without $(1:xxx) $(2:yyy))+ suggestion.description
		let descsnippet = suggestion.snippet.replace(/\${[0-9]:|}/g, '');
		if (suggestion.since != null) {
			desc = '**Snippet**\n```' + descsnippet + '```' + '\n**Description**\n' + suggestion.description + '\n**Since**\n' + suggestion.since;
		} else if ( suggestion.deprecated != null ) {
			desc = '**Snippet**\n```' + descsnippet + '```' + '\n**Description**\n' + suggestion.description + '\n**Deprecated in Version**\n' + suggestion.deprecatedin;
		} else {
			desc = '**Snippet**\n```' + descsnippet + '```' + '\n**Description**\n' + suggestion.description ;
		}

		// Since
		// Deprecated Version
		//

		// let desc = '**Snippet**\n```' + descsnippet + '```' + '\n**Description**\n' + suggestion.description + '\n**Since**\n' + suggestion.since;


		// set icon
		atompackagedir = atom.packages.getPackageDirPaths()
		// define default colors for each type and set icon
		// Resources
		ciconbgcolorresource 		= 	'#ffb14c'
		ciconiconcolorresource	=		'White'
		ciconiconresource 			= 	'R'
		// Helpers
		ciconbgcolorhelper 			= 	'#644cff'
		ciconiconcolorhelper		=		'White'
		ciconiconhelper					=		'h'
		// Metadata
		ciconbgcolormetadata 		= 	'#9aff4c'
		ciconiconcolormetadata	=		'Black'
		ciconiconmetadata				=		'M'
		// All other
		ciconbgcolorother 			= 	'#ff4ce7'
		ciconiconcolorother			=		'Black'
		ciconiconother					= 	'o'


		let cicon;
		if (suggestion.icon != null) {
			cicon = suggestion.icon
		} else {
			if ( suggestion.type == 'Resource' ) {
				cicon = '<div style="background-color:' + ciconbgcolorresource + '; color:' + ciconiconcolorresource + '">' + ciconiconresource + '</div>';
			} else if ( suggestion.type == 'Helper' ){
				cicon = '<div style="background-color:' + ciconbgcolorhelper + '; color:' + ciconiconcolorhelper + '">' + ciconiconhelper + '</div>';
			} else if ( suggestion.type == 'Metadata' ) {
				cicon = '<div style="background-color:' + ciconbgcolormetadata + '; color:' + ciconiconcolormetadata + '">' + ciconiconmetadata + '</div>';
			} else {
				cicon = '<div style="background-color:' + ciconbgcolorother + '; color:' + ciconiconcolorother + '">' + ciconiconother + '</div>';
			}
		}

		// Set packagename
		let pack = suggestion.package;

		return {
			displayText: suggestion.displaytext,
			snippet: suggestion.snippet,
			descriptionMoreURL: suggestion.descriptionMoreURL,
			leftLabel: suggestion.type,
			rightLabel: pack,
			iconHTML: cicon,
			type: actype,
			descriptionMarkdown: desc
		};
	}
}
export default new ChefProviderMetadata();
