import {Pagination} from 'semantic-ui-react'

const Paginate = ({totalPages, onChange, firstItem, lastItem}) => {
    return (
        <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={firstItem}
        lastItem={lastItem}
        siblingRange={1}
        totalPages={totalPages}
        onPageChange={onChange}

        />
    )
}

export default Paginate
