import { memo } from 'react';
import ComicItem from '../ComicItem';
import Pagination from '~/components/Pagination';

function ListComicItem({
    list,
    accountHistory = false,
    accountFollow = false,
    localHistory = false,
    localFollow = false,
    genres = false,
    advSearch = false,
    advSearchQuery,
    search = false,
    searchQuery,
    onRemoveLocalHistory,
    onRemoveLocalFollow,
}) {
    return (
        <div className="row comic-list">
            {list &&
                list.map((comic, index) => (
                    <ComicItem
                        key={index}
                        id={comic.id}
                        name={comic.name}
                        slug={comic.slug}
                        imageUrl={comic.image}
                        chapters={comic.Chapters}
                        localHistory={localHistory}
                        localFollow={localFollow}
                        accountHistory={accountHistory}
                        accountFollow={accountFollow}
                        onRemoveLocalHistory={onRemoveLocalHistory}
                        onRemoveLocalFollow={onRemoveLocalFollow}
                    />
                ))}
            <Pagination
                localHistory={localHistory}
                localFollow={localFollow}
                accountHistory={accountHistory}
                accountFollow={accountFollow}
                genres={genres}
                advSearch={advSearch}
                advSearchQuery={advSearchQuery}
                search={search}
                searchQuery={searchQuery}
            />
        </div>
    );
}

export default memo(ListComicItem);
