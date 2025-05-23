{**
 * templates/frontend/pages/indexSite.tpl
 *
 * Copyright (c) 2014-2021 Simon Fraser University
 * Copyright (c) 2003-2021 John Willinsky
 * Distributed under the GNU GPL v3. For full terms see the file docs/COPYING.
 *
 * Site index.
 *
 *}
{include file="frontend/components/header.tpl"}

<div class="page_index_site">

	{if $about}
		<div class="about_site">
			{$about}
		</div>
	{/if}

	<div class="journals">
		<h2>
			{translate key="context.contexts"}
		</h2>
		{if !$journals|@count}
			{translate key="site.noJournals"}
		{else}
			<ul>
				{foreach from=$journals item=journal}
					{capture assign="url"}{url journal=$journal->getPath()}{/capture}
					{assign var="thumb" value=$journal->getLocalizedData('journalThumbnail')}
					{assign var="description" value=$journal->getLocalizedDescription()}
					{assign var="eIssn" value=$journal->getData('onlineIssn')}
					{assign var="pIssn" value=$journal->getData('printIssn')}
			
					<li{if $thumb} class="has_thumb"{/if}>
						{if $thumb}
							<div class="thumb">
								<a href="{$url|escape}">
									<img src="{$journalFilesPath}{$journal->getId()}/{$thumb.uploadName|escape:"url"}"{if $thumb.altText} alt="{$thumb.altText|escape|default:''}"{/if}>
								</a>
							</div>
						{/if}

						<div class="body">
							<h3>
								<a href="{$url|escape}" rel="bookmark">
									{$journal->getLocalizedName()}
								</a>
							</h3>
							<ul class="links">
								<li class="view">
									<a href="{url|escape journal=$journal->getPath() page="about"}">
										{translate key="about.aboutContext"}
									</a>
								</li>
								<li class="current">
									<a href="{url|escape journal=$journal->getPath() page="issue" op="current"}">
										{translate key="site.journalCurrent"}
									</a>
								</li>
							</ul>
							{if $description}
								<div class="description">
									{$description}
									{if $eIssn}<td class="label">E-ISSN: </td><td class="value">{$eIssn}</td>{/if}
									{if $pIssn}<td class="label">P-ISSN: </td><td class="value">{$pIssn}</td>{/if}
								</div>
							{/if}
						</div>
					</li>
				{/foreach}
			</ul>
		{/if}
	</div>

</div><!-- .page -->

{include file="frontend/components/footer.tpl"}
