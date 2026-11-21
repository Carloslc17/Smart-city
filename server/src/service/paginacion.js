export async function consultarPagina(Model, filtro, orden, page, limit) {
    const registros = await Model.find(filtro)
        .sort(orden)
        .skip((page - 1) * limit)
        .limit(limit + 1)
        .lean();

    const hasMore = registros.length > limit;
    if (hasMore) registros.pop();

    return {
        data: registros,
        pagination: { page, limit, hasMore },
    };
}
