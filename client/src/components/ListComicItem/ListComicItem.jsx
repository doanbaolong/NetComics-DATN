import { memo } from 'react';
import ComicItem from '../ComicItem';
import Pagination from '~/components/Pagination';
import Spinner from '../Spinner/Spinner';

function ListComicItem({
    list,
    skeleton = false,
    loading = false,
    accountHistory = false,
    accountFollow = false,
    localHistory = false,
    localHistoryList = [],
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
            {skeleton ? (
                new Array(12).fill(2).map((comic, index) => <ComicItem key={index} skeleton={skeleton} />)
            ) : loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner />
                </div>
            ) : (
                list &&
                list.map((comic, index) => (
                    <ComicItem
                        key={index}
                        comic={comic}
                        localHistory={localHistory}
                        localHistoryList={localHistoryList}
                        localFollow={localFollow}
                        accountHistory={accountHistory}
                        accountFollow={accountFollow}
                        onRemoveLocalHistory={onRemoveLocalHistory}
                        onRemoveLocalFollow={onRemoveLocalFollow}
                    />
                ))
            )}
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
